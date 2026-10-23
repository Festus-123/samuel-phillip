import type { Project } from "@/types";

// TODO: placeholder years. Replace each `date` with the real completion date.
export const PROJECTS: Project[] = [
  {
    id: "stadium-complex",
    title: "Sports Stadium Complex",
    category: "3D Modeling",
    date: "2024",
    image: "/stadium.jpg",
    imageAlt:
      "Isometric AutoCAD model of a stadium with a green pitch, running track and covered stands",
    description:
      "An isometric 3D model of a stadium complex: pitch, running track and covered grandstands arranged around a paved plaza.",
    scope: [
      "Grandstand and roof massing",
      "Pitch and running track layout",
      "Site paving and circulation",
    ],
    tools: ["AutoCAD"],
  },
  {
    id: "residential-building",
    title: "Residential Building",
    category: "3D Modeling",
    date: "2024",
    image: "/residential.jpg",
    imageAlt:
      "AutoCAD hidden-line 3D view of a single-storey house with a hip roof, fence and gate",
    description:
      "A 3D model of a single-storey residence with a hip roof, perimeter wall and decorative gate, presented in a hidden-line view.",
    scope: [
      "Walls and hip roof modeling",
      "Window, door and gate detailing",
      "Perimeter wall and fence",
    ],
    tools: ["AutoCAD"],
  },
  {
    id: "drawing-set",
    title: "Two-Storey Building Drawing Set",
    category: "Technical Drafting",
    date: "2025",
    image: "/site-plan.jpg",
    imageAlt:
      "Dimensioned AutoCAD sheet with floor plans, a site plan and two elevations",
    description:
      "A fully dimensioned drawing sheet with ground and first floor plans, a site plan and two elevations.",
    scope: [
      "Dimensioned floor plans",
      "Site plan layout",
      "Front and rear elevations",
    ],
    tools: ["AutoCAD"],
  },
];
