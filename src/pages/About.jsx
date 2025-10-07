import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 p-10 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Hridaysparsha Vivaha Mandal</h1>
            <p className="mt-3 text-white/90 max-w-2xl">
              We connect hearts through a thoughtful, community-first approach. Our mission is to make
              finding a life partner respectful, transparent, and joyful.
            </p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => navigate('/signup')} className="bg-white text-purple-700 hover:bg-white/90">
                <Sparkles className="w-4 h-4 mr-2" /> Get Started
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')} className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
          <Heart className="w-24 h-24 opacity-90" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-3xl font-extrabold text-purple-700">1,000+</div>
          <div className="text-gray-600">Profiles created</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-3xl font-extrabold text-pink-600">500+</div>
          <div className="text-gray-600">Successful matches</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="text-3xl font-extrabold text-blue-600">24x7</div>
          <div className="text-gray-600">Community support</div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold flex items-center"><Users className="w-5 h-5 mr-2 text-purple-600" />Our Values</h2>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <li className="p-4 rounded-lg bg-purple-50">Respect and privacy first</li>
          <li className="p-4 rounded-lg bg-pink-50">Inclusive and supportive community</li>
          <li className="p-4 rounded-lg bg-blue-50">Safety and authenticity</li>
        </ul>
      </section>
    </div>
  );
};

export default About;


