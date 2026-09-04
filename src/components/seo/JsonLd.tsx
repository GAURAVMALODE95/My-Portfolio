import { PROFILE } from "@/data/site";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: PROFILE.name,
  url: SITE_URL,
  image: absoluteUrl("/og/cover.png"),
  jobTitle: PROFILE.role,
  description:
    "Software developer building secure financial software — Flutter and React Native apps for fintech and enterprise banking, desktop market terminals, and Node.js / FastAPI services.",
  email: `mailto:${PROFILE.email}`,
  telephone: PROFILE.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: PROFILE.company,
  },
  knowsAbout: [
    "Flutter",
    "React Native",
    "React",
    "Node.js",
    "FastAPI",
    "Fintech",
    "Enterprise banking",
    "Mobile security",
    "SSL pinning",
  ],
  sameAs: [PROFILE.linkedin, PROFILE.github, SITE_URL],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: PROFILE.name,
  alternateName: ["Gaurav Malode portfolio", "gauravmalode.in"],
  description:
    "Official website of Gaurav Malode — software developer in Nashik, India.",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#person` },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [person, website],
};

export function JsonLd() {
  return (
    <script
      id="identity-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export function caseStudyJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  date?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(`/work/${input.slug}`),
    mainEntityOfPage: absoluteUrl(`/work/${input.slug}`),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    image: absoluteUrl("/og/cover.png"),
    inLanguage: "en-IN",
  };
}
