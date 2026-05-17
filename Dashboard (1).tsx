import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Dog, 
  MapPin, 
  Layers, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search,
  Globe,
  Bell
} from 'lucide-react';
import { User } from '../types';
import { useState } from 'react';

interface LayoutProps {
  user: User;
}

export default function Layout({ user }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(nextLang);
  };

  const navItems = {
    citizen: [
      { path: '/citizen', icon: LayoutDashboard, label: t('nav.dashboard') },
      { path: '/citizen/complaints', icon: Bell, label: t('nav.complaints') },
      { path: '/citizen/adoption', icon: Dog, label: t('nav.adoptions') },
    ],
    shelter_worker: [
      { path: '/shelter', icon: LayoutDashboard, label: t('nav.dashboard') },
      { path: '/shelter/animals', icon: Dog, label: t('nav.animals') },
      { path: '/shelter/facilities', icon: Layers, label: t('nav.facilities') },
    ],
    municipality_admin: [
      { path: '/admin', icon: LayoutDashboard, label: t('nav.dashboard') },
      { path: '/admin/facilities', icon: Layers, label: t('nav.facilities') },
      { path: '/admin/users', icon: Users, label: t('nav.users') },
      { path: '/admin/complaints', icon: Bell, label: t('nav.complaints') },
    ],
    ministry_official: [
      { path: '/ministry', icon: LayoutDashboard, label: t('nav.dashboard') },
      { path: '/ministry/analytics', icon: BarChart3, label: t('nav.analytics') },
      { path: '/ministry/occupancy', icon: MapPin, label: t('nav.facilities') },
    ],
  };

  const currentNav = navItems[user.role as keyof typeof navItems] || [];

  return (
    <div className="flex h-screen bg-[#FDFCFB] font-sans text-gray-900">
      {/* Sidebar */}
      <aside className={`flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
          <span className={`text-2xl font-bold tracking-tighter text-blue-700 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            SAMIS
          </span>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="rounded-md p-1 hover:bg-gray-100">
            <Layers className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {currentNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
          
          <Link
            to="/search"
            className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-colors ${
              location.pathname === '/search' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Search className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">{t('common.search')}</span>}
          </Link>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={toggleLanguage}
            className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50"
          >
            <Globe className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium capitalize">{i18n.language}</span>}
          </button>
          <button className="mt-1 flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50">
            <LogOut className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">{t('common.logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-8 backdrop-blur-md">
          <h1 className="text-xl font-semibold text-gray-800">
            {currentNav.find(n => n.path === location.pathname)?.label || t('common.app_name')}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-gray-500 capitalize">{t(`roles.${user.role}`)}</p>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.first_name}`} alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
