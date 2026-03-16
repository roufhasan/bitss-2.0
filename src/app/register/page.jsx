"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronRight,
  AlertCircle,
  User,
  CheckCircle2,
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Simple password strength indicator
  function passwordStrength(pwd) {
    if (!pwd) return null;
    if (pwd.length < 6)
      return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
    if (pwd.length < 8)
      return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
      return { label: "Fair", color: "bg-amber-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  }

  const strength = passwordStrength(form.password);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          address: "Static (Frontend) Dhaka, Bangladesh",
        }),
      });

      const data = await res.json();

      if (!res.ok || data.status === false || data.success === false) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      // Store token if returned
      if (data.token) localStorage.setItem("bitss_token", data.token);
      if (data.data?.token)
        localStorage.setItem("bitss_token", data.data.token);

      // Redirect to login or home after successful registration
      router.push("/login");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        body { font-family:'DM Sans',sans-serif; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .fu1{animation:fadeUp .5s ease forwards .08s;opacity:0}
        .fu2{animation:fadeUp .5s ease forwards .18s;opacity:0}
        .fu3{animation:fadeUp .5s ease forwards .28s;opacity:0}
        .dot-grid{ background-image:radial-gradient(circle,#e2e8f0 1.5px,transparent 1.5px); background-size:26px 26px; }
      `}</style>

      <section className="relative min-h-screen bg-white overflow-hidden pt-16 flex items-center">
        {/* Background */}
        <div className="dot-grid absolute inset-0 opacity-50" />
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_30%,rgba(254,242,242,0.85)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── LEFT — Branding ── */}
            <div className="hidden lg:block">
              <div className="fu1 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Get Protected
                </span>
              </div>
              <h1
                className="fu2 font-['Barlow_Condensed'] font-black leading-[0.88] text-slate-900 mb-6"
                style={{ fontSize: "clamp(44px,5vw,80px)" }}
              >
                START YOUR
                <br />
                <span className="text-red-600">PROTECTION.</span>
              </h1>
              <p className="fu3 text-slate-500 text-[16px] leading-relaxed max-w-sm mb-10">
                Join thousands of businesses already secured by BITSS. Set up
                your account in seconds and start protecting every entry point.
              </p>

              {/* Benefits */}
              <div className="fu3 flex flex-col gap-3">
                {[
                  "Access all your security products in one place",
                  "Manage licenses and renewals easily",
                  "Get real-time threat alerts and reports",
                  "24/7 support from our security team",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-red-500" />
                    </div>
                    <span className="text-[13px] text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — Form ── */}
            <div className="fu2 w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 overflow-hidden">
                {/* Card top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

                <div className="p-8 sm:p-10">
                  {/* Logo */}
                  <div className="flex items-center gap-2.5 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-sm">
                      <ShieldCheck
                        size={18}
                        className="text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <span
                      className="text-[20px] font-black text-slate-900 tracking-wide leading-none"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      BITSS
                    </span>
                  </div>

                  <h2
                    className="font-['Barlow_Condensed'] font-black text-slate-900 mb-1 leading-tight"
                    style={{ fontSize: "clamp(22px,3vw,28px)" }}
                  >
                    CREATE ACCOUNT
                  </h2>
                  <p className="text-slate-400 text-[13px] mb-8">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>

                  {/* Error banner */}
                  {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6">
                      <AlertCircle
                        size={15}
                        className="text-red-500 shrink-0 mt-0.5"
                      />
                      <p className="text-red-600 text-[13px] leading-snug">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="John Smith"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="password"
                        className="text-[12px] font-semibold text-slate-600 uppercase tracking-wide"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          autoComplete="new-password"
                          placeholder="••••••••"
                          value={form.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>

                      {/* Password strength bar */}
                      {form.password && strength && (
                        <div className="mt-1.5">
                          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                            />
                          </div>
                          <p
                            className={`text-[11px] mt-1 font-medium
                            ${
                              strength.label === "Strong"
                                ? "text-emerald-500"
                                : strength.label === "Fair"
                                  ? "text-amber-500"
                                  : strength.label === "Weak"
                                    ? "text-orange-500"
                                    : "text-red-500"
                            }
                          `}
                          >
                            {strength.label}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all duration-200 shadow-sm shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Creating account…
                        </>
                      ) : (
                        <>
                          Create Account
                          <ChevronRight size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Back home */}
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
