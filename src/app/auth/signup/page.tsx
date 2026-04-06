'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: call Supabase auth
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-navy bg-grid">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="glass rounded-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
              <p className="text-sm text-slate-400">Start with 5 free lookups per day. No credit card required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Work Email</label>
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
                  placeholder="Create a password"
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-orange-400 hover:text-orange-300">
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-slate-600 mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
