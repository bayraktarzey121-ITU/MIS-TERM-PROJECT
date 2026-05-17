import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Filter,
  Download,
  Users
} from 'lucide-react';
import { User } from '../../types';

interface MinistryDashboardProps {
  user: User;
}

const mockKPIs = [
  { label: 'Toplam Kayıtlı Hayvan', value: '1,240,500', trend: '+12.4%', icon: Users, color: 'text-blue-600' },
  { label: 'Kısırlaştırma Oranı (Ulusal)', value: '%68.2', trend: '+4.1%', icon: ShieldCheck, color: 'text-green-600' },
  { label: 'Aktif Şikayetler', value: '4,210', trend: '-2.5%', icon: AlertTriangle, color: 'text-orange-600' },
  { label: 'Başarılı Sahiplendirme', value: '86,400', trend: '+18.2%', icon: Heart, color: 'text-pink-600' },
];

const registrationData = [
  { name: 'Oca', value: 45000 },
  { name: 'Şub', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Nis', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Haz', value: 67000 },
  { name: 'Tem', value: 72000 },
  { name: 'Ağu', value: 68000 },
  { name: 'Eyl', value: 59000 },
];

const provinceData = [
  { name: 'İstanbul', value: 342000 },
  { name: 'Ankara', value: 185000 },
  { name: 'İzmir', value: 145000 },
  { name: 'Antalya', value: 92000 },
  { name: 'Bursa', value: 88000 },
  { name: 'Kocaeli', value: 54000 },
];

const generateProjection = (basePop: number, months: number) => {
  const data = [];
  let currentPop = basePop;
  const R = 5000; // Registration rate
  const S = 0.02; // Sterilization effectiveness factor
  const E = 1200; // Exit rate (adoption/deceased)
  
  for (let i = 0; i < months; i += 12) {
    const year = 2026 + (i / 12);
    data.push({
      year: year.toString(),
      conservative: Math.round(currentPop * 0.9),
      baseline: Math.round(currentPop),
      optimistic: Math.round(currentPop * 1.1)
    });
    // Iterative formula: P(t+1) = P(t) + R - (S * P(t)) - E
    currentPop = currentPop + (R * 12) - (S * currentPop * 12) - (E * 12);
  }
  return data;
};

const projectionData = generateProjection(1240500, 120); // 10 years

export default function MinistryDashboard({ user }: MinistryDashboardProps) {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      {/* ... KPI Cards section ... */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg bg-opacity-10 p-2 ${kpi.color.replace('text', 'bg')}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
              <h4 className="text-2xl font-bold tracking-tight text-gray-900">{kpi.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Population Projection Chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Nüfus Projeksiyon Analizi (10 Yıl)</h3>
            <p className="text-sm text-gray-500 mt-1">Saha verileri ve kısırlaştırma oranlarına dayalı tahminleme.</p>
          </div>
          <div className="flex space-x-2">
             <div className="flex items-center space-x-1">
               <div className="h-3 w-3 rounded-full bg-blue-600"></div>
               <span className="text-xs font-medium text-gray-600">Baz Senaryo</span>
             </div>
          </div>
        </div>
        <div className="h-80 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={projectionData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
               <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
               <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} width={80} />
               <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
               />
               <Line type="monotone" dataKey="baseline" stroke="#2563EB" strokeWidth={4} dot={false} name="Senaryo (Baz)" />
               <Line type="monotone" dataKey="optimistic" stroke="#93C5FD" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Senaryo (İyimser)" />
               <Line type="monotone" dataKey="conservative" stroke="#1E40AF" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Senaryo (Kötümser)" />
             </LineChart>
           </ResponsiveContainer>
        </div>
      </div>
      
      {/* Existing Charts Grid ... */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ... (Registration Trend and Province Breakdown) ... */}

        {/* Registration Trend */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 tracking-tight">Aylık Kayıt Trendi</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Province Breakdown */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 tracking-tight">İllere Göre Kısırlaştırma (Bin)</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={provinceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#4B5563', fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {provinceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563EB' : '#93C5FD'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
