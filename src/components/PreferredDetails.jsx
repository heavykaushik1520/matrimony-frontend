import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FamilyTab = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">    
      {/*  
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Expectations about the Bride/Groom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expectedMaritalStatus">
              Single/Widow/Widower/Divorcee
            </Label>
            <Select
              value={formData.expectedMaritalStatus || ""}
              onValueChange={(value) =>
                updateField("expectedMaritalStatus", value)
              }
            >
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
              value={formData.expectedHeight || ""}
              onChange={(e) => updateField("expectedHeight", e.target.value)}
              placeholder="e.g., 5 ft 4 in to 5 ft 8 in"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="expectedAge">Expected Age</Label>
          <Input
            id="expectedAge"
            value={formData.expectedAge || ""}
            onChange={(e) => updateField("expectedAge", e.target.value)}
            placeholder="e.g., 25-30 years"
          />
        </div>

        <div>
          <Label htmlFor="expectedEducation">Expected Education</Label>
          <Input
            id="expectedEducation"
            value={formData.expectedEducation || ""}
            onChange={(e) => updateField("expectedEducation", e.target.value)}
            placeholder="e.g., Graduate, Post Graduate"
          />
        </div>

        <div>
          <Label htmlFor="expectations">Other Expectations (Important)</Label>
          <Textarea
            id="expectations"
            value={formData.expectations || ""}
            onChange={(e) => updateField("expectations", e.target.value)}
            placeholder="Any specific expectations or requirements"
            rows={4}
          />
        </div>
      </div>
*/}
    </div>
  );
};

export default FamilyTab;
