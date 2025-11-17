import React from "react";
import { Menu, X, Home, Search, UserPlus, Info, Phone, MapPin, Mail, MessageCircle, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';


export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-black py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Privacy Policy of Hrudaysparshavivahamandal
        </h1>

        <p className="mb-4">
          We value the trust you place in us. That's why we insist upon privacy
          of customer information and the highest standards of safety of
          personal information. Please read the following statements to learn
          about our information gathering and dissemination practices.
        </p>

        <p className="mb-4">
          <strong>Note:</strong>
        </p>

        <p className="mb-4">
          The primary work of this website is to work as an ‘intermediary’
          between the customers who are willing to find prospective lawful
          alliances. The customer is also referred as ‘you’ and
          hrudaysparshavivahamandalwiwaha.com is referred as ‘the website’
          herein below for the sake of convenience.
        </p>

        <p className="mb-4">
          Privacy policy of Hruday Sparsha Vivaha Mandal is subject to change at
          any time without notice. To make sure you are aware of any changes,
          please review this policy periodically.
        </p>

        <p className="mb-4">
          By visiting this Website, you agree to be bound by the terms and
          conditions of this Privacy Policy. If you do not agree with the same,
          you are advisednot to use or access our Website.
        </p>

        <p className="mb-4">
          By mere use of the Website, you expressly consent to our use and
          disclosure of your personal information in accordance with this
          Privacy Policy. This Privacy Policy is incorporated into and subject
          to the Terms of Use.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          1. Collection of Personally Identifiable Information and other
          Information:
        </h2>

        <p className="mb-4">
          When you use our Website, we collect and store your personal
          information which is provided by you from time to time. Our primary
          goal in doing so is to provide you a safe, efficient, smooth and
          customized experience. This allows us to provide services and features
          that most likely meet your needs, and to customize our Website to make
          your experience safer and easier. More importantly, while doing so we
          collect personal information from you that we consider necessary for
          achieving this purpose.
        </p>

        <p className="mb-4">
          In general, you can browse the Website without telling Hruday Sparsha
          Vivaha Mandal, who you are or revealing any personal information about
          yourself. Once you give us your personal information and other
          details, you are not anonymous to us. Wherever possible, we indicate
          which fields are required and which fields are optional. We may
          automatically track certain information about you based upon your
          behaviour on our Website. We use this information to do internal
          research on our users' demographics, interests, and behaviour to
          better understand, protect and serve the customers. This information
          is compiled and analysed on an aggregated basis. This information may
          include the URL that you just came from (whether this URL is
          hrudaysparshavivahamandalwiwah.com or not), which URL you next go to
          (whether this URL is on hrudaysparshavivahamandalwiwah.com or not),
          browser information of your computer, and your IP address.
        </p>

        <h4 className="font-medium mt-3">Use of JWT Tokens</h4>
        <p className="mb-4">
          When you log in to our website using your registered credentials, our
          authentication system generates a secure JWT token. This token is
          issued only after your identity is verified and is used to
          authenticate your session during your interaction with the website.
        </p>

        <h4 className="font-medium mt-3">Purpose of JWT</h4>
        <p className="mb-4">JWT tokens help us to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Confirm and maintain your logged-in status</li>
          <li>
            Prevent unauthorized access to your profile and account features
          </li>
          <li>
            Securely manage user sessions without repeatedly requesting login
            credentials
          </li>
        </ul>

        <h4 className="font-medium mt-3">Information Contained in JWT</h4>
        <p className="mb-4">
          The JWT may contain limited information necessary for authentication,
          such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>User ID</li>
          <li>Registered email address (only if required for validation)</li>
          <li>Token issue and expiry timestamps</li>
          <li>User & Admin role (only if applicable)</li>
        </ul>

        <p className="mb-4">
          JWT does not contain sensitive personal information such as your
          password, financial data, or full contact details.
        </p>

        <h4 className="font-medium mt-3">Token Storage</h4>
        <p className="mb-4">
          JWT tokens are stored securely in your browser’s:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Local Storage</li>
        </ul>
        <p className="mb-4">
          This storage method allows you to remain logged in while ensuring
          secure access to protected sections of the website.
        </p>

        <h4 className="font-medium mt-3">Security of JWT Tokens</h4>
        <ul className="list-disc pl-6 mb-4">
          <li>
            JWT tokens are digitally signed and cannot be altered or tampered
            with.
          </li>
          <li>
            Any expired or invalid token is automatically rejected by our
            servers.
          </li>
          <li>
            If a token is found to be compromised or misused, access may be
            restricted to protect your account.
          </li>
        </ul>

        <h4 className="font-medium mt-3">Token Expiry</h4>
        <p className="mb-4">
          For security purposes, all JWT tokens include a predefined expiration
          time. Once the token expires, you will be required to log in again to
          continue using protected services.
        </p>

        <h4 className="font-medium mt-3">
          Use of JWT in Website Functionality
        </h4>
        <p className="mb-4">
          JWT is required for accessing certain areas of the website, such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>User dashboard</li>
          <li>Profile updates</li>
          <li>Photo uploads</li>
          <li>Membership or subscription pages</li>
          <li>Any other feature requiring secure login</li>
        </ul>

        <h4 className="font-medium mt-3">Your Consent</h4>
        <p className="mb-6">
          By using our website and logging into your account, you consent to the
          use of JWT tokens as part of our security and authentication system,
          in accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          2. Use of Demographic / Profile Data / Your Information
        </h2>
        <p className="mb-4">
          We use personal information to provide the services you request. We
          use your personal information to resolve disputes; troubleshoot
          problems; help promote a safe service; provide third party web portal
          to collect money; to measure consumer interest in our services, to
          inform you about online and offline offers, services, and updates etc;
          to customize your experience; to detect and protect you against
          error/s, fraud/s and other criminal activities; to enforce our terms
          and conditions etc.
        </p>

        <p className="mb-4">
          In our efforts to continually improve service offerings, we collect
          and analyse demographic and profile data about our users' activity on
          our Website.
        </p>

        <p className="mb-4">
          We identify and use your IP address to help diagnose problems with our
          server, and to administer our Website. Your IP address is also used to
          help identify you and to gather broad demographic information.
        </p>

        <p className="mb-4">
          We will occasionally ask you to complete optional online surveys.
          These surveys may ask you for contact information and demographic
          information (like zip code, age, or income level). We use this data to
          tailor your experience at our Website, providing you with content that
          we think you might be interested in and to display content according
          to your preferences.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          3. Sharing of personal information
        </h2>
        <p className="mb-4">
          We may share personal information with our other corporate entities
          and affiliates to help detect and prevent identity theft, fraud and
          other potentially illegal acts; correlate related or multiple accounts
          to prevent abuse of our services; and to facilitate joint or
          co-branded services that you request where such services are provided
          by more than one corporate entity. Those entities and affiliates may
          not market to you as a result of such sharing unless you explicitly
          opt-in.
        </p>

        <p className="mb-4">
          We may disclose personal information if required to do so by law or in
          the good faith belief that such disclosure is reasonably necessary to
          respond to subpoenas, court orders, or other legal process. We may
          disclose personal information to law enforcement offices, enforcement
          authorities, third party rights owners, or others in the good faith
          belief that such disclosure is reasonably necessary to: enforce our
          Terms and conditionsand or Privacy Policy; respond to claims like an
          advertisement, posting or other content violates the rights of a third
          party; or protect the rights, property or personal safety of our users
          or the general public etc.
        </p>

        <p className="mb-4">
          We and our affiliates will share / sell some or all of your personal
          information with another business entity, if we (or our assets) plan
          to merge with, or be acquired by that business entity, or
          re-organization, amalgamation, restructuring of business. If such a
          transaction occurs that other business entity (or the new combined
          entity) will be required to follow this privacy policy with respect to
          your personal information.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          4. Links to Other Sites
        </h2>
        <p className="mb-4">
          Our Website links to other websites that may collect personally
          identifiable information about you. Hruday Sparsha Vivaha Mandal is
          not responsible for the privacy practices or the content of those
          linked websites.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          5. Security Precautions
        </h2>
        <p className="mb-4">
          Our Website has stringent security measures in place to protect the
          loss, misuse, and alteration of the information under our control.
          Whenever you change or access your account information, we offer the
          use of a secure server. Once your information is in our possession we
          adhere to strict security guidelines, protecting it against
          unauthorized access.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">6. Choice/Opt-Out</h2>
        <p className="mb-4">
          We provide all users with the opportunity to opt-out of receiving
          non-essential (promotional, marketing-related) communications from us
          on behalf of our partners, and from us in general. If you want to
          remove your contact information from
          www.hrudaysparshavivahamandalwiwaha.com, its lists and newsletters,
          please visit ‘unsubscribe’.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">
          7. Advertisements on www.hrudaysparshavivahamandalwiwaha.com
        </h2>
        <p className="mb-4">
          We use third-party advertising companies to serve ads when you visit
          our Website. These third parties may use information (not including
          your name, address, email address, or telephone number) about your
          visits to this and other websites in order to provide advertisements
          about goods and services of interest to you.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">8. Your Consent</h2>
        <p className="mb-4">
          By using the Website www.hrudaysparshavivahamandalwiwah.com and/ or by
          providing your information, you consent to the collection and use of
          the information you disclose on the Website in accordance with this
          Privacy Policy, including but not limited to your consent for sharing
          your information as per this privacy policy.
        </p>

        <p className="mb-4">
          If we decide to change our privacy policy, we will post those changes
          on this page so that you are always aware of what information we
          collect, how we use it, and under what circumstances we disclose it.
        </p>

        <h2 className="text-2xl font-medium mt-6 mb-3">9. Grievance Officer</h2>
        <p className="mb-4">
          In accordance with Information Technology Act 2010 and rules made
          there under, the name and contact details of the Grievance Officer are
          provided below:
        </p>

        <div className="container mx-auto px-4 py-10 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-base font-bold text-gray-900">
                Hrudaysparsha Vivaha Mandal
              </h4>
              <div className="text-xs text-gray-600 mt-1">
                Reg No - E-0038279(GBR)
              </div>
              <div className="mt-3 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-purple-600" />
                <p>
                  Shree Swami Samarth Math,
                  <br />
                  At Post Salokh, Near Karjat West (Raigad) - 410201
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <div className="flex items-center gap-3">
                  <a href="tel:+918767004239" className="hover:text-gray-900">
                    +91 8767319137
                  </a>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <a
                  href="mailto:bhausahebkatke@gmail.com"
                  className="hover:text-gray-900"
                >
                  bhausahebkatke@gmail.com
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <a
                  href="https://wa.me/8767319137"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-900"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Hrudaysparshavivahamandal
        </p>
      </div>
    </main>
  );
}
