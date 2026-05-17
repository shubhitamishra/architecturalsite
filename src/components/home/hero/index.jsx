'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import Image from "next/image"

const PROPERTIES = [
    {
        id: 1,
        name: "AURORA\nRESIDENCE",
        image: "/images/home-hero/picture1.jpg",
        thumb: "/images/home-hero/picture1.jpg",
        tag: "Residential · Lucknow",
    },
    {
        id: 2,
        name: "THAILIVING\nRESIDENCE",
        image: "/images/home-hero/picture2.jpeg",
        thumb: "/images/home-hero/picture2.jpeg",
        tag: "Luxury · Gurgaon",
    },
    {
        id: 3,
        name: "NOVA\nRESIDENCE",
        image: "/images/home-hero/picture3.webp",
        thumb: "/images/home-hero/picture3.webp",
        tag: "Interior · Delhi",
    },
]

function Crosshair({ visible }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={visible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
            <div className="relative w-10 h-10">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/70 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/70 -translate-x-1/2" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/70" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/70" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/70" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/70" />
            </div>
        </motion.div>
    )
}

/* ── thin ruled lines decoration ── */
function RuledLines({ className = "", style = {} }) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ opacity: 0.07, ...style }}>
            {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: "1px", background: "#c8a96e", marginBottom: "16px" }} />
            ))}
        </div>
    )
}

/* ── abstract dot grid ── */
function DotGrid({ className = "", style = {} }) {
    return (
        <div
            className={`absolute pointer-events-none ${className}`}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "10px",
                opacity: 0.12,
                ...style,
            }}
        >
            {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#c8a96e" }} />
            ))}
        </div>
    )
}

export default function Hero() {

    const [phase, setPhase] = useState("initial")
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase("blurReveal"), 200),
            setTimeout(() => setPhase("imageReveal"), 900),
            setTimeout(() => setPhase("thumbnailsReveal"), 1600),
            setTimeout(() => setPhase("done"), 2200),
        ]
        const slider = setInterval(() => {
            setActiveIndex((i) => (i + 1) % PROPERTIES.length)
        }, 5000)
        return () => {
            timers.forEach(clearTimeout)
            clearInterval(slider)
        }
    }, [])

    const showImage = ["imageReveal", "thumbnailsReveal", "done"].includes(phase)
    const showThumbs = ["thumbnailsReveal", "done"].includes(phase)
    const showMeta = phase === "done"

    const prev = () => setActiveIndex((i) => (i - 1 + PROPERTIES.length) % PROPERTIES.length)
    const next = () => setActiveIndex((i) => (i + 1) % PROPERTIES.length)

    const active = PROPERTIES[activeIndex]
    const thumbs = PROPERTIES.filter((_, i) => i !== activeIndex)

    return (
        <>
            <style>{`
                .hero-section {
                    position: relative;
                }
                /* grain overlay on entire hero */
                .hero-section::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 5;
                }
                /* slide counter */
                @keyframes progress-bar {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                .progress-bar {
                    animation: progress-bar 5s linear infinite;
                    transform-origin: left;
                }
            `}</style>

            <section className="hero-section relative w-full h-full pt-36 pb-12 md:pb-20 bg-primary-brown text-white overflow-hidden">

                {/* ── AMBIENT ORBS — upgraded from plain amber blobs ── */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* top-left warm amber */}
                    <div style={{ position:"absolute", width:"650px", height:"650px", top:"-200px", left:"-200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,169,110,0.14) 0%, rgba(158,124,90,0.06) 50%, transparent 70%)", filter:"blur(120px)" }} />
                    {/* bottom-right deep amber */}
                    <div style={{ position:"absolute", width:"750px", height:"750px", bottom:"-280px", right:"-220px", borderRadius:"50%", background:"radial-gradient(circle, rgba(200,169,110,0.12) 0%, rgba(120,90,60,0.06) 50%, transparent 70%)", filter:"blur(140px)" }} />
                    {/* center subtle gold */}
                    <div style={{ position:"absolute", width:"500px", height:"500px", top:"35%", left:"28%", borderRadius:"50%", background:"radial-gradient(circle, rgba(212,184,150,0.07) 0%, transparent 70%)", filter:"blur(100px)" }} />
                </div>

                {/* ── ABSTRACT GEOMETRIC ELEMENTS ── */}

                {/* Large concentric circle outlines — top right */}
                <div style={{ position:"absolute", width:"700px", height:"700px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.08)", top:"-250px", right:"-200px", pointerEvents:"none", zIndex:1 }} />
                <div style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.06)", top:"-150px", right:"-100px", pointerEvents:"none", zIndex:1 }} />
                <div style={{ position:"absolute", width:"300px", height:"300px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.05)", top:"-60px", right:"-20px", pointerEvents:"none", zIndex:1 }} />

                {/* Bottom-left concentric rings */}
                <div style={{ position:"absolute", width:"500px", height:"500px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.06)", bottom:"-180px", left:"-180px", pointerEvents:"none", zIndex:1 }} />
                <div style={{ position:"absolute", width:"320px", height:"320px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.05)", bottom:"-100px", left:"-80px", pointerEvents:"none", zIndex:1 }} />

                {/* Vertical gold accent line — left edge */}
                <div style={{ position:"absolute", left:"clamp(14px,2.5vw,28px)", top:"80px", bottom:"80px", width:"1px", background:"linear-gradient(to bottom, transparent, rgba(200,169,110,0.2), transparent)", pointerEvents:"none", zIndex:2 }} />

                {/* Vertical gold accent line — right edge */}
                <div style={{ position:"absolute", right:"clamp(14px,2.5vw,28px)", top:"80px", bottom:"80px", width:"1px", background:"linear-gradient(to bottom, transparent, rgba(200,169,110,0.15), transparent)", pointerEvents:"none", zIndex:2 }} />

                {/* Ruled lines — top left */}
                <RuledLines className="top-24 left-16 w-28 hidden lg:block" />

                {/* Dot grid — bottom right desktop */}
                <DotGrid className="bottom-20 right-16 hidden lg:block" />

                {/* Diamond accent — top center */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.35, scale: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    style={{
                        position: "absolute", top: "80px", left: "50%",
                        transform: "translateX(-50%) rotate(45deg)",
                        width: 8, height: 8,
                        background: "#c8a96e",
                        pointerEvents: "none", zIndex: 3,
                    }}
                />

                {/* Horizontal gold rule — top */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    style={{
                        position: "absolute", top: "80px", left: "5%", right: "5%",
                        height: "1px",
                        background: "linear-gradient(to right, transparent, rgba(200,169,110,0.25), transparent)",
                        transformOrigin: "left",
                        pointerEvents: "none", zIndex: 3,
                    }}
                />

                {/* ── SLIDE PROGRESS BAR ── */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "2px",
                    background: "rgba(200,169,110,0.12)",
                    zIndex: 20, pointerEvents: "none",
                }}>
                    <div
                        key={activeIndex}
                        className="progress-bar"
                        style={{
                            height: "100%",
                            background: "linear-gradient(to right, #c8a96e, #9e7c5a)",
                        }}
                    />
                </div>

                {/* ── SLIDE COUNTER — sits below navbar, right edge ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showMeta ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: "absolute", top: "180px", right: "clamp(20px,4vw,52px)",
                        zIndex: 20, pointerEvents: "none",
                        flexDirection: "column", alignItems: "flex-end", gap: "4px",
                    }}
                    className="hidden lg:flex"
                >
                    <span style={{ fontFamily:"var(--font-lato)", fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", color:"rgba(200,169,110,0.6)" }}>
                        Project
                    </span>
                    <span style={{ fontFamily:"var(--font-cormorant-garamond)", fontSize:"2rem", fontWeight:300, color:"rgba(232,217,184,0.4)", lineHeight:1 }}>
                        0{activeIndex + 1}
                    </span>
                    <span style={{ fontFamily:"var(--font-lato)", fontSize:"8px", letterSpacing:"0.2em", color:"rgba(200,169,110,0.3)" }}>
                        / 0{PROPERTIES.length}
                    </span>
                </motion.div>

                {/* ── COMPANY TAG — bottom left ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: showMeta ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    style={{
                        position: "absolute", bottom: "clamp(48px,6vw,70px)", left: "clamp(20px,4vw,48px)",
                        zIndex: 20, pointerEvents: "none",
                    }}
                    className="hidden lg:block"
                >
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                        <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:"1px solid rgba(200,169,110,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#c8a96e" }} />
                        </div>
                        <p style={{ fontFamily:"var(--font-oswald)", fontSize:"0.7rem", letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(232,217,184,0.55)", fontWeight:300 }}>
                            Architecture Site
                        </p>
                    </div>
                    <div style={{ height:"1px", background:"linear-gradient(to right, rgba(200,169,110,0.3), transparent)", width:"120px" }} />
                </motion.div>


                <div className="relative min-h-[580px] max-w-[1500px] mx-auto overflow-hidden z-10">

                    {/* LEFT TEXT — anchored just below "Elegant" (bottom-[70%]) */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: phase !== "initial" ? 1 : 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="absolute left-6 lg:left-10 text-xs sm:text-sm text-white/60 leading-relaxed max-w-[220px] hidden lg:block"
                        style={{ fontFamily:"var(--font-poppins)", bottom:"calc(70% - 72px)" }}
                    >
                        A world of comfort, security,
                        <br />
                        and personalized service await
                    </motion.p>

                    {/* subtle accent line next to left text */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: showMeta ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{
                            position: "absolute", left: "calc(clamp(24px,2.5vw,40px) - 12px)",
                            bottom: "calc(70% - 60px)",
                            width: "1px", height: "50px",
                            background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.45), transparent)",
                            transformOrigin: "top",
                        }}
                        className="hidden lg:block"
                    />

                    {/* MAIN IMAGE SLIDER DESKTOP */}
                    <div className="hidden lg:block absolute left-[45%] w-[clamp(260px,22vw,350px)] h-[clamp(420px,50vw,550px)] top-0 bottom-0 z-20">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0 }}
                                animate={showImage ? { opacity: 1 } : { opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 overflow-hidden rounded-xl"
                            >
                                {/* offset border frame — abstract accent */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    borderRadius: "0.75rem",
                                    border: "1px solid rgba(200,169,110,0.3)",
                                    transform: "translate(8px, 8px)",
                                    zIndex: -1, pointerEvents: "none",
                                }} />

                                <Image
                                    src={active.image}
                                    alt={active.name}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full rounded-xl object-cover"
                                />

                                {/* warm amber tint at bottom */}
                                <div style={{
                                    position: "absolute", inset: 0, borderRadius: "0.75rem",
                                    background: "linear-gradient(to top, rgba(28,21,16,0.55) 0%, rgba(200,169,110,0.05) 40%, transparent 65%)",
                                }} />

                                {/* active tag chip */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active.id + "-tag"}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            position: "absolute", top: "14px", left: "14px",
                                            background: "rgba(28,21,16,0.52)",
                                            backdropFilter: "blur(8px)",
                                            color: "#e8d9b8",
                                            fontSize: "9px",
                                            letterSpacing: "0.18em",
                                            textTransform: "uppercase",
                                            padding: "4px 12px",
                                            borderRadius: "100px",
                                            fontFamily: "var(--font-lato)",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {active.tag}
                                    </motion.div>
                                </AnimatePresence>

                                {/* corner glow */}
                                <div style={{
                                    position: "absolute", top: 0, right: 0,
                                    width: "120px", height: "120px",
                                    background: "radial-gradient(circle at top right, rgba(200,169,110,0.22), transparent 70%)",
                                    borderRadius: "0 0.75rem 0 0",
                                    pointerEvents: "none",
                                }} />
                            </motion.div>
                        </AnimatePresence>

                        <Crosshair visible={showImage} />

                        <div className="absolute bottom-6 w-full text-center text-[10px] tracking-[0.25em]" style={{ fontFamily:"var(--font-lato)" }}>
                            {active.name.split("\n").map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </div>


                    {/* HEADINGS */}
                    <motion.h1
                        initial={{ filter: "blur(24px)", opacity: 0.3 }}
                        animate={{ filter: phase === "initial" ? "blur(24px)" : "blur(0)", opacity: 1 }}
                        className="max-sm:text-center lg:absolute left-4 lg:left-0 bottom-[70%] text-7xl sm:text-9xl md:text-[8rem] font-cormorant-garamond pl-2 lg:pl-8 z-30 uppercase font-semibold text-cream"
                    >
                        Elegant
                    </motion.h1>

                    <motion.h1
                        initial={{ filter: "blur(24px)", opacity: 0.3 }}
                        animate={{ filter: phase === "initial" ? "blur(24px)" : "blur(0)", opacity: 1 }}
                        className="max-sm:text-center lg:absolute right-2 lg:right-0 bottom-[45%] text-7xl sm:text-9xl md:text-[8rem] italic font-cormorant-garamond pr-2 lg:pr-8 z-30 uppercase font-semibold text-cream"
                    >
                        Living
                    </motion.h1>


                    {/* RIGHT TEXT — anchored just below "Living" (bottom-[45%]) */}
                    <motion.p
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: showMeta ? 1 : 0, x: 0 }}
                        className="absolute right-6 lg:right-8 text-right text-xs sm:text-sm text-white/60 max-w-[240px] hidden lg:block"
                        style={{ fontFamily:"var(--font-poppins)", bottom:"calc(45% - 64px)" }}
                    >
                        A collection of exclusive homes
                        <br />
                        designed for those who value privacy
                    </motion.p>


                    {/* ── MOBILE VERSION ── */}
                    <div className="lg:hidden mx-4 relative">

                        {/* Mobile: dot cluster eyebrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase !== "initial" ? 1 : 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}
                        >
                            {[0,1,2].map(i => (
                                <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:"#c8a96e", opacity: 1 - i*0.28 }} />
                            ))}
                            <p style={{ fontFamily:"var(--font-lato)", fontSize:"9px", letterSpacing:"0.24em", textTransform:"uppercase", color:"rgba(200,169,110,0.7)", fontWeight:600, marginLeft:"4px" }}>
                                Architecture Site
                            </p>
                        </motion.div>

                        {/* Mobile main image with frame */}
                        <div style={{ position:"relative" }}>
                            {/* offset frame */}
                            <div style={{
                                position: "absolute", inset: 0,
                                borderRadius: "1rem",
                                border: "1px solid rgba(200,169,110,0.3)",
                                transform: "translate(6px, 6px)",
                                zIndex: 0,
                            }} />

                            <div style={{ borderRadius:"1rem", overflow:"hidden", position:"relative", zIndex:1 }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        style={{ position:"relative" }}
                                    >
                                        <img
                                            src={active.image}
                                            className="w-full object-cover aspect-square brightness-80"
                                            alt={active.name}
                                        />

                                        {/* warm gradient overlay */}
                                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(28,21,16,0.65) 0%, rgba(200,169,110,0.04) 45%, transparent 70%)" }} />

                                        {/* corner glow */}
                                        <div style={{ position:"absolute", top:0, right:0, width:"140px", height:"140px", background:"radial-gradient(circle at top right, rgba(200,169,110,0.2), transparent 70%)" }} />

                                        {/* bottom-left: project name */}
                                        <div style={{ position:"absolute", bottom:"18px", left:"18px", right:"80px" }}>
                                            {/* thin gold rule */}
                                            <div style={{ height:"1px", background:"linear-gradient(to right, rgba(200,169,110,0.6), transparent)", marginBottom:"8px", width:"60px" }} />
                                            <p style={{ fontFamily:"var(--font-lato)", fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(200,169,110,0.8)", fontWeight:600, marginBottom:"2px" }}>
                                                {active.tag}
                                            </p>
                                            <p style={{ fontFamily:"var(--font-cormorant-garamond)", fontSize:"1.1rem", fontWeight:400, color:"rgba(232,217,184,0.9)", letterSpacing:"0.04em", lineHeight:1.2 }}>
                                                {active.name.replace("\n", " ")}
                                            </p>
                                        </div>

                                        {/* bottom-right: slide counter */}
                                        <div style={{ position:"absolute", bottom:"18px", right:"18px", textAlign:"right" }}>
                                            <p style={{ fontFamily:"var(--font-cormorant-garamond)", fontSize:"1.8rem", fontWeight:300, color:"rgba(200,169,110,0.45)", lineHeight:1 }}>
                                                0{activeIndex + 1}
                                            </p>
                                            <p style={{ fontFamily:"var(--font-lato)", fontSize:"8px", letterSpacing:"0.18em", color:"rgba(200,169,110,0.3)", textTransform:"uppercase" }}>
                                                / 0{PROPERTIES.length}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile: thumbnail strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase !== "initial" ? 1 : 0, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            style={{ display:"flex", gap:"8px", marginTop:"12px" }}
                        >
                            {PROPERTIES.map((prop, i) => (
                                <button
                                    key={prop.id}
                                    onClick={() => setActiveIndex(i)}
                                    style={{
                                        flex: i === activeIndex ? "2" : "1",
                                        height: "52px",
                                        borderRadius: "0.5rem",
                                        overflow: "hidden",
                                        position: "relative",
                                        border: i === activeIndex ? "1px solid rgba(200,169,110,0.55)" : "1px solid rgba(255,255,255,0.08)",
                                        transition: "flex 0.5s ease, border-color 0.4s ease",
                                        cursor: "pointer",
                                    }}
                                >
                                    <img src={prop.thumb} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover", filter:`brightness(${i === activeIndex ? 0.85 : 0.55})` }} />
                                    {i === activeIndex && (
                                        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(200,169,110,0.15), transparent)" }} />
                                    )}
                                </button>
                            ))}
                        </motion.div>

                        {/* Mobile: ruled lines decoration */}
                        <div style={{ position:"absolute", top:"8px", right:"-8px", width:"80px", opacity:0.07, pointerEvents:"none" }}>
                            {[0,1,2].map(i => <div key={i} style={{ height:"1px", background:"#c8a96e", marginBottom:"10px" }} />)}
                        </div>

                        {/* Mobile: arrows row */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase !== "initial" ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            style={{ display:"flex", justifyContent:"flex-end", gap:"10px", marginTop:"14px" }}
                        >
                            {[{ fn: prev, Icon: FaArrowLeft }, { fn: next, Icon: FaArrowRight }].map(({ fn, Icon }, i) => (
                                <button
                                    key={i}
                                    onClick={fn}
                                    style={{
                                        width:"38px", height:"38px", borderRadius:"50%",
                                        border:"1px solid rgba(200,169,110,0.3)",
                                        background:"rgba(200,169,110,0.08)",
                                        color:"rgba(232,217,184,0.8)",
                                        display:"flex", alignItems:"center", justifyContent:"center",
                                        cursor:"pointer",
                                    }}
                                >
                                    <Icon size={11} />
                                </button>
                            ))}
                        </motion.div>
                    </div>


                    {/* THUMBNAILS DESKTOP */}
                    <AnimatePresence mode="popLayout">
                        {thumbs.map((prop, i) => (
                            <motion.div
                                key={prop.id}
                                initial={{ opacity: 0 }}
                                animate={showThumbs ? { opacity: 1 } : { opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.08 }}
                                className="hidden lg:block absolute bottom-8 w-[220px] xl:w-[270px] h-[220px] xl:h-[270px] rounded-lg overflow-hidden border border-white/10 cursor-pointer group"
                                style={{ left: i === 0 ? "2rem" : "24%" }}
                                onClick={() => setActiveIndex(PROPERTIES.findIndex((p) => p.id === prop.id))}
                            >
                                {/* offset border frame on thumbnails */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    borderRadius: "0.5rem",
                                    border: "1px solid rgba(200,169,110,0.22)",
                                    transform: "translate(5px, 5px)",
                                    zIndex: -1, pointerEvents: "none",
                                }} />

                                <img
                                    src={prop.thumb}
                                    alt={prop.name}
                                    className="w-full h-full object-cover brightness-75 transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* warm overlay */}
                                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(28,21,16,0.55) 0%, transparent 55%)" }} />

                                {/* corner glow */}
                                <div style={{ position:"absolute", top:0, right:0, width:"80px", height:"80px", background:"radial-gradient(circle at top right, rgba(200,169,110,0.18), transparent 70%)", opacity:0, transition:"opacity 0.4s ease" }}
                                    className="group-hover:opacity-100"
                                />

                                <div className="absolute bottom-3 w-full text-center text-[9px] tracking-[0.2em] text-white/60" style={{ fontFamily:"var(--font-lato)" }}>
                                    {prop.name.split("\n").map((line, idx) => (
                                        <div key={idx}>{line}</div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>


                    {/* ARROWS — desktop only */}
                    <div className="hidden lg:flex absolute bottom-6 right-6 gap-3 z-30">
                        <button
                            onClick={prev}
                            className="size-10 lg:size-20 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                border: "1px solid rgba(200,169,110,0.3)",
                                background: "rgba(200,169,110,0.08)",
                                color: "rgba(232,217,184,0.8)",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background="rgba(200,169,110,0.18)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.55)" }}
                            onMouseLeave={e => { e.currentTarget.style.background="rgba(200,169,110,0.08)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.3)" }}
                        >
                            <FaArrowLeft size={12} />
                        </button>

                        <button
                            onClick={next}
                            className="size-10 lg:size-20 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                border: "1px solid rgba(200,169,110,0.3)",
                                background: "rgba(200,169,110,0.08)",
                                color: "rgba(232,217,184,0.8)",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background="rgba(200,169,110,0.18)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.55)" }}
                            onMouseLeave={e => { e.currentTarget.style.background="rgba(200,169,110,0.08)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.3)" }}
                        >
                            <FaArrowRight size={12} />
                        </button>
                    </div>

                </div>

            </section>
        </>
    )
}