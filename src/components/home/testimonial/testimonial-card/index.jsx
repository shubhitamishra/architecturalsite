"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"

import { useRef } from "react"
import { MdArrowBack, MdArrowForward } from "react-icons/md"

export default function TestimonialSlider({ testimonials }) {

    const swiperRef = useRef(null)

    return (

        <div className="relative w-full">

            {/* Slider */}
            <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="overflow-hidden"
            >

                {testimonials.map((item, index) => (

                    <SwiperSlide key={index}>

                        <div className="flex flex-col justify-between gap-8 md:gap-10">

                            {/* Testimonial */}
                            <div className="flex gap-3 md:gap-4">

                                <span className="text-4xl md:text-5xl leading-none text-black/80">
                                    “
                                </span>

                                <p className="text-xl md:text-2xl lg:text-3xl font-medium font-lato leading-relaxed text-black/90 max-w-5xl">
                                    {item.testimonial}
                                </p>

                            </div>

                            {/* User */}
                            <div className="flex items-center gap-3 md:gap-4">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                                />

                                <div className="flex flex-col">

                                    <span className="text-sm md:text-base font-medium text-black">
                                        {item.name}
                                    </span>

                                    <span className="text-xs md:text-sm text-black/60">
                                        {item.title}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>

                ))}

            </Swiper>

            {/* Controls */}
            <div className="absolute bottom-0 right-0 flex items-center gap-2 md:gap-3 z-10 bg-white">

                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-black/20 hover:bg-black hover:text-white transition"
                >
                    <MdArrowBack size={18} />
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-black/20 hover:bg-black hover:text-white transition"
                >
                    <MdArrowForward size={18} />
                </button>

            </div>

        </div>

    )

}
