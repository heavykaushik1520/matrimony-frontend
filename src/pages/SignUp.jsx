import React, { useEffect, useMemo, useState } from "react";
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  const requiredFields = useMemo(() => ["fullName", "mobile", "caste"], []);
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
    } catch {}
  }, []);

  const saveDraft = () => {
    try {
      localStorage.setItem("signupDraft", JSON.stringify(formData));
      setDraftExists(true);
      toast({ title: "Draft saved" });
    } catch {}
  };

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem("signupDraft");
      if (raw) {
        setFormData(JSON.parse(raw));
        toast({ title: "Draft loaded" });
      }
    } catch {}
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem("signupDraft");
      setDraftExists(false);
      toast({ title: "Draft cleared" });
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.fullName && formData.mobile && formData.caste) {
      await new Promise((r) => setTimeout(r, 800));
      toast({
        title: "Account created",
        description: "Welcome to Hridaysparsha!",
      });
      navigate("/login");
    }
  };

  const tabItems = [
    { value: "basic", label: "Basic Info", icon: User },
    { value: "personal", label: "Personal", icon: Heart },
    { value: "astro", label: "Astrology", icon: Star },
    { value: "career", label: "Career", icon: Briefcase },
    { value: "family", label: "Family", icon: Users },
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
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Completion: {completionPercent}%
          </div>
        </div>

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
                      className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                        activeTab === item.value
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
            <TabsList className="hidden md:grid w-full grid-cols-5">
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
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-blue-200">
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
                      <SelectItem value="Buddhism">Buddhism</SelectItem>
                      <SelectItem value="Christian">Christian</SelectItem>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Muslim">Muslim</SelectItem>
                      <SelectItem value="Jain">Jain</SelectItem>
                      <SelectItem value="Jewish">Jewish</SelectItem>
                      <SelectItem value="Parsi">Parsi</SelectItem>
                      <SelectItem value="Sikh">Sikh</SelectItem>
                      <SelectItem value="Spiritual - not religious">
                        Spiritual - not religious
                      </SelectItem>
                      <SelectItem value="No Religion">No Religion</SelectItem>
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
                      <SelectItem value="Baniya">Baniya</SelectItem>
                      <SelectItem value="Banjara">Banjara</SelectItem>
                      <SelectItem value="Bari">Bari</SelectItem>
                      <SelectItem value="Berad">Berad</SelectItem>
                      <SelectItem value="Bhoep">Bhoep</SelectItem>
                      <SelectItem value="Brahman">Brahman</SelectItem>
                      <SelectItem value="Buddha">Buddha</SelectItem>
                      <SelectItem value="Burud">Burud</SelectItem>
                      <SelectItem value="Chambhar">Chambhar</SelectItem>
                      <SelectItem value="Dhangar">Dhangar</SelectItem>
                      <SelectItem value="Dhiwar">Dhiwar</SelectItem>
                      <SelectItem value="Dhobi">Dhobi</SelectItem>
                      <SelectItem value="Dombari">Dombari</SelectItem>
                      <SelectItem value="Gandali">Gandali</SelectItem>
                      <SelectItem value="Gavali">Gavali</SelectItem>
                      <SelectItem value="Golkar">Golkar</SelectItem>
                      <SelectItem value="Gond">Gond</SelectItem>
                      <SelectItem value="Govind">Govind</SelectItem>
                      <SelectItem value="Gowari">Gowari</SelectItem>
                      <SelectItem value="Gurav">Gurav</SelectItem>
                      <SelectItem value="Hanber">Hanber</SelectItem>
                      <SelectItem value="Holar">Holar</SelectItem>
                      <SelectItem value="Holi">Holi</SelectItem>
                      <SelectItem value="Jain">Jain</SelectItem>
                      <SelectItem value="Kalar">Kalar</SelectItem>
                      <SelectItem value="Karvi">Karvi</SelectItem>
                      <SelectItem value="Kohali">Kohali</SelectItem>
                      <SelectItem value="Kolam">Kolam</SelectItem>
                      <SelectItem value="Koli">Koli</SelectItem>
                      <SelectItem value="Korku">Korku</SelectItem>
                      <SelectItem value="Koshti">Koshti</SelectItem>
                      <SelectItem value="Kumbi">Kumbi</SelectItem>
                      <SelectItem value="Kumhar">Kumhar</SelectItem>
                      <SelectItem value="Kunbi">Kunbi</SelectItem>
                      <SelectItem value="Laman">Laman</SelectItem>
                      <SelectItem value="Lingayat">Lingayat</SelectItem>
                      <SelectItem value="Lodhi">Lodhi</SelectItem>
                      <SelectItem value="Lohar">Lohar</SelectItem>
                      <SelectItem value="Mahar">Mahar</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Mana">Mana</SelectItem>
                      <SelectItem value="Mang">Mang</SelectItem>
                      <SelectItem value="Maratha">Maratha</SelectItem>
                      <SelectItem value="Marwadi">Marwadi</SelectItem>
                      <SelectItem value="Matang">Matang</SelectItem>
                      <SelectItem value="Mavi">Mavi</SelectItem>
                      <SelectItem value="Muslim">Muslim</SelectItem>
                      <SelectItem value="Nathjogi">Nathjogi</SelectItem>
                      <SelectItem value="Nhavi">Nhavi</SelectItem>
                      <SelectItem value="Panchal">Panchal</SelectItem>
                      <SelectItem value="Pardesi">Pardesi</SelectItem>
                      <SelectItem value="Pardi">Pardi</SelectItem>
                      <SelectItem value="Parit">Parit</SelectItem>
                      <SelectItem value="Pathan">Pathan</SelectItem>
                      <SelectItem value="Powar">Powar</SelectItem>
                      <SelectItem value="Pinjara">Pinjara</SelectItem>
                      <SelectItem value="Pradhan">Pradhan</SelectItem>
                      <SelectItem value="Rajput">Rajput</SelectItem>
                      <SelectItem value="Ramoshi">Ramoshi</SelectItem>
                      <SelectItem value="Sayed">Sayed</SelectItem>
                      <SelectItem value="Shikaghar">Shikaghar</SelectItem>
                      <SelectItem value="Shimpi">Shimpi</SelectItem>
                      <SelectItem value="Sonar">Sonar</SelectItem>
                      <SelectItem value="Sutar">Sutar</SelectItem>
                      <SelectItem value="Teli">Teli</SelectItem>
                      <SelectItem value="Wani">Wani</SelectItem>
                      <SelectItem value="Wadar">Wadar</SelectItem>
                      <SelectItem value="Wadhi">Wadhi</SelectItem>
                      <SelectItem value="Wami">Wami</SelectItem>
                      <SelectItem value="Wathi">Wathi</SelectItem>
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
                      <SelectItem value="Marathi">Marathi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="Malyalam">Malyalam</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                      <SelectItem value="Punjabi">Punjabi</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                      <SelectItem value="Arunachali">Arunachali</SelectItem>
                      <SelectItem value="Assamese">Assamese</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Bhojpuri">Bhojpuri</SelectItem>
                      <SelectItem value="Chattisgarhi">Chattisgarhi</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Gujrati">Gujrati</SelectItem>
                      <SelectItem value="Haryanavi">Haryanavi</SelectItem>
                      <SelectItem value="Pahari">Pahari</SelectItem>
                      <SelectItem value="Manipuri">Manipuri</SelectItem>
                      <SelectItem value="Marwari">Marwari</SelectItem>
                      <SelectItem value="Mizo">Mizo</SelectItem>
                      <SelectItem value="Rajsthani">Rajsthani</SelectItem>
                      <SelectItem value="Russian">Russian</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
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
            </div>

            <div className="flex items-center gap-2">
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
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => navigate("/")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={completionPercent < 100}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Create Profile
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
