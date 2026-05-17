import Container from "@/components/container";
import TestimonialSlider from "./testimonial-card";

const data = {

    title: "• Testimonials",

}

const testimonials = [
    {
        name: "Adriana O’Sullivan",
        title: "Interior Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        testimonial:
            "The furniture brings a sense of calm and balance into our living space. The natural materials and thoughtful design create a warm atmosphere that feels both refined and comfortable for everyday life."
    },
    {
        name: "Michael Carter",
        title: "Architect",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        testimonial:
            "The craftsmanship is immediately noticeable. Each piece feels timeless and blends effortlessly with the architecture of our home, adding warmth and character without overpowering the space."
    },
    {
        name: "Sophie Laurent",
        title: "Art Director",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        testimonial:
            "I love the balance between simplicity and elegance. The design feels minimal yet inviting, creating a space that is calm, warm, and beautifully put together."
    },
    {
        name: "Daniel Kim",
        title: "Product Designer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        testimonial:
            "Every detail feels carefully considered, from the materials to the proportions. The pieces elevate the room in a subtle way while still being comfortable for everyday living."
    },
    {
        name: "Isabella Rossi",
        title: "Creative Consultant",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        testimonial:
            "These pieces completely changed the feel of our home. The textures and tones create a warm and balanced environment that feels both modern and timeless."
    }
]

export default function Testimonial() {

    return (

        <section className="py-20">
            <Container>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="md:w-1/4">
                        <h2 className="text-xl md:text-2xl font-oswald font-medium italic uppercase">
                            {data.title}
                        </h2>
                    </div>
                    <div className="md:w-3/4">
                        <TestimonialSlider testimonials={testimonials} />
                    </div>
                </div>
            </Container>
        </section>

    )

}
