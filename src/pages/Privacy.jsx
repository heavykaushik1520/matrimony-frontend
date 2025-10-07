import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-700">
        <p>
          We value your privacy. This website collects only the information you provide to create and manage your profile and preferences.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Contact details are not publicly visible. Sharing is controlled.</li>
          <li>Data is used to improve matching and provide support.</li>
          <li>You can request deletion of your data anytime.</li>
        </ul>
        <p>
          For questions regarding privacy, contact us at <a href="mailto:bhausahebkatke@gmail.com" className="text-purple-700 underline">bhausahebkatke@gmail.com</a>.
        </p>
      </CardContent>
    </Card>
  );
};

export default Privacy;


