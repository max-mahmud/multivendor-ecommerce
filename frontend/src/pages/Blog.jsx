import React from "react";
import img1 from "../assets/s2.jpg";
import img2 from "../assets/s3.jpg";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import PageHeader from "./PageHeader";

const Blog = () => {
  return (
    <>
      <Headers />
      <PageHeader title="Blog" category="Blog" />
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Welcome to Our Blog</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={img1} alt="Blog Image 1" className="w-full h-72 object-cover object-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Article Title 1</h3>
                <p className="text-gray-800 mb-4">Published on January 1, 2024</p>
                <p className="text-gray-800">
                  Description of the article goes here. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={img2} alt="Blog Image 2" className="w-full h-72 object-cover object-center" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Article Title 2</h3>
                <p className="text-gray-800 mb-4">Published on February 15, 2024</p>
                <p className="text-gray-800">
                  Description of the article goes here. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-800 mt-8">
            Explore our blog to stay updated with the latest news, insights, and trends in the industry. Our
            team of experts regularly publishes informative articles to help you make informed decisions and
            stay ahead of the curve.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
