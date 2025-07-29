"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Helper for today's date in yyyy-mm-dd
const today = () => new Date().toISOString().split("T")[0];

type Vehicle = {
  id: string;
  title: string;
  type: string;
  description: string;
  price_per_day: number;
  location: string;
};

type Booking = {
  id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  vehicle: Vehicle;
};

export default function TouristDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [bookingState, setBookingState] = useState<{[id: string]: {start: string, end: string, loading: boolean, error: string, success: string}}>({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Slider settings for auto-sliding every 3 seconds
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Fetch sliding images from Supabase
  const [albumImages, setAlbumImages] = useState<{ image_url: string, caption?: string }[]>([]);
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

  // Fetch user id
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

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

  // Fetch bookings for this user
  useEffect(() => {
    if (!userId) return;
    setBookingsLoading(true);
    supabase
      .from("bookings")
      .select("*, vehicle:vehicle_id(*)")
      .eq("tourist_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setBookings(data as any);
        setBookingsLoading(false);
      });
  }, [userId]);

  // Unique locations for filter dropdown
  const locations = Array.from(new Set(vehicles.map(v => v.location)));
  // Unique price points for filter dropdown
  const prices = Array.from(new Set(vehicles.map(v => v.price_per_day)));

  // Handle booking
  const handleBook = async (vehicleId: string) => {
    const state = bookingState[vehicleId];
    if (!userId) return;
    setBookingState(s => ({ ...s, [vehicleId]: { ...state, loading: true, error: "", success: "" } }));
    // Validate dates
    if (!state.start || !state.end || state.start > state.end) {
      setBookingState(s => ({ ...s, [vehicleId]: { ...state, loading: false, error: "Invalid date range", success: "" } }));
      return;
    }
    // Insert booking
    const { error } = await supabase.from("bookings").insert([
      {
        vehicle_id: vehicleId,
        tourist_id: userId,
        start_date: state.start,
        end_date: state.end,
        status: "pending"
      }
    ]);
    if (error) {
      setBookingState(s => ({ ...s, [vehicleId]: { ...state, loading: false, error: error.message, success: "" } }));
    } else {
      setBookingState(s => ({ ...s, [vehicleId]: { ...state, loading: false, error: "", success: "Booking requested!" } }));
      // Refresh bookings
      supabase
        .from("bookings")
        .select("*, vehicle:vehicle_id(*)")
        .eq("tourist_id", userId)
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setBookings(data as any);
        });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Sliding Photo Album */}
      <Slider {...sliderSettings} className="mb-8">
        {albumImages.map((img, idx) => (
          <div key={idx}>
            <img
              src={img.image_url}
              alt={img.caption || `Slide ${idx + 1}`}
              className="w-full h-[600px] object-cover"
            />
            {img.caption && (
              <div className="text-center text-sm mt-2 text-white drop-shadow">{img.caption}</div>
            )}
          </div>
        ))}
      </Slider>
      <h1 className="text-2xl font-bold mb-4">Browse Vehicles</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded px-3 py-2" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
        <select className="border rounded px-3 py-2" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
        <select className="border rounded px-3 py-2" value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
          <option value="">All Prices</option>
          {prices.map(price => <option key={price} value={price}>{price}</option>)}
        </select>
      </div>
      {/* Vehicle List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v.id} className="card-theme border border-gray-800 rounded p-4 shadow flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-yellow">{v.title}</h2>
              <p className="capitalize text-gray-300">{v.type}</p>
              <p className="text-gray-200">{v.description}</p>
              <p className="font-bold mt-2 text-yellow">${v.price_per_day} / day</p>
              <p className="text-sm text-gray-400">{v.location}</p>
              {/* Booking Form */}
              <div className="mt-2 flex flex-col gap-2">
                <label className="text-sm">Book this vehicle:</label>
                <div className="flex gap-2">
                  <input type="date" className="border rounded px-2 py-1" min={today()} value={bookingState[v.id]?.start || ""} onChange={e => setBookingState(s => ({ ...s, [v.id]: { ...s[v.id], start: e.target.value } }))} />
                  <input type="date" className="border rounded px-2 py-1" min={bookingState[v.id]?.start || today()} value={bookingState[v.id]?.end || ""} onChange={e => setBookingState(s => ({ ...s, [v.id]: { ...s[v.id], end: e.target.value } }))} />
                  <button className="btn-yellow px-3 py-1 rounded" disabled={bookingState[v.id]?.loading} onClick={() => handleBook(v.id)}>
                    {bookingState[v.id]?.loading ? "Booking..." : "Book"}
                  </button>
                </div>
                {bookingState[v.id]?.error && <div className="text-red-600 text-xs">{bookingState[v.id].error}</div>}
                {bookingState[v.id]?.success && <div className="text-green-600 text-xs">{bookingState[v.id].success}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Bookings Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-2">My Bookings</h2>
        {bookingsLoading ? (
          <div>Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div>No bookings yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Vehicle</th>
                  <th className="px-2 py-1 border">Type</th>
                  <th className="px-2 py-1 border">Location</th>
                  <th className="px-2 py-1 border">From</th>
                  <th className="px-2 py-1 border">To</th>
                  <th className="px-2 py-1 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td className="px-2 py-1 border">{b.vehicle?.title}</td>
                    <td className="px-2 py-1 border">{b.vehicle?.type}</td>
                    <td className="px-2 py-1 border">{b.vehicle?.location}</td>
                    <td className="px-2 py-1 border">{b.start_date}</td>
                    <td className="px-2 py-1 border">{b.end_date}</td>
                    <td className="px-2 py-1 border">{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 