import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Profile } from '@/types/Profile';

interface FamilyTabProps {
  formData: Partial<Profile>;
  updateField: (field: keyof Profile, value: any) => void;
}

const FamilyTab: React.FC<FamilyTabProps> = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Family Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="father">Father</Label>
            <Input
              id="father"
              value={formData.father || ''}
              onChange={(e) => updateField('father', e.target.value)}
              placeholder="Father's name and occupation"
            />
          </div>
          <div>
            <Label htmlFor="mother">Mother</Label>
            <Input
              id="mother"
              value={formData.mother || ''}
              onChange={(e) => updateField('mother', e.target.value)}
              placeholder="Mother's name and occupation"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brother">Brother</Label>
            <Input
              id="brother"
              value={formData.brother || ''}
              onChange={(e) => updateField('brother', e.target.value)}
              placeholder="Number and details of brothers"
            />
          </div>
          <div>
            <Label htmlFor="otherFamily">Other Family Members</Label>
            <Textarea
              id="otherFamily"
              value={formData.otherFamily || ''}
              onChange={(e) => updateField('otherFamily', e.target.value)}
              placeholder="Sisters, other family details"
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Expectations about the Bride/Groom</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expectedMaritalStatus">Single/Widow/Widower/Divorcee</Label>
            <Select value={formData.expectedMaritalStatus || ''} onValueChange={(value) => updateField('expectedMaritalStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="widow">Widow</SelectItem>
                <SelectItem value="widower">Widower</SelectItem>
                <SelectItem value="divorcee">Divorcee</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expectedHeight">Expected Height</Label>
            <Input
              id="expectedHeight"
              value={formData.expectedHeight || ''}
              onChange={(e) => updateField('expectedHeight', e.target.value)}
              placeholder="e.g., 5'4&quot; to 5'8&quot;"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="expectedAge">Expected Age</Label>
          <Input
            id="expectedAge"
            value={formData.expectedAge || ''}
            onChange={(e) => updateField('expectedAge', e.target.value)}
            placeholder="e.g., 25-30 years"
          />
        </div>
        
        <div>
          <Label htmlFor="expectedEducation">Expected Education</Label>
          <Input
            id="expectedEducation"
            value={formData.expectedEducation || ''}
            onChange={(e) => updateField('expectedEducation', e.target.value)}
            placeholder="e.g., Graduate, Post Graduate"
          />
        </div>
        
        <div>
          <Label htmlFor="expectations">Other Expectations (Important)</Label>
          <Textarea
            id="expectations"
            value={formData.expectations || ''}
            onChange={(e) => updateField('expectations', e.target.value)}
            placeholder="Any specific expectations or requirements"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyTab;