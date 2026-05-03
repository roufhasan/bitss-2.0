"use client";
import { CheckCircle2, XCircle, MinusCircle, Star } from "lucide-react";

const COMPETITORS = ["Panda", "Kaspersky", "Norton", "McAfee", "ESET"];

const FEATURES = [
  {
    label: "Real-Time Malware & Ransomware Protection",
    vwar: "yes",
    competitors: ["yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Host Intrusion Prevention System (HIPS)",
    vwar: "yes",
    competitors: ["yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Offline-First Architecture",
    sub: "Zero Cloud Reliance — Default mode",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "USB-First Offline Activation & Portable Licensing",
    sub: "Plug & Play",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "Smart Installer Scanning",
    sub: "Non-interrupting ScanVault",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "User-Customizable YARA Rule Engine",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "3-Level Redundant Monitoring",
    sub: "C++ / Python / HIPS",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "Endpoint SQL Injection Detection",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "Endpoint Scripting Attack Detection",
    vwar: "exclusive",
    competitors: ["yes", "yes", "yes", "yes", "yes"],
  },
  {
    label: "Endpoint Brute Force Detection",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "partial"],
  },
  {
    label: "User-Tunable Confidence Thresholds",
    sub: "e.g. 0.80",
    vwar: "exclusive",
    competitors: ["no", "no", "no", "no", "no"],
  },
  {
    label: "Dedicated Credential Protection",
    sub: "LSASS/SAM",
    vwar: "exclusive",
    competitors: ["partial", "yes", "yes", "partial", "yes"],
  },
];

function YesCell() {
  return (
    <div className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[6px] bg-emerald-50">
      <CheckCircle2 size={13} strokeWidth={2} className="text-emerald-600" />
    </div>
  );
}

function NoCell() {
  return (
    <div className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[6px] bg-red-50">
      <XCircle size={13} strokeWidth={2} className="text-red-400" />
    </div>
  );
}

function PartialCell() {
  return (
    <div className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-[6px] bg-amber-50">
      <MinusCircle size={13} strokeWidth={2} className="text-amber-500" />
    </div>
  );
}

function ExclusiveCell({ note }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 border border-red-100 text-[10px] font-bold text-red-600 whitespace-nowrap">
      <Star size={9} className="text-amber-500 fill-amber-400" />
      Yes
      {note ? <span className="font-normal text-slate-400">{note}</span> : null}
    </div>
  );
}

function Cell({ value, note }) {
  if (value === "yes") return <YesCell />;
  if (value === "no") return <NoCell />;
  if (value === "partial") return <PartialCell />;
  if (value === "exclusive") return <ExclusiveCell note={note} />;
  return null;
}

export default function VwarCompareTable() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Competitive Analysis
          </span>
          <h2
            className="font-['Barlow_Condensed'] font-black text-slate-900 leading-none"
            style={{ fontSize: "clamp(28px,4vw,48px)" }}
          >
            HOW WE <span className="text-red-600">COMPARE</span>
          </h2>
          <p className="text-[14px] text-slate-400 mt-2">
            Feature-by-feature breakdown vs leading endpoint security vendors
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table
            className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}
          >
            <colgroup>
              <col style={{ width: "36%" }} />
              <col style={{ width: "13%" }} />
              {COMPETITORS.map((c) => (
                <col key={c} style={{ width: `${51 / COMPETITORS.length}%` }} />
              ))}
            </colgroup>

            {/* Head */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-5 py-4 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                  Feature / Capability
                </th>
                {/* VWAR — highlighted */}
                <th className="px-3 py-4 bg-red-50 border-b-2 border-red-500 text-center">
                  <div className="inline-flex items-center gap-1.5 font-['Barlow_Condensed'] text-[15px] font-black text-red-600">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L2 4.5v5L8 15l6-5.5v-5L8 1z"
                        fill="#dc2626"
                        stroke="#dc2626"
                        strokeWidth="1"
                        strokeLinejoin="round"
                      />
                      <path d="M8 5L5 7v2.5L8 12l3-2.5V7L8 5z" fill="white" />
                    </svg>
                    VWAR
                  </div>
                </th>
                {COMPETITORS.map((c) => (
                  <th
                    key={c}
                    className="px-3 py-4 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {FEATURES.map((f, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors duration-150"
                >
                  {/* Feature label */}
                  <td className="px-5 py-3.5">
                    <p className="text-[13px] font-medium text-slate-800 leading-snug">
                      {f.label}
                    </p>
                    {f.sub && (
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {f.sub}
                      </p>
                    )}
                  </td>

                  {/* VWAR cell */}
                  <td className="px-3 py-3.5 text-center bg-red-50/40">
                    <Cell value={f.vwar} />
                  </td>

                  {/* Competitor cells */}
                  {f.competitors.map((val, ci) => (
                    <td key={ci} className="px-3 py-3.5 text-center">
                      <Cell value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-4">
          {[
            { el: <YesCell />, label: "Fully supported" },
            { el: <NoCell />, label: "Not available" },
            { el: <PartialCell />, label: "Partial support" },
            { el: <ExclusiveCell />, label: "VWAR exclusive" },
          ].map(({ el, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[12px] text-slate-400"
            >
              {el}
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
