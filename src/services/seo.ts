import { BUSINESS_CONFIG } from '../data/masterData';
import { Tutor } from '../types';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'profile' | 'article';
  schemaData?: Record<string, unknown>;
}

/**
 * Helper to update or create a <meta> tag safely in document.head
 */
function setMetaTag(selector: string, attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link rel="..."> tag safely
 */
function setLinkTag(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Helper to inject or update JSON-LD Structured Data
 */
function setJsonLdSchema(id: string, schema: Record<string, unknown>) {
  let scriptElement = document.getElementById(id) as HTMLScriptElement | null;
  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = id;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }
  scriptElement.text = JSON.stringify(schema);
}

export const SEOService = {
  /**
   * Applies metadata dynamically to document head
   */
  update(config: SEOConfig) {
    const fullTitle = config.title.includes(BUSINESS_CONFIG.name)
      ? config.title
      : `${config.title} | ${BUSINESS_CONFIG.name}`;

    // Update document title
    document.title = fullTitle;

    // Standard meta description
    setMetaTag('meta[name="description"]', 'name', 'description', config.description);

    // Standard keywords
    if (config.keywords && config.keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', config.keywords.join(', '));
    }

    // OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', config.ogType || 'website');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', BUSINESS_CONFIG.name);

    // Twitter Tags
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    // Canonical URL
    const canonical =
      config.canonicalUrl ||
      (typeof window !== 'undefined'
        ? window.location.origin + window.location.pathname
        : 'https://discoveryhometuition.com');
    setLinkTag('canonical', canonical);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);

    // Structured Data (Schema.org)
    if (config.schemaData) {
      setJsonLdSchema('dht-dynamic-schema', config.schemaData);
    }
  },

  /**
   * Default Home Page SEO for Orai Searches
   */
  setHomeSEO(locality?: string) {
    const areaText = locality && !locality.includes('All') ? ` in ${locality}` : ' in Orai';
    this.update({
      title: `Discovery Home Tuition - Orai | Verified Home Tutors${areaText} (Nursery to Class 12)`,
      description: `Har Bacche Ke Liye Sahi Teacher, Har Ghar Tak. Premium 1-to-1 verified home tutors${areaText}, UP for CBSE, ICSE & UP Board. Free demo class, call 7268961107.`,
      keywords: [
        'Home Tuition in Orai',
        'Home Tutor Orai UP',
        'CBSE Tutors Orai',
        'UP Board Home Tuition Orai',
        'Class 10 Maths Tutor Orai',
        'Class 12 Physics Chemistry Tutor Orai',
        'Female Home Tutors Orai',
        'Free Demo Class Orai',
        'Discovery Home Tuition',
        locality ? `${locality} Home Tutor Orai` : 'Rajendra Nagar Orai Home Tuition',
      ],
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: BUSINESS_CONFIG.name,
        alternateName: 'DHT Orai',
        description: `${BUSINESS_CONFIG.tagline} Verified 1-to-1 home tuition service in Orai, Uttar Pradesh.`,
        url: window.location.origin,
        telephone: `+91${BUSINESS_CONFIG.phone}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS_CONFIG.address,
          addressLocality: 'Orai',
          addressRegion: 'Uttar Pradesh',
          postalCode: '285001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '25.9904',
          longitude: '79.4526',
        },
        areaServed: [
          'Orai',
          'Rajendra Nagar',
          'Rath Road',
          'Konch Road',
          'Sushil Nagar',
          'Shivaji Nagar',
          'Station Road',
          'Kalpi Road',
          'Betwa Colony',
          'Jalaun District',
        ],
        openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 08:00-21:00',
        priceRange: '₹₹',
      },
    });
  },

  /**
   * Search / Filter SEO (e.g., when searching Class 10 Math in Rajendra Nagar)
   */
  setSearchSEO(criteria: {
    studentClass?: string;
    subject?: string;
    board?: string;
    area?: string;
    count?: number;
  }) {
    const parts: string[] = [];
    if (criteria.studentClass) parts.push(criteria.studentClass);
    if (criteria.board) parts.push(criteria.board);
    if (criteria.subject && criteria.subject !== 'All Subjects') parts.push(criteria.subject);

    const titlePrefix = parts.length > 0 ? parts.join(' ') + ' Home Tutors' : 'Verified Home Tutors';
    const areaSuffix = criteria.area && !criteria.area.includes('All') ? ` in ${criteria.area}, Orai` : ' in Orai, UP';

    const countText = criteria.count !== undefined ? `${criteria.count} verified faculty available. ` : '';

    this.update({
      title: `${titlePrefix}${areaSuffix} | Discovery Home Tuition`,
      description: `Find top rated ${titlePrefix}${areaSuffix}. ${countText}1-to-1 home lessons with background-verified teachers. Book a free home demo at 7268961107.`,
      keywords: [
        `${titlePrefix} Orai`,
        `Home Tuition ${criteria.area || 'Orai'}`,
        criteria.subject ? `${criteria.subject} Tutor Orai` : 'Maths Science Tutor Orai',
        criteria.studentClass ? `${criteria.studentClass} Tuition Orai` : 'Class 10 Tuition Orai',
        'Discovery Home Tuition',
      ],
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Home Tuition',
        provider: {
          '@type': 'EducationalOrganization',
          name: BUSINESS_CONFIG.name,
          telephone: `+91${BUSINESS_CONFIG.phone}`,
        },
        areaServed: criteria.area || 'Orai, Uttar Pradesh',
        description: `1-to-1 ${titlePrefix}${areaSuffix} with free trial demo.`,
      },
    });
  },

  /**
   * Specific Tutor Profile SEO
   */
  setTutorProfileSEO(tutor: Tutor) {
    this.update({
      title: `${tutor.name} (${tutor.qualification}) | Home Tutor in Orai`,
      description: `Book a free demo with ${tutor.name}, verified tutor in Orai with ${tutor.experienceYears}+ years experience. Specializes in ${tutor.subjects.slice(0, 3).join(', ')} for ${tutor.classes.slice(0, 3).join(', ')}. Call 7268961107.`,
      ogType: 'profile',
      keywords: [
        `${tutor.name} tutor Orai`,
        `${tutor.qualification} home tuition`,
        ...tutor.subjects.map((s) => `${s} teacher Orai`),
        ...tutor.teachingAreas.map((a) => `Tutor in ${a}`),
      ],
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: tutor.name,
        jobTitle: 'Home Tutor',
        description: tutor.bio,
        image: tutor.photoUrl,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: BUSINESS_CONFIG.name,
        },
        knowsAbout: tutor.subjects,
        areaServed: tutor.teachingAreas.map((area) => `${area}, Orai`),
      },
    });
  },

  /**
   * Free Demo Booking SEO
   */
  setFreeDemoSEO(prefilledSubject?: string) {
    const subText = prefilledSubject ? ` for ${prefilledSubject}` : '';
    this.update({
      title: `Book 100% Free Demo Class${subText} in Orai | Discovery Home Tuition`,
      description: `Schedule a 1-to-1 free home demo class${subText} in Orai. Zero registration charges. Evaluate teaching style at your home before paying fees. Call 7268961107.`,
      keywords: [
        'Free Demo Tuition Orai',
        'Free Trial Class Home Tutor Orai',
        'Book Home Demo Teacher Orai',
        'Discovery Home Tuition Demo',
      ],
    });
  },

  /**
   * Parent Flow / Find a Tutor SEO
   */
  setFindTutorSEO() {
    this.update({
      title: 'Find Your Home Tutor in Orai | 60-Second Tuition Request | DHT',
      description: 'Submit your tuition requirements in Orai. Choose class, board, subject, and locality. Get connected with verified nearby home tutors within 24 hours. Call 7268961107.',
      keywords: [
        'Find Home Tutor Orai',
        'Tuition Requirement Form Orai',
        'Hire Home Teacher Orai',
        'Discovery Home Tuition',
      ],
    });
  },

  /**
   * Become a Tutor Portal SEO
   */
  setBecomeTutorSEO() {
    this.update({
      title: 'Become a Home Tutor in Orai | Teacher Registration | Discovery Home Tuition',
      description: 'Join Discovery Home Tuition as a verified home tutor in Orai. Get student tuitions in your own locality (Rajendra Nagar, Rath Road) with guaranteed timely fee payouts. Register online.',
      keywords: [
        'Become Home Tutor Orai',
        'Teaching Jobs in Orai',
        'Tutor Registration Orai',
        'Part time teaching Orai',
        'Discovery Home Tuition Tutors',
      ],
    });
  },

  /**
   * Admin Operations Mode SEO
   */
  setAdminSEO() {
    this.update({
      title: 'Admin Operations Console | Discovery Home Tuition Orai HQ',
      description: 'Central lead management, tutor verification, and demo scheduling operations console for Discovery Home Tuition, Orai, Uttar Pradesh.',
    });
  },

  /**
   * User / Parent Profile SEO
   */
  setProfileSEO(role: string) {
    this.update({
      title: `My ${role === 'tutor' ? 'Tutor' : role === 'admin' ? 'Admin' : 'Parent'} Dashboard | Discovery Home Tuition Orai`,
      description: 'View and track your home tuition requirements, booked demo classes, and assigned teachers in Orai, Uttar Pradesh.',
    });
  },
};
