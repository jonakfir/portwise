'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call login API which checks admin status and sets cookie
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Sign in to Portwise</h1>
              <p className="text-sm text-slate-400">Access your trade intelligence dashboard</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-orange-400 hover:text-orange-300">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
