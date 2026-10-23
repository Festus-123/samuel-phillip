import type { NavLink, SocialLink, Tool } from "@/types";

const WHATSAPP_NUMBER = "2347038689118";

// TODO: add the resume file at public/resume.pdf (or change this path).
const RESUME = "/resume.pdf";

export const SITE = {
  name: "Samuel Phillip",
  role: "CAD Designer",
  experienceYears: 5,
  university: "OAUSTECH",
  resume: RESUME,
  whatsapp: {
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi Samuel, I saw your portfolio and I'd like to discuss a project.",
    )}`,
  },
} as const;

// Swap these for other files in /public (e.g. a portrait for the About section).
export const IMAGES = {
  hero: { src: "/IMG-20260616-WA0001.jpg", alt: "" },
  about: {
    src: "/IMG-20260616-WA0000.jpg",
    alt: "Portrait of Samuel Phillip in a black jacket and leather cap",
  },
  contact: { src: "/designer-grey.png", alt: "" },
} as const;

export const NAV_LINKS: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Works", href: "#works" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// TODO: replace with the actual profile URLs once provided.
export const SOCIALS: SocialLink[] = [
  { name: "Twitter", href: "https://twitter.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "Behance", href: "https://www.behance.net/" },
];

export const TOOLS: Tool[] = [
  { name: "AutoCAD", note: "2D drafting and 3D modeling", tall: true },
  { name: "Revit", note: "BIM and structural modeling" },
  { name: "Fusion 360", note: "Parametric design" },
  { name: "SolidWorks", note: "Mechanical parts and assemblies", tall: true },
  { name: "SketchUp", note: "Concept visualization" },
  { name: "Autodesk Inventor", note: "Digital prototyping" },
];

export const COMPETENCIES = [
  "Structural Drafting",
  "3D Parametric Modeling",
  "BIM Coordination",
  "Technical Documentation",
  "FEA Prep",
  "Structural Steel Detailing",
];
