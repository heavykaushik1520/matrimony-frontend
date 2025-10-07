import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Profile } from '@/types/Profile';
import { v4 as uuidv4 } from 'uuid';
import { Menu, X, User, Heart, Star, Briefcase, Users } from 'lucide-react';
import PersonalDetailsTab from './PersonalDetailsTab';
import AstrologyTab from './AstrologyTab';
import CareerTab from './CareerTab';
import FamilyTab from './FamilyTab';

interface ProfileFormProps {
  onSubmit: (profile: Profile) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Profile>>({
    gender: 'Male',
    maritalStatus: 'Single',
    glasses: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const updateField = (field: keyof Profile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.mobile && formData.caste) {
      onSubmit({
        id: uuidv4(),
        ...formData,
      } as Profile);
    }
  };

  const tabItems = [
    { value: 'basic', label: 'Basic Info', icon: User },
    { value: 'personal', label: 'Personal', icon: Heart },
    { value: 'astro', label: 'Astrology', icon: Star },
    { value: 'career', label: 'Career', icon: Briefcase },
    { value: 'family', label: 'Family', icon: Users },
  ];

  return (
    <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Create Matrimony Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Mobile Navigation */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-3">
              <span className="font-medium text-gray-700">
                {tabItems.find(item => item.value === activeTab)?.label}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
            
            {mobileMenuOpen && (
              <div className="mt-2 bg-white rounded-lg shadow-lg border divide-y">
                {tabItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleTabChange(item.value)}
                      className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                        activeTab === item.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {/* Desktop Navigation */}
            <TabsList className="hidden md:grid w-full grid-cols-5">{tabItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>{item.label}</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <Input id="photo" type="file" accept="image/*" />
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={formData.fullName || ''} onChange={(e) => updateField('fullName', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="caste">Caste *</Label>
                  <Input id="caste" value={formData.caste || ''} onChange={(e) => updateField('caste', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="subBranch">Sub-Branch</Label>
                  <Input id="subBranch" value={formData.subBranch || ''} onChange={(e) => updateField('subBranch', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" value={formData.mobile || ''} onChange={(e) => updateField('mobile', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateField('gender', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Home Address</Label>
                <Textarea id="address" value={formData.address || ''} onChange={(e) => updateField('address', e.target.value)} />
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <PersonalDetailsTab formData={formData} updateField={updateField} />
            </TabsContent>

            <TabsContent value="astro">
              <AstrologyTab formData={formData} updateField={updateField} />
            </TabsContent>

            <TabsContent value="career">
              <CareerTab formData={formData} updateField={updateField} />
            </TabsContent>

            <TabsContent value="family">
              <FamilyTab formData={formData} updateField={updateField} />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
            <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600">Create Profile</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;