export type CampaignStatus = "active" | "almost" | "confirmed";

export type Campaign = {
  id: string;
  name: string;
  category: string;
  image: string;
  priceOriginal: number;
  priceGroup: number;
  pricePremium: number;
  joined: number;
  target: number;
  countdown: string;
  status: CampaignStatus;
  description?: string;
  gallery?: string[];
  highlights?: string[];
};

export const campaigns: Campaign[] = [
  {
    id: "unitree-go2-pro",
    name: "Unitree GO2 Pro",
    category: "Robótica",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    priceOriginal: 2899,
    priceGroup: 2299,
    pricePremium: 2099,
    joined: 24,
    target: 30,
    countdown: "2d 8h",
    status: "almost",
    description:
      "Robot cuadrúpedo de última generación con IA embebida, visión 4D LiDAR y control por gestos. Diseñado para desarrolladores, investigación y aplicaciones profesionales.",
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
      "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=1200&q=80",
    ],
    highlights: [
      "Visión 4D LiDAR integrada",
      "Procesador Intel RealSense",
      "Autonomía de 2–4 horas",
      "SDK abierto para desarrolladores",
    ],
  },
  {
    id: "dji-mavic-3-pro",
    name: "DJI Mavic 3 Pro",
    category: "Drones",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1200&q=80",
    priceOriginal: 2199,
    priceGroup: 1799,
    pricePremium: 1649,
    joined: 42,
    target: 60,
    countdown: "5d 14h",
    status: "active",
    description:
      "Drone profesional con triple cámara Hasselblad, sensor 4/3 CMOS y grabación 5.1K. Ideal para cineastas, fotógrafos y topógrafos.",
    gallery: [
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1200&q=80",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80",
    ],
    highlights: [
      "Triple cámara Hasselblad",
      "Vídeo 5.1K / Apple ProRes",
      "43 min de vuelo",
      "Transmisión O3+ de 15 km",
    ],
  },
  {
    id: "vaonis-stellina",
    name: "Vaonis Stellina",
    category: "Astronomía",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    priceOriginal: 3999,
    priceGroup: 3299,
    pricePremium: 2999,
    joined: 18,
    target: 25,
    countdown: "Cierra hoy",
    status: "confirmed",
    description:
      "Telescopio inteligente todo-en-uno con apuntado automático, stacking en vivo y compartición instantánea. Observación astronómica sin complicaciones.",
    gallery: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&q=80",
    ],
    highlights: [
      "Apuntado y seguimiento automático",
      "Stacking en tiempo real",
      "App iOS/Android integrada",
      "Batería de 5h autónoma",
    ],
  },
  {
    id: "unitree-go2-edu",
    name: "Unitree GO2 Edu",
    category: "Robótica",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    priceOriginal: 1599,
    priceGroup: 1299,
    pricePremium: 1199,
    joined: 38,
    target: 50,
    countdown: "7d 3h",
    status: "active",
    description:
      "Versión educativa del GO2 con soporte ROS 2, cámara HD y extensibilidad completa. Perfecto para universidades, makers y prototipado robótico.",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&q=80",
    ],
    highlights: [
      "ROS 2 nativo",
      "Cámara HD + micrófono",
      "API Python y C++",
      "Precio accesible para educación",
    ],
  },
  {
    id: "dji-air-3",
    name: "DJI Air 3",
    category: "Drones",
    image: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1200&q=80",
    priceOriginal: 1099,
    priceGroup: 899,
    pricePremium: 849,
    joined: 67,
    target: 80,
    countdown: "3d 21h",
    status: "almost",
    description:
      "Drone compacto con cámaras duales 48MP, vídeo 4K/60fps y detección de obstáculos omnidireccional. El equilibrio perfecto entre portabilidad y potencia.",
    gallery: [
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1200&q=80",
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200&q=80",
    ],
    highlights: [
      "Cámaras duales 48MP (gran angular + tele)",
      "Vídeo 4K/60fps HDR",
      "46 min de vuelo",
      "Sistema O4 de 20 km",
    ],
  },
  {
    id: "domotica-seguridad-premium",
    name: "Kit Domótica + Seguridad Premium",
    category: "Domótica",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    priceOriginal: 2499,
    priceGroup: 1899,
    pricePremium: 1699,
    joined: 15,
    target: 40,
    countdown: "10d 6h",
    status: "active",
    description:
      "Sistema integral de domótica y seguridad profesional con hubs Zigbee/Matter, cámaras 4K, sensores perimetrales y cerradura inteligente. Instalación incluida.",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    ],
    highlights: [
      "Hub Matter + Zigbee 3.0",
      "4 cámaras 4K con IA",
      "Cerradura biométrica integrada",
      "App unificada + alertas en tiempo real",
    ],
  },
];

