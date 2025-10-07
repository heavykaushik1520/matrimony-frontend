import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Phone, GraduationCap, Briefcase } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const ProfileModal = ({ profile, isOpen, onClose }) => {
  const { isSubscribed } = useAppContext();
  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-white to-purple-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-700">
            {profile.fullName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-xl">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.fullName} className={`w-full h-full object-cover ${!isSubscribed ? 'blur-sm' : ''}`} />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 ${!isSubscribed ? 'blur-sm' : ''}`} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Personal Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{profile.mobile ? (isSubscribed ? profile.mobile : 'XXXXXXXXXX') : 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-500" />
                  <span>{profile.placeOfBirth}</span>
                </div>
                <div>
                  <span className="font-medium">Height:</span> {profile.height}
                </div>
                <div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {profile.maritalStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">Professional Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-green-500" />
                  <span>{profile.education}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{profile.job}</span>
                </div>
                {profile.position && (
                  <div>
                    <span className="font-medium">Position:</span> {profile.position}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4 border-t">
            <Button
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg"
            >
              <Heart className="w-4 h-4 mr-2" />
              Express Interest
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;


