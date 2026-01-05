
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  UserPlus,
  Mail,
  Calendar
} from 'lucide-react';
import { UserStatus } from '../types';

const DealersPage: React.FC = () => {
  const [dealers, setDealers] = useState([
    { id: 1, name: 'TechSolutions Ltd', email: 'contact@techsolutions.com', status: UserStatus.PENDING, joinDate: '2023-10-24' },
    { id: 2, name: 'Global Connect', email: 'admin@globalconnect.net', status: UserStatus.APPROVED, joinDate: '2023-09-12' },
    { id: 3, name: 'SmartSystems Inc', email: 'sales@smartsystems.io', status: UserStatus.PENDING, joinDate: '2023-11-02' },
    { id: 4, name: 'Network Hub', email: 'info@networkhub.com', status: UserStatus.APPROVED, joinDate: '2023-08-30' },
  ]);

  const handleAction = (id: number, status: UserStatus) => {
    setDealers(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dealer Management</h1>
          <p className="text-slate-500">Review and manage authorized dealer partners</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          <UserPlus size={18} />
          Invite Dealer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <Filter size={18} />
              Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Dealer Details</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dealers.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        {dealer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{dealer.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} /> {dealer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {dealer.joinDate}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      dealer.status === UserStatus.APPROVED 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : dealer.status === UserStatus.PENDING 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-rose-100 text-rose-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        dealer.status === UserStatus.APPROVED 
                          ? 'bg-emerald-500' 
                          : dealer.status === UserStatus.PENDING 
                          ? 'bg-amber-500' 
                          : 'bg-rose-500'
                      }`}></span>
                      {dealer.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {dealer.status === UserStatus.PENDING && (
                        <>
                          <button 
                            onClick={() => handleAction(dealer.id, UserStatus.APPROVED)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => handleAction(dealer.id, UserStatus.REJECTED)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {dealers.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No dealers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default DealersPage;
