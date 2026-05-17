'use client'

import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';
import styles from "@/components/projects/projects-hero/style.module.scss"

export default function ProjectsHero() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        {
            src: "/images/projects/paralax/1.png",
            scale: scale4
        },
        {
            src: "/images/projects/paralax/2.jpeg",
            scale: scale5
        },
        {
            src: "/images/projects/paralax/3.png",
            scale: scale6
        },
        {
            src: "/images/projects/paralax/4.png",
            scale: scale5
        },
        {
            src: "/images/projects/paralax/5.png",
            scale: scale6
        },
        {
            src: "/images/projects/paralax/6.webp",
            scale: scale8
        },
        {
            src: "/images/projects/paralax/7.webp",
            scale: scale9
        }
    ]

    return (

        <div ref={container} className="hidden md:block h-[300vh] pt-22 relative">
            <div className="sticky overflow-hidden top-0 h-screen">
                {

                    pictures.map( ({src, scale}, index) => {

                        return (

                            <motion.div key={index} style={{scale}} className={styles.el}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={src}
                                        alt="image"
                                        width={1000}
                                        height={1000}
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                            </motion.div>

                        )
                    })

                }
            </div>
        </div>

    )

}

