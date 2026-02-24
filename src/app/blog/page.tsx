import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blog | Wedding Photography Tips & Inspiration | Paperlight Productions",
    description: "Wedding photography tips, venue guides, and love stories from Udupi & Mangalore by Paperlight Productions.",
};

const posts = [
    {
        slug: "best-wedding-venues-udupi",
        title: "The 7 Best Wedding Venues in Udupi for 2025",
        excerpt: "From intimate garden settings to grand banquet halls — here are the venues our photographers love most in Udupi.",
        date: "Jan 15, 2025",
        tag: "Venue Guide",
        image: "/hero-wedding.jpg",
    },
    {
        slug: "golden-hour-wedding-photography",
        title: "Why Golden Hour is Perfect for Mangalore Wedding Photos",
        excerpt: "The warm coastal light of Mangalore at sunset is pure magic. Here's how we plan every shoot around it.",
        date: "Dec 22, 2024",
        tag: "Photography Tips",
        image: "/prewedding-hero.jpg",
    },
    {
        slug: "pre-wedding-shoot-locations-karnataka",
        title: "5 Hidden Gems for Pre-Wedding Shoots in Coastal Karnataka",
        excerpt: "Beyond Malpe and Kaup — these underrated locations will make your pre-wedding album truly unique.",
        date: "Nov 10, 2024",
        tag: "Pre-Wedding",
        image: "/prewedding-hero.jpg",
    },
    {
        slug: "what-to-wear-wedding-photography",
        title: "What to Wear for Your Wedding Photoshoot: A Complete Guide",
        excerpt: "Colors, fabrics, jewellery — everything you need to know to look stunning in every frame.",
        date: "Oct 5, 2024",
        tag: "Tips & Tricks",
        image: "/hero-wedding.jpg",
    },
];

export default function BlogPage() {
    return (
        <>
            <section className="pt-32 pb-10 text-center px-6">
                <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Stories & Insights</p>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">The Journal</h1>
                <p className="text-[var(--color-muted)] max-w-md mx-auto text-sm">Wedding photography wisdom, venue guides, and love stories from Coastal Karnataka.</p>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden hover:border-gold/40 transition-colors duration-300">
                            <div className="relative h-52 overflow-hidden">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                                <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-gold/20 border border-gold/40 text-gold px-3 py-1 rounded-full backdrop-blur">
                                    {post.tag}
                                </span>
                            </div>
                            <div className="p-6">
                                <time className="text-[11px] text-[var(--color-muted)] tracking-wider">{post.date}</time>
                                <h2 className="font-serif text-xl text-[var(--color-text)] mt-2 mb-3 leading-snug">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-gold transition-colors">{post.title}</Link>
                                </h2>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">{post.excerpt}</p>
                                <Link href={`/blog/${post.slug}`} className="text-[12px] tracking-wider uppercase text-gold hover:underline">
                                    Read More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
