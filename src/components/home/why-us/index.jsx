import Container from "@/components/container";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const data = {

    title: "• Why Choose Us",
    description: "With a strong focus on detail, quality materials, and reliable execution, we deliver spaces our clients can trust and take pride in.",
    part1: [
        {
            title: "Residential Projects",
            desc: "Completed residential homes, apartments, and penthouses designed with comfort, functionality, and refined living in mind.",
            projects: "120+ Projects"
        },
        {
            title: "Interior Design Works",
            desc: "Interior spaces carefully crafted with modern design principles, thoughtful layouts, and high-quality finishes.",
            projects: "250+ Projects"
        },
        {
            title: "Renovation & Development",
            desc: "Renovation and building projects executed with precision, transforming spaces through expert planning and construction.",
            projects: "95+ Projects"
        }
    ],
    part2: {
        title: "Experience in Designing and Building Meaningful Spaces",
        desc: "With extensive experience across residential homes, interior spaces, and large-scale developments, our team focuses on thoughtful planning, quality materials, and precise execution. We work closely with every client to turn ideas into well-crafted spaces that are functional, refined, and built to last.",
        stats: [
            {
                number: "320+",
                label: "Satisfied Clients"
            },
            {
                number: "400+",
                label: "Completed Projects"
            }
        ]
    }

}

export default function WhyUs() {

    return (

        <section className="pt-28 pb-20">
            <Container>
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-300 pb-6">
                        <h2 className="text-xl md:text-2xl font-oswald font-medium italic uppercase">
                            {data.title}
                        </h2>
                        <p className="text-sm md:text-base text-neutral-500 font-poppins max-w-150">
                            {data.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20">
                        <div className="grid grid-cols-1">
                            {data.part1.map((item, index) => (
                                <div key={index} className="border-b border-gray-300 py-8">
                                    <h3 className="text-lg md:text-2xl font-medium font-poppins">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-700 font-poppins mt-2 max-w-120">
                                        {item.desc}
                                    </p>
                                    <p className="font-medium text-right mt-4">
                                        {item.projects}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-100 relative flex items-center justify-center p-12 md:p-20">
                            <div className="absolute top-0 left-0 size-14 md:size-24 bg-white [clip-path:polygon(0_0,0_100%,100%_0)]" />
                            
                            <div className="space-y-8">
                                <h3 className="text-xl md:text-4xl font-medium font-poppins">
                                    {data.part2.title}
                                </h3>
                                <p className="text-sm md:text-base text-gray-700 font-poppins">
                                    {data.part2.desc}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {data.part2.stats.map((stat, index) => (
                                        <div key={index} className="space-y-2">
                                            <p className="text-3xl md:text-5xl text-orange-500 font-lato font-bold">{stat.number}</p>
                                            <p className="text-xs md:text-sm text-gray-700 font-medium font-poppins">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="">
                                    <Link href="/contact">
                                        <button className="px-4 py-2 font-poppins border border-black/30 hover:bg-black hover:text-white transition cursor-pointer flex items-center gap-3">
                                            Get in touch
                                            <MdArrowOutward size={18} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>

    )

}
