import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { FilterCriteria } from '@/types/Profile';

interface SearchFiltersProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}) => {
  const updateFilter = (key: keyof FilterCriteria, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center text-xl text-white">
          <Filter className="w-5 h-5 mr-2" />
          Search & Filter Profiles
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="gender" className="text-gray-700 font-semibold">Looking for</Label>
            <Select 
              value={filters.gender === 'any' ? '' : filters.gender || ''} 
              onValueChange={(value) => updateFilter('gender', value === 'any' ? undefined : value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-400">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="maritalStatus" className="text-gray-700 font-semibold">Marital Status</Label>
            <Select 
              value={filters.maritalStatus === 'any' ? '' : filters.maritalStatus || ''} 
              onValueChange={(value) => updateFilter('maritalStatus', value === 'any' ? undefined : value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Widow">Widow</SelectItem>
                <SelectItem value="Widower">Widower</SelectItem>
                <SelectItem value="Divorcee">Divorcee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="education" className="text-gray-700 font-semibold">Education</Label>
            <Input
              id="education"
              value={filters.education || ''}
              onChange={(e) => updateFilter('education', e.target.value || undefined)}
              placeholder="e.g., Engineering, MBA"
              className="border-2 border-gray-200 focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minAge" className="text-gray-700 font-semibold">Age Range</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="minAge"
                type="number"
                value={filters.ageRange?.[0] || ''}
                onChange={(e) => {
                  const minAge = e.target.value ? parseInt(e.target.value) : undefined;
                  const maxAge = filters.ageRange?.[1];
                  updateFilter('ageRange', minAge !== undefined || maxAge !== undefined ? [minAge || 18, maxAge || 60] : undefined);
                }}
                placeholder="Min age"
                min="18"
                max="80"
                className="border-2 border-gray-200 focus:border-blue-400"
              />
              <span className="text-gray-500">to</span>
              <Input
                id="maxAge"
                type="number"
                value={filters.ageRange?.[1] || ''}
                onChange={(e) => {
                  const maxAge = e.target.value ? parseInt(e.target.value) : undefined;
                  const minAge = filters.ageRange?.[0];
                  updateFilter('ageRange', minAge !== undefined || maxAge !== undefined ? [minAge || 18, maxAge || 60] : undefined);
                }}
                placeholder="Max age"
                min="18"
                max="80"
                className="border-2 border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
            className="border-2 border-gray-300 hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;