export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  description: string;
  scope: string[];
  tools: string[];
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: "Twitter" | "LinkedIn" | "Behance";
  href: string;
}

export interface Tool {
  name: string;
  note: string;
  /** Taller masonry card. */
  tall?: boolean;
}
