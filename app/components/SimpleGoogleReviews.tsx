"use client";
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { supabase } from '../../lib/supabaseClient';

interface Review {
  id: string;
  created_at: string;
  name?: string;
  avatar_url?: string;
  content: string;
  source?: string;
}

export default function SimpleGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('id, created_at, name, avatar_url, content, source')
        .order('created_at', { ascending: false });
      if (!error && data) setReviews(data);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  // Calculate overall rating and total reviews
  const totalReviews = reviews.length;

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-12 px-2 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 rounded-3xl shadow-2xl border border-yellow-100/60 backdrop-blur-xl">
      {/* Large Rating Card */}
  {/* No overall rating display since no rating column */}

      {/* Reviews Carousel */}
      <div className="relative w-full max-w-6xl px-2 mb-24">
        <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-yellow-300/60 scrollbar-track-transparent">
          {loading ? (
            <div className="text-gray-500 text-lg font-semibold">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-gray-500 text-lg font-semibold">No reviews yet.</div>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={review.id || idx}
                className="snap-center min-w-[340px] max-w-xs bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border-2 border-yellow-300 hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 group relative"
                style={{boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.10)'}}
              >
                {/* Avatar or initials if available */}
                {review.avatar_url ? (
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-lg overflow-hidden relative">
                    <img 
                      src={review.avatar_url} 
                      alt={review.name || 'Avatar'}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">Google</span>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-lg overflow-hidden relative">
                    <span className="text-2xl font-bold text-yellow-400 bg-yellow-50 rounded-full w-full h-full flex items-center justify-center uppercase tracking-wide">
                      {review.name ? review.name.split(' ').map(n => n[0]).join('').substring(0,2) : 'U'}
                    </span>
                    <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">Google</span>
                  </div>
                )}
                {/* Name if available */}
                {review.name && <div className="font-bold text-lg text-gray-900 mb-1 text-center">{review.name}</div>}
                {/* Date if available */}
                {review.created_at && <div className="text-sm text-gray-500 mb-2">{dayjs(review.created_at).format('YYYY-MM-DD')}</div>}
                {/* No rating display since no rating column */}
                {/* Content */}
                <p className="text-gray-700 text-center leading-relaxed text-base font-medium mb-2">
                  "{review.content && review.content.length > 150 ? review.content.substring(0, 150) + '...' : review.content}"
                </p>
                {/* Source if available */}
                {review.source && <div className="text-xs text-gray-400 mt-2">Source: {review.source}</div>}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Google Reviews Button */}
      <a 
        href="https://www.google.com/search?q=CeylonStep&ludocid=13123423423423423423#lrd=0x0:0x0,1" // Replace with your actual Google reviews URL
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-16 z-50 bg-white hover:bg-yellow-400 text-yellow-500 hover:text-white text-lg font-bold px-8 py-4 rounded-full shadow-2xl border-2 border-yellow-300 transition-all duration-300 flex items-center gap-2 focus:outline-none"
        style={{boxShadow: '0 8px 32px 0 rgba(255, 193, 7, 0.25)'}}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        View All Google Reviews
      </a>
    </div>
  );
} 