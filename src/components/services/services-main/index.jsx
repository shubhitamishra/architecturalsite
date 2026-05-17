import Container from "@/components/container";
import ServicesMainCard from "./services-card";

const data = {
    title: "• Services We Offer",
    desc: "Built on client trust and expert craftsmanship, we deliver spaces that combine strong construction, functional design, and refined architecture.",
};

const SERVICES = [
    {
        id: 1,
        images: [
            "/images/services/main-img/1.png",
            "/images/services/main-img/2.png",
            "/images/services/main-img/3.png",
        ],
        title: "Residential Interiors",
        desc: "Thoughtfully designed living spaces tailored for modern homes, blending comfort, functionality, and refined aesthetics to create environments that truly feel personal.",
        features: [
            "Custom furniture & layout planning",
            "Space optimization for modern living",
            "Material & color palette selection",
            "Lighting design for ambiance",
        ],
    },
    {
        id: 2,
        images: [
            "/images/services/main-img/4.jpg",
            "/images/services/main-img/5.webp",
            "/images/services/main-img/6.jpeg",
        ],
        title: "Luxury Apartments & Penthouses",
        desc: "Sophisticated interior solutions for premium apartments and penthouses, focusing on spatial elegance, custom finishes, and elevated living experiences.",
        features: [
            "High-end material & finish selection",
            "Bespoke furniture & detailing",
            "Premium lighting & automation integration",
            "Elegant spatial planning",
        ],
    },
    {
        id: 3,
        images: [
            "/images/services/main-img/7.png",
            "/images/services/main-img/8.jpg",
            "/images/services/main-img/9.jpg",
        ],
        title: "Commercial & Corporate Spaces",
        desc: "Purpose-driven interiors for offices and commercial environments designed to enhance productivity, reflect brand identity, and create inspiring workspaces.",
        features: [
            "Brand-aligned interior concepts",
            "Efficient workspace planning",
            "Acoustic & lighting optimization",
            "Client-facing area design",
        ],
    },
    {
        id: 4,
        images: [
            "/images/services/main-img/10.jpg",
            "/images/services/main-img/11.jpg",
            "/images/services/main-img/12.jpg",
        ],
        title: "Scale Building Projects",
        desc: "Comprehensive interior planning and execution for multi-unit developments and large residential projects, ensuring design consistency and construction precision.",
        features: [
            "End-to-end project coordination",
            "Standardized design systems",
            "Scalable interior solutions",
            "Quality control & execution oversight",
        ],
    },
    {
        id: 5,
        images: [
            "/images/services/main-img/13.png",
            "/images/services/main-img/14.webp",
            "/images/services/main-img/15.jpg",
        ],
        title: "Interior Renovation & Styling",
        desc: "Transformative renovation services that reimagine existing spaces through thoughtful design, material upgrades, and refined finishing details.",
        features: [
            "Space transformation planning",
            "Modern material upgrades",
            "Furniture & decor styling",
            "Detail-focused finishing touches",
        ],
    },
];

export default function ServicesMain() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

                .services-section {
                    background: #f7f4ef;
                    position: relative;
                    overflow: hidden;
                }

                /* ambient orb shared style */
                .svc-orb {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                }

                .stat-number-svc {
                    background: linear-gradient(135deg, #2c2318 30%, #c8a96e);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .services-header-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    color: #2c2318;
                }

                .services-header-desc {
                    font-family: 'DM Sans', sans-serif;
                    color: #7a6a58;
                }

                /* grain overlay on the whole section */
                .services-section::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 1;
                }
            `}</style>

            <section className="services-section py-28">

                {/* ── AMBIENT ORBS ── */}
                <div
                    className="svc-orb"
                    style={{
                        width: "600px", height: "600px",
                        top: "-120px", right: "-160px",
                        background: "radial-gradient(circle, rgba(200,169,110,0.13) 0%, transparent 70%)",
                        filter: "blur(90px)",
                    }}
                />
                <div
                    className="svc-orb"
                    style={{
                        width: "400px", height: "400px",
                        top: "40%", left: "-120px",
                        background: "radial-gradient(circle, rgba(158,124,90,0.10) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="svc-orb"
                    style={{
                        width: "300px", height: "300px",
                        bottom: "10%", right: "5%",
                        background: "radial-gradient(circle, rgba(200,169,110,0.09) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    }}
                />

                {/* Faint ruled lines – top right */}
                <div style={{
                    position: "absolute", top: "80px", right: "48px",
                    width: "160px", opacity: 0.05, zIndex: 1, pointerEvents: "none",
                }}>
                    {[0,1,2,3].map(i => (
                        <div key={i} style={{ height: "1px", background: "#6b5c45", marginBottom: "16px" }} />
                    ))}
                </div>

                {/* Large faint circle outline */}
                <div style={{
                    position: "absolute",
                    width: "800px", height: "800px",
                    borderRadius: "50%",
                    border: "1px solid rgba(200,169,110,0.07)",
                    bottom: "-300px", left: "-250px",
                    pointerEvents: "none", zIndex: 0,
                }} />

                <Container>
                    <div className="pt-20 space-y-10 relative z-10">

                        {/* ── HEADER ── */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 pb-10 relative">

                            {/* Gold gradient rule */}
                            <div style={{
                                position: "absolute",
                                bottom: 0, left: 0, right: 0,
                                height: "1px",
                                background: "linear-gradient(to right, #c8a96e55, #d4c4a8, transparent)",
                            }} />
                            {/* Diamond accent */}
                            <div style={{
                                position: "absolute",
                                bottom: 0, left: 0,
                                transform: "translate(-50%, 50%) rotate(45deg)",
                                width: 6, height: 6,
                                background: "#c8a96e",
                            }} />

                            <div className="col-span-2 flex flex-col gap-3">
                                {/* Small dot cluster */}
                                <div style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                                    {[0,1,2].map(i => (
                                        <div key={i} style={{
                                            width: 5, height: 5, borderRadius: "50%",
                                            background: "#c8a96e",
                                            opacity: 1 - i * 0.28,
                                        }} />
                                    ))}
                                </div>
                                <h2
                                    className="text-xl md:text-2xl font-medium italic uppercase services-header-title"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {data.title}
                                </h2>
                            </div>

                            <p className="text-xl md:text-2xl services-header-desc col-span-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {data.desc}
                            </p>
                        </div>

                        {/* ── SERVICE CARDS ── */}
                        <div className="space-y-0">
                            {SERVICES.map((card, index) => (
                                <ServicesMainCard
                                    key={index}
                                    title={card.title}
                                    desc={card.desc}
                                    id={card.id}
                                    images={card.images}
                                    features={card.features}
                                    index={index}
                                />
                            ))}
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
}
