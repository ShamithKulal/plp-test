import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://paperlightproductions.com";
    const now = new Date();

    const pages = [
        { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
        { url: "/wedding-photography-udupi", priority: 0.9, changeFrequency: "monthly" as const },
        { url: "/wedding-photography-mangalore", priority: 0.9, changeFrequency: "monthly" as const },
        { url: "/pre-wedding-shoot", priority: 0.8, changeFrequency: "monthly" as const },
        { url: "/haldi-mehendi", priority: 0.7, changeFrequency: "monthly" as const },
        { url: "/corporate-events", priority: 0.7, changeFrequency: "monthly" as const },
        { url: "/about", priority: 0.6, changeFrequency: "yearly" as const },
        { url: "/portfolio", priority: 0.8, changeFrequency: "weekly" as const },
        { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    ];

    return pages.map((page) => ({
        url: `${base}${page.url}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
