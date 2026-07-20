import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { supabase, DAYS_OF_WEEK } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import MannequinDisplay from '../components/MannequinDisplay';

export default function WeeklyPlanPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const [{ data: planData }, { data: outfitData }, { data: itemData }] = await Promise.all([
        supabase.from('weekly_plans').select('*').eq('user_id', user.id),
        supabase.from('outfits').select('*').eq('user_id', user.id),
        supabase.from('clothing_items').select('*').eq('user_id', user.id),
      ]);
      setPlans(planData || []);
      setOutfits(outfitData || []);
      setAllItems(itemData || []);
    };
    fetchData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Weekly Outfit Planner</h1>
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
        {DAYS_OF_WEEK.map((day, i) => (
          <div key={i} className="bg-white rounded-2xl border-2 border-stone-100 overflow-hidden">
            <div className="p-3 bg-stone-50 border-b border-stone-100">
              <p className="text-xs font-bold text-stone-500 uppercase">{day.slice(0, 3)}</p>
            </div>
            <div className="p-3 min-h-[150px] flex flex-col items-center justify-center text-stone-300">
              <p className="text-xs">No outfit assigned</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}