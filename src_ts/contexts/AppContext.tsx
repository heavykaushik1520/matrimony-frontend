import React, { createContext, useContext, useState } from 'react';
import { Profile, FilterCriteria } from '@/types/Profile';
import { toast } from '@/components/ui/use-toast';

interface AppContextType {
  profiles: Profile[];
  filteredProfiles: Profile[];
  filters: FilterCriteria;
  addProfile: (profile: Profile) => void;
  updateFilters: (filters: FilterCriteria) => void;
  clearFilters: () => void;
}

const defaultAppContext: AppContextType = {
  profiles: [],
  filteredProfiles: [],
  filters: {},
  addProfile: () => {},
  updateFilters: () => {},
  clearFilters: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filters, setFilters] = useState<FilterCriteria>({});

  const addProfile = (profile: Profile) => {
    setProfiles(prev => [...prev, profile]);
    toast({ title: "Profile Created", description: "Profile has been successfully created!" });
  };

  const updateFilters = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const filteredProfiles = profiles.filter(profile => {
    if (filters.gender && profile.gender !== filters.gender) return false;
    if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
    if (filters.education && !profile.education?.toLowerCase().includes(filters.education.toLowerCase())) return false;
    return true;
  });

  return (
    <AppContext.Provider
      value={{
        profiles,
        filteredProfiles,
        filters,
        addProfile,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
