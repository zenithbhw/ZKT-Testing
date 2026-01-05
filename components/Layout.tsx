
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Cpu, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../App';
import { UserRole } from '../types';

const SidebarItem = ({ to, icon: Icon, label, collapsed }: { to: string, icon: any, label: string, collapsed: boolean }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-3 mb-2 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} className={collapsed ? 'mx-auto' : 'mr-3'} />
      {!collapsed && <span className="font-medium">{label}</span>}
      {!collapsed && isActive && <ChevronRight size={16} className="ml-auto" />}
    </Link>
  );
};

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <ShieldCheck size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">CloudAttend</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 ml-auto"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 mt-4">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
          {user?.role === UserRole.SUPERADMIN && (
            <SidebarItem to="/dealers" icon={Users} label="Dealer Management" collapsed={collapsed} />
          )}
          {(user?.role === UserRole.DEALER || user?.role === UserRole.SUPERADMIN) && (
            <SidebarItem to="/devices" icon={Cpu} label="Devices" collapsed={collapsed} />
          )}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <button 
            onClick={logout}
            className={`flex items-center p-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-slate-700 capitalize">
              Welcome back, {user?.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user?.name}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
