import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-primary-brown text-white w-full">

            {/* Top section */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr_1fr] border-t border-white/10">

                {/* Left column */}
                <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 py-8 flex md:justify-center">

                    <div className="flex flex-col gap-4">
                        <h3 className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-2 text-sm">
                            <Link href="/projects" className="hover:opacity-70 transition">
                                Projects
                            </Link>
                            <Link href="/services" className="hover:opacity-70 transition">
                                Services
                            </Link>
                        </div>
                    </div>
                    

                </div>


                {/* Center column */}
                <div className="border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center justify-center py-12 gap-2 text-center px-6">

                    <span
                        className="text-2xl font-lato md:text-4xl font-medium tracking-wide leading-none"
                    >
                        +91 xxxxxxxxxx
                    </span>

                    <Link
                        href="mailto:shubhitamishra@gmail.com"
                        className="text-xl md:text-2xl font-light tracking-wide leading-none hover:opacity-70 transition"
                    >
                        shubhitamishra@gmail.com
                    </Link>

                    <Link href="/contact" className="text-lg font-lato font-light tracking-wide leading-none hover:opacity-70 transition flex gap-2 items-center border-b border-white pb-1 mt-2">
                        Contact Us
                        <MdArrowOutward />
                    </Link>

                </div>


                {/* Right column */}
                <div className="border-b md:border-b-0 border-white/10 px-8 py-8 flex justify-end md:justify-center">

                    <div className="flex flex-col gap-4">

                        <h3 className="text-[11px] tracking-[0.25em] uppercase text-white/60">
                            Studio
                        </h3>

                        <div className="flex flex-col gap-2 text-sm">
                            <Link href="/about" className="hover:opacity-70 transition">
                                About Us
                            </Link>
                            <Link href="/contact" className="hover:opacity-70 transition">
                                Contact
                            </Link>
                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom section */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr_1fr] border-t border-white/10">

                {/* Address */}
                <div className="border-b md:border-b-0 md:border-r border-white/10 px-8 py-6 text-center md:text-left">
                    <p className="text-[10px] tracking-[0.15em] leading-relaxed uppercase text-white/80">
                        SF-204,The Peach Tree Complex,<br />
                        Block-C Sushant Lok,Phase-1,<br />
                        Sector-43 Gurgaon Gurgaon HR 122002
                    </p>
                </div>

                {/* Tagline */}
                <div className="border-b md:border-b-0 md:border-r border-white/10 flex items-end justify-center px-8 py-6">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/80">
                        Architecture | Interior Design | Turnkey Projects | Landscape
                    </p>
                </div>

                {/* Copyright */}
                <div className="flex items-end justify-center md:justify-end px-8 py-6 text-center md:text-right">
                    <p className="text-[10px] tracking-[0.15em] leading-relaxed uppercase text-white/80">
                        2026 Architecture Site.<br />
                        All Rights Reserved.
                    </p>
                </div>

            </div>

        </footer>
    );
}
