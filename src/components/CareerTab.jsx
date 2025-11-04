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

const CareerTab = ({ formData, updateField }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="education">Education</Label>
          <Select
            value={formData.education}
            onValueChange={(value) => updateField("education", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">10th</SelectItem>
              <SelectItem value="12th">12th</SelectItem>
              <SelectItem value="Diploma">Diploma</SelectItem>
              <SelectItem value="Graduation">Graduation</SelectItem>
              <SelectItem value="Post-Graduation">Post-Graduation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="jobSector">Job Sector</Label>
          <Select
            value={formData.jobSector}
            onValueChange={(value) => updateField("jobSector", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Private">Private</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
             
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle || ""}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            placeholder="e.g., Senior Manager, Team Lead"
          />
        </div>

         <div>
          <Label htmlFor="jobLocation">Job Location</Label>
          <Input
            id="jobLocation"
            value={formData.jobLocation || ""}
            onChange={(e) => updateField("jobLocation", e.target.value)}
            placeholder="e.g., Pune , Banglore"
          />
        </div>

       <div>
          <Label htmlFor="annualSalary">Annual Salary</Label>
          <Select
            value={formData.annualSalary}
            onValueChange={(value) => updateField("annualSalary", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Below 1 lac">Below 1 lac</SelectItem>
              <SelectItem value="1 - 3 lac">1 - 3 lac</SelectItem>
              <SelectItem value="3 - 5 lac">3 - 5 lac</SelectItem>
              <SelectItem value="5 - 7.5 lac">5 - 7.5 lac</SelectItem>
               <SelectItem value="7.5 - 10 lac">7.5 - 10 lac</SelectItem>
              <SelectItem value="Above 10 lac">Above 10 lac</SelectItem>
             
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jobDescription">Job Description </Label>
          <Textarea
            id="jobDescription"
            value={formData.jobDescription || ""}
            onChange={(e) => updateField("jobDescription", e.target.value)}
            placeholder="e.g., Job Description"
            rows={5}
          />
        </div>
      </div>
    </div>
  );
};

export default CareerTab;
