import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/user';

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userService.checkout(address);
      navigate('/order-confirmation');
    } catch (err) {
      setError('Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Dirección</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full bg-gray-700 text-white rounded p-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Ciudad</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Estado/Provincia</label>
              <input
                type="text"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Código Postal</label>
              <input
                type="text"
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">País</label>
              <input
                type="text"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="w-full bg-gray-700 text-white rounded p-2"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;