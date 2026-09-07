import { MarqueeItem, AccessoryItem, Testimonial } from '../types';
import heroImg from '../assets/images/hero_luxury_marquee_1788778625292.jpg';
import weddingInteriorImg from '../assets/images/wedding_interior_1788778642079.jpg';
import corporateImg from '../assets/images/corporate_marquee_1788778658479.jpg';

export const MARQUEES_CATALOG: MarqueeItem[] = [
  {
    id: 'grand-clearspan-wedding',
    name: 'The Grand Imperial Clear-Span Marquee',
    category: 'wedding',
    headline: 'Flagship Clear-Span Marquee for Prestigious Weddings & Receptions',
    description: 'Our premier clear-span structure eliminates interior guy ropes and central poles, providing an unobstructed panoramic ballroom atmosphere. Finished with crystal clear panoramic window walls, opulent pleated ivory linings, and heavy-duty extruded aluminum framing engineered for British weather.',
    imageUrl: heroImg,
    galleryImages: [
      heroImg,
      weddingInteriorImg,
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    ],
    capacitySeated: 280,
    capacityStanding: 450,
    availableSizes: ['9m x 15m (120 seated)', '12m x 21m (200 seated)', '15m x 30m (350 seated)', 'Custom Multi-Bay'],
    basePricePerDay: 1450,
    features: [
      'Zero interior poles for 100% usable floor plan',
      'Panoramic Georgian arched window walls & solid glass panels',
      'Draped ivory pleated silk ceiling swags & blackout night-sky lining',
      'Engineered to withstand up to 70mph British storm gusts (BS EN 13782)',
      'Integrated heavy-duty timber subfloor with velvet or coir carpeting'
    ],
    specifications: {
      frameType: 'Structural Extruded Anodised Aluminium (Hard Pressed 6061/T6)',
      fabric: '850g/m² Heavy PVC, 100% Waterproof, UV-Stabilized & Mildew-Proof',
      windResistance: '70 mph (110 km/h) Certified',
      fireRating: 'British Standard BS 7837 & BS 5438 Flame Retardant',
      eaveHeight: '2.4m - 3.0m',
      ridgeHeight: '4.8m - 6.2m'
    },
    recommendedFor: ['Luxury Weddings', 'Asian & Multicultural Banquets', 'Black-Tie Balls', 'VIP Receptions']
  },
  {
    id: 'regency-glass-pavilion',
    name: 'Regency Glass-Walled Corporate Pavilion',
    category: 'corporate',
    headline: 'High-Impact Architectural Structure for Corporate Galas & Product Launches',
    description: 'Designed specifically for brand activations, executive conferences, awards evenings, and corporate hospitality. Features tinted or crystal-clear tempered glass facade panels, double lockable glazed doors, integrated electrical conduit trunking, and climate control port compatibility.',
    imageUrl: corporateImg,
    galleryImages: [
      corporateImg,
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      heroImg,
    ],
    capacitySeated: 240,
    capacityStanding: 380,
    availableSizes: ['9m x 12m (80 seated)', '12m x 18m (180 seated)', '15m x 24m (300 seated)', 'Custom Extensions'],
    basePricePerDay: 1750,
    features: [
      'Rigid insulated glass walling with modern aluminum mullions',
      'Commercial grade double entrance doors with push bars',
      'High-spec acoustic lining for speech and audio clarity',
      'Heavy duty level flooring system suited for machinery or stage rigs',
      'Concealed ducted heating & air conditioning conduits'
    ],
    specifications: {
      frameType: 'Reinforced 4-Channel Aluminium Alloy Profile',
      fabric: 'Architectural Tensile Membrane + Tempered Safety Glass Modules',
      windResistance: '65 mph Certified',
      fireRating: 'Class 1 / BS 476 Part 7 Flame Resistant',
      eaveHeight: '3.0m',
      ridgeHeight: '5.5m'
    },
    recommendedFor: ['Corporate Award Dinners', 'Automotive & Product Launches', 'Summer Trade Galas', 'Hospitality Suites']
  },
  {
    id: 'heritage-sailcloth-pole-marquee',
    name: 'Traditional English Sailcloth & Pole Marquee',
    category: 'wedding',
    headline: 'Romantic Country-House Aesthetic with Natural Timber Poles & Flying Pennants',
    description: 'Nothing captures quintessential English romance like our handcrafted sailcloth marquee. Sculpted wooden center poles, warm translucent canopy fabric allowing natural daylight to glow inside, and gentle swooping rooflines topped with celebratory pennants.',
    imageUrl: weddingInteriorImg,
    galleryImages: [
      weddingInteriorImg,
      heroImg,
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    ],
    capacitySeated: 180,
    capacityStanding: 260,
    availableSizes: ['10m x 16m (100 seated)', '12m x 22m (170 seated)', '14m x 28m (240 seated)'],
    basePricePerDay: 1350,
    features: [
      'Lustrous, waterproof sailcloth membrane with warm daylight diffusion',
      'Hand-finished solid Douglas Fir central and wall poles',
      'Roll-up clear panoramic sidewalls for open summer breezes',
      'Natural coconut coir matting or suspended parquet flooring',
      'Perfect pairing with wild foliage, hanging floral hoops, and festoons'
    ],
    specifications: {
      frameType: 'Turned Hardwood Timber Poles & Polished Brass Fittings',
      fabric: 'Breathable Translucent WeatherMax Sailcloth Membrane',
      windResistance: '55 mph Certified with heavy earth anchor stakes',
      fireRating: 'BS 7837 / M2 Certified',
      eaveHeight: '2.2m',
      ridgeHeight: '5.8m'
    },
    recommendedFor: ['Rustic Chic Weddings', 'Manor Estate Receptions', 'Garden Parties', 'Cotswolds & Chilterns Country Events']
  },
  {
    id: 'crown-oriental-pagoda-suite',
    name: 'Crown Oriental Pagoda Suite (Chinese Hat Tents)',
    category: 'pagoda',
    headline: 'Charming High-Peak Marquees for Cocktail Lounges, Entrances & Intimate Parties',
    description: 'Iconic curved high-peak roof silhouette that brings immediate prestige. Can be hired individually as welcome drink pavilions, catering tents, or linked together with weather-sealed gutter systems to form stylish garden party courtyards.',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      heroImg,
      weddingInteriorImg,
    ],
    capacitySeated: 60,
    capacityStanding: 100,
    availableSizes: ['5m x 5m Single Pagoda', '6m x 6m Pagoda', 'Joined 6m x 12m Suite (2 Tents)', 'Modular Quad (4 Linked Tents)'],
    basePricePerDay: 480,
    features: [
      'Signature elegant pagoda peak roof with aerodynamic airflow design',
      'Modular linking system with watertight rain gutters',
      'Flexible configurations with half-mesh, transparent window, or solid panels',
      'Quick 3-hour deployment on lawns, tarmac, gravel, or stone terraces',
      'Includes ambient warm festoon lighting or chandelier options'
    ],
    specifications: {
      frameType: 'Lightweight Heavy-Wall Anodized Aluminum 65x65mm',
      fabric: '650g/m² Gloss White PVC, UV Blockout & Mold Resistant',
      windResistance: '60 mph Certified',
      fireRating: 'BS 5438 / NFPA 701 Compliant',
      eaveHeight: '2.3m',
      ridgeHeight: '4.8m'
    },
    recommendedFor: ['VIP Champagne Receptions', 'Garden Birthdays & Anniversaries', 'Catering & Food Prep Annex', 'Bridal Entrances']
  },
  {
    id: 'safari-nomad-stretch-tent',
    name: 'Nomad Luxury Bedouin Stretch Tent',
    category: 'stretch',
    headline: 'Contemporary Organic Curves & Versatile Architecture for Uneven Ground',
    description: 'For events demanding an organic, festival-luxe vibe. Freeform stretch tents can be configured in multiple pitching styles over tiered terraces, pools, gardens, or uneven ground, providing stylish shelter with dramatic undulating lines.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    ],
    capacitySeated: 120,
    capacityStanding: 200,
    availableSizes: ['10m x 12m', '10m x 15m', '12m x 20m'],
    basePricePerDay: 980,
    features: [
      'Highly flexible pitching over sloped lawns, flowerbeds, and patios',
      'Waterproof 4-way stretch high-tensile fabric in sand or platinum grey',
      'Dramatic interior up-lighting reflections for evening events',
      'Rustic timber or carbon perimeter poles',
      'Excellent acoustic damping for live DJ and band performances'
    ],
    specifications: {
      frameType: 'High-Tensile Eucalyptus & Aluminium Tension Poles',
      fabric: '720g Polyurethane Coated Stretch Fabric, 100% Watertight',
      windResistance: '60 mph Rated',
      fireRating: 'B1 / BS 7837 Certified',
      eaveHeight: 'Adjustable 2.0m - 3.5m',
      ridgeHeight: '4.5m - 5.5m'
    },
    recommendedFor: ['Festival Weddings', 'Summer Lawn Parties', 'Terrace Extensions', 'Outdoor Music Evenings']
  }
];

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  {
    id: 'starlight-lining',
    name: 'LED Starlight Ceiling & Blackout Roof Linings',
    category: 'linings',
    price: 350,
    unit: 'per event',
    description: 'Transform your dance floor into a twinkling midnight sky with hundreds of fiber-optic starry lights embedded in deep midnight black or ivory satin lining.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular for Weddings'
  },
  {
    id: 'pleated-ivory-swags',
    name: 'Full Pleated Ivory Silk Roof & Wall Linings',
    category: 'linings',
    price: 280,
    unit: 'per bay',
    description: 'High-thread ivory gathered fabric that hides all structural framework, creating a pristine hotel-ballroom feeling with decorative valence swags.',
    imageUrl: weddingInteriorImg,
  },
  {
    id: 'crystal-chandeliers',
    name: 'Vintage Crystal Drop 8-Arm Chandeliers',
    category: 'lighting',
    price: 65,
    unit: 'per chandelier',
    description: 'Classic cut-crystal chandeliers with warm dimmable LED candelabra bulbs to set a soft, romantic golden glow.',
    imageUrl: 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?auto=format&fit=crop&w=600&q=80',
    badge: 'Romantic Ambiance'
  },
  {
    id: 'fairy-light-canopy',
    name: 'Warm White Fairy Light Canopy & Uplighters',
    category: 'lighting',
    price: 180,
    unit: 'per installation',
    description: 'Drape thousands of warm fairy lights across the roof pitch paired with wireless perimeter RGB LED wash uplighters.',
    imageUrl: heroImg,
  },
  {
    id: 'oak-parquet-dancefloor',
    name: 'Interlocking Oak Parquet / Black & White Dance Floor',
    category: 'flooring',
    price: 290,
    unit: '16ft x 16ft section',
    description: 'Polished solid wood dance floor with sloped aluminum transition edging, certified slip-resistant for dancing.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    badge: 'Essential'
  },
  {
    id: 'hardwood-subfloor-carpet',
    name: 'Suspended Hardwood Subfloor + New Luxury Carpet',
    category: 'flooring',
    price: 450,
    unit: 'per section',
    description: 'Laser-leveled wooden subfloor that removes ground unevenness and keeps damp grass moisture completely away. Supplied with brand new exhibition carpet in your choice of color.',
    imageUrl: corporateImg,
  },
  {
    id: 'thermostatic-diesel-heater',
    name: 'Thermostatic Marquee Indirect Diesel Space Heater (EC55)',
    category: 'heating',
    price: 195,
    unit: 'per unit + fuel',
    description: 'Placed outside the marquee, blowing 100% clean, odorless, warm air inside via ducting with an automatic digital thermostat for all-season comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    badge: 'Weather Guarantee'
  },
  {
    id: 'chiavari-chairs-tables',
    name: 'Gold Chiavari Banqueting Chairs & Round Tables',
    category: 'furniture',
    price: 85,
    unit: 'set of 1 table + 10 chairs',
    description: 'Elegantly styled limewash or gold Chiavari chairs with ivory padded seat pads and 5ft6in round banqueting tables.',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'luxury-mobile-washroom',
    name: 'Luxury 3+1 Mobile Trailer Restrooms',
    category: 'facilities',
    price: 550,
    unit: 'per day',
    description: 'Self-contained, contemporary mobile trailer with porcelain flushing toilets, oak vanities, hot running water, luxury toiletries, and automatic hand dryers.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    badge: 'VIP Upgrade'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah & Oliver Davies',
    eventType: 'Country Estate Wedding (180 Guests)',
    location: 'Windsor Great Park & Slough border',
    quote: 'Dreams Marquees built our dream wedding! The clear-span structure with the starlight dance floor and ivory draping blew every single guest away. Even when heavy English rain hit in the evening, we were completely warm, dry, and cozy inside. The Slough team was punctual and supremely professional.',
    rating: 5,
    date: 'July 2025'
  },
  {
    id: 't2',
    clientName: 'Tariq & Farah Mahmood',
    eventType: 'Walima & Reception (320 Guests)',
    location: 'Langley / Slough SL3',
    quote: 'We needed a massive, heavy-duty marquee to accommodate over 300 family members with banquet staging, stage lighting, and full heating. Dreams Marquees delivered beyond expectations. The chandeliers and carpeted subfloor felt like a 5-star Mayfair hotel.',
    rating: 5,
    date: 'October 2025'
  },
  {
    id: 't3',
    clientName: 'Marcus Sterling',
    eventType: 'Annual Tech Corporate Gala',
    location: 'Slough Trading Estate / Heathrow corridor',
    quote: 'Impressed by the structural rigidity of their Regency glass-wall marquee. We hosted high-profile investors and VIP speakers. The acoustic insulation, double glass doors, and diesel climate heating made it an absolute triumph.',
    rating: 5,
    date: 'September 2025'
  }
];

export const SERVICE_AREAS = [
  { name: 'Slough (HQ & Showroom)', distance: '0 miles', postcode: 'SL1, SL2, SL3', highlight: true },
  { name: 'Windsor & Eton', distance: '3.5 miles', postcode: 'SL4', highlight: true },
  { name: 'Maidenhead & Bray', distance: '6.0 miles', postcode: 'SL6', highlight: true },
  { name: 'Gerrards Cross & Beaconsfield', distance: '7.5 miles', postcode: 'SL9, HP9', highlight: true },
  { name: 'Ascot & Sunningdale', distance: '9.0 miles', postcode: 'SL5', highlight: true },
  { name: 'Uxbridge & West London', distance: '8.0 miles', postcode: 'UB8, UB9, UB10', highlight: false },
  { name: 'Heathrow & Staines', distance: '8.5 miles', postcode: 'TW6, TW18', highlight: false },
  { name: 'Marlow & Henley-on-Thames', distance: '12.0 miles', postcode: 'SL7, RG9', highlight: false },
  { name: 'Reading & Thames Valley', distance: '18.0 miles', postcode: 'RG1, RG2', highlight: false },
  { name: 'Central London & Greater London', distance: '22.0 miles', postcode: 'W, SW, NW zones', highlight: false }
];

export const COMPANY_DETAILS = {
  name: 'Dreams Marquees Ltd',
  tagline: 'Luxury Event & Wedding Marquee Hire in Slough, Berkshire & Beyond',
  address: '213 Northern Rd, Slough SL2 1LU, United Kingdom',
  plusCode: 'GCH2+72 Slough, United Kingdom',
  phone: '+44 1753 824900',
  mobileWhatsApp: '+44 7450 918234',
  email: 'info@dreamsmarquees.co.uk',
  officeHours: 'Mon - Sat: 08:00 - 19:00 | Sun: 09:00 - 16:00',
  googleMapsUrl: 'https://maps.google.com/?q=213+Northern+Rd,+Slough+SL2+1LU,+United+Kingdom'
};
