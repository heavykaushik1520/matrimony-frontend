import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Phone, GraduationCap, Briefcase, Shield, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { getData } from "@/store/utils";

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-3 py-2 border-b last:border-b-0">
    <div className="text-gray-500">{label}</div>
    <div className="col-span-2 text-gray-800">{value || '—'}</div>
  </div>
);

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getMatchesList();
  }, []);

  const getMatchesList = async () => {
    try {
      const response = await getData(`user/auth/users-opposite-gender`, null);
      console.log("responsedsdd3232", response);
      // return false;
      setData(response);
      // console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setErrorMessage('Error fetching data');
    } finally {
      //   setIsLoadingOn(false);
    }
  };


  const { profiles, filteredProfiles, isSubscribed, subscribe } = useAppContext();
  const sourceList = (filteredProfiles && filteredProfiles.length > 0) ? filteredProfiles : profiles;
  const currentIndex = sourceList.findIndex(p => p.id === id);
  const profile = currentIndex >= 0 ? sourceList[currentIndex] : undefined;
  const hasNext = currentIndex >= 0 && currentIndex < sourceList.length - 1;
  const nextId = hasNext ? sourceList[currentIndex + 1].id : null;
  const highlights = useMemo(() => {
    const items = [];
    if (profile?.education) items.push({ label: profile.education, icon: GraduationCap });
    if (profile?.job) items.push({ label: profile.job, icon: Briefcase });
    if (profile?.height) items.push({ label: `Height: ${profile.height}` });
    if (profile?.bloodType) items.push({ label: `Blood: ${profile.bloodType}` });
    return items;
  }, [profile]);

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
              {profile.photo ? (
                <img src={profile.photo} alt={profile.fullName} className={`w-full h-full object-cover ${!isSubscribed ? 'blur-sm' : ''}`} />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 ${!isSubscribed ? 'blur-sm' : ''}`} />
              )}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-extrabold text-gray-900">{profile.fullName}</div>
              <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-1">
                <span className="inline-flex items-center"><MapPin className="w-4 h-4 mr-1" />{profile.placeOfBirth}</span>
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
            {!isSubscribed && (
              <Button onClick={subscribe} className="bg-gradient-to-r from-purple-600 to-pink-600">Unlock Details</Button>
            )}
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
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="career">Career</TabsTrigger>
          <TabsTrigger value="astrology">Astrology</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Personal</div>
            <Row label="Date of Birth" value={profile.dateOfBirth} />
            <Row label="Time of Birth" value={profile.timeOfBirth} />
            <Row label="Place of Birth" value={profile.placeOfBirth} />
            <Row label="Height" value={profile.height} />
            <Row label="Blood Type" value={profile.bloodType} />
            <Row label="Wears Glasses" value={profile.glasses ? 'Yes' : 'No'} />
            <Row label="Physical Ailment" value={profile.physicalAilment} />
            <Row label="Address" value={profile.address} />
            <Row label="Mobile" value={profile.mobile ? (isSubscribed ? profile.mobile : 'XXXXXXXXXX') : '—'} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="career">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Career</div>
            <Row label="Education" value={profile.education} />
            <Row label="Job" value={profile.job} />
            <Row label="Position" value={profile.position} />
            <Row label="Salary" value={profile.salary} />
            <Row label="Passport" value={profile.passport} />
            <Row label="Hobbies" value={profile.hobbies} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="astrology">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Astrology</div>
            <Row label="Gotra" value={profile.gotra} />
            <Row label="Ras" value={profile.ras} />
            <Row label="Nakshatra" value={profile.nakshatra} />
            <Row label="Charan" value={profile.charan} />
            <Row label="Gana" value={profile.gana} />
            <Row label="Nadis" value={profile.nadis} />
            <Row label="Mars (Mangal)" value={profile.mars} />
            <Row label="Varna" value={profile.varna} />
            <Row label="Bandha" value={profile.bandha} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="family">
          <Card><CardContent className="p-4">
            <div className="font-semibold text-gray-800 mb-2">Family & Expectations</div>
            <Row label="Father" value={profile.father} />
            <Row label="Mother" value={profile.mother} />
            <Row label="Brothers" value={profile.brother} />
            <Row label="Other Family" value={profile.otherFamily} />
            <Row label="Expected Status" value={profile.expectedMaritalStatus} />
            <Row label="Expected Height" value={profile.expectedHeight} />
            <Row label="Expected Age" value={profile.expectedAge} />
            <Row label="Expected Education" value={profile.expectedEducation} />
            <Row label="Expectations" value={profile.expectations} />
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDetails;


