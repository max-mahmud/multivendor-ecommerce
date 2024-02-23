import React from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import PageHeader from "./PageHeader";

const About = () => {
  return (
    <>
      <Headers />
      <PageHeader title="About" category="About" />
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8 ">
          <h2 className="text-3xl font-bold mb-4">About Our Marketplace</h2>
          <p className="mb-6 text-gray-800">
            Welcome to our multi-vendor e-commerce marketplace! We pride ourselves on offering a diverse range
            of products from various vendors, ensuring that you find everything you need in one convenient
            location.
          </p>
          <p className="mb-6 text-gray-800">
            At our marketplace, you'll discover a wide selection of items including electronics, clothing,
            accessories, home goods, and much more. We partner with reputable vendors who provide high-quality
            products to ensure your satisfaction with every purchase.
          </p>
          <p className="mb-6 text-gray-800">
            Customer satisfaction is our top priority, and we strive to provide a seamless shopping experience
            for all our users. Whether you're a buyer looking for the perfect item or a vendor interested in
            joining our platform, we're here to meet your needs.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Secure online transactions</li>
              <li>Easy product search and navigation</li>
              <li>Vendor rating and review system</li>
              <li>Flexible payment options</li>
              <li>Responsive customer support</li>
              <li>Regular promotions and discounts</li>
              <li>Vendor registration and management</li>
              <li>Order tracking and shipment notifications</li>
            </ul>
          </div>
          <p className="text-gray-800">
            If you have any questions or feedback, feel free to reach out to our support team. Thank you for
            choosing our marketplace!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
