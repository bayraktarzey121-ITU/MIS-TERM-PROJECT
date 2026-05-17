import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Layers, 
  Bell, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from '../../types';

interface AdminDashboardProps {
  user: User;
}

const facilityOccupancy = [
  { name: 'Beşiktaş Barınak', value: 92 },
  { name: 'Etiler Rehab', value: 45 },
  { name: 'Dikilitaş Vet', value: 12 },
  { name: 'Levent Geçici', value: 78 },
];

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
               <Layers className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-green-600">+2 Yeni</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Aktif Tesisler</p>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900">4</h4>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
               <AlertTriangle className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold text-red-600">1 Kritik</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Doluluk Bildirimleri</p>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900">%72</h4>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
               <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Aylık Sahiplendirme</p>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900">24</h4>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
               <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Saha Personeli</p>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900">18</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Occupancy Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 tracking-tight">Tesis Doluluk Dağılımı</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">Detaylı Rapor</button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityOccupancy}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
             <h3 className="font-bold text-gray-900">Şikayet Yönetimi</h3>
             <button className="text-sm font-bold text-blue-600 hover:underline">Tümünü Gör</button>
          </div>
          <div className="flex-1 overflow-auto">
             <div className="divide-y divide-gray-50">
                {[
                  { id: 'C-204', type: 'Saldırgan Davranış', status: 'Açık', date: '12 dk önce', loc: 'Abbasağa Parkı' },
                  { id: 'C-203', type: 'Yaralı Hayvan', status: 'Süreçte', date: '45 dk önce', loc: 'Dolmabahçe Sarayı Önü' },
                  { id: 'C-202', type: 'Gürültü Şikayeti', status: 'Kapalı', date: '2 sa önce', loc: 'Yıldız Mahallesi' },
                  { id: 'C-201', type: 'Hasta Hayvan', status: 'Kapalı', date: '4 sa önce', loc: 'Ortaköy Meydanı' },
                  { id: 'C-200', type: 'Saldırgan Davranış', status: 'Süreçte', date: '5 sa önce', loc: 'Beşiktaş Çarşı' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`h-2 w-2 rounded-full ${item.status === 'Açık' ? 'bg-red-500' : (item.status === 'Süreçte' ? 'bg-yellow-500' : 'bg-gray-300')}`}></div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-400">ID: {item.id} • {item.date} • <span className="font-medium text-gray-500">{item.loc}</span></p>
                      </div>
                    </div>
                    <button className="rounded-lg p-2 hover:bg-gray-100">
                      <ArrowUpRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                ))}
             </div>
          </div>
          <div className="p-4 border-t border-gray-100">
             <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-50 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100">
                <Plus className="h-4 w-4" />
                <span>Personel Ata</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
