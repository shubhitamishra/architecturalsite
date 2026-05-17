'use client'

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

const lineReveal = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ── Grain SVG filter injected once ── */
function GrainFilter() {
    return (
        <svg width="0" height="0" style={{ position: "absolute" }}>
            <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feBlend in="SourceGraphic" mode="multiply" result="blend" />
                <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
        </svg>
    );
}

function AnimatedSection({ children, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
            {children}
        </motion.div>
    );
}

/* ── Abstract floating orb ── */
function Orb({ size, top, left, right, color, blur, opacity, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: opacity ?? 0.18, scale: 1 }}
            transition={{ duration: 2.5, delay, ease: "easeOut" }}
            style={{
                position: "absolute",
                width: size,
                height: size,
                top,
                left,
                right,
                borderRadius: "50%",
                background: color,
                filter: `blur(${blur ?? "60px"})`,
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}

/* ── Thin ruled lines decoration ── */
function RuledLines({ className = "" }) {
    return (
        <div className={`absolute pointer-events-none ${className}`} style={{ opacity: 0.06 }}>
            {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ height: "1px", background: "#6b5c45", marginBottom: "18px" }} />
            ))}
        </div>
    );
}

export default function AboutMain() {
    const visionRef = useRef(null);
    const visionInView = useInView(visionRef, { once: true, margin: "-80px" });
    const quoteRef = useRef(null);
    const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

    /* Parallax for the quote section orbs */
    const { scrollYProgress } = useScroll();
    const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    return (
        <>
            {/* Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                /* Grain texture overlay utility */
                .grain-overlay::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 1;
                    border-radius: inherit;
                }

                /* Subtle rotate on number */
                .stat-number {
                    background: linear-gradient(135deg, #2c2318 30%, #c8a96e);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>

            <GrainFilter />

            <section style={{ background: "#f7f4ef" }} className="font-sans pt-36 relative overflow-hidden">

                {/* ── BACKGROUND AMBIENT ORBS ── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <Orb size="520px" top="-80px" right="-120px" color="radial-gradient(circle, #c8a96e 0%, #e8c98e 50%, transparent 70%)" blur="100px" opacity={0.13} delay={0.3} />
                    <Orb size="380px" top="300px" left="-100px" color="radial-gradient(circle, #9e7c5a 0%, #c8a96e 60%, transparent 80%)" blur="90px" opacity={0.10} delay={0.6} />
                    <Orb size="250px" top="600px" right="10%" color="radial-gradient(circle, #d4b896 0%, transparent 70%)" blur="70px" opacity={0.12} delay={0.9} />
                </div>

                {/* Faint ruled lines top-right */}
                <RuledLines className="top-24 right-12 w-48" />

                {/* ── WHO WE ARE HEADER ── */}
                <AnimatedSection className="max-w-6xl mx-auto px-6 lg:px-12 mb-10 relative z-10">
                    <div className="flex items-start justify-between flex-wrap gap-8">
                        <div className="max-w-xl">
                            <motion.p
                                variants={fadeUp}
                                custom={0}
                                className="text-xs tracking-[0.28em] uppercase font-medium mb-4"
                                style={{ color: "#b09070" }}
                            >
                                Who We Are
                            </motion.p>
                            <motion.h2
                                variants={fadeUp}
                                custom={1}
                                className="text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2c2318" }}
                            >
                                Crafting spaces
                                <span className="block italic font-normal" style={{ color: "#c8a96e" }}>that inspire.</span>
                            </motion.h2>
                        </div>

                        <div className="max-w-xs self-end pb-2 relative">
                            {/* Abstract accent dot cluster */}
                            <div className="absolute -top-6 -left-6 flex gap-1.5 opacity-30">
                                {[0,1,2].map(i => (
                                    <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#c8a96e", opacity: 1 - i * 0.25 }} />
                                ))}
                            </div>
                            <motion.p
                                variants={fadeUp}
                                custom={2}
                                style={{ color: "#7a6a58" }}
                                className="leading-relaxed"
                            >
                                We bring together expertise in architecture, construction, interiors, and
                                landscape — designing and delivering spaces that are timeless, functional, and built to last.
                            </motion.p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Horizontal rule */}
                <AnimatedSection className="max-w-6xl mx-auto px-6 lg:px-12 mb-16 relative z-10">
                    <div className="relative">
                        <motion.div
                            variants={lineReveal}
                            className="origin-left h-px"
                            style={{ background: "linear-gradient(to right, #c8a96e44, #d4c4a8, transparent)" }}
                        />
                        {/* small diamond accent */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9, duration: 0.4 }}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                transform: "translate(-50%, -50%) rotate(45deg)",
                                width: 7, height: 7,
                                background: "#c8a96e",
                            }}
                        />
                    </div>
                </AnimatedSection>

                {/* ── OUR VISION ── */}
                <div ref={visionRef} className="relative z-10 mb-0">
                    {/* Full-width band with subtle warm tint */}
                    <div style={{ background: "linear-gradient(to bottom, #f7f4ef, #f0ebe2)" }} className="py-24 px-6 lg:px-12 relative overflow-hidden">

                        {/* Large abstract circle outline */}
                        <div style={{
                            position: "absolute",
                            width: "700px", height: "700px",
                            borderRadius: "50%",
                            border: "1px solid #c8a96e22",
                            top: "50%", right: "-200px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute",
                            width: "500px", height: "500px",
                            borderRadius: "50%",
                            border: "1px solid #c8a96e18",
                            top: "50%", right: "-100px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                        }} />

                        {/* Ambient gold orb */}
                        <Orb size="400px" top="50%" left="-80px" color="radial-gradient(circle, #c8a96e 0%, transparent 70%)" blur="90px" opacity={0.09} />

                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left: image with layered frame */}
                            <div className="relative">
                                {/* Offset border frame */}
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "1.5rem",
                                    border: "1px solid #c8a96e55",
                                    transform: "translate(14px, 14px)",
                                    zIndex: 0,
                                }} />

                                <div className="aspect-square rounded-3xl overflow-hidden relative grain-overlay" style={{ zIndex: 1 }}>
                                    <Image
                                        src="/images/projects/geetika/3.png"
                                        alt="Architecture Site Project"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0"
                                        style={{ background: "linear-gradient(to top, rgba(44,35,24,0.55) 0%, rgba(44,35,24,0.1) 50%, transparent 80%)" }}
                                    />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        {/* Thin separator */}
                                        <div style={{ height: "1px", background: "rgba(200,169,110,0.5)", marginBottom: "12px" }} />
                                        <p style={{ color: "rgba(232,217,184,0.85)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                                            Residential Project · Lucknow
                                        </p>
                                    </div>
                                </div>

                                {/* Floating label chip */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={visionInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    style={{
                                        position: "absolute",
                                        top: "-18px", left: "32px",
                                        background: "#2c2318",
                                        color: "#c8a96e",
                                        fontSize: "10px",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        padding: "6px 16px",
                                        borderRadius: "100px",
                                        fontWeight: 500,
                                        zIndex: 10,
                                        boxShadow: "0 4px 24px rgba(44,35,24,0.18)",
                                    }}
                                >
                                    Featured Work
                                </motion.div>
                            </div>

                            {/* Right: vision text */}
                            <div className="flex flex-col gap-6">
                                <motion.p custom={0} variants={fadeUp} initial="hidden" animate={visionInView ? "visible" : "hidden"}
                                    className="text-xs tracking-[0.28em] uppercase font-medium"
                                    style={{ color: "#b09070" }}>
                                    Our Vision
                                </motion.p>
                                <motion.h3 custom={1} variants={fadeUp} initial="hidden" animate={visionInView ? "visible" : "hidden"}
                                    className="text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight"
                                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#2c2318" }}>
                                    Built for a world
                                    <span className="italic font-normal" style={{ color: "#c8a96e" }}> that demands more.</span>
                                </motion.h3>
                                <motion.div custom={2} variants={fadeUp} initial="hidden" animate={visionInView ? "visible" : "hidden"}
                                    className="space-y-4 text-sm leading-relaxed"
                                    style={{ color: "#7a6a58" }}>
                                    <p>
                                        We believe that great spaces are not just designed — they are carefully
                                        crafted through a balance of creativity, technical expertise, and
                                        execution excellence. Every project is an opportunity to shape how
                                        people live, work, and experience their environment.
                                    </p>
                                    <p>
                                        Our vision is to deliver end-to-end architecture, interior, and turnkey
                                        solutions that are thoughtful, efficient, and enduring. From concept to
                                        completion, we aim to create spaces that reflect purpose, elevate
                                        lifestyles, and stand the test of time.
                                    </p>
                                </motion.div>

                                {/* Stats row */}
                                <motion.div custom={3} variants={fadeUp} initial="hidden" animate={visionInView ? "visible" : "hidden"}
                                    className="grid grid-cols-3 gap-6 pt-6 mt-2"
                                    style={{ borderTop: "1px solid #d4c4a855" }}>
                                    {[
                                        { value: "400+", label: "Projects Delivered" },
                                        { value: "25+", label: "Cities Served" },
                                        { value: "5+", label: "Years Experience" },
                                    ].map((stat, i) => (
                                        <div key={stat.label} className="flex flex-col gap-1">
                                            <span className="stat-number text-3xl font-semibold">
                                                {stat.value}
                                            </span>
                                            <span className="text-xs leading-snug" style={{ color: "#b09070" }}>
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── QUOTE SECTION ── */}
                <div
                    ref={quoteRef}
                    className="relative overflow-hidden py-32 px-6 lg:px-12"
                    style={{ background: "#1c1510" }}
                >
                    {/* Abstract large circle outlines */}
                    <div style={{
                        position: "absolute",
                        width: "900px", height: "900px",
                        borderRadius: "50%",
                        border: "1px solid rgba(200,169,110,0.08)",
                        bottom: "-350px", left: "-250px",
                        pointerEvents: "none",
                    }}
                    className="hidden lg:block" />
                    <div style={{
                        position: "absolute",
                        width: "600px", height: "600px",
                        borderRadius: "50%",
                        border: "1px solid rgba(200,169,110,0.06)",
                        bottom: "-200px", left: "-100px",
                        pointerEvents: "none",
                    }}
                    className="hidden lg:block" />

                    {/* Warm amber orbs */}
                    <motion.div className="hidden lg:block" style={{ y: orbY, position: "absolute", top: "-60px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
                    <motion.div className="hidden lg:block" style={{ y: orbY, position: "absolute", bottom: "-100px", left: "20%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(158,124,90,0.12) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

                    {/* Grain overlay */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
                    }} />

                    {/* Ruled lines – left margin */}
                    <div style={{ position: "absolute", left: "32px", top: "80px", bottom: "80px", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.15), transparent)" }} />

                    <div className="max-w-5xl mx-auto relative z-10">

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="text-xs tracking-[0.28em] uppercase font-medium mb-12"
                            style={{ color: "#7a6a58" }}
                        >
                            A Word from Shubhita Mishra
                        </motion.p>

                        <div className="grid lg:grid-cols-[80px_1fr] gap-6 lg:gap-10 items-start">

                            {/* Opening quote mark */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: "120px",
                                    lineHeight: "0.8",
                                    color: "#c8a96e",
                                    opacity: 0.35,
                                }}
                            >
                                "
                            </motion.div>

                            <div>
                                <motion.blockquote
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-2xl lg:text-3xl leading-[1.65] tracking-tight mb-10"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e8ddd0", fontWeight: 300 }}
                                >
                                    Every project begins with a vision, but it is the{" "}
                                    <em style={{ color: "#c8a96e", fontStyle: "italic" }}>discipline of execution</em>,
                                    attention to detail, and respect for context that truly bring it to life.
                                    We believe that great spaces are not only seen, but experienced —
                                    quietly shaping how people live, work, and connect every day.
                                </motion.blockquote>

                                {/* Thin gold rule before author */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={quoteInView ? { scaleX: 1 } : {}}
                                    transition={{ duration: 0.9, delay: 0.35 }}
                                    style={{
                                        height: "1px",
                                        background: "linear-gradient(to right, #c8a96e55, transparent)",
                                        marginBottom: "20px",
                                        transformOrigin: "left",
                                    }}
                                />

                                {/* Author */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={quoteInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.45 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                                        style={{ boxShadow: "0 0 0 1px rgba(200,169,110,0.35), 0 0 0 4px rgba(200,169,110,0.08)", background: "linear-gradient(135deg, #c8a96e, #9e7c5a)" }}>
                                        <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>SM</span>
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: "#e8ddd0" }}>Shubhita Mishra</p>
                                        <p className="text-xs tracking-widest uppercase" style={{ color: "#7a6a58" }}>Founder</p>
                                    </div>

                                    {/* Decorative dot row */}
                                    <div className="ml-6 flex gap-1.5 items-center" style={{ opacity: 0.3 }}>
                                        {[0,1,2,3].map(i => (
                                            <div key={i} style={{ width: 3, height: 3, borderRadius: "50%", background: "#c8a96e", opacity: 1 - i * 0.2 }} />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
