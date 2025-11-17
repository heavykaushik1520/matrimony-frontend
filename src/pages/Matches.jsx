
import React, { useEffect, useState, useCallback } from 'react';
import { Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import SearchFilters from '@/components/SearchFilters';
import ProfileCard from '@/components/ProfileCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getData } from "@/store/utils";

const Matches = () => {
  const navigate = useNavigate();
  const {
    filters,
    updateFilters,
    clearFilters,
    membershipActive,
    subscriptionActive,
    buyMembership,
    buySubscription,
  } = useAppContext();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [data, setData] = useState({ users: [], totalItems: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const getMatchesList = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      
      // Check if any filters are active
      const hasActiveFilters = !!(
        filters.religion || filters.caste || filters.community || 
        filters.maritalStatus || filters.skinTone || filters.ras || 
        filters.gan || filters.mangal || filters.education || 
        filters.jobSector || filters.jobLocation || filters.annualSalary
      );
      
      let response;
      
      if (hasActiveFilters) {
        // Use filter-card API when filters are applied
        const queryParams = new URLSearchParams();
        if (filters.religion) queryParams.append('religion', filters.religion);
        if (filters.caste) queryParams.append('caste', filters.caste);
        if (filters.community) queryParams.append('community', filters.community);
        if (filters.maritalStatus) queryParams.append('maritalStatus', filters.maritalStatus);
        if (filters.skinTone) queryParams.append('skinTone', filters.skinTone);
        if (filters.ras) queryParams.append('ras', filters.ras);
        if (filters.gan) queryParams.append('gan', filters.gan);
        if (filters.mangal) queryParams.append('mangal', filters.mangal);
        if (filters.education) queryParams.append('education', filters.education);
        if (filters.jobSector) queryParams.append('jobSector', filters.jobSector);
        if (filters.jobLocation) queryParams.append('jobLocation', filters.jobLocation);
        if (filters.annualSalary) queryParams.append('annualSalary', filters.annualSalary);
        queryParams.append('limit', limit);
        queryParams.append('page', page);
        
        const url = `user/auth/users-opposite-gender-card/filter?${queryParams.toString()}`;
        response = await getData(url, null);
      } else {
        // Use card API to get all profiles in card format when no filters are applied
        const queryParams = new URLSearchParams();
        queryParams.append('limit', limit);
        queryParams.append('page', page);
        const url = `user/auth/users-opposite-gender-card?${queryParams.toString()}`;
        response = await getData(url, null);
      }
      
      // Handle response - filter API returns { users, totalItems, totalPages, currentPage }
      if (response) {
        if (response.users) {
          setData({
            users: response.users,
            totalItems: response.totalItems || response.users.length,
            totalPages: response.totalPages || 1,
            currentPage: response.currentPage || page
          });
        } else if (Array.isArray(response)) {
          // Fallback for array response
          setData({
            users: response,
            totalItems: response.length,
            totalPages: 1,
            currentPage: page
          });
        } else {
          // Handle other response formats
          setData({
            users: response.users || [],
            totalItems: response.totalItems || 0,
            totalPages: response.totalPages || 1,
            currentPage: response.currentPage || page
          });
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, limit]);

  useEffect(() => {
    getMatchesList(1);
    setCurrentPage(1);
  }, [getMatchesList]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data.totalPages) {
      setCurrentPage(newPage);
      getMatchesList(newPage);
    }
  };


  return (
    <div className="space-y-6">
      <Card className="border bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Membership</span>
              {membershipActive ? (
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-700"
                >
                  Active
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-700"
                >
                  Required
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {membershipActive
                ? "Membership active. You can view contact information."
                : "View profiles freely. Subscribe to see contact details."}
            </div>
          </div>
          <div className="flex gap-2">
            {!membershipActive && (
              <Button 
                onClick={() => navigate('/plans')} 
                className="bg-purple-600 text-white"
              >
                View Plans
              </Button>
            )}
          </div>
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
          Matches ({data?.totalItems || 0})
        </h2>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-700">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3">Loading profiles...</span>
            </div>
          </CardContent>
        </Card>
      ) : data?.users?.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">
            {!!(
              filters.religion || filters.caste || filters.community || 
              filters.maritalStatus || filters.skinTone || filters.ras || 
              filters.gan || filters.mangal || filters.education || 
              filters.jobSector || filters.jobLocation || filters.annualSalary
            )
              ? 'No profiles match your filters. Try adjusting filters.' 
              : 'No profiles found.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.users?.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onViewDetails={setSelectedProfile}
              />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {data.totalPages}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.totalPages || loading}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Matches;


