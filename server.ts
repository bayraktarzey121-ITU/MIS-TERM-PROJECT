import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewComplaint() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: { lat: 41.0082, lng: 28.9784 }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center animate-fade-in">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Şikayetiniz Alındı</h2>
          <p className="mt-2 text-gray-500">Şikayet ID: #C-10294. İlgili belediyeye yönlendirildi.</p>
        </div>
        <button 
          onClick={() => navigate('/citizen')}
          className="rounded-xl border border-gray-200 px-8 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
        >
          Panele Dön
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <button 
        onClick={() => navigate('/citizen')}
        className="mb-8 flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Geri Dön</span>
      </button>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Yeni Olay Bildirimi</h2>
        <p className="mt-2 text-sm text-gray-500">Sokaktaki canlarımız için lütfen doğru bilgiler giriniz.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700">Olay Tipi</label>
            <select 
              required
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
              className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
            >
              <option value="">Seçiniz...</option>
              <option value="AggressiveBehavior">Saldırgan Davranış</option>
              <option value="AnimalBite">Isırma Vakası</option>
              <option value="SickInjured">Hasta / Yaralı Hayvan</option>
              <option value="Nuisance">Nuisance / Gürültü</option>
              <option value="Other">Diğer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Açıklama</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Olayı kısaca açıklayınız..."
              className="mt-2 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Konum</label>
            <div className="mt-2 relative h-48 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden group">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <MapPin className="h-8 w-8 opacity-20" />
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest opacity-50">Harita Yükleniyor...</span>
               </div>
               {/* Map placeholder */}
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/28.9784,41.0082,12/600x400?access_token=placeholder')] bg-cover opacity-50"></div>
               <div className="absolute bottom-4 left-4 right-4">
                  <button type="button" className="w-full flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-blue-700 transition-all">
                    <MapPin className="h-4 w-4" />
                    <span>Konumumu Kullan</span>
                  </button>
               </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 border border-blue-100 flex space-x-3">
             <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
             <p className="text-xs text-blue-800 leading-relaxed">
               Bu bildirim otomatik olarak <strong>Beşiktaş Belediyesi</strong> saha ekiplerine iletilecektir.
             </p>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-blue-600 py-4 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Gönder</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
