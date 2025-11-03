import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { postDataWithoutToken, postData, getData } from '@/store/utils';
import { loadRazorpayCheckout } from '@/lib/utils';

const defaultAppContext = {
  profiles: [],
  filteredProfiles: [],
  filters: {},
  addProfile: () => {},
  saveMyProfile: () => {},
  updateFilters: () => {},
  clearFilters: () => {},
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  membershipActive: false,
  subscriptionActive: false,
  buyMembership: async () => {},
  buySubscription: async () => {},
  myProfile: null,
};

const AppContext = createContext(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([
    {
      id: 'p1',
      fullName: 'Aarav Sharma',
      gender: 'Male',
      maritalStatus: 'Single',
      education: 'B.E. Computer',
      job: 'Software Engineer',
      age: 27,
      height: '5\'10"',
      placeOfBirth: 'Pune',
      photo: 'https://i.pravatar.cc/160?img=12',
    },
    {
      id: 'p2',
      fullName: 'Isha Patil',
      gender: 'Female',
      maritalStatus: 'Single',
      education: 'MBA',
      job: 'Product Manager',
      age: 25,
      height: '5\'5"',
      placeOfBirth: 'Mumbai',
      photo: 'https://i.pravatar.cc/160?img=32',
    },
    {
      id: 'p3',
      fullName: 'Rohan Deshmukh',
      gender: 'Male',
      maritalStatus: 'Divorcee',
      education: 'M.S. Data Science',
      job: 'Data Scientist',
      age: 31,
      height: '5\'9"',
      placeOfBirth: 'Nashik',
      photo: 'https://i.pravatar.cc/160?img=15',
    },
    {
      id: 'p4',
      fullName: 'Neha Kulkarni',
      gender: 'Female',
      maritalStatus: 'Single',
      education: 'B.Arch',
      job: 'Architect',
      age: 28,
      height: '5\'4"',
      placeOfBirth: 'Pune',
      photo: 'https://i.pravatar.cc/160?img=47',
    },
    {
      id: 'p5',
      fullName: 'Siddharth Joshi',
      gender: 'Male',
      maritalStatus: 'Widower',
      education: 'MBA Finance',
      job: 'Finance Analyst',
      age: 34,
      height: '6\'0"',
      placeOfBirth: 'Nagpur',
      photo: 'https://i.pravatar.cc/160?img=5',
    },
    {
      id: 'p6',
      fullName: 'Priya Nene',
      gender: 'Female',
      maritalStatus: 'Single',
      education: 'M.D. Medicine',
      job: 'Doctor',
      age: 29,
      height: '5\'3"',
      placeOfBirth: 'Kolhapur',
      photo: 'https://i.pravatar.cc/160?img=49',
    },
  ]);
  const [filters, setFilters] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [membershipActive, setMembershipActive] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [myProfile, setMyProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('hspvm_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(parsed.user || null);
        }
      } catch {}
    }
    (async () => {
      try {
        const status = await getData('membership/status');
        if (status && status.statusCode === 200) {
          // API returns flat fields: is_membership_active, has_active_subscription
          const mem = typeof status.is_membership_active !== 'undefined' ? status.is_membership_active : (status.membership?.status === 'active');
          const sub = typeof status.has_active_subscription !== 'undefined' ? status.has_active_subscription : (status.subscription?.status === 'active');
          setMembershipActive(!!mem);
          setSubscriptionActive(!!sub);
        }
      } catch {}
    })();
    const mine = localStorage.getItem('hspvm_myprofile');
    if (mine) {
      try { setMyProfile(JSON.parse(mine)); } catch {}
    }
  }, []);

  const addProfile = (profile) => {
    setProfiles(prev => [...prev, profile]);
    toast({ title: "Profile Created", description: "Profile has been successfully created!" });
  };

  const saveMyProfile = (profileInput) => {
    const profileToSave = {
      id: profileInput.id || 'me',
      ...profileInput,
    };
    setMyProfile(profileToSave);
    localStorage.setItem('hspvm_myprofile', JSON.stringify(profileToSave));
    toast({ title: 'Saved', description: 'Your profile has been updated.' });
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const login = async (email, password) => {
    try {
      const response = await postDataWithoutToken('user/auth/signin', { email, password });

      if (response?.statusCode !== 200) {
        // Show server-provided validation error if available
        const serverMessage = response?.message || response?.data?.message;
        const firstValidationError = Array.isArray(response?.errors)
          ? response.errors[0]
          : undefined;
        toast({
          title: 'Invalid credentials',
          description: firstValidationError || serverMessage || 'Please check your email/password.',
        });
        return false;
      }

      const data = response || {};
      const accessToken = data.accessToken || data.token || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token;
      const userFromApi = data.user || data.profile || {};

      // Persist tokens for API helpers that rely on them
      if (accessToken) localStorage.setItem('isAuthenticated', accessToken);
      if (refreshToken) localStorage.setItem('jwtRefreshToken', refreshToken);

      // Build a minimal user object for app state
      const userObj = {
        email: userFromApi.email || email,
        name: userFromApi.name || userFromApi.fullName || userFromApi.username || 'User',
        id: userFromApi.id,
      };

      setIsAuthenticated(true);
      setUser(userObj);
      localStorage.setItem('hspvm_auth', JSON.stringify({ isAuthenticated: true, user: userObj }));

      // Optionally seed my profile if gender is provided from API
      if (!myProfile && (userFromApi.gender || userFromApi.Gender)) {
        const seeded = { id: 'me', fullName: userObj.name, gender: userFromApi.gender || userFromApi.Gender };
        setMyProfile(seeded);
        localStorage.setItem('hspvm_myprofile', JSON.stringify(seeded));
      }

      toast({ title: 'Welcome back!', description: 'Signed in successfully.' });
      return true;
    } catch (err) {
      toast({ title: 'Network error', description: 'Unable to sign in. Please try again.' });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('hspvm_auth');
    toast({ title: 'Signed out', description: 'You have been logged out.' });
  };

  // Razorpay Checkout helper
  const openRazorpay = async ({ key, amount, orderId, description }) => {
    const loaded = await loadRazorpayCheckout();
    if (!loaded || typeof window === 'undefined' || !window.Razorpay) {
      toast({ title: 'Payment error', description: 'Unable to load payment gateway. Please try again.' });
      return null;
    }

    return new Promise((resolve, reject) => {
      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'Hridaysparshi',
        description: description || 'Payment',
        order_id: orderId,
        handler: function (response) {
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error('Payment cancelled'));
          }
        },
        theme: { color: '#7c3aed' }
      };
      const rz = new window.Razorpay(options);
      rz.on('payment.failed', function () {
        reject(new Error('Payment failed'));
      });
      rz.open();
    });
  };

  // Combined flow retained for legacy callers; ensures membership then buys subscription
  const subscribe = async () => {
    try {
      // 1) Check current membership/subscription status if available
      let hasMembership = false;
      try {
        const status = await getData('membership/status');
        if (status && status.statusCode === 200) {
          hasMembership = !!(status.membership?.status === 'active');
        }
      } catch {}

      // 2) If no membership, create membership order and pay
      if (!hasMembership) {
        const order = await postData('membership/order/membership', {});
        if (!order || order.statusCode !== 200) {
          toast({ title: 'Membership error', description: order?.message || 'Unable to create membership order.' });
          return false;
        }
        const payResp = await openRazorpay({
          key: order.key_id,
          amount: order.amount,
          orderId: order.orderId,
          description: 'Annual Membership (₹499)'
        });
        if (!payResp) return false;

        const verifyMembership = await postData('membership/verify/membership', {
          razorpay_order_id: payResp.razorpay_order_id,
          razorpay_payment_id: payResp.razorpay_payment_id,
          razorpay_signature: payResp.razorpay_signature,
        });
        if (!verifyMembership || verifyMembership.statusCode !== 200) {
          toast({ title: 'Verification failed', description: verifyMembership?.message || 'Membership verification failed.' });
          return false;
        }
        hasMembership = true;
        setMembershipActive(true);
        toast({ title: 'Membership activated', description: 'Your membership is now active for 1 year.' });
      }

      // 3) Create subscription order and pay (requires active membership)
      const subOrder = await postData('membership/order/subscription', {});
      if (!subOrder || subOrder.statusCode !== 200) {
        toast({ title: 'Subscription error', description: subOrder?.message || 'Unable to create subscription order.' });
        return false;
      }
      const subPay = await openRazorpay({
        key: subOrder.key_id,
        amount: subOrder.amount,
        orderId: subOrder.orderId,
        description: '2-Day Subscription (₹99)'
      });
      if (!subPay) return false;

      const verifySub = await postData('membership/verify/subscription', {
        razorpay_order_id: subPay.razorpay_order_id,
        razorpay_payment_id: subPay.razorpay_payment_id,
        razorpay_signature: subPay.razorpay_signature,
      });
      if (!verifySub || verifySub.statusCode !== 200) {
        toast({ title: 'Verification failed', description: verifySub?.message || 'Subscription verification failed.' });
        return false;
      }

      setSubscriptionActive(true);
      toast({ title: 'Subscription activated', description: 'You can now view profiles for 2 days.' });
      return true;
    } catch (e) {
      toast({ title: 'Payment cancelled', description: 'You closed the payment window.' });
      return false;
    }
  };

  // Purchase membership only
  const buyMembership = async () => {
    try {
      const order = await postData('membership/order/membership', {});
      if (!order || order.statusCode !== 200) {
        toast({ title: 'Membership error', description: order?.message || 'Unable to create membership order.' });
        return false;
      }
      const payResp = await openRazorpay({
        key: order.key_id,
        amount: order.amount,
        orderId: order.orderId,
        description: 'Annual Membership (₹499)'
      });
      if (!payResp) return false;
      const verify = await postData('membership/verify/membership', {
        razorpay_order_id: payResp.razorpay_order_id,
        razorpay_payment_id: payResp.razorpay_payment_id,
        razorpay_signature: payResp.razorpay_signature,
      });
      if (!verify || verify.statusCode !== 200) {
        toast({ title: 'Verification failed', description: verify?.message || 'Membership verification failed.' });
        return false;
      }
      setMembershipActive(true);
      toast({ title: 'Membership activated', description: 'Your membership is now active for 1 year.' });
      return true;
    } catch (e) {
      toast({ title: 'Payment cancelled', description: 'You closed the payment window.' });
      return false;
    }
  };

  // Purchase subscription only (requires active membership)
  const buySubscription = async () => {
    try {
      if (!membershipActive) {
        toast({ title: 'Membership required', description: 'Please buy membership before subscribing.' });
        return false;
      }
      const order = await postData('membership/order/subscription', {});
      if (!order || order.statusCode !== 200) {
        toast({ title: 'Subscription error', description: order?.message || 'Unable to create subscription order.' });
        return false;
      }
      const payResp = await openRazorpay({
        key: order.key_id,
        amount: order.amount,
        orderId: order.orderId,
        description: '2-Day Subscription (₹99)'
      });
      if (!payResp) return false;
      const verify = await postData('membership/verify/subscription', {
        razorpay_order_id: payResp.razorpay_order_id,
        razorpay_payment_id: payResp.razorpay_payment_id,
        razorpay_signature: payResp.razorpay_signature,
      });
      if (!verify || verify.statusCode !== 200) {
        toast({ title: 'Verification failed', description: verify?.message || 'Subscription verification failed.' });
        return false;
      }
      setSubscriptionActive(true);
      toast({ title: 'Subscription activated', description: 'You can now view profiles for 2 days.' });
      return true;
    } catch (e) {
      toast({ title: 'Payment cancelled', description: 'You closed the payment window.' });
      return false;
    }
  };

  const filteredProfiles = profiles.filter(profile => {
    if (filters.gender && profile.gender !== filters.gender) return false;
    if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
    if (filters.education && !(profile.education || '').toLowerCase().includes((filters.education || '').toLowerCase())) return false;
    if (filters.ageRange && Array.isArray(filters.ageRange)) {
      const [minAge, maxAge] = filters.ageRange;
      if (typeof profile.age === 'number') {
        if ((minAge && profile.age < minAge) || (maxAge && profile.age > maxAge)) return false;
      }
    }
    // Enforce opposite-gender visibility based on logged-in user's profile
    if (myProfile?.gender === 'Male' && profile.gender !== 'Female') return false;
    if (myProfile?.gender === 'Female' && profile.gender !== 'Male') return false;
    return true;
  });

  return (
    <AppContext.Provider
      value={{
        profiles,
        filteredProfiles,
        filters,
        addProfile,
        saveMyProfile,
        updateFilters,
        clearFilters,
        isAuthenticated,
        user,
        login,
        logout,
        membershipActive,
        subscriptionActive,
        subscribe,
        buyMembership,
        buySubscription,
        myProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


