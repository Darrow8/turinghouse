import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function MailingList() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement actual email subscription logic here
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h3 className="text-2xl font-semibold mb-2">Stay in the Loop</h3>
        <p className="text-gray-300">
          Join our mailing list to receive updates about events, opportunities, and community news.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {status === 'success' && (
          <p className="text-green-400 text-sm">Thanks for subscribing! We'll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
        )}
      </form>
    </div>
  );
} 