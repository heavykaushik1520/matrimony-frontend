import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Profile } from '@/types/Profile';

interface PersonalDetailsTabProps {
  formData: Partial<Profile>;
  updateField: (field: keyof Profile, value: any) => void;
}

const PersonalDetailsTab: React.FC<PersonalDetailsTabProps> = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => updateField('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="timeOfBirth">Time of Birth</Label>
          <Input
            id="timeOfBirth"
            type="time"
            value={formData.timeOfBirth || ''}
            onChange={(e) => updateField('timeOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="placeOfBirth">Place of Birth</Label>
          <Input
            id="placeOfBirth"
            value={formData.placeOfBirth || ''}
            onChange={(e) => updateField('placeOfBirth', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={formData.height || ''}
            onChange={(e) => updateField('height', e.target.value)}
            placeholder="e.g., 5'8&quot;"
          />
        </div>
        <div>
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select value={formData.bloodType} onValueChange={(value) => updateField('bloodType', value)}>
            <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select value={formData.maritalStatus} onValueChange={(value) => updateField('maritalStatus', value)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Widow">Widow</SelectItem>
              <SelectItem value="Widower">Widower</SelectItem>
              <SelectItem value="Divorcee">Divorcee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="glasses"
            checked={formData.glasses || false}
            onCheckedChange={(checked) => updateField('glasses', checked)}
          />
          <Label htmlFor="glasses">Wears Glasses</Label>
        </div>
        <div>
          <Label htmlFor="physicalAilment">Physical Ailment/Disability</Label>
          <Input
            id="physicalAilment"
            value={formData.physicalAilment || ''}
            onChange={(e) => updateField('physicalAilment', e.target.value)}
            placeholder="None or specify"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;