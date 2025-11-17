import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Phone, GraduationCap, Briefcase, Shield, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { getData } from "@/store/utils";
import { formatDate, formatArray } from "@/lib/utils";

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-3 py-2 border-b last:border-b-0">
    <div className="text-gray-500">{label}</div>
    <div className="col-span-2 text-gray-800">{value || '—'}</div>
  </div>
);

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // accept either passed state.profile (raw) or state.profile.user (API wrapper)
  const initialProfile = location.state?.profile?.user || location.state?.profile || null;
  const [profile, setProfile] = useState(initialProfile);
  const [basicPreference, setBasicPreference] = useState(null);
  const [loading, setLoading] = useState(!initialProfile);

  useEffect(() => {
    if (initialProfile) {
      // already set above, ensure loading false
      setProfile(initialProfile);
      setLoading(false);
      return;
    }

    const fetchById = async () => {
      try {
        setLoading(true);
        const response = await getData(`user/auth/user/id/${id}`, null);
        // handle wrapper { success, message, user } or direct user object
        const userObj = response?.user || response;
        console.log('ProfileDetails - fetched by id:', id, userObj);
        setProfile(userObj);
        // Set basic preferences if available
        if (response?.basicPreference) {
          setBasicPreference(response.basicPreference);
        }
      } catch (error) {
        console.error('Error fetching profile by id:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchById();
  }, [id, initialProfile]);

  const { membershipActive } = useAppContext();
  
  // No list navigation available here (single profile). next/prev disabled.
  const hasNext = false;
  const nextId = null;
  console.log("ProfileDetails - ID from URL:", id, "profile loaded:", !!profile);

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const highlights = useMemo(() => {
    const items = [];
    if (profile?.UserCareerInfo?.education) items.push({ label: profile.UserCareerInfo.education, icon: GraduationCap });
    if (profile?.UserCareerInfo?.jobTitle) items.push({ label: profile.UserCareerInfo.jobTitle, icon: Briefcase });
    if (profile?.height) items.push({ label: `Height: ${profile.height}cm` });
    if (profile?.bloodGroup) items.push({ label: `Blood: ${profile.bloodGroup}` });
    const age = calculateAge(profile?.dateOfBirth);
    if (age) items.push({ label: `Age: ${age} years` });
    return items;
  }, [profile]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) { 
    return (
      <div className="text-center py-16">
        <div className="text-xl text-gray-600">Profile not found.</div>
        <Button className="mt-4" onClick={() => navigate('/matches')}>Back to Matches</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <Card className="bg-white/90">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl">
              {profile.profilePhotos && profile.profilePhotos.length > 0 ? (
                <img src={Array.isArray(profile.profilePhotos) ? profile.profilePhotos[0] : profile.profilePhotos} alt={`${profile.firstname} ${profile.lastname}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-extrabold text-gray-900">{profile.firstname} {profile.lastname}</div>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-1">
                <span className="inline-flex items-center"><MapPin className="w-4 h-4 mr-1" />{profile.birthLocation}</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">{profile.maritalStatus}</Badge>
              </div>
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {highlights.map((h, i) => {
                    const Icon = h.icon;
                    return (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                        {h.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            {/* {!isSubscribed && (
              <Button onClick={subscribe} className="bg-gradient-to-r from-purple-600 to-pink-600">Unlock Details</Button>
            )} */}
            <button
              className={`ml-2 p-2 rounded-full ${hasNext ? 'hover:bg-gray-100' : 'opacity-40 cursor-not-allowed'}`}
              onClick={() => {
                if (!hasNext) return;
                navigate(`/profiles/${nextId}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Next profile"
              disabled={!hasNext}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed details */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className={`grid ${basicPreference ? 'grid-cols-5' : 'grid-cols-4'} w-full`}>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="astrology">Astrology</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          {basicPreference && <TabsTrigger value="preferences">Preferences</TabsTrigger>}
        </TabsList>

        <TabsContent value="personal">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-4">Personal Information</div>
            
            {/* Profile Photos Gallery */}
            {profile.profilePhotos && profile.profilePhotos.length > 0 && (
              <div className="mb-4">
                <div className="font-medium text-gray-700 mb-2">Profile Photos</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {profile.profilePhotos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img 
                        src={photo} 
                        alt={`${profile.firstname} ${profile.lastname} - Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Row label="Age" value={calculateAge(profile.dateOfBirth) ? `${calculateAge(profile.dateOfBirth)} years` : '—'} />
              <Row label="Date of Birth" value={formatDate(profile.dateOfBirth, 'short')} />
              <Row label="Time of Birth" value={profile.timeOfBirth || '—'} />
              <Row label="Place of Birth" value={profile.birthLocation || '—'} />
              <Row label="Height" value={profile.height ? `${profile.height} cm` : '—'} />
              <Row label="Weight" value={profile.weight ? `${profile.weight} kg` : '—'} />
              <Row label="Blood Group" value={profile.bloodGroup || '—'} />
              <Row label="Body Type" value={profile.bodyType || '—'} />
              <Row label="Skin Tone" value={profile.skinTone || '—'} />
              <Row label="Physical Disability" value={profile.physicalDisability || 'No'} />
              <Row label="Religion" value={profile.religion || '—'} />
              <Row label="Caste" value={profile.caste || '—'} />
              <Row label="Sub-Caste" value={profile.subCaste || '—'} />
              <Row label="Community" value={profile.community || '—'} />
              <Row label="Known Languages" value={profile.knownLanguages || '—'} />
              <Row label="Diet" value={profile.diet || '—'} />
              <Row label="Drinking Habits" value={profile.drinkingHabits || '—'} />
              <Row label="Smoking Habits" value={profile.smokingHabits || '—'} />
              <Row label="Hobbies" value={formatArray(profile.hobbies)} />
            </div>

            {/* Contact Information Section */}
            <div className="mt-4 pt-4 border-t">
              <div className="font-medium text-gray-700 mb-2">Contact Information</div>
              <Row 
                label="Mobile" 
                value={profile.phone || '—'} 
              />
              <Row 
                label="Email" 
                value={profile.email || '—'} 
              />
              {!membershipActive && (profile.phone || profile.email) && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>🔒 Contact Information Locked</strong>
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Phone number and email are masked. Subscribe to view full contact details.
                  </p>
                  <Button 
                    onClick={() => navigate('/plans')}
                    className="mt-2 bg-purple-600 text-white text-xs"
                    size="sm"
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="career">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Career Information</div>
            <Row label="Education" value={profile.UserCareerInfo?.education || '—'} />
            <Row label="Job Title" value={profile.UserCareerInfo?.jobTitle || '—'} />
            <Row label="Job Sector" value={profile.UserCareerInfo?.jobSector || '—'} />
            <Row label="Job Location" value={profile.UserCareerInfo?.jobLocation || '—'} />
            <Row label="Job Description" value={profile.UserCareerInfo?.jobDescription || '—'} />
            <Row label="Annual Salary" value={profile.UserCareerInfo?.annualSalary || '—'} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="astrology">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Astrology Information</div>
            <Row label="Ras (Zodiac Sign)" value={profile.AstrologyInfo?.ras || '—'} />
            <Row label="Gan" value={profile.AstrologyInfo?.gan || '—'} />
            <Row label="Mangal (Mars)" value={profile.AstrologyInfo?.mangal || '—'} />
            <Row label="Nadis" value={profile.AstrologyInfo?.nadis || '—'} />
            <Row label="Charan" value={profile.AstrologyInfo?.charan || '—'} />
            <Row label="Nakshatra" value={profile.AstrologyInfo?.nakshatra || '—'} />
            <Row label="Gotra" value={profile.AstrologyInfo?.gotra || '—'} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="family">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Family Information</div>
            <Row label="Father's Name" value={profile.FamilyInfo?.fatherName || '—'} />
            <Row label="Mother's Name" value={profile.FamilyInfo?.motherName || '—'} />
            <Row label="Brothers Count" value={profile.FamilyInfo?.brothersCount ?? '—'} />
            <Row label="Sisters Count" value={profile.FamilyInfo?.sistersCount ?? '—'} />
            <Row label="Lives With Family" value={profile.FamilyInfo?.liveWithFamily || '—'} />
            {profile.FamilyInfo?.relativesSurname && profile.FamilyInfo.relativesSurname.length > 0 && (
              <Row label="Relatives Surname" value={formatArray(profile.FamilyInfo.relativesSurname)} />
            )}
          </CardContent></Card>
        </TabsContent>

        {basicPreference && (
          <TabsContent value="preferences">
            <Card><CardContent className="p-4">
              <div className="font-semibold text-gray-800 mb-2">Partner Preferences</div>
              <Row label="Preferred Age" value={basicPreference.preferredAge} />
              <Row label="Preferred Height" value={basicPreference.preferredHeight} />
              <Row label="Preferred Weight" value={basicPreference.preferredWeight} />
              <Row label="Preferred Marital Status" value={basicPreference.preferredMaritalStatus} />
              <Row label="Preferred Mother Tongue" value={basicPreference.preferredMotherToungue} />
              <Row label="Preferred Eating Habits" value={basicPreference.preferredEatingHabits} />
              <Row label="Preferred Drinking Habits" value={basicPreference.preferredDrinkingHabits} />
              <Row label="Preferred Smoking Habits" value={basicPreference.preferredSmokingHabits} />
              <Row label="Preferred Religion" value={basicPreference.preferredReligion} />
              <Row label="Preferred Caste" value={basicPreference.preferredCaste} />
              <Row label="Preferred Sub-Caste" value={basicPreference.preferredSubCaste} />
              <Row label="Preferred Ras" value={basicPreference.preferredRas} />
              <Row label="Preferred Gan" value={basicPreference.preferredGan} />
              <Row label="Preferred Mangal" value={basicPreference.preferredMangal} />
              <Row label="Preferred Naadi" value={basicPreference.preferredNaadi} />
              <Row label="Preferred Charan" value={basicPreference.preferredCharan} />
              <Row label="Preferred Nakshatra" value={basicPreference.preferredNakshatra} />
              <Row label="Preferred Gotra" value={basicPreference.preferredGotra} />
              <Row label="Preferred Education" value={basicPreference.preferredEducation} />
              <Row label="Preferred Job Sector" value={basicPreference.preferredJobSector} />
              <Row label="Preferred Job Location" value={basicPreference.preferredJobLocation} />
              <Row label="Preferred Annual Salary" value={basicPreference.preferredAnnualSalary} />
              <Row label="Expectations" value={basicPreference.expectations} />
            </CardContent></Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ProfileDetails;


