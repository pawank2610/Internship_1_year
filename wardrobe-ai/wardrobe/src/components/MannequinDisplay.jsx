const colorHex = {
  Black: '#1c1c1c', White: '#f0ede8', Grey: '#9ca3af', Navy: '#1e3a5f',
  Blue: '#3b82f6', Red: '#ef4444', Green: '#22c55e', Yellow: '#eab308',
  Orange: '#f97316', Pink: '#ec4899', Brown: '#92400e', Beige: '#d4a96a',
  Multi: '#a855f7', '': '#d1c4b8',
};

export default function MannequinDisplay({ items, gender, size = 'md' }) {
  const isFemale = gender === 'womens';
  const topItem = items.find((i) => ['shirts', 'tshirts', 'jackets', 'tops', 'traditional'].includes(i.category));
  const bottomItem = items.find((i) => i.category === 'jeans');
  
  const topColor = colorHex[topItem?.color || ''] || '#d1c4b8';
  const bottomColor = colorHex[bottomItem?.color || ''] || '#4b6cb7';
  const sizeClass = size === 'sm' ? 'w-28 h-44' : 'w-40 h-64';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 160" className={sizeClass} fill="none">
        <ellipse cx="50" cy="155" rx="28" ry="4" fill="#00000015" />
        <ellipse cx="50" cy="22" rx="11" ry="13" fill="#e8d5c0" />
        {/* Torso */}
        <path 
          d={isFemale ? "M28 40 C30 38 70 38 72 40 L74 85 L26 85 Z" : "M26 40 C28 38 72 38 74 40 L76 88 L24 88 Z"} 
          fill={topColor} 
        />
        {/* Legs */}
        <path 
          d={isFemale ? "M26 86 L36 150 L48 150 L50 118 L52 150 L64 150 L74 86 Z" : "M24 89 L33 152 L46 152 L50 120 L54 152 L67 152 L76 89 Z"} 
          fill={bottomColor} 
        />
      </svg>
    </div>
  );
}