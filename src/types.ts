export interface MarqueeItem {
  id: string;
  name: string;
  category: 'wedding' | 'corporate' | 'party' | 'pagoda' | 'stretch';
  headline: string;
  description: string;
  imageUrl: string;
  galleryImages: string[];
  capacitySeated: number;
  capacityStanding: number;
  availableSizes: string[];
  basePricePerDay: number;
  features: string[];
  specifications: {
    frameType: string;
    fabric: string;
    windResistance: string;
    fireRating: string;
    eaveHeight: string;
    ridgeHeight: string;
  };
  recommendedFor: string[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'linings' | 'flooring' | 'lighting' | 'heating' | 'furniture' | 'facilities';
  price: number;
  unit: string;
  description: string;
  imageUrl: string;
  badge?: string;
}

export interface BookingDetails {
  id: string;
  createdAt: string;
  status: 'Draft' | 'Confirmed' | 'Site Visit Requested';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: 'Wedding' | 'Corporate Function' | 'Birthday / Anniversary' | 'Garden Party' | 'Festival / Community';
  eventDate: string;
  durationDays: number;
  guestCount: number;
  selectedMarqueeId: string;
  selectedSize: string;
  venueType: 'Grass Lawn' | 'Hard Standing / Concrete' | 'Patio / Decking' | 'Tarmac';
  venueAddress: string;
  venuePostcode: string;
  notes?: string;
  selectedAccessories: {
    accessoryId: string;
    quantity: number;
  }[];
  pricing: {
    tentCost: number;
    accessoriesCost: number;
    deliveryAndSetup: number;
    vat: number;
    totalAmount: number;
    depositRequired: number;
  };
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
}
