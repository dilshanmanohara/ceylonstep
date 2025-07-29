"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("tourist");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // 1. Sign up with Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    // 2. Insert user info into users table
    const userId = data.user?.id;
    if (userId) {
      const { error: insertError } = await supabase.from("users").insert([
        { id: userId, name, email, role },
      ]);
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }
    setSuccess("Signup successful! Please check your email to confirm your account.");
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }
    setSuccess("Login successful!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Log In"}
        </h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Role</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="tourist">Tourist</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : (isSignup ? "Sign Up" : "Log In")}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
} 