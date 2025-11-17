import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Search, UserPlus, Info, Phone, MapPin, Mail, MessageCircle, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // instant or smooth depending on preference
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const location = useLocation();
  const { isAuthenticated, logout } = useAppContext();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Info, label: 'About Us', path: '/about' },
    { icon: Phone, label: 'Contact Us', path: '/contact' },
    ...(!isAuthenticated ? [
      { icon: Info, label: 'Login', path: '/login' },
      { icon: Info, label: 'Sign Up', path: '/signup' },
    ] : [
      { icon: Search, label: 'Matches', path: '/matches' },
      { icon: UserPlus, label: 'My Profile', path: '/me' },
      { icon: Info, label: 'Plans', path: '/plans' },
    ]),
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <header className="bg-white text-gray-800 shadow-2xl border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
              aria-label="Go to homepage"
            >
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/688ce01f3af773f08824bf4d_1754125443583_1a2c4dcb.jpg" 
                alt="Hrudaysparsha Vivaha Mandal" 
                className="w-12 h-12 object-contain"
              />
              <div className="text-left">
                <h1 className="text-2xl font-bold">HRUDAYSPARSHA</h1>
                <p className="text-sm text-gray-600">VIVAHA MANDAL</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {menuItems.map((item, index) => {
                const active = isActive(item.path);
                return (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border ${active ? 'bg-gray-100 text-gray-900 border-gray-300' : 'border-transparent hover:bg-gray-100 text-gray-700'}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
              {isAuthenticated && (
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors border border-transparent hover:bg-gray-100 text-gray-700`}
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              )}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const active = isActive(item.path);
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${active ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                {isAuthenticated && (
                  <button
                    onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-gray-100`}
                  >
                    <X className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* scroll to top on route change */}
        <ScrollToTop />
        <Outlet />
      </main>

      <footer className="mt-10 border-t bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-10 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-base font-bold text-gray-900">Hrudaysparsha Vivaha Mandal</h4>
              <div className="text-xs text-gray-600 mt-1">Reg No - E-0038279(GBR)</div>
              <div className="mt-3 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-purple-600" />
                <p>Shree Swami Samarth Math,<br/>At Post Salokh, Near Karjat West (Raigad) - 410201</p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <div className="flex items-center gap-3">
                  <a href="tel:+918767004239" className="hover:text-gray-900">+91 8767319137</a>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <a href="mailto:bhausahebkatke@gmail.com" className="hover:text-gray-900">bhausahebkatke@gmail.com</a>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <a href="https://wa.me/8767319137" target="_blank" rel="noreferrer" className="hover:text-gray-900">WhatsApp us</a>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm text-gray-700">Follow:</span>
                <a href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-gray-500 hover:text-gray-900"><Facebook className="w-4 h-4" /></a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-gray-900"><Instagram className="w-4 h-4" /></a>
                <a href="https://youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-gray-500 hover:text-gray-900"><Youtube className="w-4 h-4" /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-gray-900">Quick Links</h4>
              <ul className="mt-3 space-y-2">
                <li><button onClick={() => navigate('/about')} className="hover:text-gray-900">About</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-gray-900">Contact</button></li>
                <li><button onClick={() => navigate('/signup')} className="hover:text-gray-900">Register</button></li>
                <li><button onClick={() => navigate('/login')} className="hover:text-gray-900">Login</button></li>
                <li><button onClick={() => navigate('/privacy')} className="hover:text-gray-900">Privacy Policy</button></li>
                <li><button onClick={() => navigate('/terms')} className="hover:text-gray-900">Terms & Conditions</button></li>
                <li><button onClick={() => navigate('/faq')} className="hover:text-gray-900">FAQ</button></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-base font-bold text-gray-900">Newsletter</h4>
              <p className="mt-2 text-gray-600">Get updates on events and new features.</p>
              <form
                className="mt-3 flex gap-2 max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newsletterEmail) return;
                  toast({ title: 'Subscribed', description: 'You will receive our next newsletter.' });
                  setNewsletterEmail('');
                }}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500">Subscribe</Button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-gray-600">
            <div>© {new Date().getFullYear()} Hrudaysparsha Vivaha Mandal. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/about')} className="hover:text-gray-900">About</button>
              <button onClick={() => navigate('/contact')} className="hover:text-gray-900">Contact</button>
              <button onClick={() => navigate('/signup')} className="hover:text-gray-900">Register</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default AppLayout;
