'use client'

import Container from "@/components/container";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

const data = {

    paraone: "Built on client trust and expert craftsmanship, we deliver spaces that combine strong construction, functional design, and refined architecture.",

    paratwo: "Architecture Site unites specialists in civil construction, interiors, landscaping, and building services, delivering high-rise projects, interior finishing, HVAC, electrical, and plumbing with precision and quality."

}

export default function HomeAbout() {

    return (

        <section className="py-20">
            <Container>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-5 gap-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >

                    <div className="md:col-span-2">
                        <h2 className="text-xl md:text-2xl font-oswald font-medium italic uppercase">
                            • About Us
                        </h2>
                    </div>

                    <div className="space-y-12 col-span-3">

                        <div className="space-y-6">
                            <p className="text-xl md:text-3xl font-poppins font-medium">
                                {data.paraone}
                            </p>

                            <p className="text-sm md:text-base font-poppins">
                                {data.paratwo}
                            </p>
                        </div>

                        <div className="flex items-center gap-8">

                            <Link href="/about" className="group">
                                <button className="relative flex items-center gap-1 pb-[2px] cursor-pointer">

                                    <span className="text-sm md:text-lg font-poppins font-medium">
                                        Learn More
                                    </span>

                                    <MdArrowOutward className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"/>

                                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black scale-x-[0.3] origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                                </button>
                            </Link>

                            <Link href="/contact" className="group">
                                <button className="relative flex items-center gap-1 pb-[2px] cursor-pointer">

                                    <span className="text-sm md:text-lg font-poppins font-medium">
                                        Get in touch
                                    </span>

                                    <MdArrowOutward className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"/>

                                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black scale-x-[0.3] origin-left transition-transform duration-300 group-hover:scale-x-100"></span>

                                </button>
                            </Link>

                        </div>

                    </div>

                </motion.div>

            </Container>
        </section>

    )

}
