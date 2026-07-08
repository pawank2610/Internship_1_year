import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  // Each wishlist item: { id, title, price, image }
  const [wishlistItems, setWishlistItems] = useState([]);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  // Adds the product if it isn't saved yet, removes it if it already is —
  // this is what powers the heart icon's toggle behaviour.
  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Convenience hook: const { toggleWishlist, isInWishlist } = useWishlist();
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}