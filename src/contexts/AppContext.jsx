import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { postDataWithoutToken, postData, getData } from "@/store/utils";
import { loadRazorpayCheckout } from "@/lib/utils";

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
      id: "p1",
      fullName: "Aarav Sharma",
      gender: "Male",
      maritalStatus: "Single",
      education: "B.E. Computer",
      job: "Software Engineer",
      age: 27,
      height: "5'10\"",
      placeOfBirth: "Pune",
      photo: "https://i.pravatar.cc/160?img=12",
    },
    {
      id: "p2",
      fullName: "Isha Patil",
      gender: "Female",
      maritalStatus: "Single",
      education: "MBA",
      job: "Product Manager",
      age: 25,
      height: "5'5\"",
      placeOfBirth: "Mumbai",
      photo: "https://i.pravatar.cc/160?img=32",
    },
    {
      id: "p3",
      fullName: "Rohan Deshmukh",
      gender: "Male",
      maritalStatus: "Divorcee",
      education: "M.S. Data Science",
      job: "Data Scientist",
      age: 31,
      height: "5'9\"",
      placeOfBirth: "Nashik",
      photo: "https://i.pravatar.cc/160?img=15",
    },
    {
      id: "p4",
      fullName: "Neha Kulkarni",
      gender: "Female",
      maritalStatus: "Single",
      education: "B.Arch",
      job: "Architect",
      age: 28,
      height: "5'4\"",
      placeOfBirth: "Pune",
      photo: "https://i.pravatar.cc/160?img=47",
    },
    {
      id: "p5",
      fullName: "Siddharth Joshi",
      gender: "Male",
      maritalStatus: "Widower",
      education: "MBA Finance",
      job: "Finance Analyst",
      age: 34,
      height: "6'0\"",
      placeOfBirth: "Nagpur",
      photo: "https://i.pravatar.cc/160?img=5",
    },
    {
      id: "p6",
      fullName: "Priya Nene",
      gender: "Female",
      maritalStatus: "Single",
      education: "M.D. Medicine",
      job: "Doctor",
      age: 29,
      height: "5'3\"",
      placeOfBirth: "Kolhapur",
      photo: "https://i.pravatar.cc/160?img=49",
    },
  ]);
  const [filters, setFilters] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [membershipActive, setMembershipActive] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [membershipPlanName, setMembershipPlanName] = useState(null);
  const [membershipExpiry, setMembershipExpiry] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  // Fetch membership status function
  const fetchMembershipStatus = async () => {
    try {
      const resp = await getData("membership/status");
      if (!resp || resp.statusCode !== 200) return;
      
      // Handle different response formats
      const isActive = resp.is_membership_active !== undefined 
        ? resp.is_membership_active 
        : (resp.membership_status === "active" || resp.membership?.status === "active");
      
      setMembershipActive(Boolean(isActive));
      
      if (resp.membership_expiry_date) {
        setMembershipExpiry(resp.membership_expiry_date);
      }
      
      if (resp.membership_plan_name) {
        setMembershipPlanName(resp.membership_plan_name);
      }
      
      // Note: subscriptionActive is same as membershipActive based on backend logic
      setSubscriptionActive(Boolean(isActive));
    } catch (e) {
      console.error("Failed to fetch membership status", e);
      // Don't set to false on error, keep current state
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("hspvm_auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(parsed.user || null);
        }
      } catch {}
    }
    const mine = localStorage.getItem("hspvm_myprofile");
    if (mine) {
      try {
        setMyProfile(JSON.parse(mine));
      } catch {}
    }
  }, []);

  // Fetch membership status when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMembershipStatus();
    }
  }, [isAuthenticated]);

  const addProfile = (profile) => {
    setProfiles((prev) => [...prev, profile]);
    toast({
      title: "Profile Created",
      description: "Profile has been successfully created!",
    });
  };

  const saveMyProfile = (profileInput) => {
    const profileToSave = {
      id: profileInput.id || "me",
      ...profileInput,
    };
    setMyProfile(profileToSave);
    localStorage.setItem("hspvm_myprofile", JSON.stringify(profileToSave));
    toast({ title: "Saved", description: "Your profile has been updated." });
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const login = async (email, password) => {
    try {
      const response = await postDataWithoutToken("user/auth/signin", {
        email,
        password,
      });

      if (response?.statusCode !== 200) {
        // Show server-provided validation error if available
        const serverMessage = response?.message || response?.data?.message;
        const firstValidationError = Array.isArray(response?.errors)
          ? response.errors[0]
          : undefined;
        toast({
          title: "Invalid credentials",
          description:
            firstValidationError ||
            serverMessage ||
            "Please check your email/password.",
        });
        return false;
      }

      const data = response || {};
      const accessToken = data.accessToken || data.token || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token;
      const userFromApi = data.user || data.profile || {};

      // Persist tokens for API helpers that rely on them
      if (accessToken) localStorage.setItem("isAuthenticated", accessToken);
      if (refreshToken) localStorage.setItem("jwtRefreshToken", refreshToken);

      // Build a minimal user object for app state
      const userObj = {
        email: userFromApi.email || email,
        name:
          userFromApi.name ||
          userFromApi.fullName ||
          userFromApi.username ||
          "User",
        id: userFromApi.id,
      };

      setIsAuthenticated(true);
      setUser(userObj);
      localStorage.setItem(
        "hspvm_auth",
        JSON.stringify({ isAuthenticated: true, user: userObj })
      );

      // Optionally seed my profile if gender is provided from API
      if (!myProfile && (userFromApi.gender || userFromApi.Gender)) {
        const seeded = {
          id: "me",
          fullName: userObj.name,
          gender: userFromApi.gender || userFromApi.Gender,
        };
        setMyProfile(seeded);
        localStorage.setItem("hspvm_myprofile", JSON.stringify(seeded));
      }

      toast({ title: "Welcome back!", description: "Signed in successfully." });
      
      // Fetch membership status after login
      await fetchMembershipStatus();
      
      return true;
    } catch (err) {
      toast({
        title: "Network error",
        description: "Unable to sign in. Please try again.",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("hspvm_auth");
    toast({ title: "Signed out", description: "You have been logged out." });
  };

  // Razorpay Checkout helper
  // --- Razorpay helper (unchanged API but cleaned) ---
  const openRazorpay = async ({ key, amount, orderId, description }) => {
    const loaded = await loadRazorpayCheckout();
    if (!loaded || typeof window === "undefined" || !window.Razorpay) {
      toast({
        title: "Payment error",
        description: "Unable to load payment gateway. Please try again.",
      });
      return null;
    }

    return new Promise((resolve, reject) => {
      const options = {
        key,
        amount,
        currency: "INR",
        name: "Hrudaysparsha",
        description: description || "Payment",
        order_id: orderId,
        handler: function (response) {
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled"));
          },
        },
        theme: { color: "#7c3aed" },
      };
      const rz = new window.Razorpay(options);
      rz.on("payment.failed", function () {
        reject(new Error("Payment failed"));
      });
      rz.open();
    });
  };


  const purchasePlan = async (plan) => {
    try {
      if (!["silver", "gold"].includes(plan)) {
        toast({ title: "Invalid plan", description: "Choose Silver or Gold." });
        return false;
      }

      // 1) create order on server
      const orderResp = await postData("membership/create-order", { plan });
      if (
        !orderResp ||
        (orderResp.statusCode && orderResp.statusCode !== 200)
      ) {
        // some backends return 200 with body; adapt based on your postData implementation
        toast({
          title: "Order error",
          description:
            orderResp?.message || "Unable to create order. Try again.",
        });
        return false;
      }

      const { orderId, amount, key_id: keyId, plan: planName } = orderResp;

      if (!orderId || !amount || !keyId) {
        toast({
          title: "Order error",
          description: "Invalid order returned from server.",
        });
        return false;
      }

      // 2) open Razorpay
      const rzResp = await openRazorpay({
        key: keyId,
        amount,
        orderId,
        description: `${planName} Membership`,
      });

      // if user cancelled modal, rzResp will be undefined or exception thrown
      if (!rzResp || !rzResp.razorpay_payment_id) {
        toast({
          title: "Payment cancelled",
          description: "Payment not completed.",
        });
        return false;
      }

      const verifyResp = await postData("membership/verify", {
        razorpay_order_id: rzResp.razorpay_order_id,
        razorpay_payment_id: rzResp.razorpay_payment_id,
        razorpay_signature: rzResp.razorpay_signature,
      });

      if (
        !verifyResp ||
        (verifyResp.statusCode && verifyResp.statusCode !== 200)
      ) {
        toast({
          title: "Verification failed",
          description:
            verifyResp?.message || "Could not verify payment. Contact support.",
        });
        return false;
      }

      const membership = verifyResp.membership || verifyResp.data || verifyResp;
      setMembershipActive(true);
      
      // Update membership details
      if (membership) {
        if (membership.expiry_date) {
          setMembershipExpiry(membership.expiry_date);
        }
        if (membership.plan_name) {
          setMembershipPlanName(membership.plan_name);
        }
      }
      
      // Refresh membership status from server
      await fetchMembershipStatus();
      
      toast({
        title: "Payment successful",
        description: `${planName} membership activated successfully!`,
      });
      return true;
    } catch (err) {
      const message = (err && err.message) || "Payment cancelled";
      toast({ title: "Payment error", description: message });
      return false;
    }
  };

  const buySilver = () => purchasePlan("silver"); 
  const buyGold = () => purchasePlan("gold");

  const filteredProfiles = profiles.filter((profile) => {
    if (filters.gender && profile.gender !== filters.gender) return false;
    if (
      filters.maritalStatus &&
      profile.maritalStatus !== filters.maritalStatus
    )
      return false;
    if (
      filters.education &&
      !(profile.education || "")
        .toLowerCase()
        .includes((filters.education || "").toLowerCase())
    )
      return false;
    if (filters.ageRange && Array.isArray(filters.ageRange)) {
      const [minAge, maxAge] = filters.ageRange;
      if (typeof profile.age === "number") {
        if (
          (minAge && profile.age < minAge) ||
          (maxAge && profile.age > maxAge)
        )
          return false;
      }
    }
    // Enforce opposite-gender visibility based on logged-in user's profile
    if (myProfile?.gender === "Male" && profile.gender !== "Female")
      return false;
    if (myProfile?.gender === "Female" && profile.gender !== "Male")
      return false;
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
        myProfile,

        
        membershipActive, // boolean
        subscriptionActive, // boolean (same as membershipActive based on backend)
        membershipPlanName, // "Silver" | "Gold" | null
        membershipExpiry, // ISO string / Date

        buySilver, // purchases Silver plan (₹999, 1 month)
        buyGold, // purchases Gold plan (₹1999, 3 months)
        purchasePlan, 
        fetchMembershipStatus,

        subscribe: () => purchasePlan("silver"), // legacy mapped to Silver by default
        buyMembership: () => purchasePlan("silver"), // alias for older UI
        buySubscription: () => purchasePlan("silver"),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
