import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AstrologyTab = ({ formData, updateField }) => {
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
              <SelectItem value="Aries">Mesh (Aries)</SelectItem>
              <SelectItem value="Taurus">Vrishabh (Taurus)</SelectItem>
              <SelectItem value="Gemini">Mithun (Gemini)</SelectItem>
              <SelectItem value="Cancer">Kark (Cancer)</SelectItem>
              <SelectItem value="Leo">Singh (Leo)</SelectItem>
              <SelectItem value="Virgo">Kanya (Virgo)</SelectItem>
              <SelectItem value="Libra">Tula (Libra)</SelectItem>
              <SelectItem value="Scorpio">Vrishchik (Scorpio)</SelectItem>
              <SelectItem value="Sagittarius">Dhanu (Sagittarius)</SelectItem>
              <SelectItem value="Capricorn">Makar (Capricorn)</SelectItem>
              <SelectItem value="Aquarius">Kumbh (Aquarius)</SelectItem>
              <SelectItem value="Pisces">Meen (Pisces)</SelectItem>
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
          <Label htmlFor="gan">Gana</Label>
          <Select value={formData.gan} onValueChange={(value) => updateField('gan', value)}>
            <SelectTrigger><SelectValue placeholder="Select gana" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Deva">Dev Gana</SelectItem>
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
          <Label htmlFor="mangal">Mars (Mangal)</Label>
          <Select value={formData.mangal} onValueChange={(value) => updateField('mangal', value)}>
            <SelectTrigger><SelectValue placeholder="Mangalik Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Partial">Partial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AstrologyTab;


