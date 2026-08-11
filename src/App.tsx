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
const whatsapp = 'https://wa.me/919444602376';
const address = 'No. 8/65, First Floor, M K Pathamnaban Street, C Pallavaram, Chennai – 600043';

const products: Product[] = [
  { slug: 'commercial-door', name: 'Commercial Door', category: 'Performance doors', description: 'Durable steel doors engineered for high-traffic commercial environments.', overview: 'A dependable, configurable steel door system that balances everyday durability with a refined architectural finish. Designed for offices, retail, hospitality and public-facing spaces.', image: '/products/commercial-door.jpg', features: ['Robust GI steel construction', 'Multiple core options', 'Powder coated or PU painted finish'], applications: ['Office buildings', 'Retail and hospitality', 'Public infrastructure'], specifications: [['Material', 'GI Steel'], ['GI Thickness', '0.8mm – 1.2mm'], ['Frame Thickness', '1.2mm – 1.6mm'], ['Core', 'Honeycomb / Rockwool / PUF'], ['Width', '900mm – 1500mm'], ['Height', 'Up to 2400mm'], ['Finish', 'Powder Coated / PU Painted']] },
  { slug: 'general-door', name: 'General Door', category: 'Performance doors', description: 'Versatile steel door systems for everyday commercial and institutional use.', overview: 'Our general-purpose steel doors offer consistent performance, clean detailing and practical specifications for projects that demand reliable quality at scale.', image: '/products/generaldoor.png', features: ['40mm–45mm shutter thickness', 'Choice of infill cores', 'Precision-fabricated frames'], applications: ['Institutions', 'Residential developments', 'Service areas'], specifications: [['Width', '800mm – 1000mm'], ['Height', '2000mm – 2100mm'], ['Thickness', '40mm – 45mm'], ['Core', 'Honeycomb / Rockwool / PUF'], ['GI Skin', '0.8mm – 1.2mm'], ['Frame', '1.2mm – 1.6mm']] },
  { slug: '2-hour-fire-rated-door', name: '2 Hour Fire Rated Door', category: 'Fire & life safety', description: 'Certified-feel fire door architecture built for critical protection zones.', overview: 'Built around high-density fire-resistant cores and robust steel skins, this system supports safer compartmentation for demanding commercial, industrial and healthcare applications.', image: '/products/firedoor.png', features: ['120-minute fire rating', 'Rockwool, honeycomb or ceramic wool core', 'Single and double leaf configurations'], applications: ['Hospitals', 'Industrial facilities', 'Fire-rated corridors'], specifications: [['Material', 'Galvanized Steel / Stainless Steel'], ['Core', 'Rockwool / Honeycomb / Ceramic Wool'], ['Fire Rating', '120 Minutes'], ['Single Size', '900 × 2100 mm'], ['Double Size', '1800 × 2100 mm'], ['Finish', 'Powder Coated / PU Painted']] },
  { slug: 'egress-door', name: 'Egress Door', category: 'Fire & life safety', description: 'Emergency egress doors with dependable hardware integration.', overview: 'An engineered exit solution designed to make safe movement simple, visible and dependable when it matters most.', image: '/products/egressdoor.png', features: ['Panic bar compatibility', 'Door closer and hinge integration', 'High-cycle steel construction'], applications: ['Hospitals', 'Schools and institutions', 'Commercial buildings'], specifications: [['Width', '900mm – 1200mm'], ['Height', '2100mm – 2400mm'], ['Thickness', '40mm – 70mm'], ['Core', 'Honeycomb / Rockwool'], ['Hardware', 'Panic Bar, Door Closer, Hinges']] },
  { slug: 'fire-exit-door', name: 'Fire Exit Door', category: 'Fire & life safety', description: 'Purpose-built steel exit doors for safer evacuation routes.', overview: 'High-performance fire exit doors that combine robust steel construction with intuitive operation and project-ready hardware options.', image: '/products/fireexitdoor.png', features: ['Heavy-duty GI shutter', 'Wide opening options', 'Compatible with fire exit hardware'], applications: ['Factories', 'Warehouses', 'Commercial premises'], specifications: [['Width', '900mm – 1500mm'], ['Height', 'Up to 2400mm'], ['Thickness', '46mm – 70mm'], ['GI Shutter', '0.8mm – 1.2mm'], ['Frame', '1.2mm – 1.6mm']] },
  { slug: 'stainless-steel-door', name: 'Stainless Steel Door', category: 'Hygienic environments', description: 'Clean, corrosion-resistant doors for demanding environments.', overview: 'SS304 doors offer a precise, low-maintenance finish where hygiene, corrosion resistance and long-term appearance are essential.', image: '/products/ssdoor.png', features: ['SS304 construction', 'Large single and double leaf sizes', 'Honeycomb, PUF or Rockwool infill'], applications: ['Healthcare', 'Food and beverage', 'Pharmaceutical facilities'], specifications: [['Material', 'SS304'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'acoustic-door', name: 'Acoustic Door', category: 'Specialty doors', description: 'Steel acoustic doors that help create quieter, more controlled spaces.', overview: 'Designed around Rockwool insulation and carefully considered construction, our acoustic door system helps manage sound transfer in specialist project zones.', image: '/products/acoustic-door.jpg', features: ['Rockwool acoustic infill', 'Large-format leaf options', 'Clean, project-ready finish'], applications: ['Studios and auditoriums', 'Plant rooms', 'Meeting and research spaces'], specifications: [['Material', 'GPSP'], ['Infill', 'Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'general-sliding-door', name: 'General Sliding Door', category: 'Sliding systems', description: 'Space-efficient sliding steel doors for flexible access planning.', overview: 'A smooth, practical sliding door platform for openings where swing clearance is limited or operational flow is a priority.', image: '/products/general-sliding-door.jpg', features: ['Honeycomb, PUF or Rockwool infill', 'Large single and double leaf options', 'Space-efficient movement'], applications: ['Industrial facilities', 'Service corridors', 'Commercial back-of-house'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'rail-and-stile-door', name: 'Rail & Stile Door', category: 'Architectural systems', description: 'Structured steel framing with a refined, architectural character.', overview: 'Rail and stile construction brings a composed, durable language to high-use openings while keeping the design adaptable to project requirements.', image: '/products/rail-and-stile-door.jpg', features: ['Strong framed construction', 'Multiple infill choices', 'Designed for large openings'], applications: ['Commercial interiors', 'Institutional buildings', 'Retail projects'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'scientific-door', name: 'Scientific Door', category: 'Specialty doors', description: 'Precision door systems for research and technical spaces.', overview: 'Scientific doors are configured for controlled environments where dependable operation, clean detailing and specialist coordination are critical.', image: '/products/scientific-door.jpg', features: ['Controlled-environment ready', 'Robust GPSP construction', 'Multiple core options'], applications: ['Research laboratories', 'Testing facilities', 'Technical rooms'], specifications: [['Material', 'GPSP'], ['Infill', 'Honeycomb / PUF / Rockwool'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'lead-lined-door', name: 'Lead Lined Door', category: 'Healthcare protection', description: 'Specialist lead-lined doors for radiation-sensitive environments.', overview: 'A carefully coordinated protection door with lead sheet integration for medical and technical spaces requiring additional shielding considerations.', image: '/products/leaddoor.png', features: ['Lead sheet with PUF or Rockwool', 'Large-format configurations', 'Coordinated project detailing'], applications: ['Radiology departments', 'Imaging rooms', 'Research facilities'], specifications: [['Material', 'GPSP'], ['Infill', 'PUF / Rockwool with Lead Sheet'], ['Max Single Leaf', '1420 × 3000 mm'], ['Max Double Leaf', '2840 × 3000 mm'], ['Shutter Thickness', '46 mm']] },
  { slug: 'automatic-sliding-door', name: 'Automatic Sliding Door', category: 'Access systems', description: 'Smooth automatic access for high-flow and hygiene-sensitive spaces.', overview: 'An elegant automatic sliding solution that supports hands-free access, smooth traffic flow and a clean architectural presence.', image: '/products/automatic-sliding-door.jpg', features: ['Brushless DC motor', '24V DC operation', 'Wide opening range'], applications: ['Hospitals', 'Airports and offices', 'Retail entrances'], specifications: [['Glass Thickness', '8mm – 12mm'], ['Opening Width', '1000mm – 3000mm'], ['Opening Height', '2100mm – 3000mm'], ['Drive', 'Brushless DC Motor'], ['Voltage', '24V DC']] },
  { slug: 'fully-louvered-metal-door', name: 'Fully Louvered Metal Door', category: 'Ventilation systems', description: 'Ventilated metal doors for airflow, plant and utility spaces.', overview: 'A high-airflow louvered door system that provides practical ventilation without compromising a clean, durable metal enclosure.', image: '/products/fully-louvered-metal-door.jpg', features: ['75%–90% ventilation coverage', 'Multiple material options', 'Blade pitch configurations'], applications: ['Electrical rooms', 'Plant rooms', 'Utility enclosures'], specifications: [['Material', 'GI / MS / Aluminium / UPVC'], ['Door Thickness', '0.8mm – 1.2mm'], ['Frame Thickness', '1.2mm – 1.6mm'], ['Blade Pitch', '25mm – 50mm'], ['Ventilation Coverage', '75% – 90%']] },
  { slug: 'manual-sliding-door', name: 'Manual Sliding Door', category: 'Sliding systems', description: 'Practical manual sliding doors for large, efficient openings.', overview: 'A flexible manual sliding platform for projects that need smooth access, durable materials and a straightforward operating experience.', image: '/products/manual-sliding-door.jpg', features: ['Glass, steel or PVC options', 'Wide width range', 'Smooth manual operation'], applications: ['Healthcare', 'Industrial areas', 'Commercial interiors'], specifications: [['Material', 'Glass / Steel / PVC'], ['Glass Thickness', '8mm – 12mm'], ['Width', '800mm – 3000mm'], ['Height', '2100mm – 3000mm']] },
  { slug: 'clean-room-door', name: 'Clean Room Door', category: 'Hygienic environments', description: 'Sealed door systems for controlled and clean manufacturing spaces.', overview: 'Clean room doors are built for hygienic, controlled environments, with sealed interfaces and finishes selected for demanding operational conditions.', image: '/products/clean-room-door.jpg', features: ['EPDM or magnetic sealing', 'Powder coated steel or SS304 frame', 'GMP and ISO focused coordination'], applications: ['Pharmaceutical facilities', 'Hospitals', 'Clean manufacturing'], specifications: [['Glass Thickness', '10mm / 12mm'], ['Frame', 'Powder Coated Steel or SS304'], ['Sealing', 'EPDM Gasket / Magnetic Seal'], ['Compliance', 'GMP / ISO Standards']] },
  { slug: 'fully-glazed-door', name: 'Fully Glazed Door', category: 'Architectural systems', description: 'Light-filled glazed doors with flexible glass and frame options.', overview: 'A modern glazed door system for projects seeking visual openness, daylight and a precise architectural finish.', image: '/products/fully-glazed-door.jpg', features: ['Clear, frosted, tinted or Low-E glass', 'Steel or PVC frame options', 'Project-ready safety glass specification'], applications: ['Corporate offices', 'Showrooms', 'Institutional interiors'], specifications: [['Glass Thickness', '10mm / 12mm / 14mm'], ['Glass Type', 'Clear / Frosted / Tinted / Low-E'], ['Frame', 'Steel / PVC'], ['Compliance', 'IS 2553 / BS EN 12150']] },
];

const industries = [
  { title: 'Healthcare', icon: HeartPulse, copy: 'Hygienic, reliable systems for hospitals and clinical environments.' },
  { title: 'Pharmaceutical', icon: ShieldCheck, copy: 'Clean room and specialist doors for controlled manufacturing.' },
  { title: 'Commercial', icon: ShoppingBag, copy: 'Architectural performance for offices, retail and hospitality.' },
  { title: 'Industrial', icon: Factory, copy: 'Durable access solutions for factories, warehouses and plants.' },
  { title: 'Institutions', icon: GraduationCap, copy: 'Long-life solutions for education and public infrastructure.' },
  { title: 'Residential', icon: Users, copy: 'Thoughtful steel door systems for modern developments.' },
];

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? 'brand-light' : ''}`}><img className="brand-logo" src="/logo.png" alt="Vishakha Multivista Products logo" /><div><strong>Vishakha</strong><small>Multivista Products</small></div></div>;
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Button({ children, variant = 'primary', onClick, href }: { children: ReactNode; variant?: 'primary' | 'light' | 'outline'; onClick?: () => void; href?: string }) {
  const className = `button button-${variant}`;
  if (href) return <a className={className} href={href}>{children}<ArrowRight size={16} /></a>;
  return <button className={className} onClick={onClick}>{children}<ArrowRight size={16} /></button>;
}

function Header({ productPage = false }: { productPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [['About', '/#about'], ['Products', '/products'], ['Industries', '/#industries'], ['Why us', '/#why-us'], ['Contact', '/#contact']];
  return <header className="site-header"><div className="container header-inner"><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}><Logo /></a><nav className={open ? 'nav-open' : ''}>{links.map(([label, path]) => <a key={label} href={path} onClick={(e) => { e.preventDefault(); setOpen(false); navigate(path); }}>{label}</a>)}<Button onClick={() => navigate('/#contact')}>Get a quote</Button></nav><button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Logo light /><p className="footer-intro">Engineered steel door solutions that help ambitious projects move forward with confidence.</p><div className="footer-social"><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="https://www.instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17} /></a></div></div><div><h4>Explore</h4><a href="/#about">About us</a><a href="/products">Products</a><a href="/#industries">Industries served</a><a href="/#why-us">Why choose us</a></div><div><h4>Contact</h4><a href={`tel:${phone}`}><Phone size={15} />{phoneDisplay}</a><a href={`mailto:${email}`}><Mail size={15} />{email}</a><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} />WhatsApp us</a><p><MapPin size={15} />{address}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Vishakha Multivista Products Pvt. Ltd.</span><span>Inspiring Growth to the World</span></div></div></footer>;
}

function WhatsApp() { return <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22} /><span>Talk to an expert</span></a>; }

function QuickContactBar() {
  return <div className="quick-bar"><div className="container quick-bar-inner"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>WhatsApp</span></a><a href={`tel:${phone}`}><Phone size={18} /><span>Call</span></a><a href={`mailto:${email}`}><Mail size={18} /><span>Email</span></a><a href="https://www.google.com/maps?q=12.969694,80.148667" target="_blank" rel="noreferrer"><MapPin size={18} /><span>Locate us</span></a></div></div>;
}

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [source, setSource] = useState(src);
  return <img className={className} src={source} alt={alt} onError={() => setSource(productFallback)} />;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <article className={`product-card ${featured ? 'featured-card' : ''}`}><a className="product-image" href={`/products/${product.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}><ImageWithFallback src={product.image} alt={`${product.name} steel door solution`} /><span className="product-category">{product.category}</span><span className="image-arrow"><ArrowRight size={18} /></span></a><div className="product-card-body"><h3>{product.name}</h3><p>{product.description}</p><a className="text-link" href={`/products/${product.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/products/${product.slug}`); }}>View details <MoveRight size={16} /></a></div></article>;
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  if (sent) return <div className="form-success"><div className="success-icon"><Check /></div><h3>Thank you for reaching out.</h3><p>Our team will review your requirements and get back to you shortly.</p><button className="text-link" onClick={() => setSent(false)}>Send another enquiry <MoveRight size={16} /></button></div>;
  return <form className="contact-form" onSubmit={submit}><div className="form-grid"><label>Full name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-grid"><label>Phone number<input required name="phone" placeholder="+91 00000 00000" /></label><label>Project type<select name="project"><option>Choose a project type</option><option>Commercial</option><option>Healthcare</option><option>Industrial</option><option>Pharmaceutical</option><option>Residential</option></select></label></div><label>How can we help?<textarea required name="message" rows={4} placeholder="Tell us about your project, timeline or door requirements" /></label><button className="button button-primary" type="submit">Request consultation <ArrowRight size={16} /></button></form>;
}

function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = setInterval(() => setActive((a) => (a + 1) % heroImages.length), 5000); return () => clearInterval(id); }, []);
  return <section className="hero"><div className="hero-slides">{heroImages.map((src, i) => <div key={src} className={`hero-slide ${i === active ? 'active' : ''}`} style={{ backgroundImage: `url(${src})` }} />)}</div><div className="hero-overlay" /><div className="hero-grid-lines" /><div className="container hero-content"><div className="eyebrow eyebrow-light"><span /> Chennai-based steel door specialists</div><h1>Steel door systems, <em>built to perform.</em></h1><p>Premium steel door solutions for commercial, industrial and healthcare projects — from thoughtful selection to precise installation.</p><div className="hero-actions"><Button variant="light" onClick={() => navigate('/#contact')}>Get a quote</Button><Button variant="outline" onClick={() => navigate('/products')}>View products</Button></div><div className="hero-proof"><span><b>2018</b> Founded</span><span><b>360°</b> Project support</span><span><b>Pan-India</b> Delivery</span></div></div><div className="hero-dots">{heroImages.map((src, i) => <button key={src} className={i === active ? 'active' : ''} aria-label={`Slide ${i + 1}`} onClick={() => setActive(i)} />)}</div></section>;
}

function HomePage() {
  const [showAll, setShowAll] = useState(false);
  return <><Header /><main><Hero /><QuickContactBar />

<section className="section intro-section" id="about"><div className="container intro-grid"><div><div className="eyebrow"><span /> About Vishakha</div><h2>One trusted partner for every opening.</h2></div><div className="intro-copy"><p className="lead">Vishakha Multivista Products Pvt. Ltd. manufactures, supplies and installs specialized steel doors, windows, frames and ventilators for spaces where performance matters.</p><p>Since 2018, we have supported builders, architects, construction engineers, hospitals and institutions with a single-window experience — combining product expertise, responsive consultancy and dependable site execution.</p><a className="text-link" href="/#contact">Start a conversation <MoveRight size={16} /></a></div></div></section>

<section className="section section-gray"><div className="container"><div className="section-heading"><div><div className="eyebrow"><span /> What we make</div><h2>Engineered for the way<br />your project works.</h2></div><a className="text-link desktop-link" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>Explore all products <MoveRight size={16} /></a></div><div className="product-grid">{products.slice(0, showAll ? 8 : 4).map((product, index) => <ProductCard key={product.slug} product={product} featured={index === 0} />)}</div><button className="mobile-more" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer' : 'View more products'} <ChevronRight size={16} /></button></div></section>

<section className="section industries-section" id="industries"><div className="container"><div className="section-heading centered"><div><div className="eyebrow"><span /> Built for your sector</div><h2>Performance where<br /><em>it matters most.</em></h2></div><p>From critical care to high-traffic commercial environments, our systems are configured around your people, process and place.</p></div><div className="industry-grid">{industries.map(({ title, icon: Icon, copy }) => <div className="industry-card" key={title}><Icon size={24} strokeWidth={1.7} /><h3>{title}</h3><p>{copy}</p><ArrowRight className="industry-arrow" size={18} /></div>)}</div></div></section>

<section className="section navy-section" id="why-us"><div className="container why-grid"><div><div className="eyebrow eyebrow-light"><span /> The Vishakha difference</div><h2>Made with precision.<br /><em>Delivered with care.</em></h2><p>Our promise is simple: make the right recommendation, build it properly and stay accountable through installation.</p><Button variant="light" onClick={() => navigate('/#contact')}>Talk to our team</Button></div><div className="why-points">{['Premium quality materials', 'Custom manufacturing', 'Expert installation', 'Fire safety solutions', 'Fast, reliable delivery', 'Turnkey project expertise', 'Experienced team', 'Low maintenance products'].map((item) => <div key={item}><Check size={17} />{item}</div>)}</div></div></section>

<section className="section contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy"><div className="eyebrow"><span /> Let’s build better</div><h2>Tell us what<br /><em>you’re building.</em></h2><p>Share a few details and our team will help you find the right door system for your site, standards and schedule.</p><div className="contact-details"><a href={`tel:${phone}`}><span><Phone size={18} /></span><div><small>Call us</small><strong>{phoneDisplay}</strong></div></a><a href={`mailto:${email}`}><span><Mail size={18} /></span><div><small>Email us</small><strong>{email}</strong></div></a><a href={whatsapp} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><div><small>WhatsApp</small><strong>Chat with our team</strong></div></a><div><span><MapPin size={18} /></span><div><small>Visit us</small><strong>{address}</strong></div></div></div></div><div className="contact-panel"><ContactForm /></div></div></section>

<section className="map-section"><div className="container"><div className="map-header"><div><div className="eyebrow"><span /> Find us</div><h2>Visit our Chennai facility.</h2></div><a className="text-link" href="https://www.google.com/maps?q=12.969694,80.148667" target="_blank" rel="noreferrer">Open in Google Maps <MoveRight size={16} /></a></div><div className="map-frame"><iframe title="Vishakha Multivista Products location" src="https://www.google.com/maps?q=12.969694,80.148667&z=15&output=embed" loading="lazy" /></div></div></section></main><Footer /><WhatsApp /></>;
}

function ProductPage({ product }: { product: Product }) {
  return <><Header productPage /><main><section className="product-hero"><div className="container"><a className="back-link" href="/products" onClick={(e) => { e.preventDefault(); navigate('/products'); }}>← All products</a><div className="product-hero-grid"><div><div className="eyebrow"><span /> {product.category}</div><h1>{product.name}<em>.</em></h1><p>{product.overview}</p><Button onClick={() => navigate('/#contact')}>Request a quote</Button></div><div className="detail-image"><ImageWithFallback src={product.image} alt={`${product.name} product detail`} /><span>Vishakha engineered systems</span></div></div></div></section><section className="section detail-section"><div className="container detail-grid"><div><div className="eyebrow"><span /> Product overview</div><h2>Designed for dependable performance.</h2><p className="lead">Every Vishakha door is made to support the people and processes moving through your project every day.</p><div className="feature-list">{product.features.map((feature) => <div key={feature}><Check size={17} />{feature}</div>)}</div></div><div className="spec-card"><div className="spec-card-header"><h3>Technical specifications</h3><span>Project configurable</span></div><div className="spec-table">{product.specifications.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div></section><section className="section applications-section"><div className="container applications-grid"><div><div className="eyebrow"><span /> Applications</div><h2>At home in demanding environments.</h2></div><div className="application-list">{product.applications.map((application) => <div key={application}><ShieldCheck size={18} />{application}<ArrowRight size={16} /></div>)}</div></div></section><section className="section detail-cta"><div className="container detail-cta-inner"><div><div className="eyebrow eyebrow-light"><span /> Need guidance?</div><h2>Let’s find the right fit<br /><em>for your project.</em></h2></div><Button variant="light" onClick={() => navigate('/#contact')}>Request consultation</Button></div></section></main><Footer /><WhatsApp /></>;
}

function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = useMemo(() => filter === 'All' ? products : products.filter((p) => p.category === filter), [filter]);
  return <><Header /><main><section className="listing-hero"><div className="container"><div className="eyebrow"><span /> Our product range</div><h1>Doors that do<br /><em>more.</em></h1><p>From fire-rated protection to clean room control, discover steel door systems configured for the demands of modern projects.</p></div></section><section className="section listing-section"><div className="container"><div className="filter-bar">{categories.map((category) => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div><div className="product-grid product-grid-full">{filtered.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section></main><Footer /><WhatsApp /></>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  useEffect(() => { const current = products.find((product) => path === `/products/${product.slug}`); document.title = current ? `${current.name} | Vishakha Multivista Products` : path === '/products' ? 'Steel Door Products | Vishakha Multivista Products' : 'Premium Steel Door Solutions | Vishakha Multivista Products'; const description = 'Vishakha Multivista Products manufactures, supplies and installs premium steel doors for commercial, industrial, healthcare and institutional projects.'; let meta = document.querySelector('meta[name="description"]'); if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); } meta.setAttribute('content', description); }, [path]);
  const product = products.find((item) => path === `/products/${item.slug}`);
  return product ? <ProductPage product={product} /> : path === '/products' ? <ProductsPage /> : <HomePage />;
}

export default App;
