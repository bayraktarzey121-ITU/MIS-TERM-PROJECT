import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Mail, Lock } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole>('citizen');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, call Supabase Auth
    onLogin({
      user_id: 'real-uuid-from-auth',
      first_name: 'Zeynep',
      last_name: 'Bayraktar',
      email: 'bayraktarzeyhwi@gmail.com',
      role: role,
      auth_level: role === 'ministry_official' ? 5 : (role === 'citizen' ? 1 : 3),
      is_superadmin: false,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Plate: Branding */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-blue-700 p-12 text-white lg:flex">
        <div className="z-10">
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">SAMIS</h1>
          <p className="mt-2 text-blue-100">{t('common.app_description')}</p>
        </div>
        <div className="z-10">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Türkiye genelinde sahipsiz hayvan yönetimi için merkezi ve şeffaf bir platform."
            </p>
            <footer className="text-sm font-medium">DKMP Genel Müdürlüğü - 2026</footer>
          </blockquote>
        </div>
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-800/50 blur-3xl"></div>
        </div>
      </div>

      {/* Right Plate: Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              {t('common.login')}
            </h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div className="relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {t('roles.citizen')}
                </label>
                <div className="mt-1 flex space-x-2">
                  {(['citizen', 'shelter_worker', 'ministry_official'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                        role === r ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {t(`roles.${r}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-3 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                {t('common.login')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
