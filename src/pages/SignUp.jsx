import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import {
  Menu,
  X,
  User,
  Heart,
  Star,
  Briefcase,
  Users,
  Image as ImageIcon,
  Save,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
// import PersonalDetailsTab from './PersonalDetailsTab';
import AstrologyTab from "../components/AstrologyTab";
import CareerTab from "../components/CareerTab";
import FamilyTab from "../components/FamilyTab";
import PersonalDetailsTab from "../components/PersonalDetailsTab";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import IdTab from "../components/IdTab";
import { postData } from "../store/utils";
import { apiHost } from "@/constant";

// Options: key-value pairs used in selects
const RELIGIONS = [
  { value: "Buddhism", label: "Buddhism" },
  { value: "Christian", label: "Christian" },
  { value: "Hindu", label: "Hindu" },
  { value: "Muslim", label: "Muslim" },
  { value: "Jain", label: "Jain" },
  { value: "Jewish", label: "Jewish" },
  { value: "Parsi", label: "Parsi" },
  { value: "Sikh", label: "Sikh" },
  { value: "Spiritual - not religious", label: "Spiritual - not religious" },
  { value: "No Religion", label: "No Religion" },
];

const CASTES = [
  { value: "Baniya", label: "Baniya" },
  { value: "Banjara", label: "Banjara" },
  { value: "Bari", label: "Bari" },
  { value: "Berad", label: "Berad" },
  { value: "Bhoep", label: "Bhoep" },
  { value: "Brahman", label: "Brahman" },
  { value: "Buddha", label: "Buddha" },
  { value: "Burud", label: "Burud" },
  { value: "Chambhar", label: "Chambhar" },
  { value: "Dhangar", label: "Dhangar" },
  { value: "Dhiwar", label: "Dhiwar" },
  { value: "Dhobi", label: "Dhobi" },
  { value: "Dombari", label: "Dombari" },
  { value: "Gandali", label: "Gandali" },
  { value: "Gavali", label: "Gavali" },
  { value: "Golkar", label: "Golkar" },
  { value: "Gond", label: "Gond" },
  { value: "Govind", label: "Govind" },
  { value: "Gowari", label: "Gowari" },
  { value: "Gurav", label: "Gurav" },
  { value: "Hanber", label: "Hanber" },
  { value: "Holar", label: "Holar" },
  { value: "Holi", label: "Holi" },
  { value: "Jain", label: "Jain" },
  { value: "Kalar", label: "Kalar" },
  { value: "Karvi", label: "Karvi" },
  { value: "Kohali", label: "Kohali" },
  { value: "Kolam", label: "Kolam" },
  { value: "Koli", label: "Koli" },
  { value: "Korku", label: "Korku" },
  { value: "Koshti", label: "Koshti" },
  { value: "Kumbi", label: "Kumbi" },
  { value: "Kumhar", label: "Kumhar" },
  { value: "Kunbi", label: "Kunbi" },
  { value: "Laman", label: "Laman" },
  { value: "Lingayat", label: "Lingayat" },
  { value: "Lodhi", label: "Lodhi" },
  { value: "Lohar", label: "Lohar" },
  { value: "Mahar", label: "Mahar" },
  { value: "Mali", label: "Mali" },
  { value: "Mana", label: "Mana" },
  { value: "Mang", label: "Mang" },
  { value: "Maratha", label: "Maratha" },
  { value: "Marwadi", label: "Marwadi" },
  { value: "Matang", label: "Matang" },
  { value: "Mavi", label: "Mavi" },
  { value: "Muslim", label: "Muslim" },
  { value: "Nathjogi", label: "Nathjogi" },
  { value: "Nhavi", label: "Nhavi" },
  { value: "Panchal", label: "Panchal" },
  { value: "Pardesi", label: "Pardesi" },
  { value: "Pardi", label: "Pardi" },
  { value: "Parit", label: "Parit" },
  { value: "Pathan", label: "Pathan" },
  { value: "Powar", label: "Powar" },
  { value: "Pinjara", label: "Pinjara" },
  { value: "Pradhan", label: "Pradhan" },
  { value: "Rajput", label: "Rajput" },
  { value: "Ramoshi", label: "Ramoshi" },
  { value: "Sayed", label: "Sayed" },
  { value: "Shikaghar", label: "Shikaghar" },
  { value: "Shimpi", label: "Shimpi" },
  { value: "Sonar", label: "Sonar" },
  { value: "Sutar", label: "Sutar" },
  { value: "Teli", label: "Teli" },
  { value: "Wani", label: "Wani" },
  { value: "Wadar", label: "Wadar" },
  { value: "Wadhi", label: "Wadhi" },
  { value: "Wami", label: "Wami" },
  { value: "Wathi", label: "Wathi" },
];

const COMMUNITIES = [
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Urdu", label: "Urdu" },
  { value: "Malyalam", label: "Malyalam" },
  { value: "Kannada", label: "Kannada" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Telugu", label: "Telugu" },
  { value: "Hindi", label: "Hindi" },
  { value: "Arabic", label: "Arabic" },
  { value: "Arunachali", label: "Arunachali" },
  { value: "Assamese", label: "Assamese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Bhojpuri", label: "Bhojpuri" },
  { value: "Chattisgarhi", label: "Chattisgarhi" },
  { value: "Chinese", label: "Chinese" },
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Gujrati", label: "Gujrati" },
  { value: "Haryanavi", label: "Haryanavi" },
  { value: "Pahari", label: "Pahari" },
  { value: "Manipuri", label: "Manipuri" },
  { value: "Marwari", label: "Marwari" },
  { value: "Mizo", label: "Mizo" },
  { value: "Rajsthani", label: "Rajsthani" },
  { value: "Russian", label: "Russian" },
  { value: "Spanish", label: "Spanish" },
];

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "Male",
    maritalStatus: "Single",
    glasses: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [draftExists, setDraftExists] = useState(false);

  const updateField = (field, value) => {
    console.log("updateField", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  const requiredFields = useMemo(() => ["firstname", "lastname", "phone", "caste"], []);
  const completionPercent = useMemo(() => {
    const total = requiredFields.length;
    const done = requiredFields.filter(
      (f) => (formData[f] || "").toString().trim().length > 0
    ).length;
    return Math.round((done / total) * 100);
  }, [formData, requiredFields]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("signupDraft");
      if (raw) setDraftExists(true);
    } catch { }
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem("signupDraft", JSON.stringify(formData));
      setDraftExists(true);
      toast({ title: "Draft saved" });
    } catch { }
  };

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem("signupDraft");
      if (raw) {
        setFormData(JSON.parse(raw));
        toast({ title: "Draft loaded" });
      }
    } catch { }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem("signupDraft");
      setDraftExists(false);
      toast({ title: "Draft cleared" });
    } catch { }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasAll = (formData.firstname && formData.lastname && formData.phone && formData.caste);
    if (hasAll) {
      // await new Promise((r) => setTimeout(r, 800));
      try {
        // Build multipart form-data like provided cURL
        const fd = new FormData();

        // Basic + Personal
        fd.append("firstname", formData.firstname || ""); 
        fd.append("lastname", formData.lastname || "");
        fd.append("gender", formData.gender || "");
        fd.append("religion", formData.religion || "");
        fd.append("caste", formData.caste || "");
        fd.append("subCaste", formData.subCaste || "");
        fd.append("community", formData.community || "");
        fd.append("dateOfBirth", formData.dateOfBirth || "");
        fd.append("timeOfBirth", formData.timeOfBirth || "");
        fd.append("phone", formData.phone || "");
        fd.append("email", formData.email || "");
        fd.append("knownLanguages", formData.knownLanguages || "");
        fd.append("diet", formData.diet || "");
        fd.append("birthLocation", formData.birthLocation || formData.birthPlace || "");
        fd.append("maritalStatus", formData.maritalStatus || "");
        fd.append("height", formData.height || "");
        fd.append("weight", formData.weight || "");
        fd.append("bodyType", formData.bodyType || "");
        fd.append("bloodGroup", formData.bloodGroup || "");
        fd.append("physicalDisability", formData.physicalDisability || "");
        fd.append("skinTone", formData.skinTone || "");
        fd.append("drinkingHabits", formData.drinkingHabits || "");
        fd.append("smokingHabits", formData.smokingHabits || "");

        const hobbiesArray = Array.isArray(formData.hobbies)
          ? formData.hobbies
          : (formData.hobbies || "").split(",").map(s => s.trim()).filter(Boolean);
        fd.append("hobbies", JSON.stringify(hobbiesArray));

        // Files
        if (Array.isArray(formData.profilePhotos)) {
          formData.profilePhotos.forEach(f => f && fd.append("profilePhotos", f));
        } else if (formData.photoFile) {
          fd.append("profilePhotos", formData.photoFile);
        }
        if (formData.idProof) fd.append("idProof", formData.idProof);

        // Auth/consents
        if (formData.password) fd.append("password", formData.password);
        if (typeof formData.termsAccepted !== "undefined") fd.append("termsAccepted", String(!!formData.termsAccepted));

        // Nested sections
        const userCareerInfo = {
          education: formData.education || "",
          jobSector: formData.jobSector || "",
          jobTitle: formData.jobTitle || "",
          jobLocation: formData.jobLocation || "",
          jobDescription: formData.jobDescription || "",
          annualSalary: formData.annualSalary || "",
        };
        fd.append("userCareerInfo", JSON.stringify(userCareerInfo));

        const familyInfo = {
          fatherName: formData.fatherName || "",
          motherName: formData.motherName || "",
          liveWithFamily: formData.liveWithFamily || "",
          brothersCount: Number(formData.brothersCount ?? 0),
          sistersCount: Number(formData.sistersCount ?? 0),
          relativesSurname: Array.isArray(formData.relativesSurname)
            ? formData.relativesSurname
            : (formData.relativesSurname || "").split(",").map(s => s.trim()).filter(Boolean),
        };
        fd.append("familyInfo", JSON.stringify(familyInfo));

        const astrologyInfo = {
          ras: formData.ras || formData.rashi || "",
          gan: formData.gan || "",
          mangal: formData.mangal || "",
          nadis: formData.nadis || "",
          charan: formData.charan || "",
          nakshatra: formData.nakshatra || "",
          gotra: formData.gotra || "",
        };
        fd.append("astrologyInfo", JSON.stringify(astrologyInfo));

        const response = await axios.post(`${apiHost.baseURL}user/auth/signup`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("signup response", response?.data);

        toast({
          title: "Account created",
          description: "Welcome to Hrudaysparsha Vivah Mandal!",
        });
        navigate("/login");


      } catch (error) {
        console.error("Error saving file upload request:", error);
        // setErrorMessage("Error saving file upload request");
      } finally {
        // setIsLoadingOn(false);
        // setIsOpen(false);
      }
      
    }
  };

  const tabItems = [
    { value: "basic", label: "Basic Info", icon: User },
    { value: "personal", label: "Personal", icon: Heart },
    { value: "astro", label: "Astrology", icon: Star },
    { value: "career", label: "Career", icon: Briefcase },
    { value: "family", label: "Family", icon: Users },
    { value: "id", label: "Id", icon: Users },
  ];

  return (
    <Card className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-2 border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">
          Create Matrimony Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Progress */}
        {/* <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Completion: {completionPercent}%
          </div>
        </div> */}

        <form onSubmit={handleSubmit}>
          {/* Mobile Navigation */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border p-3">
              <span className="font-medium text-gray-700">
                {tabItems.find((item) => item.value === activeTab)?.label}
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
                      className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors ${activeTab === item.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
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

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            {/* Desktop Navigation */}
            <TabsList className="hidden md:grid w-full grid-cols-6">
              {tabItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photo">Photo</Label>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-blue-200">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPhotoPreview(URL.createObjectURL(file));
                          updateField("photoName", file.name);
                          updateField("photoFile", file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstname">First Name *</Label>
                    <Input
                      id="firstname"
                      value={formData.firstname || ""}
                      onChange={(e) => updateField("firstname", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname">Last Name *</Label>
                    <Input
                      id="lastname"
                      value={formData.lastname || ""}
                      onChange={(e) => updateField("lastname", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => updateField("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="religion">Religion</Label>
                  <Select
                    value={formData.religion}
                    onValueChange={(value) => updateField("religion", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGIONS.map((r) => (
                        <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="caste">Caste</Label>
                  <Select
                    value={formData.caste}
                    onValueChange={(value) => updateField("caste", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select caste" />
                    </SelectTrigger>
                    <SelectContent>
                      {CASTES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subCaste">Sub-Caste</Label>
                  <Input
                    id="subCaste"
                    value={formData.subCaste || ""}
                    onChange={(e) => updateField("subCaste", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="community">Community</Label>
                  <Select
                    value={formData.community}
                    onValueChange={(value) => updateField("community", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select community" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMUNITIES.map((cm) => (
                        <SelectItem key={cm.value} value={cm.value}>{cm.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => updateField("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter your email"
                    className="border rounded px-3 py-2 w-full"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="knownLanguages">Known Language *</Label>
                  <Input
                    id="knownLanguages"
                    value={formData.knownLanguages || ""}
                    onChange={(e) =>
                      updateField("knownLanguages", e.target.value)
                    }
                    placeholder="Marathi, Hindi"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="diet">Diet</Label>
                  <Select
                    value={formData.diet}
                    onValueChange={(value) => updateField("diet", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Diet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Non-Vegetarian">
                        Non-Vegetarian
                      </SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Eggetarian">Eggetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <PersonalDetailsTab
                formData={formData}
                updateField={updateField}
              />
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

            <TabsContent value="id">
              <IdTab formData={formData} updateField={updateField} />
            </TabsContent>

          </Tabs>

          {/* Navigation + Draft actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6 border-t mt-6">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const order = tabItems.map((t) => t.value);
                  const idx = order.indexOf(activeTab);
                  if (idx > 0) setActiveTab(order[idx - 1]);
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              {activeTab !== 'id' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const order = tabItems.map((t) => t.value);
                    const idx = order.indexOf(activeTab);
                    if (idx < order.length - 1) setActiveTab(order[idx + 1]);
                  }}
                >
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>

            {/* <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={saveDraft}>
                <Save className="w-4 h-4 mr-1" /> Save draft
              </Button>
              {draftExists && (
                <>
                  <Button type="button" variant="outline" onClick={loadDraft}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Load
                  </Button>
                  <Button type="button" variant="outline" onClick={clearDraft}>
                    Clear
                  </Button>
                </>
              )}
            </div> */}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => navigate("/")}
                variant="outline"
              >
                Cancel
              </Button>
              {activeTab === 'id' && (
                <Button
                  type="submit"
                  disabled={completionPercent < 100}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Create Profile
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
