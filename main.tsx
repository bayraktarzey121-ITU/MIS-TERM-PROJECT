import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Dog, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { User, Complaint } from '../../types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CitizenDashboardProps {
  user: User;
}

export default function CitizenDashboard({ user }: CitizenDashboardProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'complaints' | 'adoptions'>('overview');

  // Mock data
  const myComplaints: Complaint[] = [
    {
      complaint_id: 10294,
      incident_type: 'SickInjured',
      location_lat: 41.0082,
      location_lng: 28.9784,
      status: 'InProgress',
      submitted_at: new Date().toISOString(),
      description: 'Yaralı kedi bildirimi (Beşiktaş Çarşı)'
    },
    {
      complaint_id: 9812,
      incident_type: 'Nuisance',
      location_lat: 41.0092,
      location_lng: 28.9794,
      status: 'Resolved',
      submitted_at: '2025-12-15T10:00:00Z',
      description: 'Gürültü şikayeti - Ekipler yönlendirildi ve çözüldü.'
    }
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold tracking-tight">
          Merhaba, {user.first_name}
        </h2>
        <p className="mt-2 text-blue-100 italic">
          SAMIS üzerinden sokaktaki dostlarımıza yardım edebilir veya onlara yeni bir yuva açabilirsiniz.
        </p>
        <div className="mt-6 flex space-x-3">
          <Link to="/citizen/complaints/new" className="flex items-center space-x-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-all">
            <Plus className="h-4 w-4" />
            <span>{t('citizen.complaint_new')}</span>
          </Link>
          <button className="flex items-center space-x-2 rounded-lg border border-blue-400 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500/20 transition-all">
            <Dog className="h-4 w-4" />
            <span>{t('citizen.adoption_browse')}</span>
          </button>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Complaints Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>{t('nav.complaints')}</span>
            </h3>
          </div>
          <div className="space-y-3">
            {myComplaints.map(c => (
              <div key={c.complaint_id} className="group relative rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md">
                <div className="flex justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                      #{c.complaint_id}
                    </span>
                    <h4 className="mt-1 font-bold text-gray-900">{t(`incident_types.${c.incident_type}` || c.incident_type)}</h4>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">{c.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {c.status}
                    </span>
                    <p className="mt-2 flex items-center justify-end text-xs text-gray-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(c.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adoptions / Side Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <span>{t('citizen.my_applications')}</span>
          </h3>
          <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
            <Dog className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm font-medium text-gray-500">Henüz bir sahiplenme başvurunuz bulunmuyor.</p>
            <button className="mt-4 text-sm font-bold text-blue-600 hover:underline">Sahiplenilmeyi bekleyenleri gör</button>
          </div>
          
          {/* KVKK Notice */}
          <div className="rounded-xl bg-orange-50 p-4 border border-orange-100">
             <div className="flex space-x-2">
               <AlertCircle className="h-5 w-5 text-orange-600 shrink-0" />
               <p className="text-xs text-orange-800 leading-relaxed">
                 <strong>KVKK Bilgilendirmesi:</strong> Kişisel verileriniz 6698 sayılı KVKK kapsamında, yalnızca sahiplenme başvurusu işlemleri amacıyla işlenmektedir.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
