import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const pillBase = "px-3 py-1.5 rounded-full border text-sm transition-colors";

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleChip = (key, value) => {
    updateFilter(key, filters[key] === value ? undefined : value);
  };

  const activeBadges = [];
  if (filters.gender) activeBadges.push({ key: 'gender', label: filters.gender });
  if (filters.maritalStatus) activeBadges.push({ key: 'maritalStatus', label: filters.maritalStatus });
  if (filters.education) activeBadges.push({ key: 'education', label: filters.education });
  if (filters.ageRange) activeBadges.push({ key: 'ageRange', label: `${filters.ageRange[0]}-${filters.ageRange[1]}` });

  return (
    <Card className="border bg-white/80 backdrop-blur">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 w-28">Looking for</span>
            {['Male','Female'].map(v => (
              <button
                key={v}
                onClick={() => toggleChip('gender', v)}
                className={`${pillBase} ${filters.gender === v ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >{v}</button>
            ))}
            <button
              onClick={() => updateFilter('gender', undefined)}
              className={`${pillBase} border-gray-200 text-gray-600`}
            >Any</button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 w-28">Status</span>
            {['Single','Widow','Widower','Divorcee'].map(v => (
              <button
                key={v}
                onClick={() => toggleChip('maritalStatus', v)}
                className={`${pillBase} ${filters.maritalStatus === v ? 'bg-pink-600 text-white border-pink-600' : 'border-gray-300 hover:bg-gray-50'}`}
              >{v}</button>
            ))}
            <button
              onClick={() => updateFilter('maritalStatus', undefined)}
              className={`${pillBase} border-gray-200 text-gray-600`}
            >Any</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="col-span-1">
              <Label htmlFor="education" className="text-gray-700">Education</Label>
              <Input
                id="education"
                value={filters.education || ''}
                onChange={(e) => updateFilter('education', e.target.value || undefined)}
                placeholder="e.g., Engineering, MBA"
              />
            </div>

            <div className="md:col-span-2">
              <Label className="text-gray-700">Age range</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={filters.ageRange?.[0] || ''}
                  onChange={(e) => {
                    const minAge = e.target.value ? parseInt(e.target.value) : undefined;
                    const maxAge = filters.ageRange?.[1];
                    updateFilter('ageRange', (minAge !== undefined || maxAge !== undefined) ? [minAge || 18, maxAge || 60] : undefined);
                  }}
                  placeholder="Min"
                  min="18"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="number"
                  value={filters.ageRange?.[1] || ''}
                  onChange={(e) => {
                    const maxAge = e.target.value ? parseInt(e.target.value) : undefined;
                    const minAge = filters.ageRange?.[0];
                    updateFilter('ageRange', (minAge !== undefined || maxAge !== undefined) ? [minAge || 18, maxAge || 60] : undefined);
                  }}
                  placeholder="Max"
                  max="80"
                />
                {filters.ageRange && (
                  <span className="text-sm text-gray-600">Selected: {filters.ageRange[0]} - {filters.ageRange[1]}</span>
                )}
              </div>
            </div>
          </div>

          {activeBadges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {activeBadges.map(b => (
                <Badge key={`${b.key}-${b.label}`} variant="secondary" className="flex items-center gap-1">
                  {b.label}
                  <button
                    aria-label={`Remove ${b.key}`}
                    onClick={() => updateFilter(b.key, undefined)}
                    className="ml-1 text-gray-600 hover:text-gray-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <Button onClick={onClearFilters} variant="ghost" size="sm" className="text-gray-700">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;

