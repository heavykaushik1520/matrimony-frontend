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
  if (filters.religion) activeBadges.push({ key: 'religion', label: `Religion: ${filters.religion}` });
  if (filters.caste) activeBadges.push({ key: 'caste', label: `Caste: ${filters.caste}` });
  if (filters.community) activeBadges.push({ key: 'community', label: `Community: ${filters.community}` });
  if (filters.maritalStatus) activeBadges.push({ key: 'maritalStatus', label: filters.maritalStatus });
  if (filters.skinTone) activeBadges.push({ key: 'skinTone', label: `Skin: ${filters.skinTone}` });
  if (filters.ras) activeBadges.push({ key: 'ras', label: `Ras: ${filters.ras}` });
  if (filters.gan) activeBadges.push({ key: 'gan', label: `Gan: ${filters.gan}` });
  if (filters.mangal) activeBadges.push({ key: 'mangal', label: `Mangal: ${filters.mangal}` });
  if (filters.education) activeBadges.push({ key: 'education', label: `Education: ${filters.education}` });
  if (filters.jobSector) activeBadges.push({ key: 'jobSector', label: `Job Sector: ${filters.jobSector}` });
  if (filters.jobLocation) activeBadges.push({ key: 'jobLocation', label: `Location: ${filters.jobLocation}` });
  if (filters.annualSalary) activeBadges.push({ key: 'annualSalary', label: `Salary: ${filters.annualSalary}` });

  return (
    <Card className="border bg-white/80 backdrop-blur">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col gap-4">
          {/* Personal Details Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="religion" className="text-gray-700">Religion</Label>
                <Input
                  id="religion"
                  value={filters.religion || ''}
                  onChange={(e) => updateFilter('religion', e.target.value || undefined)}
                  placeholder="e.g., Hindu, Muslim, Christian"
                />
              </div>
              <div>
                <Label htmlFor="caste" className="text-gray-700">Caste</Label>
                <Input
                  id="caste"
                  value={filters.caste || ''}
                  onChange={(e) => updateFilter('caste', e.target.value || undefined)}
                  placeholder="e.g., Kunbi, Maratha"
                />
              </div>
              <div>
                <Label htmlFor="community" className="text-gray-700">Community</Label>
                <Input
                  id="community"
                  value={filters.community || ''}
                  onChange={(e) => updateFilter('community', e.target.value || undefined)}
                  placeholder="e.g., Hindi, Marathi"
                />
              </div>
              <div>
                <Label htmlFor="skinTone" className="text-gray-700">Skin Tone</Label>
                <Input
                  id="skinTone"
                  value={filters.skinTone || ''}
                  onChange={(e) => updateFilter('skinTone', e.target.value || undefined)}
                  placeholder="e.g., Light, Medium, Dark"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 w-28">Marital Status</span>
              {['Never Married', 'Widow', 'Widower', 'Divorcee'].map(v => (
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
          </div>

          {/* Astrology Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Astrology</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="ras" className="text-gray-700">Ras</Label>
                <Input
                  id="ras"
                  value={filters.ras || ''}
                  onChange={(e) => updateFilter('ras', e.target.value || undefined)}
                  placeholder="e.g., Virgo, Aries"
                />
              </div>
              <div>
                <Label htmlFor="gan" className="text-gray-700">Gan</Label>
                <Input
                  id="gan"
                  value={filters.gan || ''}
                  onChange={(e) => updateFilter('gan', e.target.value || undefined)}
                  placeholder="e.g., Deva, Manushya"
                />
              </div>
              <div>
                <Label htmlFor="mangal" className="text-gray-700">Mangal</Label>
                <Input
                  id="mangal"
                  value={filters.mangal || ''}
                  onChange={(e) => updateFilter('mangal', e.target.value || undefined)}
                  placeholder="e.g., Partial, Full"
                />
              </div>
            </div>
          </div>

          {/* Career Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Career</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="education" className="text-gray-700">Education</Label>
                <Input
                  id="education"
                  value={filters.education || ''}
                  onChange={(e) => updateFilter('education', e.target.value || undefined)}
                  placeholder="e.g., Engineering, MBA, Diploma"
                />
              </div>
              <div>
                <Label htmlFor="jobSector" className="text-gray-700">Job Sector</Label>
                <Input
                  id="jobSector"
                  value={filters.jobSector || ''}
                  onChange={(e) => updateFilter('jobSector', e.target.value || undefined)}
                  placeholder="e.g., Private, Government"
                />
              </div>
              <div>
                <Label htmlFor="jobLocation" className="text-gray-700">Job Location</Label>
                <Input
                  id="jobLocation"
                  value={filters.jobLocation || ''}
                  onChange={(e) => updateFilter('jobLocation', e.target.value || undefined)}
                  placeholder="e.g., Mumbai, Pune"
                />
              </div>
              <div>
                <Label htmlFor="annualSalary" className="text-gray-700">Annual Salary (₹)</Label>
                <Input
                  id="annualSalary"
                  type="number"
                  value={filters.annualSalary || ''}
                  onChange={(e) => updateFilter('annualSalary', e.target.value || undefined)}
                  placeholder="e.g., 500000"
                />
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

