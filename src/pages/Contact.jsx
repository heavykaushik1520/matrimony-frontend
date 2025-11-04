import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MessageCircle, MapPin, Copy } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', subject: '', method: 'email', message: '' });
  const messageCount = useMemo(() => form.message.length, [form.message]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.subject) {
      toast({ title: 'Please fill required fields', description: 'Name, Email, Subject, and Message are required.' });
      return;
    }
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast({ title: 'Message sent', description: 'We will get back to you shortly.' });
      setForm({ name: '', email: '', phoneNumber: '', subject: '', method: 'email', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="e.g., +91 98765 43210" />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="message">Message</Label>
                <span className={`text-xs ${messageCount > 400 ? 'text-red-600' : 'text-gray-500'}`}>{messageCount}/500</span>
              </div>
              <Textarea id="message" value={form.message} onChange={(e) => {
                if (e.target.value.length <= 500) handleChange(e);
              }} placeholder="Describe your query..." rows={6} />
            </div>

            <div className="flex justify-end ">
              <Button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800"><Phone className="w-4 h-4 text-purple-600" /> +91 98923 52498 / 87670 04239</div>
                <Button variant="outline" size="sm" onClick={() => { navigator.clipboard.writeText('+919892352498'); toast({ title: 'Copied' }); }}><Copy className="w-4 h-4 mr-1" />Copy</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800"><Mail className="w-4 h-4 text-purple-600" /> bhausahebkatke@gmail.com</div>
                <Button variant="outline" size="sm" asChild><a href="mailto:bhausahebkatke@gmail.com">Email</a></Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-800"><MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp</div>
                <Button variant="outline" size="sm" asChild><a href="https://wa.me/918767004239" target="_blank" rel="noreferrer">Open</a></Button>
              </div>
              <div className="flex items-start gap-2 text-gray-800"><MapPin className="w-4 h-4 text-purple-600" /> Shree Swami Samarth Math, At Post Salokh, Near Karjat West (Raigad) - 410201</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="relative h-64 md:h-80 w-full">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.google.com/maps?q=Shivaji%20Nagar%20Pune&output=embed"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;


