import Container from "@/components/container";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const data = {

    title: "Let’s create a space that truly feels like yours",
    subtitle: "Ready To Build Your Dream project ?",

}

export default function Cta(){

    return(

        <section className="py-16 px-6">
                <div className="relative pt-14 pb-12 space-y-10">
                    <Image 
                        src="/images/cta.jpg"
                        alt="cta-img"
                        width={2000}
                        height={1000}
                        className="w-full h-full object-cover absolute top-0 brightness-30 rounded-xl md:rounded-2xl z-0"
                    />
                    <div className="relative space-y-4 z-10 flex flex-col items-center justify-center px-4">
                        <p className="text-cream font-mono text-center">{data.subtitle}</p>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl text-center font-cormorant-garamond font-bold uppercase text-cream max-w-250">{data.title}</h2>
                    </div>
                    <div className="relative z-10 flex justify-center px-4">
                        <Link href="/contact" >
                            <button className="px-6 py-3 font-poppins rounded-full border-2 border-cream/30 hover:bg-cream hover:text-black text-cream transition cursor-pointer flex items-center gap-3">
                                Get in touch
                                <MdArrowOutward size={18} />
                            </button>
                        </Link>
                    </div>
                </div> 
        </section>

    )

}