import React from "react";

export default function FAQ() {
  return (
    <main className="min-h-screen bg-white text-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Hrudaysparsh Vivah Mandal — Frequently Asked Questions (FAQ)
        </h1>

        {/* FAQ 1 */}
        <details className="mb-4 border border-gray-300 rounded-md p-4" open>
          <summary className="cursor-pointer text-lg font-medium">
            How do I register and what are the different payment methods?
          </summary>

          <div className="mt-3">
            <p>
              You can register on Hrudaysparsha Vivaha Mandal in two ways —
              <strong> online </strong> and <strong> offline</strong>.
            </p>

            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Online Registration:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    Visit <code>www.hrudaysparshavivahamandal.com</code> and
                    click on <strong>Registration</strong>.
                  </li>
                  <li>
                    Payment can be made using Credit Card / Debit Card /
                    Net Banking / UPI.
                  </li>
                  <li>
                    Online payment is the easiest, fastest, and safest —
                    our payment gateway uses <strong>SSL (Secure Socket Layer)</strong>
                    technology for maximum transaction security.
                  </li>
                </ul>
              </li>

              <li className="mt-2">
                <strong>Offline Registration:</strong>
                <ul className="list-circle pl-6 mt-2">
                  <li>
                    Visit your nearest Hrudaysparsha Vivaha Mandal office /
                    franchise.
                  </li>
                  <li>
                    Payments can be made in cash or via UPI.
                  </li>
                  <li>
                    All payments must be made in Indian Rupees (INR).
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </details>

        {/* FAQ 2 */}
        <details className="mb-4 border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-medium">
            How do I log in to the website after registration?
          </summary>

          <div className="mt-3">
            <ol className="list-decimal pl-6">
              <li>
                After successful registration, your Profile ID and Password
                will be sent to your registered email address.
              </li>
              <li>
                Visit <code>www.hrudaysparshvivahmandal.com</code> and
                click on <strong>Login</strong>.
              </li>
              <li>
                Enter your Profile ID or registered email and password.
              </li>
              <li>
                Remember, the password is <strong>case-sensitive</strong>.
              </li>
              <li>You can now access your profile.</li>
            </ol>
          </div>
        </details>

        {/* FAQ 3 */}
        <details className="mb-4 border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-medium">
            Why is document submission necessary during or after registration?
          </summary>

          <div className="mt-3">
            <p>
              As per Hrudaysparsha policy, document submission is mandatory
              for verification purposes.
            </p>

            <ul className="list-disc pl-6 mt-2">
              <li>ID proof and other required documents must be uploaded.</li>
              <li>
                You can upload the documents directly on the website or email
                them to <code>bhausahebkatke@gmail.com</code>.
              </li>
              <li>
                After receiving your documents, we verify them with your
                profile details and mark them as <strong>Verified</strong>.
              </li>
              <li>
                Failure to provide ID proof may result in restricted access
                to your profile.
              </li>
            </ul>
          </div>
        </details>

        {/* FAQ 4 */}
        <details className="mb-4 border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-medium">
            How do I upload my photo and how many photos can I add?
          </summary>

          <div className="mt-3">
            <ol className="list-decimal pl-6">
              <li>Log in to your profile and go to the “Add Photos” section.</li>
              <li>
                Click on <strong>Choose File</strong> and select your photo
                (.jpg, .png, .gif).
              </li>
              <li>Click on <strong>Upload</strong>.</li>
              <li>
                You can upload up to <strong>5 photos</strong> in your profile.
              </li>
            </ol>
          </div>
        </details>

        {/* FAQ 5 */}
        <details className="mb-4 border border-gray-300 rounded-md p-4">
          <summary className="cursor-pointer text-lg font-medium">
            How can I search profiles on the website?
          </summary>

          <div className="mt-3">
            <p>
              Once registered, log in to your account and use the search or
              browse option to explore profiles. For assistance:
            </p>

            <ul className="list-disc pl-6 mt-2">
              <li>
                WhatsApp Support: <strong>8767319137</strong>
              </li>
              <li>
                Email: <strong>bhausahebkatke@gmail.com</strong>
              </li>
            </ul>
          </div>
        </details>

        <p className="text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} Hrudaysparsha Vivaha Mandal
        </p>
      </div>
    </main>
  );
}
