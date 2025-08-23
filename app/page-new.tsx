"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";


import Head from "next/head";
import Link from "next/link";
import SimpleGoogleReviews from "./components/SimpleGoogleReviews";


export default function Home() {
  const [albumImages, setAlbumImages] = useState<{ image_url: string, caption?: string }[]>([]);
  const sliderSettings = {
    dots: false, // We'll use custom dots
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  useEffect(() => {
    supabase
      .from('sliding_images')
      .select('image_url, caption')
      .then(({ data, error }) => {
        if (!error && data) {
          setAlbumImages(data);
        }
      });
  }, []);

  // Gallery Section State
  const [galleryImages, setGalleryImages] = useState<{ image_url: string, caption?: string }[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  useEffect(() => {
    supabase
      .from('gallery_photos')
      .select('image_url, caption')
      .then(({ data, error }) => {
        if (!error && data) {
          setGalleryImages(data);
        }
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {/* Hero Carousel Section */}
      <div className="mt-[100px] w-full max-w-4xl h-[400px] mx-auto px-4 relative">
        {/* Professional Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20 h-full">
          <Slider {...sliderSettings}>
            {albumImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img.image_url}
                  alt={img.caption || `Slide ${idx + 1}`}
                  className="w-full h-[400px] object-cover"
                />
                {/* Professional Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  {img.caption && (
                    <div className="max-w-2xl">
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg leading-tight">
                        {img.caption}
                      </h2>
                      <p className="text-lg text-gray-200 mb-6 drop-shadow-md leading-relaxed">
                        Discover the beauty of Sri Lanka with our premium vehicle rentals
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
          
          {/* Professional Navigation Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex space-x-2">
              {albumImages.map((_, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full bg-white/60 hover:bg-white transition-colors duration-200 cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="mt-16 text-center">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-8 py-4 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-yellow-400/50"
        >
          <span>Book Your Adventure</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="mt-[400px] w-full max-w-6xl mx-auto px-4 scroll-mt-[200px]"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
              About CeylonStep
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Discover Sri Lanka with Premier Vehicle Rentals
              </h3>
              <p className="text-gray-200 leading-relaxed text-lg">
                CeylonStep, located in the heart of Sri Lanka, is your go-to destination for premier vehicle rentals. 
                We specialize in providing high-quality cars and bikes for travelers and backpackers looking to explore 
                this beautiful island nation.
              </p>
              <p className="text-gray-200 leading-relaxed text-lg">
                With our extensive island-wide network, we ensure seamless support through emergency services and 
                roadside assistance. Our commitment is to deliver an unparalleled travel experience, helping you 
                explore Sri Lanka's vibrant culture and picturesque views comfortably and reliably.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-gray-300 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50+</div>
                  <div className="text-gray-300 text-sm">Premium Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">24/7</div>
                  <div className="text-gray-300 text-sm">Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-2xl p-8 border border-yellow-400/30">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Why Choose CeylonStep?</h4>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span>High-quality, well-maintained vehicles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span>24/7 roadside assistance</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span>Flexible rental periods</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span>Competitive pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-yellow-400">✓</span>
                    <span>Local expertise and guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="mt-[300px] w-full max-w-6xl mx-auto px-4 scroll-mt-[200px]"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive vehicle rental solutions tailored for your Sri Lankan adventure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Car Rentals */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300 group">
            <div className="text-6xl mb-6">🚗</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Car Rentals</h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              Comfortable and reliable cars for family trips, business travel, or solo adventures. 
              All vehicles come with comprehensive insurance and GPS navigation.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Automatic & Manual transmission</li>
              <li>• Family-friendly options</li>
              <li>• GPS navigation included</li>
              <li>• Comprehensive insurance</li>
            </ul>
          </div>

          {/* Bike Rentals */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300 group">
            <div className="text-6xl mb-6">🏍️</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Bike Rentals</h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              Perfect for adventurous souls who want to feel the wind in their hair. 
              Our bikes are perfect for exploring Sri Lanka's scenic routes and hidden gems.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Scooters & Motorcycles</li>
              <li>• Safety gear included</li>
              <li>• Fuel-efficient options</li>
              <li>• Easy maneuverability</li>
            </ul>
          </div>

          {/* Additional Services */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300 group">
            <div className="text-6xl mb-6">🛠️</div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Additional Services</h3>
            <p className="text-gray-200 leading-relaxed mb-6">
              We go beyond just vehicle rental. Our comprehensive services ensure your journey 
              is smooth, safe, and memorable from start to finish.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• 24/7 roadside assistance</li>
              <li>• Airport pickup/drop-off</li>
              <li>• Travel route planning</li>
              <li>• Emergency support</li>
            </ul>
          </div>
        </div>

        {/* License Information */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl p-8 border border-yellow-400/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Driving License Information</h3>
            <p className="text-gray-200 leading-relaxed max-w-2xl mx-auto">
              International visitors can drive in Sri Lanka with their home country's driving license 
              for up to 3 months. For longer stays, you may need to obtain a local temporary license. 
              We can assist you with the process.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="gallery"
        className="mt-[300px] w-full max-w-6xl mx-auto px-4 scroll-mt-[200px]"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our fleet and see the adventures that await you
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
            >
              <img
                src={img.image_url}
                alt={img.caption || `Gallery ${idx + 1}`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-sm font-semibold">Click to view</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] p-4">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
              >
                ×
              </button>
              <img
                src={galleryImages[lightboxIndex]?.image_url}
                alt={galleryImages[lightboxIndex]?.caption || `Gallery ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              {galleryImages[lightboxIndex]?.caption && (
                <div className="text-white text-center mt-4 text-lg">
                  {galleryImages[lightboxIndex].caption}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 200px space between Gallery and Reviews */}
      <div style={{ height: '300px' }} />
      
      {/* Customer Reviews Section - Google Reviews */}
      <section
        id="reviews"
        className="relative w-full flex flex-col items-center py-32 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50 overflow-x-hidden"
      >
        <h2 className="text-4xl font-black text-gray-900 mb-2 tracking-tight drop-shadow-lg">What Our Customers Say</h2>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl">See what our customers say about their experiences with CeylonStep. Join thousands of satisfied travelers!</p>
        
        {/* Google Reviews Component */}
        <SimpleGoogleReviews />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full max-w-6xl mx-auto px-4 py-32 scroll-mt-[200px]"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Contact Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to start your adventure? Get in touch with us today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="relative">
                <textarea
                  className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 resize-none"
                  rows={5}
                  placeholder="Your Message"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-lg font-bold shadow-2xl transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:scale-105 hover:shadow-yellow-400/50"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div className="text-gray-300">Negombo, Sri Lanka</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-gray-300">ceylonstepss@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-gray-300">+94 XX XXX XXXX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Business Hours</div>
                    <div className="text-gray-300">24/7 Available</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl p-8 border border-yellow-400/30">
              <h4 className="text-xl font-bold text-yellow-400 mb-4">Why Choose Us?</h4>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  <span>Flexible booking options</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  <span>Competitive pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-400">✓</span>
                  <span>Well-maintained vehicles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
} 