import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Profile } from '@/types/Profile';

interface CareerTabProps {
  formData: Partial<Profile>;
  updateField: (field: keyof Profile, value: any) => void;
}

const CareerTab: React.FC<CareerTabProps> = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="education">Education</Label>
          <Input
            id="education"
            value={formData.education || ''}
            onChange={(e) => updateField('education', e.target.value)}
            placeholder="e.g., B.Tech, MBA, etc."
          />
        </div>
        <div>
          <Label htmlFor="job">Job and Location</Label>
          <Input
            id="job"
            value={formData.job || ''}
            onChange={(e) => updateField('job', e.target.value)}
            placeholder="e.g., Software Engineer, Mumbai"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="position">Position (Post)</Label>
          <Input
            id="position"
            value={formData.position || ''}
            onChange={(e) => updateField('position', e.target.value)}
            placeholder="e.g., Senior Manager, Team Lead"
          />
        </div>
        <div>
          <Label htmlFor="salary">All-inclusive Annual Salary</Label>
          <Input
            id="salary"
            value={formData.salary || ''}
            onChange={(e) => updateField('salary', e.target.value)}
            placeholder="e.g., 10 LPA, 15 LPA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="passport">Passport Information</Label>
          <Input
            id="passport"
            value={formData.passport || ''}
            onChange={(e) => updateField('passport', e.target.value)}
            placeholder="Yes/No or Passport Number"
          />
        </div>
        <div>
          <Label htmlFor="hobbies">Hobbies/Art Interests</Label>
          <Textarea
            id="hobbies"
            value={formData.hobbies || ''}
            onChange={(e) => updateField('hobbies', e.target.value)}
            placeholder="e.g., Reading, Music, Dancing, Cooking"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerTab;