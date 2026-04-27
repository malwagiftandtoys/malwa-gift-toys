import { useState, useCallback } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);
  const updateQty = useCallback((id, delta) => setCart(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0)
  ), []);
  const clearCart = useCallback(() => setCart([]), []);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return { cart, addToCart, removeFromCart, updateQty, clearCart, total, count };
}
