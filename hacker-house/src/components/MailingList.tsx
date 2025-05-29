import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function MailingList() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to mailing list:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 mx-auto mb-4 text-[#8C1515]" />
        <h3 className="text-2xl font-semibold mb-2 text-gray-900">Stay in the Loop</h3>
        <p className="text-gray-600">
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
            className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#8C1515] text-gray-900 placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-[#8C1515] text-white rounded-lg font-semibold hover:bg-[#8C1515]/90 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {status === 'success' && (
          <p className="text-green-600 text-sm">Thanks for subscribing! We&apos;ll be in touch soon.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm">Something went wrong. Please try again later.</p>
        )}
      </form>
    </div>
  );
} 