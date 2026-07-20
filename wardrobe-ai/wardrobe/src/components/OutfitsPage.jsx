import { useState, useEffect } from 'react';
import { Sparkles, Save, Trash2, RefreshCw, Shirt, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import MannequinDisplay from '../components/MannequinDisplay';

// Category groups for matching
const TOP_CATEGORIES = ['shirts', 'tshirts', 't-shirts', 'jackets', 'tops', 'traditional', 'sweaters', 'hoodies', 'blouses', 'kurta', 'ethnic wear', 'activewear'];
const BOTTOM_CATEGORIES = ['jeans', 'pants', 'shorts', 'skirts', 'lehenga'];
const FULL_BODY_CATEGORIES = ['dresses', 'saree', 'suits'];

function getCategory(item) {
  const cat = (item.category || '').toLowerCase().trim();
  if (TOP_CATEGORIES.includes(cat)) return 'top';
  if (BOTTOM_CATEGORIES.includes(cat)) return 'bottom';
  if (FULL_BODY_CATEGORIES.includes(cat)) return 'full';
  return 'other';
}

function generateCombinations(items, gender) {
  const genderItems = items.filter(i => i.gender === gender);
  const tops = genderItems.filter(i => getCategory(i) === 'top');
  const bottoms = genderItems.filter(i => getCategory(i) === 'bottom');
  const fullBody = genderItems.filter(i => getCategory(i) === 'full');

  const combos = [];

  // Top + Bottom combos
  tops.forEach(top => {
    bottoms.forEach(bottom => {
      combos.push({ items: [top, bottom], type: 'top-bottom' });
    });
  });

  // Full body outfits (dresses, sarees etc.)
  fullBody.forEach(item => {
    combos.push({ items: [item], type: 'full-body' });
  });

  // If no combos yet but have tops, show tops alone
  if (combos.length === 0 && tops.length > 0) {
    tops.forEach(top => combos.push({ items: [top], type: 'top-only' }));
  }

  // Shuffle for variety
  return combos.sort(() => Math.random() - 0.5).slice(0, 12);
}

export default function OutfitsPage() {
  const { user } = useAuth();
  const [allItems, setAllItems] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [activeGender, setActiveGender] = useState('mens');
  const [combinations, setCombinations] = useState([]);
  const [tab, setTab] = useState('generate');
  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState(null);
  const [savedIndices, setSavedIndices] = useState(new Set());
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    const [{ data: items }, { data: outfits }] = await Promise.all([
      supabase.from('clothing_items').select('*').eq('user_id', user.id),
      supabase.from('outfits').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    ]);
    setAllItems(items || []);
    setSavedOutfits(outfits || []);
    setLoading(false);
    return items || [];
  };

  useEffect(() => {
    fetchData().then(items => {
      if (items?.length > 0) {
        setCombinations(generateCombinations(items, activeGender));
      }
    });
  }, [user]);

  const handleGenerate = () => {
    setSavedIndices(new Set());
    setCombinations(generateCombinations(allItems, activeGender));
  };

  const handleGenderSwitch = (g) => {
    setActiveGender(g);
    setSavedIndices(new Set());
    setCombinations(generateCombinations(allItems, g));
  };

  const handleSaveOutfit = async (combo, index) => {
    setSavingIndex(index);
    const itemIds = combo.items.map(i => i.id);
    const name = combo.items.map(i => i.name || i.category).join(' + ');
    const { error } = await supabase.from('outfits').insert({
      user_id: user.id,
      name,
      occasion: 'casual',
      item_ids: itemIds,
    });
    if (!error) {
      setSavedIndices(prev => new Set([...prev, index]));
      fetchData();
    }
    setSavingIndex(null);
  };

  const handleDeleteOutfit = async (id) => {
    await supabase.from('outfits').delete().eq('id', id);
    setSavedOutfits(prev => prev.filter(o => o.id !== id));
  };

  const handleAiSuggest = async () => {
    setAiLoading(true);
    setAiSuggestion('');
    const genderItems = allItems.filter(i => i.gender === activeGender);
    const itemList = genderItems.map(i => `${i.color} ${i.category}`).join(', ');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `I have these clothing items: ${itemList}. Suggest 3 stylish outfit combinations with brief explanations of why they work well together. Be concise and practical.`
          }]
        })
      });
      const data = await response.json();
      setAiSuggestion(data.content?.[0]?.text || 'No suggestion available.');
    } catch (err) {
      setAiSuggestion('Could not get AI suggestions. Please try again.');
    }
    setAiLoading(false);
  };

  const genderItems = allItems.filter(i => i.gender === activeGender);
  const tops = genderItems.filter(i => getCategory(i) === 'top');
  const bottoms = genderItems.filter(i => getCategory(i) === 'bottom');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Outfit Generator</h1>
          <p className="text-stone-500 text-sm mt-1">
            {genderItems.length} items · {tops.length} tops · {bottoms.length} bottoms
          </p>
        </div>
        <button
          onClick={handleGenerate}
          className="flex items-center gap-2 bg-amber-400 text-stone-900 px-4 py-2 rounded-xl font-semibold hover:bg-amber-300 transition"
        >
          <RefreshCw size={16} /> Regenerate
        </button>
      </div>

      {/* Gender Toggle */}
      <div className="flex gap-2 mb-5">
        {['mens', 'womens'].map(g => (
          <button
            key={g}
            onClick={() => handleGenderSwitch(g)}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition ${
              activeGender === g ? 'bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-900' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {g === 'mens' ? "Men's" : "Women's"}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl w-fit mb-6">
        {['generate', 'saved'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              tab === t ? 'bg-white dark:bg-stone-700 shadow-sm text-stone-900 dark:text-white' : 'text-stone-500'
            }`}
          >
            {t === 'generate' ? 'Generated' : `Saved (${savedOutfits.length})`}
          </button>
        ))}
      </div>

      {/* AI Suggest Button */}
      {tab === 'generate' && genderItems.length > 0 && (
        <div className="mb-6">
          <button
            onClick={handleAiSuggest}
            disabled={aiLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition"
          >
            <Sparkles size={16} />
            {aiLoading ? 'Getting AI suggestions...' : 'Get AI Style Tips'}
          </button>
          {aiSuggestion && (
            <div className="mt-3 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-2xl p-4">
              <p className="text-sm font-semibold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-2">
                <Sparkles size={14} /> AI Style Suggestions
              </p>
              <p className="text-sm text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{aiSuggestion}</p>
            </div>
          )}
        </div>
      )}

      {/* Generated Outfits */}
      {tab === 'generate' && (
        <>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-stone-200 border-t-amber-500 rounded-full animate-spin" />
            </div>
          ) : genderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
                <Shirt size={28} className="text-stone-400" />
              </div>
              <p className="text-stone-600 font-medium">No {activeGender === 'mens' ? "men's" : "women's"} items yet</p>
              <p className="text-stone-400 text-sm mt-1">Add clothes to your wardrobe to generate outfits</p>
            </div>
          ) : combinations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle size={32} className="text-amber-400 mb-3" />
              <p className="text-stone-600 font-medium">Need more variety</p>
              <p className="text-stone-400 text-sm mt-1">
                Add both tops ({tops.length}) and bottoms ({bottoms.length}) to generate outfit combinations
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {combinations.map((combo, i) => (
                <div key={i} className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-md transition">
                  <MannequinDisplay items={combo.items} gender={activeGender} size="sm" />
                  <div className="mt-3 space-y-1">
                    {combo.items.map((item, j) => (
                      <p key={j} className="text-xs text-stone-500 truncate">
                        <span className="font-medium text-stone-700 dark:text-stone-300">{item.color}</span> {item.category}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSaveOutfit(combo, i)}
                    disabled={savingIndex === i || savedIndices.has(i)}
                    className={`w-full mt-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition ${
                      savedIndices.has(i)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <Save size={14} />
                    {savingIndex === i ? 'Saving...' : savedIndices.has(i) ? 'Saved!' : 'Save Outfit'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Saved Outfits */}
      {tab === 'saved' && (
        <>
          {savedOutfits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-stone-500">No saved outfits yet. Generate and save some!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {savedOutfits.map(outfit => (
                <div key={outfit.id} className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm">
                  <p className="font-semibold text-sm text-stone-900 dark:text-white mb-2 truncate">{outfit.name}</p>
                  <span className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 px-2 py-1 rounded-full">
                    {outfit.occasion || 'casual'}
                  </span>
                  <button
                    onClick={() => handleDeleteOutfit(outfit.id)}
                    className="w-full mt-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}