"use client";

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/hooks/use-supabase-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  fetchConsultationRequests, 
  fetchUsers, 
  fetchPayments, 
  fetchAdminStats,
  updateConsultationStatus,
  formatCurrency,
  type PaymentData,
  type UserData,
  type AdminStats
} from '@/lib/admin-data';
import { ConsultationRequest } from '@/types/database';

// Loading and error state interfaces
interface LoadingState {
  stats: boolean;
  payments: boolean;
  consultations: boolean;
  users: boolean;
}

interface ErrorState {
  stats: string | null;
  payments: string | null;
  consultations: string | null;
  users: string | null;
}

export default function AdminDashboard({ user }: { user: any }) {
  const { signOut } = useSupabaseAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Data state
  const [stats, setStats] = useState<AdminStats>({ 
    totalRevenue: 0, 
    totalConsultations: 0, 
    pendingPayments: 0, 
    activeUsers: 0 
  });
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState<LoadingState>({
    stats: true,
    payments: true,
    consultations: true,
    users: true
  });
  
  // Error states
  const [errors, setErrors] = useState<ErrorState>({
    stats: null,
    payments: null,
    consultations: null,
    users: null
  });

  // Fetch all data on component mount
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch stats
        setLoading(prev => ({ ...prev, stats: true }));
        const statsData = await fetchAdminStats();
        setStats(statsData);
        setLoading(prev => ({ ...prev, stats: false }));
      } catch (error) {
        setErrors(prev => ({ ...prev, stats: 'Failed to load statistics' }));
        setLoading(prev => ({ ...prev, stats: false }));
      }

      try {
        // Fetch payments
        setLoading(prev => ({ ...prev, payments: true }));
        const paymentsData = await fetchPayments();
        setPayments(paymentsData);
        setLoading(prev => ({ ...prev, payments: false }));
      } catch (error) {
        setErrors(prev => ({ ...prev, payments: 'Failed to load payments' }));
        setLoading(prev => ({ ...prev, payments: false }));
      }

      try {
        // Fetch consultations
        setLoading(prev => ({ ...prev, consultations: true }));
        const consultationsData = await fetchConsultationRequests();
        setConsultations(consultationsData);
        setLoading(prev => ({ ...prev, consultations: false }));
      } catch (error) {
        setErrors(prev => ({ ...prev, consultations: 'Failed to load consultations' }));
        setLoading(prev => ({ ...prev, consultations: false }));
      }

      try {
        // Fetch users
        setLoading(prev => ({ ...prev, users: true }));
        const usersData = await fetchUsers();
        setUsers(usersData);
        setLoading(prev => ({ ...prev, users: false }));
      } catch (error) {
        setErrors(prev => ({ ...prev, users: 'Failed to load users' }));
        setLoading(prev => ({ ...prev, users: false }));
      }
    }

    loadData();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'captured': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter functions
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.order_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredConsultations = consultations.filter(consultation => {
    const fullName = `${consultation.first_name} ${consultation.last_name || ''}`.trim();
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (consultation.company_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter(user => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen" style={{ background: 'white' }}>
      {/* Header */}
      <div className="border-b border-white/10  backdrop-blur-sm">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">Admin Dashboard</h1>
              <p className="text-gray-300 mt-2">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#156d95] text-white border-[#156d95]">Admin</Badge>
              <Button onClick={handleSignOut} variant="outline" className="border-white/20 bg-blue-400 text-white hover:bg-white/10">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
              <div className="w-8 h-8 rounded-full bg-[#156d95]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#156d95]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading.stats ? 'Loading...' : stats.activeUsers}
              </div>
              <p className="text-xs text-gray-600">Active users</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {loading.stats ? 'Loading...' : formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-gray-600">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Consultations</CardTitle>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalConsultations}</div>
              <p className="text-xs text-gray-600">+8 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Pending Payments</CardTitle>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</div>
              <p className="text-xs text-gray-600">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="payments" className="text-black data-[state=active]:bg-[#156d95] data-[state=active]:text-white">
              Payments
            </TabsTrigger>
            <TabsTrigger value="consultations" className="text-black data-[state=active]:bg-[#156d95] data-[state=active]:text-white">
              Consultations
            </TabsTrigger>
            <TabsTrigger value="users" className="text-black data-[state=active]:bg-[#156d95] data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-black data-[state=active]:bg-[#156d95] data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Payment Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Monitor and manage all Razorpay transactions
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <Input
                    placeholder="Search by email or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="max-w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="captured">Captured</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.payments ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          Loading payments...
                        </TableCell>
                      </TableRow>
                    ) : filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.order_id}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.payment_id || 'N/A'}</TableCell>
                        <TableCell>{payment.customer_email}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View
                            </Button>
                            {payment.status === 'failed' && (
                              <Button size="sm" className="text-xs bg-[#156d95] hover:bg-[#0f4c6c] text-white">
                                Retry
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!loading.payments && filteredPayments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No payments found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations">
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Consultation Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Manage incoming consultation requests and track progress
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="max-w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.consultations ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          Loading consultations...
                        </TableCell>
                      </TableRow>
                    ) : filteredConsultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">
                          {`${consultation.first_name} ${consultation.last_name || ''}`.trim()}
                        </TableCell>
                        <TableCell>{consultation.email}</TableCell>
                        <TableCell>{consultation.company_name || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {consultation.selected_services?.join(', ') || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {consultation.other_service_description || 'No additional details'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(consultation.status)}>
                            {consultation.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(consultation.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View
                            </Button>
                            {consultation.status === 'pending' && (
                              <Button 
                                size="sm" 
                                className="text-xs bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => updateConsultationStatus(consultation.id, 'contacted')}
                              >
                                Contact
                              </Button>
                            )}
                            {consultation.status === 'contacted' && (
                              <Button 
                                size="sm" 
                                className="text-xs bg-[#156d95] hover:bg-[#0f4c6c] text-white"
                                onClick={() => updateConsultationStatus(consultation.id, 'in_progress')}
                              >
                                Start Work
                              </Button>
                            )}
                            {consultation.status === 'in_progress' && (
                              <Button 
                                size="sm" 
                                className="text-xs bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!loading.consultations && filteredConsultations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No consultations found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">User Management</CardTitle>
                <CardDescription className="text-gray-600">
                  View and manage all registered users
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <Input
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="max-w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead>Total Sessions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.users ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.last_sign_in_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {user.sign_in_count} sessions
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs text-blue-600 hover:text-blue-700">
                              Reset Password
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs text-red-600 hover:text-red-700">
                              Suspend
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!loading.users && filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No users found matching your criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900">System Settings</CardTitle>
                <CardDescription className="text-gray-600">
                  Configure system settings and integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Razorpay Configuration</h3>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 mb-2">⚠️ Razorpay not configured</p>
                      <p className="text-xs text-yellow-700">Add your Razorpay credentials to .env.local</p>
                    </div>
                    <Button className="bg-[#156d95] hover:bg-[#0f4c6c] text-white">
                      Configure Razorpay
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Settings</h3>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 mb-2">✅ Email configured</p>
                      <p className="text-xs text-green-700">Resend API is active</p>
                    </div>
                    <Button variant="outline" className="border-[#156d95] text-[#156d95] hover:bg-[#156d95] hover:text-white">
                      Test Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}