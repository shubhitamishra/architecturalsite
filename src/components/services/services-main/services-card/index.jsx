'use client'

import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef, useState, useEffect } from "react"
import { Autoplay } from "swiper/modules"
import { motion, useInView } from "framer-motion"

import "swiper/css"

/* Per-service accent colors — matching the amber palette */
const ACCENTS = [
    "#c8a96e",
    "#9e7c5a",
    "#b5975e",
    "#a08060",
    "#c4a070",
];

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function ServicesMainCard({ id, title, desc, images, features, index = 0 }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const cardRef = useRef(null);

    const isInView = useInView(containerRef, { margin: "-100px", once: false });
    const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

    const isEven = id % 2 === 0;
    const accent = ACCENTS[index % ACCENTS.length];

    useEffect(() => {
        if (!swiperRef.current) return;
        if (isInView) {
            swiperRef.current.autoplay?.start();
        } else {
            swiperRef.current.autoplay?.stop();
        }
    }, [isInView]);

    const TextContent = (
        <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={cardInView ? "visible" : "hidden"}
            className="flex flex-col justify-center space-y-8 py-4"
        >
            {/* Index + thin rule */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: accent,
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                }}>
                    0{id}
                </span>
                <div style={{
                    flex: 1,
                    height: "1px",
                    background: `linear-gradient(to right, ${accent}66, transparent)`,
                }} />
                {/* Small diamond */}
                <div style={{
                    width: 5, height: 5,
                    background: accent,
                    transform: "rotate(45deg)",
                    opacity: 0.5,
                }} />
            </div>

            <div className="space-y-4">
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.75rem)",
                        fontWeight: 400,
                        color: "#2c2318",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7a6a58", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {desc}
                </p>

                {features?.length > 0 && (
                    <ul className="space-y-2 pt-2">
                        {features.map((item, i) => (
                            <motion.li
                                key={i}
                                custom={i + 1}
                                variants={fadeUp}
                                initial="hidden"
                                animate={cardInView ? "visible" : "hidden"}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "0.875rem",
                                    color: "#7a6a58",
                                }}
                            >
                                {/* Accent dot */}
                                <span style={{
                                    width: 6, height: 6,
                                    borderRadius: "50%",
                                    background: accent,
                                    flexShrink: 0,
                                    opacity: 0.7,
                                }} />
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>

            {/* CTA button */}
            <div>
                <Link href="/contact">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 22px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.8rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            color: "#2c2318",
                            border: `1px solid ${accent}66`,
                            background: "transparent",
                            cursor: "pointer",
                            borderRadius: "2px",
                            transition: "all 0.35s ease",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "#2c2318";
                            e.currentTarget.style.color = "#c8a96e";
                            e.currentTarget.style.borderColor = "#2c2318";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#2c2318";
                            e.currentTarget.style.borderColor = `${accent}66`;
                        }}
                    >
                        Get in touch
                        <MdArrowOutward />
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );

    const ImageSlider = (
        <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={cardInView ? "visible" : "hidden"}
            className="relative"
        >
            {/* Offset border frame – same as AboutMain vision image */}
            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "1rem",
                border: `1px solid ${accent}44`,
                transform: isEven ? "translate(-10px, 10px)" : "translate(10px, 10px)",
                zIndex: 0,
                pointerEvents: "none",
            }} />

            <div
                ref={containerRef}
                className="relative w-full overflow-hidden bg-stone-100"
                style={{
                    borderRadius: "1rem",
                    aspectRatio: "16/10",
                    zIndex: 1,
                }}
            >
                {/* Corner accent radial glow */}
                <div style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "140px", height: "140px",
                    background: `radial-gradient(circle at top right, ${accent}44, transparent 70%)`,
                    zIndex: 2,
                    pointerEvents: "none",
                }} />

                <Swiper
                    key={images?.length}
                    modules={[Autoplay]}
                    loop={images?.length > 1}
                    autoplay={
                        images?.length > 1
                            ? { delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }
                            : false
                    }
                    observer={true}
                    observeParents={true}
                    watchSlidesProgress={true}
                    grabCursor={true}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    className="w-full h-full"
                >
                    {images?.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={img}
                                alt={`Slide ${i + 1}`}
                                className="w-full h-full object-cover"
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Warm gradient overlay bottom */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, ${accent}33 0%, transparent 50%)`,
                    zIndex: 2, pointerEvents: "none",
                }} />

                {/* Slide dots */}
                {images?.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => swiperRef.current?.slideToLoop(i)}
                                style={{
                                    borderRadius: "100px",
                                    transition: "all 0.3s ease",
                                    width: activeIndex === i ? "20px" : "6px",
                                    height: "6px",
                                    background: activeIndex === i ? "#fff" : "rgba(255,255,255,0.45)",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Service label chip bottom-right */}
                <div style={{
                    position: "absolute",
                    bottom: "16px", right: "16px",
                    background: "rgba(28,21,16,0.55)",
                    backdropFilter: "blur(8px)",
                    color: "#e8d9b8",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "5px 14px",
                    borderRadius: "100px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    zIndex: 10,
                }}>
                    Architecture Site
                </div>
            </div>
        </motion.div>
    );

    return (
        <div
            ref={cardRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-14 relative"
        >
            {/* Gold gradient rule between cards */}
            <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "1px",
                background: "linear-gradient(to right, transparent, #c8a96e33, transparent)",
                pointerEvents: "none",
            }} />

            {isEven ? (
                <>
                    {ImageSlider}
                    {TextContent}
                </>
            ) : (
                <>
                    {TextContent}
                    {ImageSlider}
                </>
            )}
        </div>
    );
}
