import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const PersonalDetailsTab = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* we are calculating age on the basis of date of birth */}

        <div>
          <Label htmlFor="timeOfBirth">Time of Birth</Label>
          <input
            type="time"
            id="timeOfBirth"
            value={formData.timeOfBirth}
            onChange={(e) => updateField("timeOfBirth", e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <Label htmlFor="birthLocation">Place of Birth</Label>
          <Input
            id="birthLocation"
            value={formData.birthLocation || ""}
            onChange={(e) => updateField("birthLocation", e.target.value)}
            placeholder="e.g. Mumbai, Pune"
          />
        </div>
      </div>

      {/* We are taking height in cm need to convert it into feet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={formData.height || ""}
            onChange={(e) => updateField("height", e.target.value)}
            placeholder="e.g., 160"
          />
        </div>

        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            value={formData.weight || ""}
            onChange={(e) => updateField("weight", e.target.value)}
            placeholder="e.g., 65"
          />
        </div>

        <div>
          <Label htmlFor="bodyType">Body Type</Label>
          <Select
            value={formData.bodyType}
            onValueChange={(value) => updateField("bodyType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Slim">Slim</SelectItem>
              <SelectItem value="Athletic">Athletic</SelectItem>
              <SelectItem value="Average">Average</SelectItem>
              <SelectItem value="Heavy">Heavy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bloodGroup">Blood Type</Label>
          <Select
            value={formData.bloodGroup}
            onValueChange={(value) => updateField("bloodGroup", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
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
          <Label htmlFor="skinTone">Skin Tone</Label>
          <Select
            value={formData.skinTone}
            onValueChange={(value) => updateField("skinTone", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Skin Tone type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Olive">Olive</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select
            value={formData.maritalStatus}
            onValueChange={(value) => updateField("maritalStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Marital Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Never Married">Never Married</SelectItem>
              <SelectItem value="Widower">Widower</SelectItem>
              <SelectItem value="Awaiting Divorce">Awaiting Divorce</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widow">Widow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="physicalDisability">Physical Disability</Label>
          <Select
            value={formData.physicalDisability}
            onValueChange={(value) => updateField("physicalDisability", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="drinkingHabits">Drinking Habits</Label>
          <Select
            value={formData.drinkingHabits}
            onValueChange={(value) => updateField("drinkingHabits", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Drinking Habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Occassionally">Occassionally</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="smokingHabits">Smoking Habits</Label>
          <Select
            value={formData.smokingHabits}
            onValueChange={(value) => updateField("smokingHabits", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Smoking Habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No">No</SelectItem>
              <SelectItem value="Occassionally">Occassionally</SelectItem>
              <SelectItem value="Yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="hobbies">Hobbies</Label>
          <Input
            id="hobbies"
            value={formData.hobbies || ""}
            onChange={(e) => updateField("hobbies", e.target.value)}
            placeholder="e.g., Reading , Drawing , Singning"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;
