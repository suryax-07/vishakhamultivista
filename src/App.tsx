import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Factory,
  Flame,
  GraduationCap,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveRight,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Wrench,
  X,
} from 'lucide-react';

type Product = {
  slug: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  image: string;
  features: string[];
  applications: string[];
  specifications: [string, string][];
};

const heroImages = [
  'https://images.pexels.com/photos/30990849/pexels-photo-30990849.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  'https://images.pexels.com/photos/29224589/pexels-photo-29224589.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  'https://images.pexels.com/photos/17167905/pexels-photo-17167905.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
  'https://images.pexels.com/photos/29988963/pexels-photo-29988963.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800',
];
const productFallback = 'https://images.pexels.com/photos/32390903/pexels-photo-32390903.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200';

const phone = '+919444602376';
const phoneDisplay = '+91 94446 02376';
const email = 'salesvishakha2024@gmail.com';
const whatsappNumber = '919444602376';
const whatsapp = `https://wa.me/${whatsappNumber}`;
const address = 'No. 8/65, First Floor, M K Pathamnaban Street, C Pallavaram, Chennai – 600043';

const products: Product[] = [
  { slug: 'commercial-door', name: 'Commercial Door', category: 'Performance doors', description: 'Durable steel doors engineered for high-traffic commercial environments.', overview: 'A dependable, configurable steel door system that balances everyday durability with a refined architectural finish. Designed for offices, retail, hospitality and public-facing spaces.', image: '/products/commercial-door.jpg', features: ['Robust GI steel construction', 'Multiple core options', 'Powder coated or PU painted finish'], applications: ['Office buildings', 'Retail and hospitality', 'Public infrastructure'], specifications: [['Material', 'GI Steel'], ['GI Thickness', '0.8mm – 1.2mm'], ['Frame Thickness', '1.2mm – 1.6mm'], ['Core', 'Honeycomb / Rockwool / PUF'], ['Width', '900mm – 1500mm'], ['Height', 'Up to 2400mm'], ['Finish', 'Powder Coated / PU Painted']] },
  { slug: 'general-door', name: 'General Door', category: 'Performance doors', description: 'Versatile steel door systems for everyday commercial and institutional use.', overview: 'Our general-purpose steel doors offer consistent performance, clean detailing and practical specifications for projects that demand reliable quality at scale.', image: '/products/generaldoor.png', features: ['40mm–45mm shutter thickness', 'Choice of infill cores', 'Precision-fabricated frames'], applications: ['Institutions', 'Residential developments', 'Service areas'], specifications: [['Width', '800mm – 1000mm'], ['Height', '2000mm – 2100mm'], ['Thickness', '40mm – 45mm'], ['Core', 'Honeycomb / Rockwool / PUF'], ['GI Skin', '0.8mm – 1.2mm'], ['Frame', '1.2mm – 1.6mm']] },
  { slug: '2-hour-fire-rated-door', name: '2 Hour Fire Rated Door', category: 'Fire & life safety', description: 'Certified-feel fire door architecture built for critical protection zones.', overview: 'Built around high-density fire-resistant cores and robust steel skins, this system supports safer compartmentation for demanding commercial, industrial and healthcare applications.', image: '/products/firedoor.png', features: ['120-minute fire rating', 'Rockwool, honeycomb or ceramic wool core', 'Single and double leaf configurations'], applications: ['Hospitals', 'Industrial facilities', 'Fire-rated corridors'], specifications: [['Material', 'Galvanized Steel / Stainless Steel'], ['Core', 'Rockwool / Honeycomb / Ceramic Wool'], ['Fire Rating', '120 Minutes'], ['Single Size', '900 × 2100 mm'], ['Double Size', '1800 × 2100 mm'], ['Finish', 'Powder Coated / PU Painted']] },
  { slug: 'egress-door', name: 'Egress Door', category: 'Fire & life safety', description: 'Emergency egress doors with dependable hardware integration.', overview: 'An engineered exit solution designed to make safe movement simple, visible and dependable when it matters most.', image: '/products/egressdoor.png', features: ['Panic bar compatibility', 'Door closer and hinge integration', 'High-cycle steel construction'], applications: ['Hospitals', 'Schools and institutions', 'Commercial buildings'], specifications: [['Width', '900mm – 1200mm'], ['Height', '2100mm – 2400mm'], ['Thickness', '40mm – 70mm'], ['Core', 'Honeycomb / Rockwool'], ['Hardware', 'Panic Bar, Door Closer, Hinges']] },
  { slug: 'fire-exit-door', name: 'Fire Exit Door', category: 'Fire & life safety', description: 'Purpose-built steel exit doors for safer evacuation routes.', overview: 'High-performance fire exit doors that combine robust steel construction with intuitive operation and project-ready hardware options.', image: '/products/fireexitdoor.png', features: ['Heavy-duty GI shutter', 'Wide opening options', 'Compatible with fire exit hardware'], applications: ['Factories', 'Warehouses', 'Commercial premises'], specifications: [['Width', '900mm – 1500mm'], ['Height', 'Up to 2400mm'], ['Thickness', '46mm – 70mm'], ['GI Shutter', '0.8mm – 1.2mm'], ['Frame', '1.2mm – 1.6mm']] },
  { slug: 'stainless-steel-door', name: 'Stainless Steel Door', category: 'Hygienic environments', description: 'Clean, corrosion-resistant doors for demanding environments.', overview: 'SS304 doors offer a precise, low-maintenance finish where hygiene, corrosion resistance and long-term appearance are essential.', image: '/products/ssdoor.png', features: ['SS304 construction', 'Large single and double leaf sizes', 'Honeycomb, PUF or Rockwool infill'], applications: ['Healthcare', 'Food and beverage', 'Pharmaceutical facilities'], specifications: [['Material', 'SS304'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'acoustic-door', name: 'Acoustic Door', category: 'Specialty doors', description: 'Steel acoustic doors that help create quieter, more controlled spaces.', overview: 'Designed around Rockwool insulation and carefully considered construction, our acoustic door system helps manage sound transfer in specialist project zones.', image: '/products/acousticdoor.png', features: ['Rockwool acoustic infill', 'Large-format leaf options', 'Clean, project-ready finish'], applications: ['Studios and auditoriums', 'Plant rooms', 'Meeting and research spaces'], specifications: [['Material', 'GPSP'], ['Infill', 'Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'general-sliding-door', name: 'General Sliding Door', category: 'Sliding systems', description: 'Space-efficient sliding steel doors for flexible access planning.', overview: 'A smooth, practical sliding door platform for openings where swing clearance is limited or operational flow is a priority.', image: '/products/slidingdoor.png', features: ['Honeycomb, PUF or Rockwool infill', 'Large single and double leaf options', 'Space-efficient movement'], applications: ['Industrial facilities', 'Service corridors', 'Commercial back-of-house'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'rail-and-stile-door', name: 'Rail & Stile Door', category: 'Architectural systems', description: 'Structured steel framing with a refined, architectural character.', overview: 'Rail and stile construction brings a composed, durable language to high-use openings while keeping the design adaptable to project requirements.', image: '/products/raildoor.png', features: ['Strong framed construction', 'Multiple infill choices', 'Designed for large openings'], applications: ['Commercial interiors', 'Institutional buildings', 'Retail projects'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'scientific-door', name: 'Scientific Door', category: 'Specialty doors', description: 'Precision door systems for research and technical spaces.', overview: 'Scientific doors are configured for controlled environments where dependable operation, clean detailing and specialist coordination are critical.', image: '/products/scificdoor.png', features: ['Controlled-environment ready', 'Robust GPSP construction', 'Multiple core options'], applications: ['Research laboratories', 'Testing facilities', 'Technical rooms'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'lead-lined-door', name: 'Lead Lined Door', category: 'Healthcare protection', description: 'Specialist lead-lined doors for radiation-sensitive environments.', overview: 'A carefully coordinated protection door with lead sheet integration for medical and technical spaces requiring additional shielding considerations.', image: '/products/leaddoor.png', features: ['Lead sheet with PUF or Rockwool', 'Large-format configurations', 'Coordinated project detailing'], applications: ['Radiology departments', 'Imaging rooms', 'Research facilities'], specifications: [['Material', 'GPSP'], ['Infill', 'PUF / Rockwool with Lead Sheet'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'automatic-sliding-door', name: 'Automatic Sliding Door', category: 'Access systems', description: 'Smooth automatic access for high-flow and hygiene-sensitive spaces.', overview: 'An elegant automatic sliding solution that supports hands-free access, smooth traffic flow and a clean architectural presence.', image: '/products/automatic-sliding-door.jpg', features: ['Brushless DC motor', '24V DC operation', 'Wide opening range'], applications: ['Hospitals', 'Airports and offices', 'Retail entrances'], specifications: [['Glass Thickness', '8mm – 12mm'], ['Opening Width', '1000mm – 3000mm'], ['Opening Height', '2100mm – 3000mm'], ['Drive', 'Brushless DC Motor'], ['Voltage', '24V DC']] },
  { slug: 'fully-louvered-metal-door', name: 'Fully Louvered Metal Door', category: 'Ventilation systems', description: 'Ventilated metal doors for airflow, plant and utility spaces.', overview: 'A high-airflow louvered door system that provides practical ventilation without compromising a clean, durable metal enclosure.', image: '/products/louvereddoor.png', features: ['75%–90% ventilation coverage', 'Multiple material options', 'Blade pitch configurations'], applications: ['Electrical rooms', 'Plant rooms', 'Utility enclosures'], specifications: [['Material', 'GI / MS / Aluminium / UPVC'], ['Door Thickness', '0.8mm – 1.2mm'], ['Frame Thickness', '1.2mm – 1.6mm'], ['Blade Pitch', '25mm – 50mm'], ['Ventilation Coverage', '75% – 90%']] },
  { slug: 'manual-sliding-door', name: 'Manual Sliding Door', category: 'Sliding systems', description: 'Practical manual sliding doors for large, efficient openings.', overview: 'A flexible manual sliding platform for projects that need smooth access, durable materials and a straightforward operating experience.', image: '/products/manual-sliding-door.jpg', features: ['Glass, steel or PVC options', 'Wide width range', 'Smooth manual operation'], applications: ['Healthcare', 'Industrial areas', 'Commercial interiors'], specifications: [['Material', 'Glass / Steel / PVC'], ['Glass Thickness', '8mm – 12mm'], ['Width', '800mm – 3000mm'], ['Height', '2100mm – 3000mm']] },
  { slug: 'clean-room-door', name: 'Clean Room Door', category: 'Hygienic environments', description: 'Sealed door systems for controlled and clean manufacturing spaces.', overview: 'Clean room doors are built for hygienic, controlled environments, with sealed interfaces and finishes selected for demanding operational conditions.', image: '/products/cleandoor.png', features: ['EPDM or magnetic sealing', 'Powder coated steel or SS304 frame', 'GMP and ISO focused coordination'], applications: ['Pharmaceutical facilities', 'Hospitals', 'Clean manufacturing'], specifications: [['Glass Thickness', '10mm / 12mm'], ['Frame', 'Powder Coated Steel or SS304'], ['Sealing', 'EPDM Gasket / Magnetic Seal'], ['Compliance', 'GMP / ISO Standards']] },
  { slug: 'fully-glazed-door', name: 'Fully Glazed Door', category: 'Architectural systems', description: 'Light-filled glazed doors with flexible glass and frame options.', overview: 'A modern glazed door system for projects seeking visual openness, daylight and a precise architectural finish.', image: '/products/glazedoor.png', features: ['Clear, frosted, tinted or Low-E glass', 'Steel or PVC frame options', 'Project-ready safety glass specification'], applications: ['Corporate offices', 'Showrooms', 'Institutional interiors'], specifications: [['Glass Thickness', '10mm / 12mm / 14mm'], ['Glass Type', 'Clear / Frosted / Tinted / Low-E'], ['Frame', 'Steel / PVC'], ['Compliance', 'IS 2553 / BS EN 12150']] },
];

const industries = [
  { title: 'Healthcare', icon: HeartPulse, copy: 'Hygienic, reliable systems for hospitals and clinical environments.' },
  { title: 'Pharmaceutical', icon: ShieldCheck, copy: 'Clean room and specialist doors for controlled manufacturing.' },
  { title: 'Commercial', icon: ShoppingBag, copy: 'Architectural performance for offices, retail and hospitality.' },
  { title: 'Industrial', icon: Factory, copy: 'Durable access solutions for factories, warehouses and plants.' },
  { title: 'Institutions', icon: GraduationCap, copy: 'Long-life solutions for education and public infrastructure.' },
  { title: 'Residential', icon: Users, copy: 'Thoughtful steel door systems for modern developments.' },
];

const SITE_ORIGIN = (import.meta as any)?.env?.VITE_SITE_ORIGIN || 'https://vishakhamultivista.vercel.app';

function generateWhatsAppQuoteMessage(product: Product) {
  const lines = [
    'Hello Vishakha Multivista Team,',
    '',
    `I am interested in your *${product.name}*.`,
    '',
    'Product Category:',
    product.category,
    '',
    'Key Specifications:',
    ...product.specifications.map(([label, value]) => `• ${label}: ${value}`),
    '',
    'Applications:',
    ...product.applications.map((application) => `• ${application}`),
    '',
    'Please provide:',
    '• Product brochure',
    '• Technical details',
    '• Pricing information',
    '• Delivery timeline',
    '',
    'Project Location: __________',
    '',
    'Thank you.',
  ];
  return lines.join('\n');
}

function getWhatsAppQuoteLink(product: Product) {
  const message = generateWhatsAppQuoteMessage(product);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? 'brand-light' : ''}`}><img className="brand-logo" src="/logo.png" alt="Vishakha Multivista Products logo" /><div><strong>Vishakha</strong><small>Multivista Products</small></div></div>;
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  const hash = path.includes('#') ? path.slice(path.indexOf('#')) : '';
  window.setTimeout(() => {
    const target = hash ? document.querySelector(hash) : null;
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!target) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 0);
}

function Button({ children, variant = 'primary', onClick, href }: { children: ReactNode; variant?: 'primary' | 'light' | 'outline'; onClick?: () => void; href?: string }) {
  const className = `button button-${variant}`;
  if (href) return <a className={className} href={href}>{children}<ArrowRight size={16} /></a>;
  return <button className={className} onClick={onClick}>{children}<ArrowRight size={16} /></button>;
}

function Header({ productPage = false }: { productPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [['Home', '/'], ['About us', '/#about'], ['Products', '/products'], ['Catalogue', '/catalogue'], ['Industries', '/#industries'], ['Why us', '/#why-us'], ['Contact', '/contact']];
  return <header className={`site-header ${productPage ? 'site-header-solid' : ''}`}><div className="container header-inner"><a href="/" onClick={(e) => { e.preventDefault(); setOpen(false); navigate('/'); }}><Logo /></a><nav className={open ? 'nav-open' : ''} aria-label="Main navigation">{links.map(([label, path]) => <a key={label} href={path} onClick={(e) => { e.preventDefault(); setOpen(false); navigate(path); }}>{label}</a>)}<Button onClick={() => { setOpen(false); navigate('/contact'); }}>Get a quote</Button></nav><button className="menu-button" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Logo light /><p className="footer-intro">Engineered steel door solutions that help ambitious projects move forward with confidence.</p><div className="footer-social"><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://www.instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div></div><div><h4>Explore</h4><a href="/">Home</a><a href="/products">Products</a><a href="/#industries">Industries served</a><a href="/#why-us">Why choose us</a></div><div><h4>Contact</h4><a href={`tel:${phone}`}><Phone size={15} />{phoneDisplay}</a><a href={`mailto:${email}`}><Mail size={15} />{email}</a><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} />WhatsApp us</a><p><MapPin size={15} />{address}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Vishakha Multivista Products Pvt. Ltd.</span><span>Inspiring Growth to the World</span></div></div></footer>;
}

function WhatsApp() { return <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22} /><span>Talk to an expert</span></a>; }

function QuickContactBar() {
  return <div className="quick-bar"><div className="container quick-bar-inner"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp</span></a><a href={`tel:${phone}`}><Phone size={18} /><span>Call</span></a><a href={`mailto:${email}`}><Mail size={18} /><span>Email</span></a><a href="https://www.google.com/maps?q=12.969694,80.148667" target="_blank" rel="noreferrer"><MapPin size={18} /><span>Locate us</span></a></div></div>;
}

function ImageWithFallback({ src, alt, className, title }: { src: string; alt: string; className?: string; title?: string }) {
  const [source, setSource] = useState(src);
  return <img className={className} src={source} alt={alt} title={title || alt} loading="lazy" decoding="async" onError={() => setSource(productFallback)} />;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const seoAlt = `${product.name} - ${product.category} Manufacturer Chennai | Vishakha Multivista Products`;
  const seoTitle = `${product.name} - Vishakha Multivista Products`;
  return <article className={`product-card ${featured ? 'featured-card' : ''}`}><a className="product-image" href={`/products/${product.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}><ImageWithFallback src={product.image} alt={seoAlt} className="product-thumb" title={seoTitle} /><span className="product-category">{product.category}</span><span className="image-arrow"><ArrowRight size={18} /></span></a><div className="product-card-body"><h3>{product.name}</h3><p>{product.description}</p><a className="text-link" href={`/products/${product.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}>View details <MoveRight size={16} /></a></div></article>;
}

type RecommendationAnswers = {
  use: string;
  width: string;
  height: string;
  priority: string;
  movement: string;
};

function maximumMeasurement(product: Product, label: string) {
  const row = product.specifications.find(([name]) => name.toLowerCase().includes(label));
  if (!row) return 0;
  const values = row[1].match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  return values.length ? Math.max(...values) : 0;
}

function recommendProducts(answers: RecommendationAnswers) {
  const requestedWidth = Number(answers.width) || 0;
  const requestedHeight = Number(answers.height) || 0;
  return products.map((product) => {
    let score = 0;
    const reasons: string[] = [];
    const searchable = `${product.name} ${product.category} ${product.description} ${product.applications.join(' ')}`.toLowerCase();

    if (answers.use === 'Healthcare' && /health|hospital|clinical|hygienic|pharma/.test(searchable)) { score += 5; reasons.push('fits healthcare and hygiene workflows'); }
    if (answers.use === 'Industrial' && /industrial|factory|plant|warehouse/.test(searchable)) { score += 5; reasons.push('fits industrial traffic and service areas'); }
    if (answers.use === 'Commercial' && /commercial|office|retail|hospitality/.test(searchable)) { score += 5; reasons.push('fits commercial traffic and presentation'); }
    if (answers.use === 'Institutional' && /institution|school|public/.test(searchable)) { score += 5; reasons.push('fits institutional use'); }
    if (answers.priority === 'Fire protection' && /fire|egress|exit/.test(searchable)) { score += 7; reasons.push('supports fire and life-safety requirements'); }
    if (answers.priority === 'Hygiene and cleanability' && /clean|hygien|stainless|healthcare|pharma/.test(searchable)) { score += 7; reasons.push('supports hygienic, easy-clean environments'); }
    if (answers.priority === 'Noise control' && /acoustic/.test(searchable)) { score += 7; reasons.push('is designed for sound control'); }
    if (answers.priority === 'Ventilation' && /louver/.test(searchable)) { score += 7; reasons.push('provides controlled airflow'); }
    if (answers.movement === 'Sliding' && /sliding|automatic/.test(searchable)) { score += 5; reasons.push('uses a space-efficient sliding movement'); }
    if (answers.movement === 'Emergency exit' && /egress|fire exit|fire rated/.test(searchable)) { score += 5; reasons.push('supports a clear emergency exit route'); }
    if (answers.movement === 'Standard swing' && !/sliding|automatic/.test(searchable)) { score += 2; reasons.push('is available as a conventional swing door'); }

    const maxWidth = Math.max(maximumMeasurement(product, 'width'), maximumMeasurement(product, 'single'));
    const maxHeight = Math.max(maximumMeasurement(product, 'height'), maximumMeasurement(product, 'single'));
    if (requestedWidth && maxWidth >= requestedWidth) { score += 2; reasons.push(`supports your ${requestedWidth} mm width`); }
    if (requestedHeight && maxHeight >= requestedHeight) { score += 2; reasons.push(`supports your ${requestedHeight} mm height`); }
    return { product, score, reasons: reasons.slice(0, 2) };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

function RecommendationWizard() {
  const [answers, setAnswers] = useState<RecommendationAnswers>({ use: '', width: '', height: '', priority: '', movement: '' });
  const [complete, setComplete] = useState(false);
  const recommendations = recommendProducts(answers);
  const update = (field: keyof RecommendationAnswers, value: string) => setAnswers((current) => ({ ...current, [field]: value }));
  return <section className="section recommendation-section" id="recommend"><div className="container recommendation-grid"><div className="recommendation-intro"><div className="eyebrow"><span /> Smart product match</div><h2>Find the right door for your site.</h2><p>Answer five practical questions. We compare your requirements with the published product applications and maximum dimensions to create a focused starting shortlist.</p><div className="recommendation-note"><Sparkles size={17} /> Final sizing and compliance should be confirmed by our technical team.</div></div><div className="wizard-panel"><div className="wizard-progress"><span className={answers.use ? 'done' : 'active'}>1</span><span className={answers.width && answers.height ? 'done' : answers.use ? 'active' : ''}>2</span><span className={answers.priority && answers.movement ? 'done' : answers.width && answers.height ? 'active' : ''}>3</span></div>{!complete ? <form onSubmit={(event) => { event.preventDefault(); setComplete(true); }}><label>Where will the door be used?<select required value={answers.use} onChange={(event) => update('use', event.target.value)}><option value="">Choose an environment</option><option>Healthcare</option><option>Industrial</option><option>Commercial</option><option>Institutional</option></select></label><div className="form-grid"><label>Opening width (mm)<input required min="400" max="5000" type="number" value={answers.width} onChange={(event) => update('width', event.target.value)} placeholder="e.g. 1200" /></label><label>Opening height (mm)<input required min="1800" max="4000" type="number" value={answers.height} onChange={(event) => update('height', event.target.value)} placeholder="e.g. 2100" /></label></div><label>What matters most?<select required value={answers.priority} onChange={(event) => update('priority', event.target.value)}><option value="">Choose a priority</option><option>Fire protection</option><option>Hygiene and cleanability</option><option>Noise control</option><option>Ventilation</option></select></label><label>How should it move?<select required value={answers.movement} onChange={(event) => update('movement', event.target.value)}><option value="">Choose an opening style</option><option>Standard swing</option><option>Sliding</option><option>Emergency exit</option></select></label><button className="button button-primary" type="submit">Show recommendations <ArrowRight size={16} /></button></form> : <div className="recommendation-results"><div className="results-heading"><div><div className="eyebrow"><span /> Your shortlist</div><h3>Three strong starting points.</h3></div><button className="text-link" type="button" onClick={() => setComplete(false)}>Edit answers</button></div>{recommendations.map(({ product, reasons }) => <a className="recommendation-result" key={product.slug} href={`/products/${product.slug}`} onClick={(event) => { event.preventDefault(); navigate(`/products/${product.slug}`); }}><ImageWithFallback src={product.image} alt={product.name} className="recommendation-image" /><div><strong>{product.name}</strong><span>{reasons.join(' and ') || product.description}</span></div><ChevronRight size={18} /></a>)}</div>}</div></div></section>;
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  if (sent) return <div className="form-success"><div className="success-icon"><Check /></div><h3>Thank you for reaching out.</h3><p>Our team will review your requirements and get back to you shortly.</p><button className="text-link" onClick={() => setSent(false)}>Send another enquiry <MoveRight size={16} /></button></div>;
  return <form className="contact-form" onSubmit={submit}><div className="form-grid"><label>Full name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-grid"><label>Phone number<input required name="phone" placeholder="+91 00000 00000" /></label><label>Project type<select name="project"><option>Choose a project type</option><option>Commercial</option><option>Healthcare</option><option>Industrial</option><option>Pharmaceutical</option><option>Residential</option></select></label></div><label>How can we help?<textarea required name="message" rows={4} placeholder="Tell us about your project, timeline or door requirements" /></label><button className="button button-primary" type="submit">Request consultation <ArrowRight size={16} /></button></form>;
}

function ContactPage() {
  return <><Header productPage /><main><section className="contact-page-hero"><div className="container"><div className="eyebrow eyebrow-light"><span /> Start a project</div><h1>Let’s build better<br /><em>together.</em></h1><p>Tell us about your opening, standards and timeline. Our team will help you choose a practical door system and coordinate the next step.</p></div></section><section className="section contact-section contact-page-section"><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow"><span /> Talk to Vishakha</div><h2>Clear answers for<br /><em>your project.</em></h2><p>Speak with our team about product selection, technical details, pricing, delivery or installation support.</p><div className="contact-details"><a href={`tel:${phone}`}><span><Phone size={18} /></span><div><small>Call us</small><strong>{phoneDisplay}</strong></div></a><a href={`mailto:${email}`}><span><Mail size={18} /></span><div><small>Email us</small><strong>{email}</strong></div></a><a href={whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><div><small>WhatsApp</small><strong>Chat with our team</strong></div></a><div><span><MapPin size={18} /></span><div><small>Visit us</small><strong>{address}</strong></div></div></div></div><div className="contact-panel"><ContactForm /></div></div></section></main><Footer /><WhatsApp /></>;
}

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = setInterval(() => setActive((a) => (a + 1) % heroImages.length), 5000); return () => clearInterval(id); }, []);
  return <section className="hero"><div className="hero-slides">{heroImages.map((src, i) => <div key={src} className={`hero-slide ${i === active ? 'active' : ''}`} style={{ backgroundImage: `url(${src})` }} />)}</div><div className="hero-overlay" /><div className="hero-grid-lines" /><div className="container hero-content"><div className="eyebrow eyebrow-light"><span /> Chennai-based steel door specialists</div><h1>Steel door systems, <em>built to perform.</em></h1><p>Premium steel door solutions for commercial, industrial and healthcare projects — from thoughtful selection to precise installation.</p><div className="hero-actions"><Button variant="light" onClick={() => navigate('/contact')}>Get a quote</Button><Button variant="outline" onClick={() => navigate('/products')}>View products</Button></div><div className="hero-proof"><span><b>2018</b> Founded</span><span><b>360°</b> Project support</span><span><b>Pan-India</b> Delivery</span></div></div><div className="hero-dots">{heroImages.map((src, i) => <button key={src} className={i === active ? 'active' : ''} aria-label={`Slide ${i + 1}`} onClick={() => setActive(i)} />)}</div></section>;
}

function CapabilityStrip() {
  return <section className="capability-strip" aria-label="Project support"><div className="container capability-grid"><div><strong>01</strong><span>Product selection</span><small>Recommendations matched to your opening, use and standards.</small></div><div><strong>02</strong><span>Project coordination</span><small>Clear technical support from specification to delivery.</small></div><div><strong>03</strong><span>Site-ready installation</span><small>Dependable execution for commercial and critical spaces.</small></div></div></section>;
}

function HomePage() {
  const [showAll, setShowAll] = useState(false);
  return <><Header /><main><Hero /><CapabilityStrip /><QuickContactBar />

<section className="section intro-section" id="about"><div className="container intro-grid"><div><div className="eyebrow"><span /> About Vishakha</div><h2>One trusted partner for every opening.</h2></div><div className="intro-copy"><p className="lead">Vishakha Multivista Products Pvt. Ltd. manufactures, supplies and installs specialized steel doors, windows, frames and ventilators for spaces where performance matters.</p><p>Since 2018, we have supported builders, architects, construction engineers, hospitals and institutions with a single-window experience — combining product expertise, responsive consultancy and dependable site execution.</p><a className="text-link" href="/#contact">Start a conversation <MoveRight size={16} /></a></div></div></section>

<section className="section section-gray"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span /> What we make</div><h2>Engineered for the way<br />your project works.</h2></div><a className="text-link desktop-link" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>Explore all products <MoveRight size={16} /></a></div><div className="product-grid">{products.slice(0, showAll ? products.length : 4).map((product, index) => <ProductCard key={product.slug} product={product} featured={index === 0} />)}</div><button className="mobile-more" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer' : 'View more products'} <ChevronRight size={16} /></button></div></section>

<RecommendationWizard />

<section className="section industries-section" id="industries"><div className="container"><div className="section-heading centered"><div><div className="eyebrow"><span /> Built for your sector</div><h2>Performance where<br /><em>it matters most.</em></h2></div><p>From critical care to high-traffic commercial environments, our systems are configured around your people, process and place.</p></div><div className="industry-grid">{industries.map(({ title, icon: Icon, copy }) => <div className="industry-card" key={title}><Icon size={24} strokeWidth={1.7} /><h3>{title}</h3><p>{copy}</p><ArrowRight className="industry-arrow" size={18} /></div>)}</div></div></section>

<section className="section navy-section" id="why-us"><div className="container why-grid"><div><div className="eyebrow eyebrow-light"><span /> The Vishakha difference</div><h2>Made with precision.<br /><em>Delivered with care.</em></h2><p>Our promise is simple: make the right recommendation, build it properly and stay accountable through installation.</p><Button variant="light" onClick={() => navigate('/#contact')}>Talk to our team</Button></div><div className="why-points">{['Premium quality materials', 'Custom manufacturing', 'Expert installation', 'Fire safety solutions', 'Fast, reliable delivery', 'Turnkey project expertise', 'Experienced team', 'Low maintenance products'].map((item) => <div key={item}><Check size={17} />{item}</div>)}</div></div></section>

<section className="section contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow"><span /> Let’s build better</div><h2>Tell us what<br /><em>you’re building.</em></h2><p>Share a few details and our team will help you find the right door system for your site, standards and schedule.</p><div className="contact-details"><a href={`tel:${phone}`}><span><Phone size={18} /></span><div><small>Call us</small><strong>{phoneDisplay}</strong></div></a><a href={`mailto:${email}`}><span><Mail size={18} /></span><div><small>Email us</small><strong>{email}</strong></div></a><a href={whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><div><small>WhatsApp</small><strong>Chat with our team</strong></div></a><div><span><MapPin size={18} /></span><div><small>Visit us</small><strong>{address}</strong></div></div></div></div><div className="contact-panel"><ContactForm /></div></div></section>

<section className="map-section"><div className="container"><div className="map-header"><div><div className="eyebrow"><span /> Find us</div><h2>Visit our Chennai facility.</h2></div><a className="text-link" href="https://www.google.com/maps?q=12.969694,80.148667" target="_blank" rel="noreferrer">Open in Google Maps <MoveRight size={16} /></a></div><div className="map-frame"><iframe title="Vishakha Multivista Products location" src="https://www.google.com/maps?q=12.969694,80.148667&z=15&output=embed" loading="lazy" /></div></div></section></main><Footer /><WhatsApp /></>;
}

function ProductPage({ product }: { product: Product }) {
  return <><Header productPage /><main><section className="product-hero"><div className="container"><a className="back-link" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>← All products</a><div className="product-hero-grid"><div><div className="eyebrow"><span /> {product.category}</div><h1>{product.name}<em>.</em></h1><p>{product.overview}</p><Button onClick={() => navigate('/#contact')}>Request a quote</Button></div><div className="detail-image"><ImageWithFallback src={product.image} alt={`${product.name} product detail`} /><span>Vishakha engineered systems</span></div></div></div></section><section className="section detail-section"><div className="container detail-grid"><div><div className="eyebrow"><span /> Product overview</div><h2>Designed for dependable performance.</h2><p className="lead">Every Vishakha door is made to support the people and processes moving through your project every day.</p><div className="feature-list">{product.features.map((feature) => <div key={feature}><Check size={17} />{feature}</div>)}</div></div><div className="spec-card"><div className="spec-card-header"><h3>Technical specifications</h3><span>Project configurable</span></div><div className="spec-table">{product.specifications.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div></section><section className="section quote-section"><div className="container"><a className="button button-primary quote-button" href={getWhatsAppQuoteLink(product)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Request Quote for This Product</a></div></section><section className="section applications-section"><div className="container applications-grid"><div><div className="eyebrow"><span /> Applications</div><h2>At home in demanding environments.</h2></div><div className="application-list">{product.applications.map((application) => <div key={application}><ShieldCheck size={18} />{application}<ArrowRight size={16} /></div>)}</div></div></section><section className="section detail-cta"><div className="container detail-cta-inner"><div><div className="eyebrow eyebrow-light"><span /> Need guidance?</div><h2>Let’s find the right fit<br /><em>for your project.</em></h2></div><Button variant="light" onClick={() => navigate('/#contact')}>Request consultation</Button></div></section></main><Footer /><WhatsApp /></>;
}

function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = useMemo(() => filter === 'All' ? products : products.filter((p) => p.category === filter), [filter]);
  return <><Header /><main><section className="listing-hero page-hero"><div className="container"><div className="eyebrow eyebrow-light"><span /> Our product range</div><h1>Doors that do<br /><em>more.</em></h1><p>From fire-rated protection to clean room control, discover steel door systems configured for the demands of modern projects.</p><a className="button button-light page-hero-action" href="/#recommend" onClick={(e) => { e.preventDefault(); navigate('/#recommend'); }}>Find my door <Sparkles size={16} /></a></div></section><section className="section listing-section"><div className="container"><div className="filter-bar">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div><div className="product-grid product-grid-full">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section></main><Footer /><WhatsApp /></>;
}

function CataloguePage() {
  const [embedSupported, setEmbedSupported] = useState(true);
  const catalogueSrc = '/products/catalogue.pdf';
  return <><Header /><main><section className="listing-hero page-hero"><div className="container"><div className="eyebrow eyebrow-light"><span /> Product Catalogue</div><h1>Product<br /><em>Catalogue.</em></h1><p>Explore our complete range of specialized steel doors, fire rated doors, clean room doors, acoustic doors, sliding doors, windows, frames and ventilators.</p></div></section><section className="section catalogue-intro"><div className="container catalogue-panel"><div className="catalogue-panel-copy"><p>Browse our complete product catalogue for detailed specifications, applications and technical information.</p></div><a className="button button-primary catalogue-fullscreen" href={catalogueSrc} target="_blank" rel="noreferrer">Open Full Screen</a></div></section><section className="section catalogue-viewer"><div className="container">{embedSupported ? <iframe title="Vishakha Product Catalogue" src={catalogueSrc} width="100%" height="1000" onError={() => setEmbedSupported(false)} /> : <div className="catalogue-fallback"><p>Unable to display catalogue. Open PDF.</p><a className="button button-primary" href={catalogueSrc} target="_blank" rel="noreferrer">Open PDF</a></div>}</div></section></main><Footer /><WhatsApp /></>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => {
    const origin = SITE_ORIGIN || window.location.origin;
    const current = products.find((product) => path === `/products/${product.slug}`);
    const title = current ? `${current.name} | Vishakha Multivista Products` : path === '/products' ? 'Steel Door Products | Vishakha Multivista Products' : path === '/catalogue' ? 'Product Catalogue | Vishakha Multivista Products' : path === '/contact' ? 'Contact Vishakha Multivista Products' : 'Premium Steel Door Solutions | Vishakha Multivista Products';
    const description = current ? `${current.description} | Vishakha Multivista Products - Manufacturer & Supplier in Chennai` : path === '/catalogue' ? 'View the complete Vishakha Multivista product catalogue for fire rated doors, clean room doors, acoustic doors, sliding doors and specialized steel door systems.' : path === '/contact' ? 'Contact Vishakha Multivista Products for steel door recommendations, technical support, pricing, delivery and installation.' : 'Vishakha Multivista Products manufactures, supplies and installs premium steel doors for commercial, industrial, healthcare and institutional projects.';
    const canonical = `${origin}${path}`;

    document.title = title;

    function setMetaBy(attrName: 'name' | 'property', attrValue: string, content: string) {
      const selector = `meta[${attrName}="${attrValue}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    }

    // Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.setAttribute('name', 'description'); document.head.appendChild(metaDesc); }
    metaDesc.setAttribute('content', description);

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) { linkCanonical = document.createElement('link'); linkCanonical.setAttribute('rel', 'canonical'); document.head.appendChild(linkCanonical); }
    linkCanonical.setAttribute('href', canonical);

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!metaRobots) { metaRobots = document.createElement('meta'); metaRobots.setAttribute('name', 'robots'); document.head.appendChild(metaRobots); }
    metaRobots.setAttribute('content', 'index, follow');

    // Manifest link and theme color
    let linkManifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
    if (!linkManifest) { linkManifest = document.createElement('link'); linkManifest.setAttribute('rel', 'manifest'); document.head.appendChild(linkManifest); }
    linkManifest.setAttribute('href', '/manifest.json');
    let metaTheme = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (!metaTheme) { metaTheme = document.createElement('meta'); metaTheme.setAttribute('name', 'theme-color'); document.head.appendChild(metaTheme); }
    metaTheme.setAttribute('content', '#0B2341');

    // Preload critical assets (logo)
    let linkPreload = document.querySelector('link[rel="preload"][as="image"][href="/logo.png"]') as HTMLLinkElement | null;
    if (!linkPreload) {
      linkPreload = document.createElement('link');
      linkPreload.setAttribute('rel', 'preload');
      linkPreload.setAttribute('as', 'image');
      linkPreload.setAttribute('href', '/logo.png');
      document.head.appendChild(linkPreload);
    }

    // Open Graph
    setMetaBy('property', 'og:title', title);
    setMetaBy('property', 'og:description', description);
    setMetaBy('property', 'og:url', canonical);
    setMetaBy('property', 'og:type', current ? 'product' : 'website');
    // set a default og:image - prefer product image
    const ogImage = current ? `${origin}${current.image}` : `${origin}/logo.png`;
    setMetaBy('property', 'og:image', ogImage);

    // Twitter
    setMetaBy('name', 'twitter:card', 'summary_large_image');
    setMetaBy('name', 'twitter:title', title);
    setMetaBy('name', 'twitter:description', description);
    setMetaBy('name', 'twitter:image', ogImage);

    // Remove existing JSON-LD scripts we may have injected earlier
    document.querySelectorAll('script[type="application/ld+json"].seo-jsonld').forEach((s) => s.remove());

    // Organization + LocalBusiness structured data
    const orgJson: any = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Vishakha Multivista Products Pvt. Ltd.',
      'url': origin,
      'logo': `${origin}/logo.png`,
      'sameAs': [],
      'contactPoint': [{ '@type': 'ContactPoint', 'telephone': phone, 'contactType': 'customer service', 'email': email }]
    };
    const localJson: any = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Vishakha Multivista Products Pvt. Ltd.',
      'image': `${origin}/logo.png`,
      'telephone': phone,
      'email': email,
      'address': { '@type': 'PostalAddress', 'streetAddress': 'No. 8/65, First Floor, M K Pathamnaban Street, C Pallavaram', 'addressLocality': 'Chennai', 'addressRegion': 'Tamil Nadu', 'postalCode': '600043', 'addressCountry': 'IN' },
      'geo': { '@type': 'GeoCoordinates', 'latitude': 12.969694, 'longitude': 80.148667 },
      'url': origin,
      'priceRange': '$$',
      'description': 'Manufacturer, Supplier and Installer of Specialized Steel Doors, Windows, Frames and Ventilators',
      'areaServed': ['Chennai','Tamil Nadu','South India','India'],
      'openingHoursSpecification': [{ '@type': 'OpeningHoursSpecification','dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday'],'opens':'09:00','closes':'18:00'}]
    };

    const ldAll = [orgJson, localJson];

    // Product specific schema when on a product page
    if (current) {
      const productJson: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': current.name,
        'image': [`${origin}${current.image}`],
        'description': current.overview || current.description,
        'sku': current.slug,
        'brand': { '@type': 'Brand', 'name': 'Vishakha Multivista Products' },
        'offers': { '@type': 'Offer', 'url': canonical, 'priceCurrency': 'INR', 'availability': 'https://schema.org/InStock' }
      };
      ldAll.push(productJson);
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.className = 'seo-jsonld';
    script.textContent = JSON.stringify(ldAll);
    document.head.appendChild(script);

  }, [path]);
  const product = products.find((item) => path === `/products/${item.slug}`);
  return path === '/contact' ? <ContactPage /> : product ? <ProductPage product={product} /> : path === '/products' ? <ProductsPage /> : path === '/catalogue' ? <CataloguePage /> : <HomePage />;
}

export default App;
