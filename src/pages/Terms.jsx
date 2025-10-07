import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-700">
        <ul className="list-disc ml-6 space-y-2">
          <li>Profiles must contain accurate information.</li>
          <li>Harassment, misuse, or spam is strictly prohibited.</li>
          <li>We may modify or remove content that violates these terms.</li>
          <li>Services and policies may change with prior notice where possible.</li>
        </ul>
        <p>
          Using this site implies acceptance of these terms.
        </p>
      </CardContent>
    </Card>
  );
};

export default Terms;


