"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('r32OPGGROJ_vUKIq9');

// Helper for today's date in yyyy-mm-dd
const today = () => new Date().toISOString().split("T")[0];

type Vehicle = {
  id: string;
  title: string;
  type: string;
  description: string;
  price_per_day: number;
  location: string;
  image_url?: string; // Assume a single image_url field for now
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showRegForm, setShowRegForm] = useState(false);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    start_date: "",
    end_date: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      let query = supabase.from("vehicles").select("*");
      const filters: any = {};
      if (typeFilter) filters.type = typeFilter;
      if (locationFilter) filters.location = locationFilter;
      if (priceFilter) filters.price_per_day = priceFilter;
      if (Object.keys(filters).length > 0) {
        query = query.match(filters);
      }
      const { data, error } = await query;
      if (!error && data) setVehicles(data);
      setLoading(false);
    };
    fetchVehicles();
  }, [typeFilter, locationFilter, priceFilter]);

  // Unique locations for filter dropdown
  const locations = Array.from(new Set(vehicles.map(v => v.location)));
  // Unique price points for filter dropdown
  const prices = Array.from(new Set(vehicles.map(v => v.price_per_day)));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-wide">
          Browse Vehicles
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Discover our premium selection of cars and bikes for your perfect adventure
        </p>
      </div>
      
      {/* Enhanced Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-12 border border-white/20 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-xs">
            <select 
              className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 appearance-none cursor-pointer hover:bg-white hover:border-yellow-400" 
              value={typeFilter} 
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="">🚗 All Types</option>
              <option value="car">🚗 Car</option>
              <option value="bike">🏍️ Bike</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative flex-1 max-w-xs">
            <select 
              className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 appearance-none cursor-pointer hover:bg-white hover:border-yellow-400" 
              value={locationFilter} 
              onChange={e => setLocationFilter(e.target.value)}
            >
              <option value="">📍 All Locations</option>
              {locations.map(loc => <option key={loc} value={loc}>📍 {loc}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <div className="relative flex-1 max-w-xs">
            <select 
              className="w-full bg-white/90 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-4 py-3 text-gray-800 font-semibold focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 appearance-none cursor-pointer hover:bg-white hover:border-yellow-400" 
              value={priceFilter} 
              onChange={e => setPriceFilter(e.target.value)}
            >
              <option value="">💰 All Prices</option>
              {prices.map(price => <option key={price} value={price}>💰 ${price}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Vehicle List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading vehicles...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 cursor-pointer hover:scale-105 hover:shadow-yellow-400/20 transition-all duration-300 relative overflow-hidden"
              onClick={() => setSelectedVehicle(v)}
            >
              {/* Animated background elements */}
              <div className="absolute -top-10 -right-10 bg-yellow-400 rounded-full w-20 h-20 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300" />
              <div className="absolute -bottom-10 -left-10 bg-yellow-300 rounded-full w-16 h-16 opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300" />
              
              {v.image_url && (
                <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={v.image_url}
                    alt={v.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {v.type}
                  </div>
                </div>
              )}
              
              <div className="relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {v.title}
                </h2>
                <p className="text-gray-300 mb-3 leading-relaxed">{v.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{v.location}</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-4 text-center">
                  <div className="text-gray-800 font-bold text-sm uppercase tracking-wide mb-1">Price Per Day</div>
                  <div className="text-2xl font-extrabold text-gray-900">${v.price_per_day}</div>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold text-sm group-hover:text-yellow-300 transition-colors duration-300">
                    <span>Click to view details</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Popup Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => { setSelectedVehicle(null); setShowRegForm(false); setFormError(""); setFormSuccess(""); }}>
          <div
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative overflow-hidden border-2 border-yellow-400/30"
            onClick={e => e.stopPropagation()}
          >
            {/* Animated background elements */}
            <div className="absolute -top-20 -right-20 bg-yellow-400 rounded-full w-40 h-40 opacity-20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 bg-yellow-300 rounded-full w-32 h-32 opacity-15 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            <button
              className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-200 z-10 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              onClick={() => { setSelectedVehicle(null); setShowRegForm(false); setFormError(""); setFormSuccess(""); }}
              aria-label="Close"
            >
              &times;
            </button>
            
            {selectedVehicle.image_url && (
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={selectedVehicle.image_url}
                  alt={selectedVehicle.title}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-extrabold text-white drop-shadow-lg mb-1">{selectedVehicle.title}</h2>
                  <p className="text-white/90 text-sm font-medium">{selectedVehicle.description}</p>
                </div>
              </div>
            )}
            
            <div className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 rounded-2xl p-4 border border-yellow-400/20">
                  <div className="text-yellow-600 font-bold text-sm uppercase tracking-wide mb-1">Type</div>
                  <div className="text-gray-800 font-semibold capitalize">{selectedVehicle.type}</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 rounded-2xl p-4 border border-yellow-400/20">
                  <div className="text-yellow-600 font-bold text-sm uppercase tracking-wide mb-1">Location</div>
                  <div className="text-gray-800 font-semibold">{selectedVehicle.location}</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl p-6 text-center mb-6 shadow-lg">
                <div className="text-gray-800 font-bold text-sm uppercase tracking-wide mb-1">Price Per Day</div>
                <div className="text-3xl font-extrabold text-gray-900">${selectedVehicle.price_per_day}</div>
              </div>
              
              <button
                className="w-full py-4 rounded-2xl text-xl font-extrabold shadow-2xl tracking-wide transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:scale-105 hover:shadow-yellow-400/50 relative overflow-hidden group"
                onClick={() => setShowRegForm(true)}
                style={{ letterSpacing: '0.05em' }}
              >
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">GET NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
            {/* Registration Form Modal */}
            {showRegForm && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowRegForm(false)}>
                <div
                  className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 relative overflow-hidden border-2 border-yellow-400/30"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Animated background elements */}
                  <div className="absolute -top-16 -right-16 bg-yellow-400 rounded-full w-32 h-32 opacity-20 blur-2xl animate-pulse" />
                  <div className="absolute -bottom-16 -left-16 bg-yellow-300 rounded-full w-24 h-24 opacity-15 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
                  
                  <button
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-200 z-10 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                    onClick={() => setShowRegForm(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Tourist Registration & Booking</h3>
                    <p className="text-gray-600 text-sm">Complete your booking details below</p>
                  </div>
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setFormLoading(true);
                      setFormError("");
                      setFormSuccess("");
                      // 1. Upsert user
                      const { data: userData, error: userError } = await supabase
                        .from("users")
                        .upsert([
                          {
                            email: regForm.email,
                            name: regForm.name,
                            mobile_number: regForm.mobile_number,
                            role: "tourist",
                          },
                        ], { onConflict: ["email"] })
                        .select();
                      if (userError || !userData || userData.length === 0) {
                        setFormError(userError?.message || "Failed to register user.");
                        setFormLoading(false);
                        return;
                      }
                      const userId = userData[0].id;
                      // 2. Insert booking
                      const { error: bookingError } = await supabase
                        .from("bookings")
                        .insert([
                          {
                            vehicle_id: selectedVehicle.id,
                            tourist_id: userId,
                            start_date: regForm.start_date,
                            end_date: regForm.end_date,
                            status: "pending",
                          },
                        ]);
                      if (bookingError) {
                        setFormError(bookingError.message);
                        setFormLoading(false);
                        return;
                      }
                                                // Send notifications
                          try {
                            const notificationResponse = await fetch('/api/notifications', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                name: regForm.name,
                                email: regForm.email,
                                mobile_number: regForm.mobile_number,
                                vehicle_title: selectedVehicle.title,
                                start_date: regForm.start_date,
                                end_date: regForm.end_date,
                              }),
                            });
                            
                            if (notificationResponse.ok) {
                              console.log('Notifications sent successfully');
                            } else {
                              console.error('Failed to send notifications');
                            }
                          } catch (error) {
                            console.error('Notification error:', error);
                          }
                          
                          setFormSuccess("Booking successful! We will contact you soon.");
                          setFormLoading(false);
                          setRegForm({ name: "", email: "", mobile_number: "", start_date: "", end_date: "" });
                        }}
                  >
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border-b-2 border-yellow-400 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-all rounded-none peer"
                          placeholder="Your name *"
                          value={regForm.name}
                          onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))}
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 peer-focus:w-full"></div>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full border-b-2 border-yellow-400 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-all rounded-none peer"
                          placeholder="Your email *"
                          value={regForm.email}
                          onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))}
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 peer-focus:w-full"></div>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border-b-2 border-yellow-400 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-all rounded-none peer"
                          placeholder="Mobile number *"
                          value={regForm.mobile_number}
                          onChange={e => setRegForm(f => ({ ...f, mobile_number: e.target.value }))}
                          required
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 peer-focus:w-full"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="date"
                            className="w-full border-b-2 border-yellow-400 bg-transparent px-0 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-all rounded-none peer"
                            value={regForm.start_date}
                            min={today()}
                            onChange={e => setRegForm(f => ({ ...f, start_date: e.target.value }))}
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 peer-focus:w-full"></div>
                          <label className="absolute -top-6 left-0 text-xs text-yellow-600 font-semibold">Start Date</label>
                        </div>
                        <div className="relative">
                          <input
                            type="date"
                            className="w-full border-b-2 border-yellow-400 bg-transparent px-0 py-3 text-gray-800 focus:outline-none focus:border-yellow-500 transition-all rounded-none peer"
                            value={regForm.end_date}
                            min={regForm.start_date || today()}
                            onChange={e => setRegForm(f => ({ ...f, end_date: e.target.value }))}
                            required
                          />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 peer-focus:w-full"></div>
                          <label className="absolute -top-6 left-0 text-xs text-yellow-600 font-semibold">End Date</label>
                        </div>
                      </div>
                    </div>
                    {formError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        {formError}
                      </div>
                    )}
                    {formSuccess && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-600 text-sm flex items-center gap-2">
                        <span className="text-green-500">✅</span>
                        {formSuccess}
                      </div>
                    )}
                    
                    <button
                      type="button"
                      className="w-full py-4 rounded-2xl text-lg font-extrabold shadow-2xl tracking-wide transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:scale-105 hover:shadow-yellow-400/50 relative overflow-hidden group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formLoading}
                      style={{ letterSpacing: '0.05em' }}
                      onClick={async (e) => {
                        if (formSuccess) {
                          setShowRegForm(false);
                          setSelectedVehicle(null);
                          setFormSuccess("");
                        } else {
                          setFormLoading(true);
                          setFormError("");
                          setFormSuccess("");
                          // 1. Upsert user
                          const { data: userData, error: userError } = await supabase
                            .from("users")
                            .upsert([
                              {
                                email: regForm.email,
                                name: regForm.name,
                                mobile_number: regForm.mobile_number,
                                role: "tourist",
                              },
                            ], { onConflict: ["email"] })
                            .select();
                          if (userError || !userData || userData.length === 0) {
                            setFormError(userError?.message || "Failed to register user.");
                            setFormLoading(false);
                            return;
                          }
                          const userId = userData[0].id;
                          // 2. Insert booking
                          const { error: bookingError } = await supabase
                            .from("bookings")
                            .insert([
                              {
                                vehicle_id: selectedVehicle.id,
                                tourist_id: userId,
                                start_date: regForm.start_date,
                                end_date: regForm.end_date,
                                status: "pending",
                              },
                            ]);
                          if (bookingError) {
                            setFormError(bookingError.message);
                            setFormLoading(false);
                            return;
                          }
                          // Send email notification via EmailJS
                          try {
                            console.log('Sending email with data:', {
                              from_name: regForm.name,
                              from_email: regForm.email,
                              mobile_number: regForm.mobile_number,
                              vehicle_title: selectedVehicle.title,
                              start_date: regForm.start_date,
                              end_date: regForm.end_date,
                            });
                            
                            const emailResult = await emailjs.send(
                              'service_9en5e2m',
                              'template_tq5gwsn',
                              {
                                to_name: 'CeylonStep Team',
                                from_name: regForm.name,
                                from_email: regForm.email,
                                mobile_number: regForm.mobile_number,
                                vehicle_title: selectedVehicle.title,
                                start_date: regForm.start_date,
                                end_date: regForm.end_date,
                                message: `New booking request from ${regForm.name} for ${selectedVehicle.title} from ${regForm.start_date} to ${regForm.end_date}. Contact: ${regForm.email}, Mobile: ${regForm.mobile_number}`,
                              }
                            );
                            
                            console.log('EmailJS result:', emailResult);
                            if (emailResult.status === 200) {
                              console.log('Email sent successfully!', emailResult.text);
                            } else {
                              console.error('Failed to send email, status:', emailResult.status);
                            }
                          } catch (error) {
                            console.error('EmailJS error details:', error);
                          }
                          
                          // Also send to API for logging
                          try {
                            const notificationResponse = await fetch('/api/notifications', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                name: regForm.name,
                                email: regForm.email,
                                mobile_number: regForm.mobile_number,
                                vehicle_title: selectedVehicle.title,
                                start_date: regForm.start_date,
                                end_date: regForm.end_date,
                              }),
                            });
                            
                            if (notificationResponse.ok) {
                              console.log('Notifications logged successfully');
                            } else {
                              console.error('Failed to log notifications');
                            }
                          } catch (error) {
                            console.error('Notification logging error:', error);
                          }
                          
                          setFormSuccess("Booking successful! Email notification sent. We will contact you soon.");
                          setFormLoading(false);
                          setRegForm({ name: "", email: "", mobile_number: "", start_date: "", end_date: "" });
                        }
                      }}
                                          >
                        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                          {formSuccess ? "FINISH" : formLoading ? "SUBMITTING..." : "SUBMIT BOOKING"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 