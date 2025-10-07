import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Plus, Users, Heart, Menu, X, Home, Search, UserPlus, Info, Phone } from 'lucide-react';
import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';
import SearchFilters from './SearchFilters';
import ProfileModal from './ProfileModal';
import { Profile } from '@/types/Profile';

const AppLayout: React.FC = () => {
  const { filteredProfiles, filters, addProfile, updateFilters, clearFilters } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCreateProfile = (profile: Profile) => {
    addProfile(profile);
    setShowForm(false);
  };

  const menuItems = [
    { icon: Home, label: 'Home', action: () => setShowForm(false) },
    // { icon: Search, label: 'Search', action: () => setShowForm(false) },
    // { icon: UserPlus, label: 'Create Profile', action: () => setShowForm(true) },
    { icon: Info, label: 'About Us', action: () => {} },
    { icon: Phone, label: 'Contact Us', action: () => {} },
    { icon: Info, label: 'Login', action: () => {} },
    { icon: Info, label: 'Sign Up', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-white text-gray-800 shadow-2xl border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/688ce01f3af773f08824bf4d_1754125443583_1a2c4dcb.jpg" 
                alt="Hridaysparsha Vivaha Mandal" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold">HRIDAYSPARSHA</h1>
                <p className="text-sm text-gray-600">VIVAHA MANDAL</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                   className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                     className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* <main className="container mx-auto px-4 py-8 space-y-8">
        {showForm ? (
          <ProfileForm
            onSubmit={handleCreateProfile}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <SearchFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-600" />
                Available Profiles ({filteredProfiles.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onViewDetails={setSelectedProfile}
                />
              ))}
            </div>

            {filteredProfiles.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">No profiles found. Create the first one!</p>
              </div>
            )}
          </>
        )}
      </main> */}

      {/* <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
      /> */}
    </div>
  );
};
export default AppLayout;