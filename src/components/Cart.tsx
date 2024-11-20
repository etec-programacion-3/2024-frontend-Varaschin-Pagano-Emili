import React, { useEffect, useState } from 'react';
import { userService } from '../services/user';
import { CartItem } from '../types/cart';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await userService.getCart();
      setCart(data);
    } catch (err) {
      setError('Error al cargar carrito');
    }
  };

  const removeFromCart = async (gameId: string) => {
    try {
      await userService.removeFromCart(gameId);
      loadCart();
    } catch (err) {
      setError('Error al remover juego');
    }
  };

  const total = cart.reduce((sum, item) => 
    sum + (item.game.salePrice || item.game.price) * item.quantity, 0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Mi Carrito</h2>
      {error && (
        <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4">
          {error}
        </div>
      )}
      <div className="bg-gray-800 rounded-xl p-6">
        {cart.map((item) => (
          <div key={item.game.id} className="flex items-center justify-between mb-4 p-4 bg-gray-700 rounded">
            <div className="flex items-center">
              <img src={item.game.image} alt={item.game.title} className="w-20 h-20 object-cover rounded" />
              <div className="ml-4">
                <h3 className="font-semibold">{item.game.title}</h3>
                <p className="text-gray-400">
                  ${item.game.salePrice || item.game.price} x {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.game.id.toString())}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        ))}
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => {/* Implementar checkout */}}
            className="mt-4 bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;