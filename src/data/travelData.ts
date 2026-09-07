export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  tag: string;
  vibe: string;
  duration: string;
  highlights: string[];
  imageUrl: string;
  secretSpotsCount: number;
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';
  created_at: string;
}

export interface Settings {
  agencyName: string;
  agencyHindiName: string;
  director: string;
  address: string;
  operatingHours: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'maldives-overwater',
    title: 'Private Atoll Sanctuary & Overwater Villa Escapes',
    subtitle: 'Maldives',
    tagline: 'Secluded crystal lagoons, private speedboats, and handpicked reef butler service.',
    tag: 'Ultra Luxury / Honeymoon',
    vibe: 'Private Beach & Snorkeling',
    duration: 'Bespoke 5 to 7 Days',
    highlights: ['Private sunset dhoni cruise', 'Underwater glass dining secret reservation', 'Direct lagoon villa placement'],
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 4
  },
  {
    id: 'swiss-alps-express',
    title: 'Panoramics of the Swiss Alps & Secret Chalets',
    subtitle: 'Switzerland & Northern Italy',
    tagline: 'First-class Glacier Express panoramas and hidden alpine village sanctuaries.',
    tag: 'Bespoke Scenic Europe',
    vibe: 'Alpine Glaciers & Valleys',
    duration: 'Tailored 8 to 10 Days',
    highlights: ['First class Glacier Express reservations', 'Private Matterhorn helicopter pass route', 'Private local alpine guide access'],
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 6
  },
  {
    id: 'bali-cliffside-villas',
    title: 'Exclusive Uluwatu Cliffside Retreats & Hidden Waterfalls',
    subtitle: 'Bali, Indonesia',
    tagline: 'Avoid tourist queues with secret jungle paths, private chef dinners, and VIP beach clubs.',
    tag: 'Tropical Hideaway',
    vibe: 'Spiritual & Ocean Vista',
    duration: 'Custom 6 to 8 Days',
    highlights: ['Helicopter transfer options', 'Private priest blessing at sunset', 'Secret waterfall breakfast setup'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 5
  },
  {
    id: 'dubai-desert-royale',
    title: 'VIP Dubai Skyline, Secret Desert Camps & Yacht Charters',
    subtitle: 'Dubai, UAE',
    tagline: 'Private luxury desert dune dining, mega-yacht coastal cruises, and priority lounge access.',
    tag: 'Glamour & Modern Splendor',
    vibe: 'VIP Yachting & Desert Safari',
    duration: 'Custom 5 to 7 Days',
    highlights: ['Private yacht charter around Palm Jumeirah', 'Luxury Vintage Rover desert expedition', 'Reserved top-deck lounge seating'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 5
  },
  {
    id: 'santorini-cave-suites',
    title: 'Caldera Sunset Suites & Private Catamaran Charters',
    subtitle: 'Santorini & Mykonos, Greece',
    tagline: 'Cliffside infinity pool suites away from crowds and sunset dining at secret tavernas.',
    tag: 'Aegean Romance',
    vibe: 'Cliff Edge & Aegean Sea',
    duration: 'Tailored 7 to 9 Days',
    highlights: ['Exclusive Caldera view suite holding', 'Private wine tasting at 200-year vineyard', 'Private sunset yacht route'],
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 3
  },
  {
    id: 'kashmir-houseboats-valleys',
    title: 'Royale Gulmarg Meadows & Heritage Dal Lake Houseboats',
    subtitle: 'Kashmir, India',
    tagline: 'Handpicked handcrafted houseboats, private gondola arrangements, and secret valley views.',
    tag: 'Heaven on Earth',
    vibe: 'Snowy Peaks & Serene Waters',
    duration: 'Curated 6 to 8 Days',
    highlights: ['VIP luxury carved shikara rides', 'Private cottage holds in Gulmarg snow slopes', 'Secret Pahalgam valley picnic setup'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    secretSpotsCount: 7
  }
];
