import React, { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/ProfileForm';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone } from 'lucide-react';
import { getData } from '@/store/utils';

const MyProfile = () => {
  const { myProfile, saveMyProfile, isSubscribed, subscribe, user } = useAppContext();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState([]);

  const basicRows = useMemo(() => ([
    { label: 'Full Name', value: myProfile?.fullName || user?.name },
    { label: 'Email', value: user?.email || 'demo@hspvm.org' },
    { label: 'Gender', value: myProfile?.gender },
    { label: 'Caste', value: myProfile?.caste },
    { label: 'Sub-Branch', value: myProfile?.subBranch },
    { label: 'Mobile', value: myProfile?.mobile || '9999999999' },
    { label: 'Address', value: myProfile?.address },
  ]), [myProfile, user]);

  useEffect(() => {
    getLoanList();
  }, []);

  const getLoanList = async () => {

    try {
      const response = await getData(`user/auth/me`, null)
      console.log("responsedsdd3232", response);
      return false;
      setData(response?.data?.data);

    } catch (error) {
      console.error('Error fetching data:', error);
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
                src={myProfile?.photo || `https://i.pravatar.cc/160?u=${encodeURIComponent(user?.email || 'me')}`}
                alt={myProfile?.fullName || user?.name || 'Profile'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{myProfile?.fullName || user?.name || 'Your Name'}</div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="inline-flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" />{myProfile?.placeOfBirth || '—'}</span>
                {myProfile?.maritalStatus && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">{myProfile.maritalStatus}</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="space-x-2">
            {!isSubscribed && (
              <Button onClick={subscribe} className="bg-gradient-to-r from-purple-600 to-pink-600">Subscribe ₹599</Button>
            )}
            {/* View-only: no edit button as requested */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-base font-semibold text-gray-800 mb-3">Basic Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {basicRows.map((row, i) => (
              <div key={i} className="rounded-lg border p-3 bg-white">
                <div className="text-xs uppercase tracking-wide text-gray-500">{row.label}</div>
                <div className="text-gray-900 mt-1">{row.value || '—'}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;


