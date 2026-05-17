'use client'

import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { motion } from "framer-motion";

const data = {

    learn_more_card: {
        desc1: "Modern interior solutions shaped by craftsmanship and vision",
        desc2: "Creating spaces that feel timeless and meaningful",
    }

}

const reveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

export default function HomeServiceBento() {

    return (

        <section className="py-14">
            <Container>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Large Image */}
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-2 md:row-span-2"
                    >
                        <Image
                            src="/images/services/bento.png"
                            alt="Service Image 1"
                            width={600}
                            height={400}
                            className="w-full h-full rounded-2xl pointer-events-none"
                        />
                    </motion.div>

                    {/* CTA Card */}
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="w-full h-max bg-cream/50 rounded-2xl p-4 md:p-6 flex flex-col gap-6"
                    >
                        <Link href="/services">
                            <button className="px-6 py-3 font-poppins rounded-full border-2 border-black/30 hover:bg-black hover:text-white transition cursor-pointer flex items-center gap-3">
                                Learn More
                                <MdArrowOutward size={18} />
                            </button>
                        </Link>

                        <div className="space-y-2 md:space-y-4 px-1">
                            <p className="text-sm md:text-base font-poppins">
                                {data.learn_more_card.desc1}
                            </p>

                            <p className="text-lg md:text-2xl font-medium font-poppins">
                                {data.learn_more_card.desc2}
                            </p>
                        </div>
                    </motion.div>

                    {/* Small Image */}
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="rounded-2xl w-full h-full group overflow-hidden cursor-pointer"
                    >
                        <Image
                            src="/images/services/bento-2.jpg"
                            alt="Service Image 2"
                            width={600}
                            height={400}
                            className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                        />
                    </motion.div>

                </div>

            </Container>
        </section>

    )
}
