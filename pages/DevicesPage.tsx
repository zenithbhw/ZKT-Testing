
import React from 'react';
import { 
  Cpu, 
  Wifi, 
  WifiOff, 
  MoreVertical, 
  Plus, 
  Activity,
  Server
} from 'lucide-react';
import { Device } from '../types';

// Fix: Use React.FC to properly type the component and support standard React props like 'key'
const DeviceCard: React.FC<{ device: Device }> = ({ device }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${device.status === 'online' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
        <Cpu size={24} />
      </div>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          device.status === 'online' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
        }`}>
          {device.status === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
          {device.status}
        </span>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
    
    <div className="space-y-1">
      <h3 className="font-bold text-slate-800">{device.device_name}</h3>
      <p className="text-xs text-slate-400 font-mono tracking-tighter">SN: {device.serial_number}</p>
    </div>

    <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">IP Address</span>
        <span className="font-semibold text-slate-600">{device.ip_address}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Port</span>
        <span className="font-semibold text-slate-600">{device.port}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Sync Status</span>
        <span className="font-semibold text-emerald-600 flex items-center gap-1">
          <Activity size={12} /> Live
        </span>
      </div>
    </div>

    <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
      <Server size={14} />
      Configure Device
    </button>
  </div>
);

const DevicesPage: React.FC = () => {
  const devices: Device[] = [
    { id: 1, device_name: 'Main Entrance 01', serial_number: 'ZK-92837482', ip_address: '192.168.1.105', port: 4370, status: 'online' },
    { id: 2, device_name: 'HR Wing Terminal', serial_number: 'ZK-11223344', ip_address: '192.168.1.106', port: 4370, status: 'online' },
    { id: 3, device_name: 'Backdoor Exit', serial_number: 'ZK-99887766', ip_address: '192.168.1.107', port: 4370, status: 'offline' },
    { id: 4, device_name: 'IT Server Room', serial_number: 'ZK-55443322', ip_address: '10.0.0.52', port: 4370, status: 'online' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Devices</h1>
          <p className="text-slate-500">Manage and monitor ZKTeco attendance terminals</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          <Plus size={18} />
          Register Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
        
        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all bg-white/50 group">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 group-hover:border-blue-300 flex items-center justify-center mb-4">
            <Plus size={24} />
          </div>
          <span className="font-semibold text-sm">Add New Device</span>
        </button>
      </div>
    </div>
  );
};

export default DevicesPage;
