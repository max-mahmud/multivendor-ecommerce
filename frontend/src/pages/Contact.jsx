import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import PageHeader from "./PageHeader";

const Contact = () => {
  return (
    <>
      <Headers />
      <PageHeader title="Contact" category="contact" />
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-6 text-gray-800">
            We'd love to hear from you! Whether you have questions, feedback, or inquiries, our team is here
            to help. Please feel free to reach out to us using the contact information below:
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Email:</h3>
            <p className="text-gray-800">info@example.com</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Phone:</h3>
            <p className="text-gray-800">+1 (123) 456-7890</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Address:</h3>
            <p className="text-gray-800">123 Main Street, City, Country</p>
          </div>
          <p className="text-gray-800">
            Our team typically responds to inquiries within 24 hours. We look forward to hearing from you!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
