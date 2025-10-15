import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfileForm from "@/components/ProfileForm";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone } from "lucide-react";
import { getData } from "@/store/utils";

const MyProfile = () => {
  const { myProfile, saveMyProfile, isSubscribed, subscribe, user } =
    useAppContext();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(null);

  const basicRows = useMemo(
    () => [
      { label: "First Name", value: data?.firstname || user?.firstname },
      { label: "Last Name", value: data?.lastname || user?.lastname },
      { label: "Mobile No.", value: data?.phone || user?.phone },
      { label: "Email", value: data?.email || user?.email },
      { label: "Gender", value: data?.gender || myProfile?.gender },
      { label: "Religion", value: data?.religion || myProfile?.religion },
      { label: "Caste", value: data?.caste || myProfile?.caste },
      { label: "Sub-Caste", value: data?.subCaste || myProfile?.subCaste },
      { label: "Community", value: data?.community || myProfile?.community },
      {
        label: "Date Of Birth",
        value: data?.dateOfBirth || myProfile?.dateOfBirth,
      },
      {
        label: "Time Of Birth",
        value: data?.timeOfBirth || myProfile?.timeOfBirth,
      },
      {
        label: "Birth Location",
        value: data?.birthLocation || myProfile?.birthLocation,
      },
      {
        label: "Known Languages",
        value: data?.knownLanguages || myProfile?.knownLanguages,
      },
      { label: "Diet", value: data?.diet || myProfile?.diet },
      {
        label: "Marital Status",
        value: data?.maritalStatus || myProfile?.maritalStatus,
      },
      {
        label: "Blood Group",
        value: data?.bloodGroup || myProfile?.bloodGroup,
      },
      { label: "Height", value: data?.height || myProfile?.height },
      { label: "Weight", value: data?.weight || myProfile?.weight },

      { label: "Skin Tone", value: data?.skinTone || myProfile?.skinTone },
      {
        label: "Physical Disability",
        value: data?.physicalDisability || myProfile?.physicalDisability,
      },
      // { label: "Address", value: data?.address || myProfile?.address },
      {
        label: "Hobbies",
        value: Array.isArray(data?.hobbies)
          ? data.hobbies.map((h) => h.replace(/[\[\]"]/g, "")).join(", ")
          : data?.hobbies || myProfile?.hobbies,
      },
    ],
    [data, myProfile, user]
  );

  const astrologyRow = useMemo(
    () => [
      { label: "Charan", value: data?.AstrologyInfo?.charan || user?.charan },
      { label: "Gan", value: data?.AstrologyInfo?.gan || user?.gan },
      { label: "Gotra", value: data?.AstrologyInfo?.gotra || user?.gotra },
      { label: "Mangal", value: data?.AstrologyInfo?.mangal || user?.mangal },
      { label: "Nadis", value: data?.AstrologyInfo?.nadis || user?.nadis },
      {
        label: "Nakshatra",
        value: data?.AstrologyInfo?.nakshatra || user?.nakshatra,
      },
      { label: "Raas", value: data?.AstrologyInfo?.ras || user?.ras },
    ],
    [data, myProfile, user]
  );

  const familyRow = useMemo(
    () => [
      {
        label: "Father Name",
        value: data?.FamilyInfo?.fatherName || user?.fatherName,
      },
      {
        label: "Mother Name",
        value: data?.FamilyInfo?.motherName || user?.motherName,
      },
      {
        label: "Brothers Count",
        value: data?.FamilyInfo?.brothersCount || user?.brothersCount,
      },
      {
        label: "Sisters Count",
        value: data?.FamilyInfo?.sistersCount || user?.sistersCount,
      },
      {
        label: "Live With Family ?",
        value: data?.FamilyInfo?.liveWithFamily || user?.liveWithFamily,
      },
      {
        label: "Relative's Surname",
        value: Array.isArray(data?.FamilyInfo?.relativesSurname)
          ? data.FamilyInfo.relativesSurname
              .map((h) => h.replace(/[\[\]"]/g, ""))
              .join(", ")
          : data?.FamilyInfo?.relativesSurname ||
            myProfile?.FamilyInfo?.relativesSurname,
      },
    ],
    [data, myProfile, user]
  );

  const careerRow = useMemo(
    () => [
      {
        label: "Education",
        value: data?.UserCareerInfo?.education || user?.UserCareerInfo?.education,
      },
      {
        label: "Job Sector",
        value: data?.UserCareerInfo?.jobSector || user?.UserCareerInfo?.jobSector,
      },
      {
        label: "Job Title",
        value: data?.UserCareerInfo?.jobTitle || user?.UserCareerInfo?.jobTitle,
      },
      {
        label: "Annual Salary",
        value: data?.UserCareerInfo?.annualSalary || user?.UserCareerInfo?.annualSalary,
      },

      {
        label: "Job Description",
        value: data?.UserCareerInfo?.jobDescription || user?.UserCareerInfo?.jobDescription,
      },
      {
        label: "Job Location",
        value: data?.UserCareerInfo?.jobLocation || user?.UserCareerInfo?.jobLocation,
      },

      
    ],
    [data, myProfile, user]
  );

  useEffect(() => {
    getLoanList();
  }, []);

  const getLoanList = async () => {
    try {
      const response = await getData(`user/auth/me`, null);
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

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
              <img
                src={
                  myProfile?.photo ||
                  `https://i.pravatar.cc/160?u=${encodeURIComponent(
                    user?.email || "me"
                  )}`
                }
                alt={myProfile?.fullName || user?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">
                {data?.firstname || user?.firstname || "Your Name"}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="inline-flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {myProfile?.placeOfBirth || "—"}
                </span>
                {myProfile?.maritalStatus && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700"
                  >
                    {myProfile.maritalStatus}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="space-x-2">
            {!isSubscribed && (
              <Button
                onClick={subscribe}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Subscribe ₹599
              </Button>
            )}
            {/* View-only: no edit button as requested */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Basic Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicRows.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                <div className="text-gray-900 mt-1">{row.value || "—"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Astrology Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {astrologyRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                <div className="text-gray-900 mt-1">{row.value || "—"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Career Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                <div className="text-gray-900 mt-1">{row.value || "—"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">
            Family Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyRow.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {row.label}
                </div>
                <div className="text-gray-900 mt-1">{row.value || "—"}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
