
export enum UserRole {
  SUPERADMIN = 'superadmin',
  DEALER = 'dealer',
  OFFICE_ADMIN = 'office_admin'
}

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  token?: string;
}

export interface Device {
  id: number;
  device_name: string;
  serial_number: string;
  ip_address: string;
  port: number;
  status: 'online' | 'offline';
}

export interface AttendanceRecord {
  id: number;
  user_name: string;
  timestamp: string;
  device_name: string;
}

export interface DashboardStats {
  totalDealers: number;
  totalOffices: number;
  activeDevices: number;
  pendingRequests: number;
}
