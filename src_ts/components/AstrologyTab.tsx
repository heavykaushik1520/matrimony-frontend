import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Profile } from '@/types/Profile';

interface AstrologyTabProps {
  formData: Partial<Profile>;
  updateField: (field: keyof Profile, value: any) => void;
}

const AstrologyTab: React.FC<AstrologyTabProps> = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gotra">Gotra</Label>
          <Input
            id="gotra"
            value={formData.gotra || ''}
            onChange={(e) => updateField('gotra', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="ras">Ras (Zodiac Sign)</Label>
          <Select value={formData.ras} onValueChange={(value) => updateField('ras', value)}>
            <SelectTrigger><SelectValue placeholder="Select Ras" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Mesh">Mesh (Aries)</SelectItem>
              <SelectItem value="Vrishabh">Vrishabh (Taurus)</SelectItem>
              <SelectItem value="Mithun">Mithun (Gemini)</SelectItem>
              <SelectItem value="Kark">Kark (Cancer)</SelectItem>
              <SelectItem value="Singh">Singh (Leo)</SelectItem>
              <SelectItem value="Kanya">Kanya (Virgo)</SelectItem>
              <SelectItem value="Tula">Tula (Libra)</SelectItem>
              <SelectItem value="Vrishchik">Vrishchik (Scorpio)</SelectItem>
              <SelectItem value="Dhanu">Dhanu (Sagittarius)</SelectItem>
              <SelectItem value="Makar">Makar (Capricorn)</SelectItem>
              <SelectItem value="Kumbh">Kumbh (Aquarius)</SelectItem>
              <SelectItem value="Meen">Meen (Pisces)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nakshatra">Nakshatra</Label>
          <Input
            id="nakshatra"
            value={formData.nakshatra || ''}
            onChange={(e) => updateField('nakshatra', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="charan">Charan</Label>
          <Input
            id="charan"
            value={formData.charan || ''}
            onChange={(e) => updateField('charan', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="gana">Gana</Label>
          <Select value={formData.gana} onValueChange={(value) => updateField('gana', value)}>
            <SelectTrigger><SelectValue placeholder="Select Gana" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Dev">Dev Gana</SelectItem>
              <SelectItem value="Manushya">Manushya Gana</SelectItem>
              <SelectItem value="Rakshasa">Rakshasa Gana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="nadis">Nadis</Label>
          <Select value={formData.nadis} onValueChange={(value) => updateField('nadis', value)}>
            <SelectTrigger><SelectValue placeholder="Select Nadis" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Aadi">Aadi</SelectItem>
              <SelectItem value="Madhya">Madhya</SelectItem>
              <SelectItem value="Antya">Antya</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="mars">Mars (Mangal)</Label>
          <Select value={formData.mars} onValueChange={(value) => updateField('mars', value)}>
            <SelectTrigger><SelectValue placeholder="Mars status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Manglik">Manglik</SelectItem>
              <SelectItem value="Non-Manglik">Non-Manglik</SelectItem>
              <SelectItem value="Anshik">Anshik Manglik</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="varna">Varna</Label>
          <Input
            id="varna"
            value={formData.varna || ''}
            onChange={(e) => updateField('varna', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="bandha">Bandha</Label>
          <Input
            id="bandha"
            value={formData.bandha || ''}
            onChange={(e) => updateField('bandha', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AstrologyTab;