"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function FooterBrand() {
  const [email, setEmail] = useState("");

  return (
    <div className="lg:col-span-4">
      <Link href="/" className="inline-block mb-4">
        <Image src="/img/logo.png" alt="BITSS" width={56} height={56} />
      </Link>

      <p className="font-['Barlow_Condensed'] text-[22px] font-black text-white mb-2">
        BY BFINIT COSMOPOLITAN
      </p>
      <p className="text-slate-400 text-[14px] leading-relaxed mb-6 max-w-70">
        Securely connecting you with seamless email and chat for personal and
        business communication.
      </p>

      {/* Subscribe */}
      <div className="flex mb-5">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-l-xl bg-slate-800 border border-slate-700 text-slate-300 placeholder:text-slate-600 text-[13px] focus:outline-none focus:border-red-500 transition-colors"
        />
        <button className="px-4 py-2.5 rounded-r-xl bg-red-600 hover:bg-red-500 text-white text-[13px] font-semibold transition-colors shrink-0">
          Subscribe
        </button>
      </div>

      <a
        href="mailto:support@bobosohomail.com"
        className="text-[13px] text-slate-400 hover:text-red-400 transition-colors underline underline-offset-2"
      >
        support@bobosohomail.com
      </a>
    </div>
  );
}
