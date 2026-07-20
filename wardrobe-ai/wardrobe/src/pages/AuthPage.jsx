import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) setError(error.message);
      else setMessage('Check your email to confirm your account.');
    }

    setLoading(false);
  };

  const LogoIcon = ({ size = 'w-9 h-9', iconSize = 'w-5 h-5' }) => (
    <div className={`${size} bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0`}>
      <svg className={`${iconSize} fill-stone-900`} viewBox="0 0 24 24">
        <path d="M21 6.5c0-.83-.67-1.5-1.5-1.5h-15C3.67 5 3 5.67 3 6.5v1c0 .55.3 1.03.74 1.28L12 14l8.26-5.22c.44-.25.74-.73.74-1.28v-1zM12 16L3.26 10.72C3.1 10.9 3 11.18 3 11.5V18c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-6.5c0-.32-.1-.6-.26-.78L12 16z"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex dark:bg-stone-950 transition-colors duration-300">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12
        bg-[#f5f0ea] dark:bg-stone-900 transition-colors duration-300">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <span className="text-stone-800 dark:text-stone-100 font-medium text-base tracking-tight">
              Wardrobe AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-400 dark:text-stone-500 text-xs tracking-widest uppercase">Est. 2024</span>
            <button
              onClick={() => setDark(!dark)}
              className="w-8 h-8 rounded-lg flex items-center justify-center
                bg-stone-200/60 dark:bg-stone-800
                text-stone-500 dark:text-stone-400
                hover:bg-stone-300/60 dark:hover:bg-stone-700
                transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-stone-400 dark:text-stone-500 text-xs tracking-[0.2em] uppercase mb-4">Personal Style</p>
          <h1 className="text-6xl font-medium text-stone-900 dark:text-white leading-[1.1] mb-6">
            Dress better.<br />Every day.
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed max-w-sm">
            AI that learns your taste and builds outfits you'll actually wear — morning to evening, weekday to weekend.
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {['AI Outfit Builder', 'Weekly Planner', 'Smart Wardrobe', 'Style Insights'].map((f) => (
              <span key={f} className="px-3 py-1.5 text-xs rounded-full
                bg-stone-200/70 dark:bg-stone-800
                text-stone-600 dark:text-stone-400
                border border-stone-300/50 dark:border-stone-700">
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-10">
          {[
            { num: '2.4k', label: 'Outfits created' },
            { num: '98%', label: 'Style match' },
            { num: '7d', label: 'Weekly planning' },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-3xl font-medium text-stone-900 dark:text-white">{s.num}</p>
              <p className="text-stone-400 dark:text-stone-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8 sm:px-16
        bg-white dark:bg-stone-950 transition-colors duration-300">
        <div className="w-full max-w-sm">

          <div className="flex items-center justify-between mb-10 lg:hidden">
            <div className="flex items-center gap-2">
              <LogoIcon size="w-8 h-8" iconSize="w-4 h-4" />
              <span className="text-stone-800 dark:text-stone-100 font-medium text-sm">Wardrobe AI</span>
            </div>
            <button
              onClick={() => setDark(!dark)}
              className="w-8 h-8 rounded-lg flex items-center justify-center
                bg-stone-100 dark:bg-stone-800
                text-stone-500 dark:text-stone-400
                hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          <div className="hidden lg:flex justify-end mb-6">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs
                bg-stone-100 dark:bg-stone-800
                text-stone-500 dark:text-stone-400
                hover:bg-stone-200 dark:hover:bg-stone-700
                border border-stone-200 dark:border-stone-700
                transition-colors"
            >
              {dark ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>

          <p className="text-stone-400 dark:text-stone-500 text-sm mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Get started'}
          </p>
          <h2 className="text-3xl font-medium text-stone-900 dark:text-white mb-10">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h2>

          <div className="flex bg-stone-100 dark:bg-stone-800 rounded-lg p-1 mb-8 transition-colors">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setMessage(''); }}
                className={`flex-1 py-2 text-sm rounded-md transition-all ${
                  mode === m
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white font-medium shadow-sm border border-stone-200 dark:border-stone-600'
                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                }`}
              >
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="border-b border-stone-200 dark:border-stone-700 pb-1
                focus-within:border-stone-900 dark:focus-within:border-amber-400 transition-colors">
                <label className="block text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priyanshu Pandey"
                  required
                  className="w-full bg-transparent text-stone-900 dark:text-white text-sm outline-none
                    placeholder-stone-300 dark:placeholder-stone-600 pb-1"
                />
              </div>
            )}

            <div className="border-b border-stone-200 dark:border-stone-700 pb-1
              focus-within:border-stone-900 dark:focus-within:border-amber-400 transition-colors">
              <label className="block text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent text-stone-900 dark:text-white text-sm outline-none
                  placeholder-stone-300 dark:placeholder-stone-600 pb-1"
              />
            </div>

            <div className="border-b border-stone-200 dark:border-stone-700 pb-1
              focus-within:border-stone-900 dark:focus-within:border-amber-400 transition-colors">
              <label className="block text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="flex-1 bg-transparent text-stone-900 dark:text-white text-sm outline-none
                    placeholder-stone-300 dark:placeholder-stone-600 pb-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-300 dark:text-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end -mt-2">
                <button type="button"
                  className="text-xs text-stone-400 dark:text-stone-500 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs bg-red-50 dark:bg-red-950/40
                border border-red-100 dark:border-red-900/50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-600 dark:text-green-400 text-xs bg-green-50 dark:bg-green-950/40
                border border-green-100 dark:border-green-900/50 rounded-lg px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium
                bg-stone-900 dark:bg-amber-400
                text-white dark:text-stone-900
                hover:bg-stone-700 dark:hover:bg-amber-300
                transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading
                ? <Loader2 size={16} className="animate-spin" />
                : mode === 'signin' ? 'Sign In' : 'Create Account'
              }
            </button>
          </form>

          {/* Footer info moved directly under button */}
          <p className="text-center text-xs text-stone-300 dark:text-stone-600 mt-8">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }}
              className="text-amber-500 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <p className="text-center text-[11px] text-stone-200 dark:text-stone-700 mt-4">
            © 2024 Wardrobe AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}