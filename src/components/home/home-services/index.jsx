"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import { useRef } from "react"
import Container from "@/components/container"
import Image from "next/image"
import Link from "next/link"
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md"
import { delay } from "framer-motion"

const SERVICES = [
    {
        number: "01",
        image: "/images/services/resident.jpeg",
        title: "Residential Interiors",
        desc: "Thoughtfully designed living spaces tailored for modern homes, blending comfort, functionality, and refined aesthetics to create environments that truly feel personal."
    },
    {
        number: "02",
        image: "/images/services/appartment.jpg",
        title: "Luxury Apartments & Penthouses",
        desc: "Sophisticated interior solutions for premium apartments and penthouses, focusing on spatial elegance, custom finishes, and elevated living experiences."
    },
    {
        number: "03",
        image: "/images/services/corporate.png",
        title: "Commercial & Corporate Spaces",
        desc: "Purpose-driven interiors for offices and commercial environments designed to enhance productivity, reflect brand identity, and create inspiring workspaces."
    },
    {
        number: "04",
        image: "/images/services/buildings.jpeg",
        title: "Scale Building Projects",
        desc: "Comprehensive interior planning and execution for multi-unit developments and large residential projects, ensuring design consistency and construction precision."
    },
    {
        number: "05",
        image: "/images/services/renovation.png",
        title: "Interior Renovation & Styling",
        desc: "Transformative renovation services that reimagine existing spaces through thoughtful design, material upgrades, and refined finishing details."
    }
];

const data = {
    title: "• Services we offer",
    bottom_desc: "Every space tells a story. From residential homes and luxury apartments to large commercial interiors, we combine thoughtful design, quality materials, and expert craftsmanship to create spaces that feel refined, functional, and built to last.",
}

export default function CardCarousel() {

    const swiperRef = useRef(null)

    return (
        <section className="py-20">
            <Container>
                <div className="space-y-10">

                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-300">
                        <h2 className="text-xl md:text-2xl font-oswald font-medium italic uppercase">
                            {data.title}
                        </h2>

                        <div className="flex gap-3">
                            <button
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="p-2 border border-black/20 hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                <MdArrowBack size={20} />
                            </button>

                            <button
                                onClick={() => swiperRef.current?.slideNext()}
                                className="p-2 border border-black/20 hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                <MdArrowForward size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={8}
                        slidesPerView={1}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false
                        }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        className="!pb-10"
                    >

                        {SERVICES.map((card, i) => (
                            <SwiperSlide key={i}>

                                <div className="min-h-[440px] bg-[#111111] border border-white/8 flex flex-col gap-4 p-6 hover:bg-[#1f1f1f] transition-colors duration-300">

                                    <span className="text-lg tracking-widest text-white/40">
                                        {card.number}
                                    </span>

                                    <div className="overflow-hidden">
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            width={400}
                                            height={300}
                                            className="w-full h-48 object-cover rounded"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="font-cormorant-garamond text-2xl font-medium text-white mb-3 leading-tight">
                                            {card.title}
                                        </h3>

                                        <p className="text-sm font-poppins text-white/50 leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </div>

                                </div>

                            </SwiperSlide>
                        ))}

                    </Swiper>

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        <p className="text-gray-600 font-poppins max-w-200">
                            {data.bottom_desc}
                        </p>

                        <Link href="/services">
                            <button className="px-6 py-3 font-poppins border border-black/30 hover:bg-[#111111] hover:text-white transition cursor-pointer flex items-center gap-3">
                                View All Services
                                <MdArrowOutward size={18} />
                            </button>
                        </Link>
                    </div>

                </div>
            </Container>
        </section>
    )
}
