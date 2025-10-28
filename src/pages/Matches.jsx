import React, { useEffect, useState } from 'react';
import { Users, Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import SearchFilters from '@/components/SearchFilters';
import ProfileCard from '@/components/ProfileCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getData } from "@/store/utils";

const Matches = () => {
  const { filteredProfiles, filters, updateFilters, clearFilters, isSubscribed, subscribe } = useAppContext();
  const [selectedProfile, setSelectedProfile] = useState(null);
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


  return (
    <div className="space-y-6">
      <Card className="border bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Membership</span>
              {isSubscribed ? (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
              ) : (
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">Optional</Badge>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {isSubscribed
                ? 'Membership active. You can view profile photos and mobile numbers.'
                : 'Subscribe to unlock profile photos and mobile numbers.'}
            </div>
          </div>
          {!isSubscribed && (
            <Button onClick={subscribe} className="bg-gradient-to-r from-purple-600 to-pink-600">Subscribe for ₹599</Button>
          )}
        </CardContent>
      </Card>

      <SearchFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="w-6 h-6 mr-2 text-purple-600" />
          Matches ({data?.totalItems})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.users?.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onViewDetails={setSelectedProfile}
          />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">No profiles match your filters. Try adjusting filters.</p>
        </div>
      )}

      {/* Details now open in a dedicated page */}
    </div>
  );
};

export default Matches;


