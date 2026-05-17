'use client'

import Container from "@/components/container"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { MdArrowOutward } from "react-icons/md"

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CHANNELS = [
    {
        id: "01",
        label: "Email Us",
        value: "shubhitamishra@gmail.com",
        sub: "We respond within 24 hours",
        href: "mailto:shubhitamishra@gmail.com",
        accent: "#c8a96e",
        image: "/images/projects/paralax/1.png",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
            </svg>
        ),
    },
    {
        id: "02",
        label: "Call / WhatsApp",
        value: "+91 xxxxxxxxxx",
        sub: "Mon – Sat, 10am – 7pm IST",
        href: "#",
        accent: "#9e7c5a",
        image: "/images/projects/paralax/2.jpeg",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
        ),
    },
    {
        id: "03",
        label: "Instagram",
        value: "@architecturesite",
        sub: "See our latest projects & updates",
        href: "https://instagram.com/architecturesite",
        accent: "#b5975e",
        image: "/images/projects/paralax/3.png",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
        ),
    },
    {
        id: "04",
        label: "Visit Our Studio",
        value: "SF-204, The Peach Tree Complex",
        sub: "Block-C, Sushant Lok Phase-1, Sector-43, Gurgaon — 122002",
        href: "https://maps.google.com/?q=Sushant+Lok+Phase+1+Sector+43+Gurgaon",
        accent: "#a08060",
        image: "/images/projects/paralax/4.png",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
            </svg>
        ),
    },
]

const PROJECT_TYPES = [
    "Residential Interior",
    "Commercial Interior",
    "Architecture & Construction",
    "Farmhouse / Villa",
    "Turnkey Project",
    "Landscape Design",
    "Other",
]

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.8, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
}

/* ─────────────────────────────────────────────
   CHANNEL CARD
   Dynamic accent colours must stay as inline
   style — but we now use separate border-width /
   border-style / border-color so Framer Motion
   never conflicts with a shorthand on rerender.
───────────────────────────────────────────── */
function ChannelCard({ channel, index }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <motion.a
            ref={ref}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="group relative flex flex-col overflow-hidden no-underline"
            style={{
                borderRadius: "1.25rem",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `${channel.accent}28`,
                background: "#faf9f6",
                minHeight: "300px",
                transition: "box-shadow 0.45s ease",
            }}
            whileHover={{
                boxShadow: `0 0 0 1px ${channel.accent}55, 0 24px 64px -12px rgba(158,124,90,0.2)`,
            }}
        >
            {/* offset frame on hover */}
            <div
                className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-[400ms] group-hover:opacity-100 z-0"
                style={{
                    borderRadius: "1.25rem",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: `${channel.accent}33`,
                    transform: "translate(7px, 7px)",
                }}
            />

            {/* IMAGE */}
            <div className="relative overflow-hidden flex-shrink-0" style={{ height: "140px", borderRadius: "1.25rem 1.25rem 0 0" }}>
                <Image
                    src={channel.image}
                    alt={channel.label}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                />

                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(160deg, ${channel.accent}18 0%, rgba(28,21,16,0.58) 100%)` }} />

                {/* id badge */}
                <div className="absolute top-[13px] left-[13px] w-[30px] h-[30px] rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)" }}>
                    <span className="text-[9px] font-bold tracking-[0.06em]"
                        style={{ fontFamily: "var(--font-lato)", color: channel.accent }}>
                        {channel.id}
                    </span>
                </div>

                {/* icon chip */}
                <div className="absolute top-[13px] right-[13px] p-[7px] rounded-lg flex items-center text-[#e8d9b8]"
                    style={{ background: "rgba(28,21,16,0.48)", backdropFilter: "blur(8px)" }}>
                    {channel.icon}
                </div>

                {/* label chip */}
                <div className="absolute bottom-[13px] left-[13px] text-[9px] font-semibold tracking-[0.2em] uppercase text-[#e8d9b8] px-[11px] py-[4px] rounded-full"
                    style={{ fontFamily: "var(--font-lato)", background: "rgba(28,21,16,0.52)", backdropFilter: "blur(6px)" }}>
                    {channel.label}
                </div>

                {/* corner glow */}
                <div className="absolute top-0 right-0 w-[120px] h-[120px] pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${channel.accent}30, transparent 70%)` }} />
            </div>

            {/* TEXT BODY */}
            <div className="flex flex-col flex-1 justify-between gap-3 p-[18px_20px_20px]">
                <div>
                    <p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-2"
                        style={{ fontFamily: "var(--font-lato)", color: channel.accent }}>
                        {channel.label}
                    </p>

                    <div className="h-px mb-3"
                        style={{ background: `linear-gradient(to right, ${channel.accent}99, transparent)` }} />

                    <p className="font-bold text-[#2c2318] tracking-[0.01em] leading-[1.4] mb-1"
                        style={{ fontFamily: "var(--font-lato)", fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
                        {channel.value}
                    </p>

                    <p className="text-[0.72rem] font-normal text-[#a08060] tracking-[0.02em] leading-[1.65]"
                        style={{ fontFamily: "var(--font-lato)" }}>
                        {channel.sub}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-[10px]"
                    style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: `${channel.accent}22` }}>
                    <span
                        className="text-[9px] font-bold tracking-[0.22em] uppercase opacity-0 transition-opacity duration-[350ms] group-hover:opacity-100"
                        style={{ fontFamily: "var(--font-lato)", color: channel.accent }}
                    >
                        Open ↗
                    </span>
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-[background,color] duration-[350ms] group-hover:bg-[#2c2318] group-hover:text-[#c8a96e]"
                        style={{
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: `${channel.accent}44`,
                            color: channel.accent,
                        }}
                    >
                        <MdArrowOutward size={13} />
                    </div>
                </div>
            </div>
        </motion.a>
    )
}

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────── */
function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-[7px]">
            <label className="block text-[9px] font-bold tracking-[0.22em] uppercase text-[#b09070]"
                style={{ fontFamily: "var(--font-lato)" }}>
                {label}
            </label>
            {children}
        </div>
    )
}

/*
  Shared classes for every input / select / textarea.
  Key fix: focus:border-[color] replaces borderColor from a
  separate inline object — no shorthand/longhand conflict.
*/
const inputCls = [
    "w-full rounded-xl px-4 py-[13px]",
    "bg-white/70 text-[#2c2318] placeholder:text-[#c0a882]",
    "text-[0.88rem] tracking-[0.01em] leading-normal",
    "outline-none",
    "border border-[rgba(200,169,110,0.22)]",
    "focus:border-[rgba(200,169,110,0.7)] focus:bg-white focus:ring-[3px] focus:ring-[rgba(200,169,110,0.10)]",
    "transition-[border-color,box-shadow,background] duration-300",
].join(" ")

/* ─────────────────────────────────────────────
   CONTACT FORM  — pure Tailwind, no inline
   style on interactive state props
───────────────────────────────────────────── */
function ContactForm() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })

    const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "", message: "" })
    const [status, setStatus] = useState("idle") // idle | loading | success | error

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus("loading")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error("Failed")
            setStatus("success")
            setForm({ name: "", email: "", phone: "", projectType: "", message: "" })
        } catch {
            setStatus("error")
        }
    }

    return (
        <motion.div
            ref={ref}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex flex-col overflow-hidden h-full rounded-3xl bg-[#faf9f6] p-[clamp(28px,4vw,44px)]"
            style={{
                /*
                  Use separate longhands — never the `border` shorthand —
                  so Framer Motion's rerender never has to remove a property
                  that conflicts with one it set.
                */
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(200,169,110,0.22)",
            }}
        >
            {/* ambient orb */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(200,169,110,0.10) 0%, transparent 70%)" }} />

            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-7">
                <div className="flex gap-[5px]">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-[#c8a96e]" style={{ opacity: 1 - i * 0.3 }} />
                    ))}
                </div>
                <p className="text-[10px] font-semibold tracking-[0.26em] uppercase text-[#b09070]"
                    style={{ fontFamily: "var(--font-lato)" }}>
                    Send Us a Message
                </p>
            </div>

            {/* heading */}
            <h2
                className="font-light text-[#2c2318] leading-[1.15] tracking-[-0.02em] mb-2"
                style={{ fontFamily: "var(--font-cormorant-garamond)", fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}
            >
                Tell us about<br />
                <em className="not-italic text-[#c8a96e]">your vision.</em>
            </h2>

            {/* divider rule */}
            <div className="h-px mb-7 max-w-[200px]"
                style={{ background: "linear-gradient(to right, rgba(200,169,110,0.33), transparent)" }} />

            {/* ── SUCCESS STATE ── */}
            {status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-10">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-[#c8a96e]"
                        style={{ borderWidth: "1.5px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.5)" }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-[1.6rem] font-normal text-[#2c2318] mb-2"
                            style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
                            Message Received
                        </p>
                        <p className="text-[0.82rem] text-[#a08060] leading-[1.7]"
                            style={{ fontFamily: "var(--font-lato)" }}>
                            Thank you for reaching out. We'll get back to you within 24 hours.
                        </p>
                    </div>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-2 text-[9px] font-bold tracking-[0.22em] uppercase text-[#c8a96e] bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                        style={{ fontFamily: "var(--font-lato)" }}
                    >
                        Send another →
                    </button>
                </div>
            ) : (
                /* ── FORM ── */
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3.5">
                        <Field label="Full Name *">
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Phone">
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+91 98xxx xxxxx"
                                value={form.phone}
                                onChange={handleChange}
                                className={inputCls}
                            />
                        </Field>
                    </div>

                    {/* Email */}
                    <Field label="Email Address *">
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className={inputCls}
                        />
                    </Field>

                    {/* Project Type */}
                    <Field label="Project Type *">
                        <div className="relative">
                            <select
                                name="projectType"
                                required
                                value={form.projectType}
                                onChange={handleChange}
                                className={[
                                    inputCls,
                                    "appearance-none cursor-pointer pr-10",
                                    form.projectType ? "text-[#2c2318]" : "text-[#b09070]",
                                ].join(" ")}
                            >
                                <option value="" disabled>Select a project type…</option>
                                {PROJECT_TYPES.map(t => (
                                    <option key={t} value={t} className="text-[#2c2318]">{t}</option>
                                ))}
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#c8a96e]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </div>
                        </div>
                    </Field>

                    {/* Message */}
                    <Field label="Your Message *">
                        <textarea
                            name="message"
                            required
                            placeholder="Tell us about your project — size, style, timeline, budget…"
                            value={form.message}
                            onChange={handleChange}
                            rows={5}
                            className={[inputCls, "resize-none leading-[1.7]"].join(" ")}
                        />
                    </Field>

                    {/* Error message */}
                    {status === "error" && (
                        <p className="text-[0.78rem] text-red-500 tracking-[0.02em]"
                            style={{ fontFamily: "var(--font-lato)" }}>
                            Something went wrong. Please try again or reach out directly.
                        </p>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className={[
                            "mt-auto w-full flex items-center justify-center gap-2.5",
                            "rounded-xl py-[15px] px-7",
                            "text-[10px] font-bold tracking-[0.26em] uppercase text-[#c8a96e]",
                            "transition-[background-color,box-shadow,transform] duration-300",
                            status === "loading"
                                ? "bg-[rgba(200,169,110,0.6)] cursor-not-allowed"
                                : "bg-[#2c2318] cursor-pointer hover:bg-[#3d3025] hover:shadow-[0_8px_32px_-8px_rgba(44,35,24,0.4)] hover:-translate-y-px active:translate-y-0",
                        ].join(" ")}
                        style={{ fontFamily: "var(--font-lato)" }}
                    >
                        {status === "loading" ? (
                            <>
                                <svg
                                    width="14" height="14" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="animate-spin"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                </svg>
                                Sending…
                            </>
                        ) : (
                            <>
                                Send Message
                                <MdArrowOutward size={14} />
                            </>
                        )}
                    </button>
                </form>
            )}
        </motion.div>
    )
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ContactMain() {
    const cardsRef = useRef(null)
    const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" })
    const closingRef = useRef(null)
    const closingInView = useInView(closingRef, { once: true, margin: "-60px" })

    return (
        <>
            {/*
              Only genuine pseudo-element rules (::before) remain in <style>.
              Every layout / colour / spacing concern is Tailwind.
            */}
            <style>{`
                .contact-section::before {
                    content: '';
                    position: absolute; inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
                    pointer-events: none; z-index: 0;
                }
                .hero-band::before {
                    content: '';
                    position: absolute; inset: 0; border-radius: inherit;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
                    pointer-events: none; z-index: 1;
                }
            `}</style>

            <section className="contact-section relative overflow-hidden bg-[#f7f4ef] pt-36 pb-28">

                {/* AMBIENT ORBS */}
                <div className="absolute -top-[100px] -right-[150px] w-[600px] h-[600px] rounded-full pointer-events-none blur-[90px] z-0"
                    style={{ background: "radial-gradient(circle, rgba(200,169,110,0.13) 0%, transparent 70%)" }} />
                <div className="absolute top-[45%] -left-[120px] w-[440px] h-[440px] rounded-full pointer-events-none blur-[80px] z-0"
                    style={{ background: "radial-gradient(circle, rgba(158,124,90,0.10) 0%, transparent 70%)" }} />
                <div className="absolute bottom-[8%] right-[6%] w-[300px] h-[300px] rounded-full pointer-events-none blur-[70px] z-0"
                    style={{ background: "radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 70%)" }} />

                {/* ruled lines */}
                <div className="absolute top-[110px] right-[52px] w-[140px] opacity-[0.055] z-0 pointer-events-none space-y-4">
                    {[0, 1, 2, 3].map(i => <div key={i} className="h-px bg-[#6b5c45]" />)}
                </div>

                {/* circle outlines */}
                <div className="absolute rounded-full pointer-events-none z-0"
                    style={{ width: "800px", height: "800px", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.07)", bottom: "-300px", left: "-220px" }} />
                <div className="absolute rounded-full pointer-events-none z-0"
                    style={{ width: "550px", height: "550px", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.05)", bottom: "-190px", left: "-90px" }} />

                <Container>
                    <div className="relative z-10 space-y-14">

                        {/* ── DARK HERO BAND ── */}
                        <div className="hero-band relative overflow-hidden rounded-[1.75rem] bg-[#1c1510]">

                            {/* bg image */}
                            <div className="absolute inset-0 overflow-hidden rounded-[inherit] z-0">
                                <Image
                                    src="/images/contact-bg.jpg"
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover opacity-10"
                                    style={{ filter: "saturate(0.5)" }}
                                />
                            </div>

                            {/* inner orb */}
                            <div className="absolute -top-[80px] -right-[60px] w-[480px] h-[480px] rounded-full pointer-events-none blur-[70px] z-[1]"
                                style={{ background: "radial-gradient(circle, rgba(200,169,110,0.16) 0%, transparent 70%)" }} />

                            {/* rings */}
                            <div className="absolute pointer-events-none z-[1]"
                                style={{ width: "620px", height: "620px", borderRadius: "50%", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.07)", bottom: "-260px", right: "-160px" }} />
                            <div className="absolute pointer-events-none z-[1]"
                                style={{ width: "420px", height: "420px", borderRadius: "50%", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.05)", bottom: "-170px", right: "-70px" }} />

                            {/* vertical gold line */}
                            <div className="absolute top-10 bottom-10 w-px pointer-events-none z-[2]"
                                style={{ left: "clamp(32px,6vw,50px)", background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.25), transparent)" }} />

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] relative z-10">

                                {/* LEFT: text */}
                                <div style={{ padding: "clamp(48px,7vw,88px) clamp(32px,5vw,64px)" }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="flex items-center gap-3.5 mb-7"
                                    >
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="w-[5px] h-[5px] rounded-full bg-[#c8a96e]" style={{ opacity: 1 - i * 0.28 }} />
                                            ))}
                                        </div>
                                        <p className="text-[11px] tracking-[0.26em] uppercase text-[#7a6a58] font-medium"
                                            style={{ fontFamily: "var(--font-lato)" }}>
                                            Contact Architecture Site
                                        </p>
                                    </motion.div>

                                    <motion.h1
                                        initial={{ opacity: 0, y: 28 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        className="font-light text-[#e8ddd0] leading-[1.1] tracking-[-0.02em] mb-6"
                                        style={{ fontFamily: "var(--font-cormorant-garamond)", fontSize: "clamp(2.8rem,5.5vw,5rem)" }}
                                    >
                                        Let's build something{" "}
                                        <em className="not-italic text-[#c8a96e]">remarkable.</em>
                                    </motion.h1>

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 1.0, delay: 0.3 }}
                                        className="h-px mb-6 max-w-[320px] origin-left"
                                        style={{ background: "linear-gradient(to right, rgba(200,169,110,0.4), transparent)" }}
                                    />

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.35 }}
                                        className="text-[0.9rem] text-[#7a6a58] leading-[1.85] max-w-[420px]"
                                        style={{ fontFamily: "var(--font-poppins)" }}
                                    >
                                        Whether you're planning a new home, a luxury apartment, or a large-scale
                                        development — we'd love to hear your vision. Reach out directly through
                                        any channel below.
                                    </motion.p>

                                    {/* company identity tag */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7, delay: 0.5 }}
                                        className="flex items-center gap-3 mt-9 pt-[26px]"
                                        style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(200,169,110,0.14)" }}
                                    >
                                        <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(200,169,110,0.38)" }}>
                                            <div className="w-2 h-2 rounded-full bg-[#c8a96e]" />
                                        </div>
                                        <div>
                                            <p className="text-[0.82rem] tracking-[0.13em] uppercase text-[#e8ddd0] font-light"
                                                style={{ fontFamily: "var(--font-oswald)" }}>
                                                Architecture Site
                                            </p>
                                            <p className="text-[9px] text-[#7a6a58] tracking-[0.16em] uppercase mt-0.5"
                                                style={{ fontFamily: "var(--font-lato)" }}>
                                                Architecture · Interiors · Turnkey · Landscape
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* RIGHT: stacked images */}
                                <motion.div
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    className="hidden lg:flex flex-col gap-3.5 p-5 pl-0"
                                >
                                    {[
                                        { src: "/images/projects/geetika/1.png", label: "Residential · Lucknow" },
                                        { src: "/images/projects/paonta/2.png", label: "Farmhouse · Gurgaon" },
                                    ].map((img, i) => (
                                        <div key={i} className="relative flex-1 rounded-[0.875rem] overflow-hidden min-h-[130px]">
                                            <Image src={img.src} alt={img.label}
                                                width={1000} height={1000}
                                                className="w-full h-full object-cover"
                                                style={{ filter: "saturate(0.9)" }} />
                                            <div className="absolute inset-0"
                                                style={{ background: "linear-gradient(to top, rgba(28,21,16,0.62) 0%, transparent 60%)" }} />
                                            <div className="absolute top-0 right-0 w-[100px] h-[100px]"
                                                style={{ background: "radial-gradient(circle at top right, rgba(200,169,110,0.22), transparent 70%)" }} />
                                            <p className="absolute bottom-[10px] left-3 text-[9px] tracking-[0.2em] uppercase font-semibold text-[rgba(232,217,184,0.72)]"
                                                style={{ fontFamily: "var(--font-lato)" }}>
                                                {img.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* ── SECTION LABEL + MAIN GRID ── */}
                        <div ref={cardsRef}>
                            <motion.div
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                animate={cardsInView ? "visible" : "hidden"}
                                className="flex items-center gap-4 mb-8"
                            >
                                <p className="text-[11px] tracking-[0.26em] uppercase text-[#b09070] font-medium whitespace-nowrap"
                                    style={{ fontFamily: "var(--font-lato)" }}>
                                    Get In Touch
                                </p>
                                <div className="flex-1 h-px"
                                    style={{ background: "linear-gradient(to right, rgba(200,169,110,0.27), transparent)" }} />
                                <div className="w-1.5 h-1.5 bg-[#c8a96e] rotate-45 opacity-55" />
                            </motion.div>

                            {/* Form | Cards grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                                <ContactForm />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {CHANNELS.map((channel, i) => (
                                        <ChannelCard key={channel.id} channel={channel} index={i} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── CLOSING BAR ── */}
                        <motion.div
                            ref={closingRef}
                            custom={0}
                            variants={fadeUp}
                            initial="hidden"
                            animate={closingInView ? "visible" : "hidden"}
                            className="flex items-center justify-between flex-wrap gap-5 pt-7"
                            style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(200,169,110,0.18)" }}
                        >
                            <p className="font-light tracking-[0.08em] uppercase text-[#2c2318]"
                                style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(1rem,2.2vw,1.3rem)" }}>
                                Architecture Site — Sector 43, Gurgaon
                            </p>
                            <p className="text-[0.78rem] text-[#b09070] tracking-[0.05em]"
                                style={{ fontFamily: "var(--font-lato)" }}>
                                Architecture · Interiors · Turnkey · Landscape
                            </p>
                        </motion.div>

                    </div>
                </Container>
            </section>
        </>
    )
}
