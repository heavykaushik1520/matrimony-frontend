import React, { useState } from "react";
import {
  Users,
  Heart,
  ShieldCheck,
  Handshake,
  CheckCircle2,
  Video,
  Calendar,
  Smartphone,
  Lock,
  Flag,
  LifeBuoy,
  Clock,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import SearchFilters from "@/components/SearchFilters";
import ProfileForm from "@/components/ProfileForm";
import ProfileCard from "@/components/ProfileCard";
import ProfileModal from "@/components/ProfileModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const {
    filteredProfiles,
    filters,
    addProfile,
    updateFilters,
    clearFilters,
    isAuthenticated,
  } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);

  const handleCreateProfile = (profile) => {
    addProfile(profile);
    setShowForm(false);
  };

  return (
    <>
      {/* Hero: video left, content right */}
      <section className="mb-10">
        <div className="rounded-2xl border bg-white shadow-sm p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative h-60 md:h-80 lg:h-96 rounded-xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full "
                src="https://www.youtube.com/embed/yUCkysNyoHk?si=C-DyDOMArO3WTfwu"
                title="Promotional Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Find your perfect match with guidance and trust
              </h1>
              <p className="mt-3 text-gray-600 max-w-prose">
                Join Hrudaysparsha Vivaha Mandal and discover verified profiles,
                personalized recommendations, and community support – all in one
                place.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {!isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => navigate("/signup")}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Register
                    </Button>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="outline"
                    >
                      Login
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => navigate("/matches")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    Go to Matches
                  </Button>
                )}
                
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Mail verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure & private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-purple-600" />
                  <span>10+ yrs trust</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4">Trust & safety</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3 text-gray-900 font-semibold">
              <Smartphone className="w-5 h-5 text-green-600" />
              ID/Mobile verification
            </div>
            <p className="mt-2 text-sm text-gray-600">
              All active profiles are mobile-verified. Optional ID checks for
              premium members.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3 text-gray-900 font-semibold">
              <Lock className="w-5 h-5 text-purple-600" />
              Your data stays private
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Control what you share. We never display contact details publicly.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3 text-gray-900 font-semibold">
              <Flag className="w-5 h-5 text-rose-600" />
              Report or block
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Found something off? Use one‑tap Report/Block on every profile
              card.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-3 text-gray-900 font-semibold">
              <LifeBuoy className="w-5 h-5 text-sky-600" />
              Support hours
            </div>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" /> 10:00 AM – 7:00 PM IST
            </p>
            <div className="mt-3">
              <Button variant="outline" onClick={() => navigate("/contact")}>
                Contact support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
                1
              </span>
              Create profile
            </div>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-purple-600" /> Add basic details
              and preferences.
            </p>
          </div>
          {/* <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
                2
              </span>
              Verify
            </div>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Email OTP
              and optional ID check.
            </p>
          </div> */}
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
                2
              </span>
              Get recommendations
            </div>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> See compatible
              matches as per filters.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <div className="flex items-center gap-2 text-purple-700 font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-purple-100">
                3
              </span>
              Connect / Meet Guruji
            </div>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <Handshake className="w-4 h-4 text-purple-600" /> Message families
              or book consultancy with Guruji.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements strip */}
      <section id="explore" className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
          <div className="flex items-center gap-3 p-4 rounded-xl border bg-white">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <div className="font-extrabold">100%</div>
              <div className="text-sm text-gray-600">
                Mobile-verified profiles
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl border bg-white">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div>
              <div className="font-extrabold">500+</div>
              <div className="text-sm text-gray-600">Customers served (offline)</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl border bg-white">
            <Handshake className="w-6 h-6 text-purple-600" />
            <div>
              <div className="font-extrabold">10+ Years</div>
              <div className="text-sm text-gray-600">
                of successful matchmaking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Guruji CTA */}
      <section
        id="guruji"
        className="mb-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8"
      >
        <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Meet Guruji
            </h2>
            <p className="mt-2 text-white/90 max-w-2xl">
              Book a quick guidance session with our Guruji to receive
              personalized matchmaking advice.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-purple-700 hover:bg-white/90">
                {/* <Video className="w-4 h-4 mr-2" /> */}
                Book 30-min Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a Session with Guruji</DialogTitle>
              </DialogHeader>
              <form className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="border rounded-md p-2"
                    placeholder="Full Name"
                  />
                  <input
                    className="border rounded-md p-2"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="border rounded-md p-2"
                    placeholder="Preferred Date"
                    type="date"
                  />
                  <input
                    className="border rounded-md p-2"
                    placeholder="Preferred Time"
                    type="time"
                  />
                </div>
                <textarea
                  className="border rounded-md p-2 w-full"
                  rows="3"
                  placeholder="Brief concern (optional)"
                />
                <div className="flex justify-end">
                  <Button type="button">Submit Request</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
      {showForm ? (
        <ProfileForm
          onSubmit={handleCreateProfile}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          {/* <SearchFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
          />

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-600" />
              Available Profiles ({filteredProfiles.length})
            </h2>
            <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-purple-500 to-pink-500">Create Profile</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
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
              <p className="text-xl text-gray-500">No profiles found. Create the first one!</p>
            </div>
          )} */}
        </>
      )}

      {/* Testimonials */}
      {/* <section className="mt-10 mb-10">
        <h3 className="text-xl font-bold mb-4">What our members say</h3>
        <TestimonialsCarousel />
      </section>

     
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4">Frequently asked questions</h3>
        <div className="rounded-2xl border bg-white divide-y">
          {[
            {
              q: "How are profiles verified?",
              a: "We verify mobile numbers via OTP. You can also report suspicious activity from any profile card.",
            },
            {
              q: "How long does profile approval take?",
              a: "Most profiles go live instantly. Manual reviews, if needed, are completed within 24 hours.",
            },
            {
              q: "What is your privacy policy?",
              a: "We never share personal contact details publicly. You control what information is visible, and can hide or delete your profile any time.",
            },
            {
              q: "How do I book a session with Guruji?",
              a: "Use the “Meet Guruji” button above to open the booking form and choose a preferred date and time.",
            },
            {
              q: "Do you offer refunds?",
              a: "If you upgrade to a paid plan, refunds are handled as per our guidelines. Contact support for assistance.",
            },
            {
              q: "How can I contact support?",
              a: "Visit the Contact page or use the WhatsApp link in the footer. Our team is available 10am–7pm IST.",
            },
          ].map((item, i) => (
            <details key={i} className="group px-5 py-4" open={faqOpen === i}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setFaqOpen((prev) => (prev === i ? null : i));
                }}
                className="list-none cursor-pointer select-none flex items-center justify-between text-gray-900 font-medium"
              >
                <span>{item.q}</span>
                <span className="ml-4 text-gray-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-gray-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section> */}

      {/* Attachments / Downloads */}
      {/* <section className="mb-6">
        <h3 className="text-xl font-bold mb-4">Attachments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Membership Brochure (PDF)", href: "#", size: "1.2 MB" },
            { title: "Rules & Guidelines (PDF)", href: "#", size: "850 KB" },
            { title: "Event Schedule (PDF)", href: "#", size: "560 KB" },
          ].map((a, i) => (
            <a
              key={i}
              href={a.href}
              className="flex items-center justify-between rounded-lg border bg-white p-4 hover:shadow"
            >
              <span className="text-gray-800">{a.title}</span>
              <span className="text-sm text-gray-500">{a.size}</span>
            </a>
          ))}
        </div>
      </section> */}

      <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
};

export default Index;
