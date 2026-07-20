import React, { useState, useRef } from 'react';

const WardrobeApp = () => {
  // 1. User Database (Stores usernames, passwords, and their saved items)
  const [users, setUsers] = useState({
    'priyanshu': { password: '123', items: [] } // Standard profile already created
  });
  
  // 2. Login & Sign Up States
  const [loggedInUser, setLoggedInUser] = useState(null); // Keeps track of who is logged in
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between Login and Sign Up screen
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 3. Navigation & Theme States
  const [activeTab, setActiveTab] = useState('WARDROBE');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 4. Upload Form States
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Top');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ================= LOGIC: LOGIN & SIGN UP =================
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    if (!isSigningUp) {
      // Login Logic
      if (users[cleanUsername] && users[cleanUsername].password === password) {
        setLoggedInUser(cleanUsername);
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage('Wrong username or password.');
      }
    } else {
      // Sign Up Logic
      if (users[cleanUsername]) {
        setErrorMessage('This username is already taken.');
      } else {
        setUsers({
          ...users,
          [cleanUsername]: { password: password, items: [] }
        });
        setLoggedInUser(cleanUsername);
        setUsername('');
        setPassword('');
      }
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setErrorMessage('');
    setItemName('');
    setCategory('Top');
    setUploadedFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // ================= LOGIC: IMAGE UPLOADS =================
  const processFile = (file) => {
    if (!file) return;
    if (file.type && file.type.startsWith('image/')) {
      setUploadedFile(file);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(URL.createObjectURL(file));
      
      // Auto-fill item name if it's empty
      if (!itemName && file.name) {
        const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setItemName(nameWithoutExtension || 'New Item');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target?.files?.[0]) processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!uploadedFile || !loggedInUser) return;

    const newItem = {
      id: Date.now(),
      name: itemName || 'Untitled Item',
      category: category,
      image: imagePreview
    };

    // Save the item directly inside the logged-in user's account data
    setUsers({
      ...users,
      [loggedInUser]: {
        ...users[loggedInUser],
        items: [newItem, ...users[loggedInUser].items]
      }
    });

    // Reset input fields
    setItemName('');
    setCategory('Top');
    setUploadedFile(null);
    setImagePreview(null);
  };

  // Get current user's data safely
  const currentUserData = loggedInUser ? users[loggedInUser] : { items: [] };

  // ================= VIEW 1: LOGIN / SIGN UP SCREEN =================
  if (!loggedInUser) {
    return (
      <div className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-sm bg-[#121212] border border-[#222222] rounded-2xl p-8 shadow-2xl">
          
          <div className="mx-auto bg-[#f5c518] text-black w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mb-4 shadow-lg">
            W
          </div>
          <h2 className="text-xl font-bold text-center tracking-wide mb-1">Wardrobe AI</h2>
          <p className="text-xs text-gray-500 text-center mb-6">Manage your digital clothes</p>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {errorMessage && (
              <div className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-2.5 rounded-lg text-center">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5c518] transition"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#181818] border border-[#2d2d2d] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#f5c518] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#f5c518] hover:bg-[#dfb212] text-black font-bold py-2.5 rounded-xl transition text-sm tracking-wide shadow-md"
            >
              {isSigningUp ? 'Create Account' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#1f1f1f] text-center">
            <p className="text-xs text-gray-400">
              {isSigningUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSigningUp(!isSigningUp);
                  setErrorMessage('');
                }}
                className="text-[#f5c518] ml-1 font-bold hover:underline"
              >
                {isSigningUp ? 'Log In here' : 'Sign Up here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW 2: MAIN USER DASHBOARD =================
  return (
    <div className={`w-full min-h-screen font-sans transition-colors duration-300
      ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-gray-900'}`}>
      
      {/* Top Header Row */}
      <header className={`w-full border-b px-6 py-4 flex items-center justify-between transition-colors duration-300
        ${isDarkMode ? 'bg-[#0d0d0d] border-[#1a1a1a]' : 'bg-white border-gray-200 shadow-sm'}`}>
        
        <div className="flex items-center gap-3">
          <div className="bg-[#f5c518] text-black w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg shadow-md">W</div>
          <h1 className={`text-xl font-bold tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Wardrobe AI</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className={`text-sm font-bold uppercase ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{loggedInUser}</p>
            <p className="text-xs text-gray-500 font-medium">{loggedInUser}@wardrobeai.com</p>
          </div>

          {/* Theme Switch Button */}
          <button 
            type="button" 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 transition-all duration-200 rounded-lg border flex items-center justify-center
              ${isDarkMode ? 'text-gray-400 hover:text-[#f5c518] bg-[#141414] border-[#222222]' : 'text-gray-600 hover:text-yellow-600 bg-gray-100 border-gray-300'}`}
          >
            {isDarkMode ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd"/></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8 8 0 1010.586 10.586z" /></svg>
            )}
          </button>

          {/* Logout Button */}
          <button 
            type="button" 
            onClick={handleLogout}
            className={`text-xs font-bold border px-4 py-2 rounded-lg transition-all duration-200
              ${isDarkMode ? 'text-gray-400 hover:text-white bg-[#141414] hover:bg-[#1c1c1c] border-[#222222]' : 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border-gray-300'}`}
          >
            Log out
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={`max-w-5xl mx-auto px-4 mt-6 flex gap-8 border-b transition-colors duration-300
        ${isDarkMode ? 'border-[#161616]' : 'border-gray-200'}`}>
        {['WARDROBE', 'OUTFITS', 'WEEKLY'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold tracking-widest transition-all duration-200 relative
              ${activeTab === tab ? 'text-[#f5c518]' : (isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600')}`}
          >
            {tab}
            {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f5c518] rounded-full" />}
          </button>
        ))}
      </nav>

      {/* Main Dashboard Workspace Container */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        
        {/* INGEST APPAL MODALITY BLOCK */}
        <div className={`border rounded-2xl p-6 shadow-xl mb-8 transition-all duration-300
          ${isDarkMode ? 'bg-[#121212] border-[#232323]' : 'bg-white border-gray-200'}`}>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-lg font-bold tracking-wide">Ingest Apparel Modality</h2>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Upload an image from your gallery or drag it directly into the box.
              </p>
            </div>

            {/* Interactive Upload Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition-all duration-200 w-full md:w-72 h-24 text-center overflow-hidden
                ${isDragging 
                  ? 'border-[#f5c518] bg-[#f5c518]/5' 
                  : (isDarkMode ? 'border-[#333333] hover:border-[#444444] bg-[#181818] hover:bg-[#1c1c1c]' : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100')}`}
            >
              <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

              {imagePreview ? (
                <div className={`absolute inset-0 flex items-center justify-between px-4 ${isDarkMode ? 'bg-[#111111]' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={imagePreview} alt="Preview" className={`w-14 h-14 object-cover rounded-lg border ${isDarkMode ? 'border-[#333333]' : 'border-gray-200'}`} />
                    <div className="text-left min-w-0">
                      <p className="text-[11px] font-bold text-[#f5c518] uppercase tracking-wider">Ready</p>
                      <p className={`text-xs truncate max-w-[130px] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{uploadedFile?.name || 'Image Selected'}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded hover:text-[#f5c518] ${isDarkMode ? 'bg-[#222222] text-gray-400' : 'bg-gray-200 text-gray-600'}`}>Change</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1.5">
                  <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="text-[#f5c518] font-semibold">Click to upload</span> or drag file
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <form onSubmit={handleAddItem} className="flex flex-col md:flex-row items-end gap-4 w-full">
            <div className="flex-1 w-full">
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Item Name (Optional)</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Silk Formal Dress"
                className={`w-full border rounded-xl px-4 py-2.5 transition text-sm focus:outline-none focus:border-[#f5c518]
                  ${isDarkMode ? 'bg-[#181818] border-[#2d2d2d] text-white placeholder-gray-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
              />
            </div>

            <div className="w-full md:w-[200px] flex-shrink-0">
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category Target</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full border rounded-xl pl-4 pr-10 py-2.5 transition appearance-none text-sm cursor-pointer focus:outline-none focus:border-[#f5c518]
                    ${isDarkMode ? 'bg-[#181818] border-[#2d2d2d] text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                >
                  <option value="Top">👕 Top</option>
                  <option value="Outerwear">🧥 Outerwear</option>
                  <option value="Bottom">👖 Bottom</option>
                  <option value="Shoes">👟 Shoes</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[130px] flex-shrink-0">
              <button
                type="submit"
                disabled={!uploadedFile}
                className={`w-full font-bold py-2.5 rounded-xl transition-all duration-200 text-sm whitespace-nowrap tracking-wide
                  ${uploadedFile 
                    ? 'bg-gradient-to-r from-[#f5c518] to-[#dfb212] text-black hover:brightness-110 cursor-pointer shadow-md' 
                    : (isDarkMode ? 'bg-[#222222] text-gray-500 cursor-not-allowed border border-[#2d2d2d]' : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300')}`}
              >
                Add Item
              </button>
            </div>
          </form>

        </div>

        {/* ================= CLOSET INVENTORY GRID ================= */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold tracking-wide">
              Closet Inventory Matrix ({currentUserData.items.length})
            </h3>
          </div>
          
          {currentUserData.items.length === 0 ? (
            <div className={`border border-dashed rounded-2xl p-16 text-center transition-all duration-300
              ${isDarkMode ? 'border-[#232323] bg-[#121212]/30' : 'border-gray-300 bg-gray-50'}`}>
              <p className="text-sm text-gray-500">
                Your wardrobe is clean and empty. Upload device files to assemble your workspace collection.
              </p>
            </div>
          ) : (
            /* Items layout display card elements block */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {currentUserData.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-xl overflow-hidden shadow-md transition-transform duration-200 hover:scale-[1.02]
                    ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-white border-gray-200'}`}
                >
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover border-b border-inherit" />
                  <div className="p-3">
                    <p className="text-xs font-bold tracking-wide truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default WardrobeApp;