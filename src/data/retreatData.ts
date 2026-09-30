export interface Room {
  id: string;
  name: string;
  category: 'Grand Suites' | 'Lake View Rooms' | 'Private Villas';
  tagline: string;
  sizeSqFt: number;
  maxGuests: number;
  bedType: string;
  view: string;
  demoRateInr: number;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  cuisine: string;
  timings: string;
  setting: string;
  image: string;
  description: string;
  highlights: string[];
  signatureDish: string;
}

export interface RetreatExperience {
  id: string;
  title: string;
  category: string;
  duration: string;
  image: string;
  description: string;
  curatedDetails: string[];
  timing: string;
}

export interface WeddingVenue {
  id: string;
  name: string;
  capacity: string;
  setting: string;
  image: string;
  description: string;
  idealFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  occasion: string;
  stayDate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'architecture' | 'rooms' | 'food' | 'landscape' | 'weddings' | 'experiences';
  image: string;
  caption: string;
}

export const RESORT_INFO = {
  name: 'Aranya Grand Retreat & Weddings',
  shortName: 'Aranya Grand Retreat',
  tagline: 'Where celebrations become stories.',
  location: 'Udaipur, Rajasthan, India',
  address: 'Aranya Grand Retreat, Near Badi Lake, Udaipur, Rajasthan 313011, India',
  phone: '+91 294 555 7288',
  phoneRaw: '+912945557288',
  email: 'reservations@aranyaggrand.in',
  weddingEmail: 'celebrate@aranyaggrand.in',
  whatsAppNumber: '912945557288',
  checkIn: '14:00',
  checkOut: '12:00',
  coordinates: {
    lat: 24.6167,
    lng: 73.6333,
  },
  distances: [
    { place: 'Maharana Pratap Airport (UDR)', distance: '28 km', duration: '45 mins' },
    { place: 'Udaipur City Railway Station', distance: '14 km', duration: '25 mins' },
    { place: 'Lake Pichola & City Palace', distance: '9 km', duration: '18 mins' },
    { place: 'Bahubali Hills & Lake Badi Point', distance: '1.2 km', duration: '4 mins' },
    { place: 'Sajjangarh Monsoon Palace', distance: '7 km', duration: '15 mins' },
  ],
};

export const ROOMS: Room[] = [
  {
    id: 'aravali-presidential-suite',
    name: 'The Aravali Presidential Suite',
    category: 'Grand Suites',
    tagline: 'A palace atop the hills with uninterrupted Lake Badi horizons',
    sizeSqFt: 1850,
    maxGuests: 4,
    bedType: 'Grand King Canopy',
    view: 'Panoramic Lake Badi & Mountain Sunset',
    demoRateInr: 85000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    description: 'Designed as a private sanctuary inspired by royal Mewari summer retreats. Features hand-carved warm sandstone jharokhas, a private plunge pool suspended over the valley, separate formal salon, and an en-suite bath carved from Makrana white marble.',
    amenities: [
      'Private Temperature-Controlled Plunge Pool',
      'Personal 24-Hour Palace Butler',
      'Hand-Carved Sandstone Sunset Jharokha',
      'Makrana Marble Freestanding Tub',
      'Dyson Styling Suite & Diptyque Amenities',
      'Complimentary Solar Boat Sunset Cruise',
    ],
    features: ['1,850 sq.ft living expanse', 'Expansive 180° lake-facing veranda', 'Private in-suite dining pavilion'],
  },
  {
    id: 'mewar-royal-lake-suite',
    name: 'Mewar Royal Lake Suite',
    category: 'Grand Suites',
    tagline: 'Regal courtyards opening into gentle lake breezes',
    sizeSqFt: 1250,
    maxGuests: 3,
    bedType: 'Hand-crafted Teak King',
    view: 'Direct Lake Shore & Water Pavilions',
    demoRateInr: 58000,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    description: 'An ode to classical Rajasthani palace architecture reimagined for contemporary stillness. Features arched colonnades, antique brass lanterns, a private library nook, and dual verandas overlooking tranquil lake waters.',
    amenities: [
      'Private Lakefront Sun Deck',
      'Dedicated Butler Service',
      'Aromatherapy Steam Shower & Soaking Tub',
      'Curated Artisanal Mewari Tea Bar',
      'Bespoke Silk Bedding & Pillow Menu',
      'Evening Turn-down Heritage Elixirs',
    ],
    features: ['1,250 sq.ft dual-aspect suite', 'Private stone sun deck', 'Panoramic floor-to-ceiling glass arches'],
  },
  {
    id: 'badi-horizon-lake-room',
    name: 'Lake View Deluxe Sanctuary',
    category: 'Lake View Rooms',
    tagline: 'Quiet elegance kissed by the morning light across water',
    sizeSqFt: 780,
    maxGuests: 2,
    bedType: 'California King',
    view: 'Direct Lake & Bougainvillea Gardens',
    demoRateInr: 34000,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
    description: 'Intimate and bathed in warm sandstone hues. Features cushioned bay-window seating extending over garden terraces, custom beaten-brass accents, and an open-concept rain shower overlooking courtyard palms.',
    amenities: [
      'Extended Bay Window Daybed',
      'Locally Blended Forest Botanicals',
      'Nespresso Artisanal Coffee Bar',
      'Forest View Rain Shower',
      'High-Speed Wi-Fi & Smart Climate Hub',
      'Yoga & Meditation Mat with Sound Bowl',
    ],
    features: ['780 sq.ft serene layout', 'Private outdoor garden patio', 'Custom handwoven dhurrie carpets'],
  },
  {
    id: 'lotus-pavilion-room',
    name: 'Lotus Pavilion Veranda Room',
    category: 'Lake View Rooms',
    tagline: 'Perched along tranquil water lily channels and frangipani',
    sizeSqFt: 720,
    maxGuests: 2,
    bedType: 'Plush King Bed',
    view: 'Reflecting Pools & Lake Horizon',
    demoRateInr: 29000,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
    description: 'Harmonious indoor-outdoor living with a private colonnaded terrace overlooking sacred lotus reflecting pools. Crafted with cool terrazzo floors, hand-blocked linens, and warm ambient evening uplighting.',
    amenities: [
      'Colonnaded Private Terrace',
      'Terrazzo & Brass Bathroom',
      'Twice-Daily Housekeeping with Floral Turn-down',
      'Organic Herbal Infusion Station',
      'Subtle Bose Acoustic Sound System',
    ],
    features: ['720 sq.ft ground terrace access', 'Direct path to Lake Promenade', 'Artisanal stone vanity'],
  },
  {
    id: 'aranya-private-pool-villa',
    name: 'The Aranya Estate Villa',
    category: 'Private Villas',
    tagline: 'Ultimate seclusion with an infinity pool hugging the hill ridge',
    sizeSqFt: 2900,
    maxGuests: 6,
    bedType: 'Two King Suites + Twin Salon',
    view: '360° Lake Badi, Aravali Hills & Private Courtyard',
    demoRateInr: 145000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'The pinnacle of private luxury in Udaipur. A free-standing secluded residence featuring its own private courtyard, a 40-foot heated infinity edge pool, private dining pavilion with dedicated chef service, outdoor sunken firepit, and private spa pavilion.',
    amenities: [
      '40-foot Private Heated Infinity Pool',
      'Full Resident Butler & Private Chef',
      'Private Wellness Cabana for In-Villa Spa',
      'Sunken Outdoor Firepit & Stargazing Lounge',
      'Private Gated Entrance & Chauffeur Courtyard',
      'Bespoke Udaipur Airport Chauffeur Transfers',
    ],
    features: ['2,900 sq.ft private estate', 'Independent gated entrance', 'Exclusive sunset dining terrace'],
  },
  {
    id: 'sanctuary-garden-villa',
    name: 'Sanctuary Garden Villa with Pool',
    category: 'Private Villas',
    tagline: 'Hidden behind stone fortress walls and fragrant jasmine groves',
    sizeSqFt: 2100,
    maxGuests: 4,
    bedType: 'King Master + Queen Pavilion',
    view: 'Enclosed Jasmine Courtyard & Lake Glimpse',
    demoRateInr: 110000,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    description: 'An intensely romantic haven surrounded by high sandstone walls, ancient neem trees, and a private plunge pool surrounded by brass oil lamps. Perfect for honeymooners and bridal parties seeking complete discretion.',
    amenities: [
      'Private Walled Plunge Pool & Daybed',
      'In-Villa Candlelit Dining by Request',
      'Outdoor Open-Air Rain Shower',
      'Complimentary In-Villa Ayurvedic Massage',
      'Concierge Pre-Arrival Curation',
    ],
    features: ['2,100 sq.ft enclosed private grounds', 'Fragrant Mughal-style herb courtyard', 'Private stone pavilion'],
  },
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'aranya-kitchen',
    name: 'Aranya Kitchen',
    subtitle: 'The Royal Table of Mewar & Contemporary Global Gastronomy',
    cuisine: 'Royal Mewari Heritage & Modern Pan-Asian',
    timings: 'Breakfast 07:00 – 11:00 | Lunch 12:30 – 15:30 | Dinner 19:00 – 23:00',
    setting: 'Arched Sandstone Hall & Lakefront Terrace',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    description: 'A culinary homage to the royal kitchens of Rajasthan. Master chefs celebrate heirloom slow-simmered dishes alongside clean, vibrant coastal and contemporary plates, using organic produce from our Aravali estate farm.',
    highlights: ['Centuries-old slow cooking (Dum & Sigri)', 'Estate organic micro-farm harvest', 'Sommelier-curated international cellar with 240+ labels'],
    signatureDish: 'Junglee Maas cooked with heirloom red chillies & clarified butter, paired with Bajra roti and smoked yogurt.',
  },
  {
    id: 'the-courtyard',
    name: 'The Courtyard',
    subtitle: 'Al fresco evenings beneath frangipani and Rajasthan’s night sky',
    cuisine: 'Wood-fired Flatbreads, Coastal Grills & Royal Mewari Kebabs',
    timings: 'Dinner 19:30 – 23:30',
    setting: 'Open-air Stone Courtyard with Candlelit Water Channels',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    description: 'Under the canopy of flowering trees and thousands of floating brass oil lamps, enjoy live instrumental sarangi notes, hand-rolled clay oven breads, and tender grills kissed by desert wood smoke.',
    highlights: ['Live acoustic sarangi & sitar recitals', 'Sunken fire tables in winter', 'Private candlelit corner pavilions for couples'],
    signatureDish: 'Smoked Saffron Paneer Tikka with pomegranate reduction & spiced wild berry compote.',
  },
  {
    id: 'sunset-bar',
    name: 'Sunset Bar',
    subtitle: 'Aravali ridge mixology, rare single malts & golden hour horizons',
    cuisine: 'Bespoke Cocktails, Vintage Cognacs & Tapas',
    timings: 'Daily 16:30 – 00:30',
    setting: 'Elevated Ridge Veranda Overlooking Lake Badi',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',
    description: 'The defining destination for Udaipur’s legendary sunsets. Crafted botanical libations infused with mountain juniper, vetiver, rose petals, and desert spices, served alongside an extraordinary single malt library.',
    highlights: ['Panoramic vantage point of twilight reflections', 'Signature botanical gin alchemy program', 'Rare library of aged Scotch & Indian single malts'],
    signatureDish: 'The Badi Twilight: Native wild juniper, burnt rosemary, fresh grapefruit mist, and saffron gold leaf.',
  },
];

export const EXPERIENCES: RetreatExperience[] = [
  {
    id: 'lake-excursions',
    title: 'Private Solar Lake Excursions',
    category: 'Lakeside Serenity',
    duration: '90 Minutes',
    timing: 'Morning Sunrise (06:30) or Golden Twilight (17:30)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    description: 'Glide effortlessly across the tranquil, motor-free waters of Lake Badi on our custom handcrafted wooden solar boat. Accompanied by chilled sparkling wine, artisanal canapés, and silent natural ripples.',
    curatedDetails: ['Handcrafted eco-friendly silent propulsion', 'Champagne & seasonal Mewari breakfast/canapés', 'Unobstructed vistas of Bahubali hills from the water'],
  },
  {
    id: 'private-dinners',
    title: 'Secluded Pavilion Dinners',
    category: 'Romantic Escapes',
    duration: '2.5 Hours',
    timing: 'Evening by Reservation (20:00)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    description: 'A private marble pavilion suspended above the lake or tucked within a fragrant jasmine grove, illuminated exclusively by 100 hand-poured brass oil lamps and attended by your dedicated butler and personal chef.',
    curatedDetails: ['5-course personalized tasting menu', 'Live private flutist or sitarist', 'Curated floral design and handwritten menus'],
  },
  {
    id: 'heritage-walks',
    title: 'Aravali Heritage & Temple Trails',
    category: 'Culture & Nature',
    duration: '2 Hours',
    timing: 'Morning at 07:00',
    image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1600&q=80',
    description: 'Follow our resident historian along ancient shepherd trails through the Aravali foothills to a 9th-century hidden stone Shiva shrine, discovering native desert flora, medicinal herbs, and migratory lake birds.',
    curatedDetails: ['Led by certified naturalist & heritage scholar', 'Tasting of local organic wild berries & mountain teas', 'Panoramic vista point over dual lake systems'],
  },
  {
    id: 'wellness-spa',
    title: 'Ayurvedic & Sound Sanctuary',
    category: 'Holistic Wellness',
    duration: '60 to 120 Minutes',
    timing: 'Daily 08:00 – 20:00',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    description: 'Rooted in timeless Vedic healing. Experience Abhyanga four-hand warm herbal oil therapies, Tibetan singing bowl vibrations, cedarwood dry saunas, and cold mountain plunge pools overlooking the tranquil valley.',
    curatedDetails: ['Consultation with Ayurvedic Vaidya (Physician)', 'Custom cold-pressed herbal oils brewed in-house', 'Sunset sound bath therapy on the yoga deck'],
  },
  {
    id: 'cultural-experiences',
    title: 'Royal Mewar Artisan Mastery',
    category: 'Living Heritage',
    duration: '90 Minutes',
    timing: 'Afternoons 15:30',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1600&q=80',
    description: 'Sit with master stone carvers, miniature painters, and hand-block textile artisans whose families have served the Mewar courts for seven generations. Create your own bespoke artwork to take home.',
    curatedDetails: ['Interactive masterclass with state awardees', 'Natural vegetable dye & gold dust pigments', 'Keepsake personalized cotton silk scarf'],
  },
  {
    id: 'sunset-experiences',
    title: 'Bahubali Ridge Sundowners',
    category: 'Signature Moments',
    duration: '2 Hours',
    timing: 'Late Afternoon 17:00',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    description: 'A private Jeep ascent to an exclusive ridge overlooking both Lake Badi and the distant Mewar valley. Relax on cushioned Persian kilims with bespoke cocktails as the sun dips behind the rugged mountains.',
    curatedDetails: ['Private vintage 4x4 mountain drive', 'Artisanal cheese, olives, and charcuterie board', 'Live jazz saxophone or acoustic guitar accompaniment'],
  },
];

export const WEDDING_VENUES: WeddingVenue[] = [
  {
    id: 'water-pavilion',
    name: 'The Water Pavilion & Lake Mandap',
    capacity: 'Up to 350 Guests',
    setting: 'Lakeside Marble Promontory with Panoramic Water Views',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    description: 'Exchange sacred vows as the setting sun paints Lake Badi in shades of vermilion and rose gold. A marble platform extending into still water, framed by Aravali silhouettes.',
    idealFor: 'Pheras, Sunset Ceremonies & Royal Mandap',
  },
  {
    id: 'aravali-amphitheatre',
    name: 'The Aravali Amphitheatre',
    capacity: 'Up to 550 Guests',
    setting: 'Open-Air Tiered Stone Amphitheatre Under Starlit Skies',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80',
    description: 'Carved directly into the hillside stone with natural acoustic amplification. The perfect amphitheatre for high-energy Sangeet nights, theatrical lighting, and royal processions.',
    idealFor: 'Grand Sangeet, Cocktail Evenings & Live Performances',
  },
  {
    id: 'the-royal-courtyard',
    name: 'The Royal Courtyard',
    capacity: 'Up to 250 Guests',
    setting: 'Arched Sandstone Enclosure with Jasmine Groves',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
    description: 'An intimate, fragrant setting surrounded by hand-carved pillars, cascading bougainvillea, and central fountain channels. Ideal for joyful daytime Mehendi and Haldi rituals.',
    idealFor: 'Mehendi, Haldi, Welcome Lunch & Intimate Receptions',
  },
  {
    id: 'glasshouse-ballroom',
    name: 'The Glasshouse Grand Ballroom',
    capacity: 'Up to 400 Guests',
    setting: 'Climate-Controlled Glass Pavilion with 360° Illuminated Views',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
    description: 'Floor-to-ceiling glass architecture seamlessly blending contemporary transparency with palace luxury. Perfect for post-wedding banquets, gala dinners, and late-night celebrations.',
    idealFor: 'Formal Gala Receptions, After Parties & Winter Banquets',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ananya-kabir',
    quote: 'Our three-day wedding at Aranya was pure poetry. The lake mandap at dusk took our breath away, but it was the team’s anticipatory warmth—remembering my grandmother’s herbal tea and ensuring every guest felt like royalty—that made it truly unforgettable.',
    author: 'Ananya & Kabir Singhania',
    role: 'Destination Wedding Hosts',
    city: 'Mumbai & London',
    occasion: 'Royal Lake Mandap Wedding',
    stayDate: 'November 2025 (Demo Story)',
  },
  {
    id: 'elena-rostova',
    quote: 'As an architect, I am notoriously sensitive to how spaces feel. Aranya is a masterclass in restrained palace luxury—no plastic gold or loud gimmicks, just exquisite local sandstone, honest water reflections, and silence that restores the soul.',
    author: 'Elena Rostova',
    role: 'Design Director, Rostova Atelier',
    city: 'Milan',
    occasion: 'Architectural Leisure Retreat',
    stayDate: 'January 2026 (Demo Story)',
  },
  {
    id: 'dr-rathore',
    quote: 'We celebrated my parents’ 50th golden anniversary in the Aranya Estate Villa. The private dinner floating under a canopy of 100 lanterns with the resident sarangi maestro is something our four generations will cherish forever.',
    author: 'Dr. Vikramaditya Rathore',
    role: 'Managing Director, Horizon Healthcare',
    city: 'New Delhi',
    occasion: 'Family Golden Jubilee',
    stayDate: 'February 2026 (Demo Story)',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Lakeside Sandstone Pavilion at Dusk',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    caption: 'Hand-chiselled Rajasthan sandstone archways illuminated by warm brass lanterns.',
  },
  {
    id: 'gal-2',
    title: 'The Aravali Presidential Suite Bedroom',
    category: 'rooms',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Panoramic lake-facing canopy bed with fine linen and forest green accents.',
  },
  {
    id: 'gal-3',
    title: 'Royal Mewari Degustation at Aranya Kitchen',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    caption: 'Slow-simmered heritage delicacies served on beaten brass table settings.',
  },
  {
    id: 'gal-4',
    title: 'Lake Badi Serenity & Aravali Ridges',
    category: 'landscape',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'Still waters and morning mist resting across the Aravali mountain sanctuary.',
  },
  {
    id: 'gal-5',
    title: 'The Water Pavilion Floral Mandap',
    category: 'weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: 'Cascading tuberose, marigolds and ivory silks reflected in Lake Badi.',
  },
  {
    id: 'gal-6',
    title: 'Silent Solar Boat Excursion at Twilight',
    category: 'experiences',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    caption: 'Chilled champagne and gentle ripples during sunset over the lake.',
  },
  {
    id: 'gal-7',
    title: 'The Estate Villa Private Infinity Pool',
    category: 'rooms',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    caption: 'A 40-foot private heated infinity pool overlooking the valley and hill peaks.',
  },
  {
    id: 'gal-8',
    title: 'Evening Candlelight in the Royal Courtyard',
    category: 'architecture',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Thousands of flickering oil lamps lining carved stone water courses.',
  },
  {
    id: 'gal-9',
    title: 'Signature Botanicals at Sunset Bar',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted Himalayan juniper cocktails with smoked rosemary and saffron.',
  },
  {
    id: 'gal-10',
    title: 'Grand Sangeet Night at the Amphitheatre',
    category: 'weddings',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tiered stone seating illuminated under the starlit desert sky.',
  },
  {
    id: 'gal-11',
    title: 'Mewari Sunken Fire Lounge',
    category: 'experiences',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Winter evenings with desert warmth and timeless sarangi melodies.',
  },
  {
    id: 'gal-12',
    title: 'Makrana Marble Bath & Lake View',
    category: 'rooms',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    caption: 'Freestanding soaking tub framed by arched lake-facing windows.',
  },
];
