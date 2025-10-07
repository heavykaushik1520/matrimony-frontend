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

const preferredCasteOptions = [
  "Baniya",
  "Banjara",
  "Bari",
  "Berad",
  "Bhoep",
  "Brahman",
  "Buddha",
  "Burud",
  "Chambhar",
  "Dhangar",
  "Dhiwar",
  "Dhobi",
  "Dombari",
  "Gandali",
  "Gavali",
  "Golkar",
  "Gond",
  "Govind",
  "Gowari",
  "Gurav",
  "Hanber",
  "Holar",
  "Holi",
  "Jain",
  "Kalar",
  "Karvi",
  "Kohali",
  "Kolam",
  "Koli",
  "Korku",
  "Koshti",
  "Kumbi",
  "Kumhar",
  "Kunbi",
  "Laman",
  "Lingayat",
  "Lodhi",
  "Lohar",
  "Mahar",
  "Mali",
  "Mana",
  "Mang",
  "Maratha",
  "Marwadi",
  "Matang",
  "Mavi",
  "Muslim",
  "Nathjogi",
  "Nhavi",
  "Panchal",
  "Pardesi",
  "Pardi",
  "Parit",
  "Pathan",
  "Powar",
  "Pinjara",
  "Pradhan",
  "Rajput",
  "Ramoshi",
  "Sayed",
  "Shikaghar",
  "Shimpi",
  "Sonar",
  "Sutar",
  "Teli",
  "Wani",
  "Wadar",
  "Wadhi",
  "Wami",
  "Wathi",
  "Doesn't Matter",
];

const FamilyTab = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Family Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fatherName">Father Name</Label>
            <Input
              id="fatherName"
              value={formData.fatherName || ""}
              onChange={(e) => updateField("fatherName", e.target.value)}
              placeholder="Father's name"
            />
          </div>
          <div>
            <Label htmlFor="motherName">Mother Name</Label>
            <Input
              id="motherName"
              value={formData.motherName || ""}
              onChange={(e) => updateField("motherName", e.target.value)}
              placeholder="Mother's name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="brothersCount">Number of Brothers</Label>
            <input
              type="number"
              id="brothersCount"
              value={formData.brothersCount}
              onChange={(e) =>
                updateField("brothersCount", parseInt(e.target.value))
              }
              min={0}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* 3. Sisters Count */}
          <div>
            <Label htmlFor="sistersCount">Number of Sisters</Label>
            <input
              type="number"
              id="sistersCount"
              value={formData.sistersCount}
              onChange={(e) =>
                updateField("sistersCount", parseInt(e.target.value))
              }
              min={0}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="liveWithFamily">Live With Family</Label>
            <Select
              value={formData.liveWithFamily}
              onValueChange={(value) => updateField("liveWithFamily", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="relativesSurname">Relatives' Surnames</Label>
            <input
              type="text"
              id="relativesSurname"
              // value={formData.relativesSurname.join(", ")}
              onChange={(e) =>
                updateField(
                  "relativesSurname",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              placeholder="Enter surnames separated by commas"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>

      {/* ----------- Preferred Details ----------- */}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Expectations about the Bride/Groom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preferredMaritalStatus">
              Expected Marital Status
            </Label>
            <Select
              value={formData.preferredMaritalStatus || ""}
              onValueChange={(value) =>
                updateField("preferredMaritalStatus", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Marital Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Never Married">Never Married</SelectItem>
                <SelectItem value="Widow">Widow</SelectItem>
                <SelectItem value="Widower">Widower</SelectItem>
                <SelectItem value="Divorced">Divorced</SelectItem>
                <SelectItem value="Awaiting Divorce">
                  Awaiting Divorce
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredAge">Expected Age</Label>
            <Select
              value={formData.preferredAge || ""}
              onValueChange={(value) => updateField("preferredAge", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-21">18-21</SelectItem>
                <SelectItem value="21-24">21-24</SelectItem>
                <SelectItem value="24-27">24-27</SelectItem>
                <SelectItem value="27-30">27-30</SelectItem>
                <SelectItem value="30-33">30-33</SelectItem>
                <SelectItem value="Above 33">Above 33</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preferredHeight">Expected Height</Label>
            <Input
              id="preferredHeight"
              value={formData.preferredHeight || ""}
              onChange={(e) => updateField("preferredHeight", e.target.value)}
              placeholder="e.g., 160cm / 170cm"
            />
          </div>

          <div>
            <Label htmlFor="preferredWeight">Expected Weight</Label>
            <Input
              id="preferredWeight"
              value={formData.preferredWeight || ""}
              onChange={(e) => updateField("preferredWeight", e.target.value)}
              placeholder="e.g., 60kg / 70kg"
            />
          </div>

           <div>
            <Label htmlFor="preferredMotherToungue">Expected Mother Toungue</Label>
            <Input
              id="preferredMotherToungue"
              value={formData.preferredMotherToungue || ""}
              onChange={(e) => updateField("preferredMotherToungue", e.target.value)}
              placeholder="e.g., Marathi / Hindi"
            />
          </div>

          <div>
            <Label htmlFor="preferredDrinkingHabits">
              Expected Drinking Habits
            </Label>
            <Select
              value={formData.preferredDrinkingHabits || ""}
              onValueChange={(value) =>
                updateField("preferredDrinkingHabits", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Drinking Habits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Occassionally">Occassionally</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredSmokingHabits">
              Expected Smoking Habits
            </Label>
            <Select
              value={formData.preferredSmokingHabits || ""}
              onValueChange={(value) =>
                updateField("preferredSmokingHabits", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Smoking Habits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Occassionally">Occassionally</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredReligion">Expected Religion</Label>
            <Select
              value={formData.preferredReligion || ""}
              onValueChange={(value) => updateField("preferredReligion", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Religion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Buddhism">Buddhism</SelectItem>
                <SelectItem value="Christian">Christian</SelectItem>
                <SelectItem value="Hindu">Hindu</SelectItem>
                <SelectItem value="Muslim">Muslim</SelectItem>
                <SelectItem value="Jain">Jain</SelectItem>
                <SelectItem value="Jewish">Jewish</SelectItem>
                <SelectItem value="Parsi">Parsi</SelectItem>
                <SelectItem value="Sikh">Sikh</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="preferredCaste">Expected Caste</Label>
            <Select
              value={formData.preferredCaste || ""}
              onValueChange={(value) => updateField("preferredCaste", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Caste" />
              </SelectTrigger>
              <SelectContent>
                {preferredCasteOptions.map((caste) => (
                  <SelectItem key={caste} value={caste}>
                    {caste}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ---------------------- Astrology ----------------------  */}
        <h3 className="text-lg font-semibold text-gray-800">Astrology</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Preferred Ras */}
          <div>
            <Label htmlFor="preferredRas">Expected Ras</Label>
            <Select
              value={formData.preferredRas || ""}
              onValueChange={(value) => updateField("preferredRas", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Ras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aries">Aries</SelectItem>
                <SelectItem value="Taurus">Taurus</SelectItem>
                <SelectItem value="Gemini">Gemini</SelectItem>
                <SelectItem value="Cancer">Cancer</SelectItem>
                <SelectItem value="Leo">Leo</SelectItem>
                <SelectItem value="Virgo">Virgo</SelectItem>
                <SelectItem value="Libra">Libra</SelectItem>
                <SelectItem value="Scorpio">Scorpio</SelectItem>
                <SelectItem value="Sagittarius">Sagittarius</SelectItem>
                <SelectItem value="Capricorn">Capricorn</SelectItem>
                <SelectItem value="Aquarius">Aquarius</SelectItem>
                <SelectItem value="Pisces">Pisces</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Gan */}
          <div>
            <Label htmlFor="preferredGan">Expected Gan</Label>
            <Select
              value={formData.preferredGan || ""}
              onValueChange={(value) => updateField("preferredGan", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Gan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deva">Deva</SelectItem>
                <SelectItem value="Manushya">Manushya</SelectItem>
                <SelectItem value="Rakshasa">Rakshasa</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Mangal */}
          <div>
            <Label htmlFor="preferredMangal">Expected Mangal</Label>
            <Select
              value={formData.preferredMangal || ""}
              onValueChange={(value) => updateField("preferredMangal", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Mangal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* preferred naadi */}
          <div>
            <Label htmlFor="preferredNaadi">Expected Naadi</Label>
            <Select
              value={formData.preferredNaadi || ""}
              onValueChange={(value) => updateField("preferredNaadi", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Naadi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aadi">Aadi</SelectItem>
                <SelectItem value="Madhya">Madhya</SelectItem>
                <SelectItem value="Antya">Antya</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* preferred charan */}
          <div>
            <Label htmlFor="preferredCharan">Expected Charan</Label>
            <Input
              id="preferredCharan"
              value={formData.preferredCharan || ""}
              onChange={(e) => updateField("preferredCharan", e.target.value)}
              // placeholder="e.g.,"
            />
          </div>

          {/* preferred nakshatra */}
          <div>
            <Label htmlFor="preferredNakshatra">Expected Nakshatra</Label>
            <Input
              id="preferredNakshatra"
              value={formData.preferredNakshatra || ""}
              onChange={(e) =>
                updateField("preferredNakshatra", e.target.value)
              }
              // placeholder="e.g.,"
            />
          </div>

          {/* preferred gotra */}
          <div>
            <Label htmlFor="preferredGotra">Expected Gotra</Label>
            <Input
              id="preferredGotra"
              value={formData.preferredGotra || ""}
              onChange={(e) => updateField("preferredGotra", e.target.value)}
              // placeholder="e.g.,"
            />
          </div>
        </div>

        {/*  ---------------------- Education and Career ---------------------- */}
        <h3 className="text-lg font-semibold text-gray-800">
          Education And Career
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* preferred education */}
          <div>
            <Label htmlFor="preferredEducation">Expected Education</Label>
            <Select
              value={formData.preferredEducation || ""}
              onValueChange={(value) =>
                updateField("preferredEducation", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10th">10th</SelectItem>
                <SelectItem value="12th">12th</SelectItem>
                <SelectItem value="Diploma">Diploma</SelectItem>
                <SelectItem value="Graduation">Graduation</SelectItem>
                <SelectItem value="Post-Graduation">Post-Graduation</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* preferred job sector */}
          <div>
            <Label htmlFor="preferredJobSector">Expected Job Sector</Label>
            <Select
              value={formData.preferredJobSector || ""}
              onValueChange={(value) =>
                updateField("preferredJobSector", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Job Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Doesn't Matter">Doesn't Matter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Job Location */}
          <div>
            <Label htmlFor="preferredJobLocation">Expected Job Location</Label>
            <Input
              id="preferredJobLocation"
              value={formData.preferredJobLocation || ""}
              onChange={(e) =>
                updateField("preferredJobLocation", e.target.value)
              }
              placeholder="e.g., Pune / Mumbai"
            />
          </div>

          {/* Preferred Annual Salary */}
          <div>
            <Label htmlFor="preferredAnnualSalary">Expected Salary</Label>
            <Select
              value={formData.preferredAnnualSalary || ""}
              onValueChange={(value) =>
                updateField("preferredAnnualSalary", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Preferred Salary Range" />
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

          {/* ------------ other expectations ---------------- */}
          <h3 className="text-lg font-semibold text-gray-800">
            Other Expectations
          </h3>
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
      </div>
    </div>
  );
};

export default FamilyTab;
