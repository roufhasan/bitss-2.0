"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Captcha from "./Captcha";
import { smtpexpressClient } from "@/data/smtp";
import {
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Video,
  AlignLeft,
  Copyright,
  Loader2,
  AlertCircle,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const router = useRouter();
  const form = useRef();
  const [loader, setLoader] = useState(false);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    skypeId: "",
    subject: "",
    message: "",
    captchaInput: "",
  });

  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [invalidCaptcha, setInvalidCaptcha] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(false);
  const [invalidKey, setInvalidKey] = useState(false);
  const [forbiddenWords, setForbiddenWords] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchForbiddenWords = async () => {
    const apiUrl = "https://bitts.fr/api.php";
    try {
      const credential = await fetch("/credential.json");
      const credentialsData = await credential.json();
      if (!credentialsData?.username || !credentialsData?.password) return;
      const servername = window.location.hostname;
      const data = { ...credentialsData, servername };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        setForbiddenWords(result ?? []);
      } else {
        setInvalidKey(true);
      }
    } catch (error) {
      console.error("Error fetching forbidden words:", error);
      setInvalidKey(true);
    }
  };

  useEffect(() => {
    fetch("/country.json")
      .then((r) => r.json())
      .then((d) => setCountries(d))
      .catch((e) => console.error("Error loading country data:", e));
    fetchForbiddenWords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkForbiddenWords = (message) => {
    for (const word of forbiddenWords) {
      if (message.toLowerCase().includes(word.toLowerCase())) return false;
    }
    return true;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoader(true);

    if (parseInt(formData.captchaInput, 10) !== captchaAnswer) {
      setLoader(false);
      setInvalidCaptcha(true);
      return;
    } else {
      setInvalidCaptcha(false);
    }

    if (!checkForbiddenWords(formData.message)) {
      setLoader(false);
      setInvalidMessage(true);
      return;
    } else {
      setInvalidMessage(false);
    }

    try {
      const formattedMessage = `
        Name: ${formData.name}<br/>
        Email: ${formData.email}<br/>
        Subject: ${formData.subject}<br/>
        Phone: ${formData.phone}<br/>
        Country: ${formData.country}<br/>
        Skype ID: ${formData.skypeId}<br/>
        Message: ${formData.message}
      `;
      await smtpexpressClient.sendApi.sendMail({
        subject: `Bobosoho Contact Form Submission from ${formData.name}`,
        message: formattedMessage,
        sender: {
          name: "Bobosoho",
          email: "bfinit-9b2b98@projects.smtpexpress.com",
        },
        recipients: { email: "support@bobosohomail.com" },
      });
      setLoader(false);
      setSubmitError(null);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        skypeId: "",
        subject: "",
        message: "",
        captchaInput: "",
      });
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      setLoader(false);
      const raw =
        error?.message ||
        error?.response?.message ||
        error?.data?.message ||
        "";
      const isPlanError =
        raw.toLowerCase().includes("express plan") ||
        raw.toLowerCase().includes("production emails") ||
        error?.statusCode === 400 ||
        error?.response?.statusCode === 400;

      setSubmitError(
        isPlanError
          ? "Email delivery is currently limited to sandbox mode. Please contact us directly at support@bobosohomail.com — we'll get back to you shortly."
          : "Something went wrong while sending your message. Please try again or email us at support@bobosohomail.com.",
      );
    }
  };

  // ── Field config for the left column fields ──
  const fields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      icon: User,
      placeholder: "John Smith",
      required: true,
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      icon: Mail,
      placeholder: "you@example.com",
      required: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "number",
      icon: Phone,
      placeholder: "+880 1XXX-XXXXXX",
      required: true,
    },
    {
      id: "subject",
      label: "Subject / Query",
      type: "text",
      icon: MessageSquare,
      placeholder: "How can we help?",
      required: true,
    },
    {
      id: "skypeId",
      label: "Skype ID",
      type: "text",
      icon: Video,
      placeholder: "Optional",
      required: false,
    },
  ];

  const inputBase =
    "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all duration-200";

  return (
    <section className="relative py-16 sm:py-20 bg-slate-50 overflow-hidden">
      {/* sub-grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(220,38,38,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Send a Message
          </span>
          <h2
            className="font-black text-slate-900 mt-4 mb-3 leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(28px,5vw,50px)",
            }}
          >
            FILL OUT THE <span className="text-red-600">FORM</span>
          </h2>
          <p className="text-slate-500 text-[14px] max-w-sm mx-auto leading-relaxed">
            Fill out the form or find us on the map to get in touch.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── FORM CARD ── */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

              <form
                ref={form}
                onSubmit={submitForm}
                className="p-7 sm:p-9 flex flex-col gap-4"
              >
                {/* Standard fields */}
                {fields.map(
                  ({ id, label, type, icon: Icon, placeholder, required }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={id}
                        className="text-[11px] font-bold uppercase tracking-widest text-slate-500"
                      >
                        {label}{" "}
                        {required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="relative">
                        <Icon
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                        <input
                          id={id}
                          name={id}
                          type={type}
                          required={required}
                          value={formData[id]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className={inputBase}
                        />
                      </div>
                    </div>
                  ),
                )}

                {/* Country select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="country"
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-500"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <select
                      id="country"
                      name="country"
                      required
                      onChange={handleChange}
                      className={`${inputBase} appearance-none`}
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message textarea */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[11px] font-bold uppercase tracking-widest text-slate-500"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <AlignLeft
                      size={15}
                      className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
                    />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your request or question…"
                      className={`${inputBase} pl-10 pt-3 resize-none`}
                    />
                  </div>
                </div>

                {/* Captcha */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Security Check <span className="text-red-500">*</span>
                  </label>
                  <Captcha onCaptchaGenerated={setCaptchaAnswer} />
                  <input
                    type="text"
                    id="captchaInput"
                    name="captchaInput"
                    required
                    value={formData.captchaInput}
                    onChange={handleChange}
                    placeholder="Enter the answer above"
                    className={inputBase}
                  />
                </div>

                {/* Error states */}
                {(invalidCaptcha || invalidMessage || invalidKey) && (
                  <div className="flex flex-col gap-1.5">
                    {invalidCaptcha && (
                      <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                        <AlertCircle
                          size={14}
                          className="text-red-500 shrink-0"
                        />
                        <p className="text-red-600 text-[13px]">
                          Invalid captcha — please try again.
                        </p>
                      </div>
                    )}
                    {invalidMessage && (
                      <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                        <AlertCircle
                          size={14}
                          className="text-red-500 shrink-0"
                        />
                        <p className="text-red-600 text-[13px]">
                          Your message contains forbidden words.
                        </p>
                      </div>
                    )}
                    {invalidKey && (
                      <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                        <AlertCircle
                          size={14}
                          className="text-red-500 shrink-0"
                        />
                        <p className="text-red-600 text-[13px]">
                          Invalid API key.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit error banner */}
                {submitError && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
                    <AlertCircle
                      size={16}
                      className="text-red-500 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-red-700 text-[13px] font-semibold mb-0.5">
                        Message not delivered
                      </p>
                      <p className="text-red-600 text-[12px] leading-relaxed">
                        {submitError}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit success banner */}
                {submitSuccess && (
                  <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3.5">
                    <span className="w-4 h-4 mt-0.5 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                        <path
                          d="M1.5 4.5L3.5 6.5L7.5 2.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-emerald-700 text-[13px] font-semibold mb-0.5">
                        Message sent!
                      </p>
                      <p className="text-emerald-600 text-[12px] leading-relaxed">
                        Our support team will reach you shortly. Redirecting…
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loader}
                  className="mt-2 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold transition-all duration-200 shadow-sm shadow-red-200 hover:shadow-red-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loader ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/img/logo.png"
                      alt="BITSS logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">
                    This form is powered by BITSS cyber security
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Copyright size={11} /> 2026 BFIN. BITSS by BFIN. All rights
                    reserved.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* ── MAP ── */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/80 overflow-hidden h-full min-h-[500px]">
              <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5795.795980198256!2d3.708454!3d43.420958!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b1357c2efa6fbb%3A0xddfc93666aef9f37!2s8%20Rue%20de%20Dublin%2C%2034200%20S%C3%A8te%2C%20France!5e0!3m2!1sen!2sbd!4v1723619506631!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
