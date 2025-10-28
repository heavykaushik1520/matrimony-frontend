import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, GraduationCap, Briefcase, Lock } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onViewDetails }) => {
  const { isSubscribed } = useAppContext();
  const navigate = useNavigate();
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 border-2 border-transparent hover:border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.firstname + profile.lastname} className={`w-full h-full object-cover ${!isSubscribed ? 'blur-sm' : ''}`} />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 ${!isSubscribed ? 'blur-sm' : ''}`} />
            )}
            {!isSubscribed && (
              <div className="absolute inset-0 flex items-center justify-center text-white/90">
                <Lock className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors">
              {profile.firstname} {profile.lastname}
            </h3>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.birthLocation}
            </p>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
            {profile.maritalStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-gray-700">{profile.UserCareerInfo.education}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-green-500" />
            <span className="text-gray-700">{profile.UserCareerInfo.jobTitle}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Height:</span> {profile.height}
          </div>
          <Button 
            onClick={() => navigate(`/profiles/${profile.id}`)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <Heart className="w-4 h-4 mr-1" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;


