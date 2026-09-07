import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../lib/supabase';
import { signInWithGoogle } from '../lib/googleAuth';
import { Lead, Settings } from '../data/travelData';
import {
  Lock,
  LogOut,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Download,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Save,
  Building2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Admin Data state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settings, setSettings] = useState<Settings>({
    agencyName: 'Ananddam Holidays',
    agencyHindiName: 'आनंददाम हॉलीडेज',
    director: 'Amol Anandrao Bodulwar',
    address: 'New Subhedar Layout, Ayodhya nagar, Nagpur, Maharashtra 440024',
    operatingHours: 'Open daily, Closes at 7:00 PM',
    phone: '',
    email: 'inquiries@ananddamholidays.com',
    whatsapp: ''
  });

  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [settingsMsg, setSettingsMsg] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLeads();
      fetchSettings();
    }
  }, [user]);

  const fetchLeads = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setAuthSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchLeads();
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setSettingsMsg('Office settings updated successfully!');
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (err: any) {
      setSettingsMsg(err.message || 'Error saving settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Destination', 'Status', 'Notes', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.destination.replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(l.created_at).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ananddam_Holidays_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-400 font-serif">
        <div className="text-center space-y-3">
          <Sparkles className="w-8 h-8 animate-spin mx-auto text-amber-400" />
          <p>Verifying Agent Portal Credentials...</p>
        </div>
      </div>
    );
  }

  // Not Logged In UI
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 absolute top-0 left-0" />

          <div className="text-center mb-6 space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif text-white font-bold">
              Ananddam Holidays
            </h2>
            <p className="text-amber-300/80 text-xs font-serif tracking-widest uppercase">
              Agent & Director Lead Portal
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Log in to view customer callback requests & direct lead queue.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-500/40 text-red-200 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-200/90 mb-1">
                Agent Email
              </label>
              <input
                type="email"
                required
                placeholder="demo@example.com or director email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-200/90 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 transition"
            >
              {authSubmitting ? 'Authenticating...' : isSignUp ? 'Create Agent Account' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="bg-slate-900 px-3 text-xs text-slate-500 relative z-10">or</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          </div>

          <button
            onClick={() => signInWithGoogle('Ananddam Holidays Admin')}
            type="button"
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium rounded-lg text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Sign in with Google</span>
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-amber-400 hover:underline"
            >
              {isSignUp ? 'Already have an agent account? Sign In' : 'Need agent access? Create Account'}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-amber-300 transition">
              ← Return to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Logged In Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-amber-500/20 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold font-serif text-lg">
              AH
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <span>Ananddam Holidays • Director Desk</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-sans">
                  PRO
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Ayodhya Nagar, Nagpur • Lead Generation & Inquiry Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 hidden md:block">
              Logged in: <strong className="text-amber-300">{user.email}</strong>
            </div>

            <a
              href="/"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
            >
              View Live Website
            </a>

            <button
              onClick={signOut}
              className="px-3 py-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 rounded-lg border border-red-800/50 flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Total Inquiries</span>
            <div className="text-3xl font-serif font-bold text-white">{leads.length}</div>
            <span className="text-[11px] text-amber-400">Captured through lead forms</span>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">New / Uncontacted</span>
            <div className="text-3xl font-serif font-bold text-amber-400">
              {leads.filter(l => l.status === 'New').length}
            </div>
            <span className="text-[11px] text-slate-400">Awaiting Nagpur desk callback</span>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">In Progress</span>
            <div className="text-3xl font-serif font-bold text-blue-400">
              {leads.filter(l => l.status === 'In Progress' || l.status === 'Contacted').length}
            </div>
            <span className="text-[11px] text-slate-400">Discussing itinerary & quotes</span>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Converted Travelers</span>
            <div className="text-3xl font-serif font-bold text-emerald-400">
              {leads.filter(l => l.status === 'Converted').length}
            </div>
            <span className="text-[11px] text-slate-400">Walked in or booked trip</span>
          </div>
        </div>

        {/* Lead Inquiries Table Section */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span>Customer Callback Inquiries</span>
                <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {filteredLeads.length} items
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                All phone numbers and destination requests captured live.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={fetchLeads}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
                title="Refresh Queue"
              >
                <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin text-amber-400' : ''}`} />
              </button>

              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-amber-500/30 font-medium text-xs flex items-center gap-1.5 transition whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, phone, email, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="All">All Statuses</option>
                <option value="New">New Only</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-amber-300 uppercase tracking-wider text-[11px] font-mono border-b border-slate-800">
                <tr>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Phone / Email</th>
                  <th className="p-4">Destination Requested</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white text-sm">{lead.name}</div>
                        {lead.notes && (
                          <div className="text-[11px] text-slate-400 mt-1 italic max-w-xs">
                            "{lead.notes}"
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-mono">
                        <div className="text-amber-300 font-bold flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          <a href={`tel:${lead.phone}`} className="hover:underline">
                            {lead.phone}
                          </a>
                        </div>
                        {lead.email && (
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-medium text-slate-200">
                        {lead.destination}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                          className={`px-2.5 py-1 rounded font-semibold text-[11px] bg-slate-950 border ${
                            lead.status === 'New'
                              ? 'border-amber-500 text-amber-300'
                              : lead.status === 'Converted'
                              ? 'border-emerald-500 text-emerald-300'
                              : 'border-slate-700 text-slate-300'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      {loadingData ? 'Loading inquiry records...' : 'No lead records found matching criteria.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agency Info & Settings Panel */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>Nagpur Studio Business Details</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update displayed office phone number and operating details on the public website.
              </p>
            </div>
          </div>

          {settingsMsg && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              {settingsMsg}
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Agency Name
              </label>
              <input
                type="text"
                value={settings.agencyName}
                onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Hindi Branding Name
              </label>
              <input
                type="text"
                value={settings.agencyHindiName}
                onChange={(e) => setSettings({ ...settings, agencyHindiName: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Founder & Director
              </label>
              <input
                type="text"
                value={settings.director}
                onChange={(e) => setSettings({ ...settings, director: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-amber-300 mb-1 font-bold">
                Official Business Phone (Leave empty if unprovided)
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-amber-500/40 rounded text-amber-200"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Nagpur Office Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Operating Hours
              </label>
              <input
                type="text"
                value={settings.operatingHours}
                onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-slate-400 mb-1">
                Official Inquiry Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded text-white"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded uppercase tracking-wider flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'Saving Settings...' : 'Save Studio Settings'}</span>
              </button>
            </div>
          </form>
        </div>

      </main>
    </div>
  );
};
