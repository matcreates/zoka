export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "clothing" | "poster";
  images: string[];
  sizes?: string[];
  printfulId?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "tee-classic-logo",
    name: "Zoka Classic Logo Tee",
    description:
      "Premium heavyweight cotton tee featuring the iconic Zoka brushstroke logo. Relaxed fit, ribbed crew neck, and pre-shrunk fabric for lasting comfort.",
    price: 35,
    category: "clothing",
    images: ["/products/tee-classic.jpg"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    featured: true,
  },
  {
    id: "hoodie-essentials",
    name: "Zoka Essentials Hoodie",
    description:
      "Cozy brushed fleece hoodie with embroidered Zoka logo on the chest. Kangaroo pocket, adjustable drawstring hood, and dropped shoulders.",
    price: 65,
    category: "clothing",
    images: ["/products/hoodie-essentials.jpg"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    featured: true,
  },
  {
    id: "tee-abstract-wave",
    name: "Abstract Wave Tee",
    description:
      "All-over abstract wave print inspired by Zoka's signature art style. Soft-touch cotton blend with a modern boxy fit.",
    price: 40,
    category: "clothing",
    images: ["/products/tee-wave.jpg"],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
  },
  {
    id: "crewneck-minimal",
    name: "Minimal Crewneck Sweatshirt",
    description:
      "Clean and understated crewneck sweatshirt with a subtle Zoka wordmark on the back collar. Medium-weight French terry fabric.",
    price: 55,
    category: "clothing",
    images: ["/products/crewneck-minimal.jpg"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    featured: true,
  },
  {
    id: "cap-structured",
    name: "Zoka Structured Cap",
    description:
      "Six-panel structured cap with embroidered Zoka logo. Adjustable snapback closure, curved brim, and breathable eyelets.",
    price: 30,
    category: "clothing",
    images: ["/products/cap-structured.jpg"],
    sizes: ["One Size"],
    featured: false,
  },
  {
    id: "poster-blue-motion",
    name: "Blue Motion — Art Print",
    description:
      "High-quality giclée art print on 250gsm matte paper. Bold blue brushstrokes capturing movement and energy. Available in multiple sizes.",
    price: 25,
    category: "poster",
    images: ["/products/poster-blue-motion.jpg"],
    sizes: ["A4", "A3", "A2"],
    featured: true,
  },
  {
    id: "poster-urban-layer",
    name: "Urban Layer — Art Print",
    description:
      "Layered mixed-media composition with typographic elements. Printed on archival-quality heavyweight matte paper.",
    price: 30,
    category: "poster",
    images: ["/products/poster-urban-layer.jpg"],
    sizes: ["A4", "A3", "A2"],
    featured: true,
  },
  {
    id: "poster-signal",
    name: "Signal — Art Print",
    description:
      "Minimalist abstract piece with sharp geometric lines and muted tones. Museum-quality print on cotton rag paper.",
    price: 35,
    category: "poster",
    images: ["/products/poster-signal.jpg"],
    sizes: ["A4", "A3", "A2"],
    featured: true,
  },
  {
    id: "poster-echo",
    name: "Echo — Art Print",
    description:
      "Fluid organic forms in the Zoka blue palette. A statement piece for any space. Printed on premium 300gsm paper.",
    price: 28,
    category: "poster",
    images: ["/products/poster-echo.jpg"],
    sizes: ["A4", "A3", "A2"],
    featured: false,
  },
  {
    id: "poster-draft-01",
    name: "Draft 01 — Art Print",
    description:
      "Raw, sketch-like composition straight from the Zoka studio. Limited edition run on textured fine art paper.",
    price: 40,
    category: "poster",
    images: ["/products/poster-draft-01.jpg"],
    sizes: ["A3", "A2"],
    featured: false,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: "clothing" | "poster"): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
