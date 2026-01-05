
import React, { useState } from 'react';
import { useAuth } from '../App';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight, Play } from 'lucide-react';
import { UserRole, UserStatus } from '../types';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login({
        id: 1,
        name: 'Super Admin',
        email: email || 'admin@cloudattend.pro',
        role: UserRole.SUPERADMIN,
        status: UserStatus.APPROVED,
        token: 'mock-jwt-token'
      });
      setLoading(false);
    }, 1200);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login({
        id: 1,
        name: 'Demo User',
        email: 'demo@cloudattend.pro',
        role: UserRole.SUPERADMIN,
        status: UserStatus.APPROVED,
        token: 'mock-jwt-token'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background blobs for aesthetics */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-8 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-blue-600 text-white p-3 rounded-2xl shadow-xl shadow-blue-200 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">CloudAttend Pro</h1>
          <p className="text-slate-500 mt-2">Enterprise Attendance Management System</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Sign in</h2>
            <button 
              onClick={handleDemoLogin}
              className="text-xs flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <Play size={12} fill="currentColor" />
              Demo Access
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cloudattend.pro"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-800"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 px-1">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="any password for preview"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium text-slate-800"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <p className="text-center text-sm text-slate-500 font-medium">
              Don't have an account? <a href="#" className="text-blue-600 font-bold hover:underline">Apply as Dealer</a>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-slate-400 font-medium">
          &copy; 2024 CloudAttend Systems Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
