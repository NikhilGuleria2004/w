import { useState, useEffect, useRef } from "react" ;
import { createPortal } from "react-dom";
import "./School.css";

/* ── Data ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Discover",       sub: [] },
  { label: "Learning",       sub: [] },
  { label: "Admissions",     sub: [] },
  { label: "Beyond Learning",sub: [] },
  { label: "Boarding",       sub: [] },
  { label: "Facilities",     sub: [] },
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getRoutePath = (label, parent) => {
  const buildParentPath = (parentLabel) => {
    switch (parentLabel) {
      case "Discover":
        return "/discover";
      case "Learning":
        return "/learning";
      case "Admissions":
        return "/admissions";
      case "Beyond Learning":
        return "/beyond-learning";
      case "Boarding":
        return "/boarding";
      default:
        return `/${slugify(parentLabel || label)}`;
    }
  };

  if (parent) {
    const parentPath = buildParentPath(parent);
    return label === parent ? parentPath : `${parentPath}/${slugify(label)}`;
  }

  return `/${slugify(label)}`;
};

const getLegalRoute = (label) => {
  switch (label) {
    case "Privacy Policy":
      return "/privacy-policy";
    case "Terms & Conditions":
      return "/terms-and-conditions";
    case "Sitemap":
      return "/sitemap";
    default:
      return `/${slugify(label)}`;
  }
};

const STATS = [
  { value: "60",     unit: "acre",  label: "Campus in Sector 45, Chandigarh" },
  { value: "453",    unit: "years", label: "Serving education since 1572" },
  { value: "12,000", unit: "m²",   label: "Academic buildings" },
  { value: "4,500",  unit: "m²",   label: "Multi-use sports hall" },
];

const LEARNING = [
  {
    title: "Primary School",
    grades: "KG – Grade 5",
    age: "Ages 4–10",
    desc: "An enriching and nurturing environment where young learners discover their passions and build the foundations for lifelong learning.",
    icon: "",
  },
  {
    title: "Lower Secondary",
    grades: "Grades 6–8",
    age: "Ages 11–14",
    desc: "A dynamic phase of inquiry, creativity and intellectual stretching, setting students on their path to academic excellence.",
    icon: "",
  },
  {
    title: "Upper Secondary",
    grades: "Grades 9–10",
    age: "Ages 14–16",
    desc: "Rigorous Cambridge-aligned study that develops independent thinking, analytical skills and real-world application.",
    icon: "",
  },
  {
    title: "Sixth Form",
    grades: "Grades 11–12",
    age: "Ages 16–18",
    desc: "The culmination of a School education — IB Diploma preparation with world-class university guidance and leadership development.",
    icon: "",
  },
];

const NEWS = [
  {
    title: "Stet Fortuna Cup 2026",
    tag: "Sports",
    desc: "International schools across Chandigarh competed in two days of intense competition and true sportsmanship.",
    date: "30 Mar 2026",
  },
  {
    title: "Silver Award for Excellence",
    tag: "Award",
    desc: "Recognised for Excellence in Physical Infrastructure, Holistic Development and Co-Curricular Education.",
    date: "30 Mar 2026",
  },
  {
    title: "LAMDA Distinction",
    tag: "Achievement",
    desc: "Mehr Singla and Natasha Agrawal both achieved Distinction in their LAMDA examinations.",
    date: "30 Mar 2026",
  },
  {
    title: "100% in A Level Mathematics",
    tag: "Academic",
    desc: "An exceptional perfect score in A Level Pure Mathematics — a proud milestone for our Sixth Form.",
    date: "30 Mar 2026",
  },
];

const FACILITIES = [
  { icon: "🏊", label: "Olympic Pool" },
  { icon: "⚽", label: "Sports Fields" },
  { icon: "🎭", label: "Performing Arts" },
  { icon: "🔬", label: "Science Labs" },
  { icon: "📚", label: "Library" },
  { icon: "🎨", label: "Art Studios" },
  { icon: "🏋️", label: "Sports Hall" },
  { icon: "🍽️", label: "Dining Hall" },
];

const TESTIMONIALS = [
  {
    quote: "Choosing School of Excellence Chandigarh was the best decision we made for our daughter. The pastoral care is exceptional and she has flourished academically and personally.",
    name: "Priya & Arjun Sharma",
    detail: "Parents of a Year 9 student",
  },
  {
    quote: "The IB curriculum combined with world-class facilities gives our son a truly global education. The teachers genuinely know each child as an individual.",
    name: "Meena & Rajesh Nair",
    detail: "Parents of a Sixth Form student",
  },
  {
    quote: "From the first open day to settling in, the Admissions Team made the entire process seamless. Our children have never been happier in school.",
    name: "Sunita & Vikram Patel",
    detail: "Parents of two students",
  },
];

const ADMISSIONS_BTNS = [
  { label: "Apply to Enrol",         primary: true },
  { label: "Request a Campus Visit", primary: false },
  { label: "Virtual Tour",           primary: false },
];

const CONTACT_ITEMS = [
  { icon: "📧", key: "Email",   val: "admissions@schoolchandigarh.in" },
  { icon: "📞", key: "Phone",   val: "+91 80352 74300" },
  { icon: "📞", key: "Telephone",        val: "+91 92204 43344" },
  { icon: "📍", key: "Address", val: "Duke Infosys, Sector 45, Chandigarh" },
];

const FOOTER_COLS = [
  { heading: "Discover", links: [
    { label: "Overview",          path: "/discover/overview" },
    { label: "School Heritage",   path: "/discover/school-heritage" },
    { label: "Head of School",    path: "/discover/head-of-school" },
    { label: "Family of Schools", path: "/discover/family-of-schools" },
  ]},
  { heading: "Explore", links: [
    { label: "Learning",    path: "/learning" },
    { label: "Admissions",  path: "/admissions" },
    { label: "Boarding",    path: "/boarding" },
    { label: "Facilities",  path: "/facilities" },
  ]},
  { heading: "Connect", links: [
    { label: "Enquire Now", path: "/enquire" },
  ]},
];

/* ── Hooks ────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Shared Components ────────────────────────────────────── */
function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

/* ── Navbar ───────────────────────────────────────────────── */
export function Navbar({ onNavigate, pathname = '/' }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar__inner">

          <div className="navbar__logo">
            <div className="navbar__logo-badge">S</div>
            <div>
              <a href="/" style={{textDecoration: "none"}}><div className="navbar__logo-sub" style={{ color: "#C8A96E" }}>SCHOOL OF EXCELLENCE</div></a>
            </div>
          </div>

          <button
            className="navbar__toggle"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="navbar__links">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="navbar__menu-item"
                onMouseEnter={() => setActiveMenu(link.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button type="button" className={`navbar__link-btn${pathname.startsWith(getRoutePath(link.label, link.label)) ? ' navbar__link-btn--active' : ''}`} onClick={() => onNavigate(getRoutePath(link.label, link.label))}>{link.label}</button>
                {link.sub.length > 0 && activeMenu === link.label && (
                  <div className="navbar__dropdown">
                    {link.sub.map((s) => (
                      <button
                        type="button"
                        key={s}
                        className="navbar__dropdown-item"
                        onClick={() => {
                          onNavigate(getRoutePath(s, link.label));
                          setActiveMenu(null);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
              <button
                className="navbar__cta"
                onClick={() => onNavigate('/enquire')}
              >
                Enquire Now
              </button>
          </div>

        </div>
      </div>

      </nav>

      {createPortal(
        <div className={`navbar__mobile-menu ${mobileMenuOpen ? "navbar__mobile-menu--open" : ""}`}>
          <div className="navbar__mobile-menu-inner">
            <button className="navbar__mobile-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">×</button>
            <div className="navbar__mobile-links">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="navbar__mobile-menu-item">
                  <button
                    type="button"
                    className="navbar__mobile-link"
                    onClick={() => {
                      onNavigate(getRoutePath(link.label, link.label));
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </button>
                  {link.sub.length > 0 && (
                    <div className="navbar__mobile-sub-links">
                      {link.sub.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="navbar__mobile-sub-link"
                          onClick={() => {
                            onNavigate(getRoutePath(s, link.label));
                            setMobileMenuOpen(false);
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button className="navbar__cta navbar__cta--mobile" onClick={() => { onNavigate('/enquire'); setMobileMenuOpen(false); }}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero({ onNavigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fadeStyle = (delayMs) => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? "none" : "translateY(50px)",
    transition: `opacity 1s ease ${delayMs}ms, transform 1s ease ${delayMs}ms`,
  });

  return (
    <section className="hero">
        
      <div className="hero__grid-bg" />
      <div className="hero__orb" />
      <div className="hero__ring hero__ring--lg" />
      <div className="hero__ring hero__ring--sm" />

      <div className="container hero__content">

        <div style={fadeStyle(200)}>
          <div className="hero__badge">
            <div className="hero__badge-dot" />
            <span className="hero__badge-text">A School Family of Schools Institution</span>
          </div>
        </div>

        <div style={fadeStyle(400)}>
          <h1 className="hero__title">
            Global Education<br />
            <span className="hero__title-accent">for Future Leaders</span>
          </h1>
        </div>

        <div style={fadeStyle(600)}>
          <p className="hero__subtitle">
            Bringing 453 years of School heritage to India — a world-class IB education
            at Duke Infosys, Sector 45, Chandigarh.
          </p>
        </div>

        <div style={{ ...fadeStyle(800) }} className="hero__actions">
          <button className="btn-primary" onClick={() => onNavigate('/enquire')}>Apply for August 2026</button>
          <button className="btn-outline" onClick={() => onNavigate('/enquire')}>Request a Visit</button>
        </div>

      </div>

      <div className="hero__scroll" style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}>
        <span className="hero__scroll-label">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

/* ── Stats Bar ────────────────────────────────────────────── */
function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-bar__grid">
          {STATS.map((s, i) => (
            <RevealSection key={s.label} delay={i * 100}>
              <div className="stats-bar__item">
                <div className="stats-bar__value-row">
                  <span className="stats-bar__value">{s.value}</span>
                  <span className="stats-bar__unit">{s.unit}</span>
                </div>
                <p className="stats-bar__label">{s.label}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Learning Section ─────────────────────────────────────── */
function LearningSection() {
  const [active, setActive] = useState(null);

  return (
    <section className="section-dark">
      <div className="container">

        <RevealSection>
          <div className="section-header">
            <p className="section-label">Academic Pathways</p>
            <h2 className="section-title">Learning at School</h2>
            <p className="section-intro">
              The possibilities for learning are endless — they cannot be mandated, quantified, or curtailed.
            </p>
          </div>
        </RevealSection>

        <div className="learning__grid">
          {LEARNING.map((item, i) => (
            <RevealSection key={item.title} delay={i * 120}>
              <div
                className={`learning__card ${active === i ? "learning__card--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="learning__card-header">
                  <span className="learning__icon">{item.icon}</span>
                  <span className="learning__badge">{item.grades}</span>
                </div>
                <h3 className="learning__title">{item.title}</h3>
                <p className="learning__age">{item.age}</p>
                <p className="learning__desc">{item.desc}</p>
                {active === i && (
                  <div className="learning__more">
                    
                  </div>
                )}
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Head of School ───────────────────────────────────────── */
function HeadSection() {
  return (
    <section className="section-mid">
      <div className="container">
        <div className="head__grid">

          <RevealSection>
            <div>
              <p className="section-label head__label">Leadership</p>
              <h2 className="head__title">
                A Welcome from the<br />Head of School
              </h2>
              <p className="head__quote">
                "At School of Excellence Chandigarh, we believe that education is not simply the acquisition of knowledge,
                but the formation of character — building young people who are curious, compassionate,
                and capable of shaping the world."
              </p>
              <div className="head__byline">
                <p className="head__byline-name">Dr. Caroline Pascoe</p>
                <p className="head__byline-role">Head of School</p>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="head__photo-wrap">
              <div className="head__photo-frame">
                <div className="head__photo-inner">
                  <div className="head__avatar">CP</div>
                  <p className="head__avatar-name">Dr. Caroline Pascoe</p>
                </div>
                <div className="head__photo-bar" />
              </div>
              <div className="head__photo-corner" />
            </div>
          </RevealSection>

        </div>
      </div>
    </section>
  );
}

/* ── Facilities ───────────────────────────────────────────── */
function FacilitiesSection() {
  return (
    <section className="section-dark">
      <div className="container">

        <RevealSection>
          <div className="section-header section-header--center">
            <p className="section-label">Campus Life</p>
            <h2 className="section-title">World-Class Facilities</h2>
          </div>
        </RevealSection>

        <div className="facilities__grid">
          {FACILITIES.map((f, i) => (
            <RevealSection key={f.label} delay={i * 80}>
              <div className="facilities__card">
                <div className="facilities__icon">{f.icon}</div>
                <p className="facilities__label">{f.label}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── News ─────────────────────────────────────────────────── */
function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextNews = () => setCurrentIndex((prev) => (prev + 2) % NEWS.length);
  const prevNews = () => setCurrentIndex((prev) => (prev - 2 + NEWS.length) % NEWS.length);

  const visibleNews = [
    NEWS[currentIndex],
    NEWS[(currentIndex + 1) % NEWS.length],
  ];

  return (
    <section className="section-mid">
      <div className="container">

        <RevealSection>
          <div className="news__header">
            <div>
              <p className="section-label">News & Events</p>
              <h2 className="section-title">Latest at School</h2>
            </div>
            <div className="news__controls">
              <button className="news__nav-btn" onClick={prevNews}>‹</button>
              <button className="news__nav-btn" onClick={nextNews}>›</button>
            </div>
          </div>
        </RevealSection>

        <div className="news__grid">
          {visibleNews.map((item, i) => (
            <RevealSection key={`${item.title}-${currentIndex}`} delay={i * 100}>
              <div className="news__card">
                <div className="news__card-meta">
                  <span className="news__tag">{item.tag}</span>
                  <span className="news__date">{item.date}</span>
                </div>
                <h3 className="news__title">{item.title}</h3>
                <p className="news__desc">{item.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Admissions ───────────────────────────────────────────── */
function AdmissionsSection({ onOpenModal }) {
  return (
    <section className="section-dark">
      <div className="container">
        <div className="admissions__grid">

          <RevealSection>
            <div>
              <p className="section-label">Admissions 2026</p>
              <h2 className="admissions__title">Begin Your School Journey</h2>
              <p className="admissions__desc">
                School of Excellence Chandigarh is now accepting applications for boys and girls aged 4 to 17
                (LKG to Grade 12), joining us in August 2026.
              </p>
              <div className="admissions__buttons">
                {ADMISSIONS_BTNS.map((btn) => (
                  <button
                    key={btn.label}
                    className={`btn-action ${btn.primary ? "btn-action--primary" : "btn-action--outline"}`}
                    onClick={onOpenModal}
                  >
                    {btn.label} <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="admissions__contact-card">
              <h3 className="admissions__contact-title">Contact Admissions</h3>
              {CONTACT_ITEMS.map((c, i) => (
                <div key={i} className="admissions__contact-row">
                  <div className="admissions__contact-left">
                    <span className="admissions__contact-icon">{c.icon}</span>
                    {c.key && <p className="admissions__contact-key">{c.key}</p>}
                  </div>
                  <p className="admissions__contact-val">{c.val}</p>
                </div>
              ))}
            </div>
          </RevealSection>

        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="testimonials section-deep">
      <div className="container">
        <RevealSection>
          <div className="testimonials__header">
            <p className="section-label">Parent Voices</p>
            <h2 className="testimonials__title">Families Who Chose Us</h2>
          </div>
        </RevealSection>
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <RevealSection key={t.name} delay={i * 120}>
              <div className="testimonials__card">
                <div className="testimonials__quote-mark">"</div>
                <p className="testimonials__quote">{t.quote}</p>
                <div className="testimonials__author">
                  <div className="testimonials__author-line" />
                  <div>
                    <p className="testimonials__author-name">{t.name}</p>
                    <p className="testimonials__author-detail">{t.detail}</p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
export function Footer({ onNavigate }) {
  return (
    <footer className="footer section-deep">
      <div className="container">

        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <div className="footer__logo-badge">S</div>
              <div>
                {/* <div className="footer__brand-name">School</div> */}
                <div className="footer__brand-sub">SCHOOL OF EXCELLENCE</div>
              </div>
            </div>
            <p className="footer__tagline">
              An entity of Ritnand Balved Education Foundation.<br />
              Part of the global School Family of Schools.
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="footer__col-heading">{col.heading}</p>
              {col.links.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  className="footer__link"
                  onClick={() => onNavigate(l.path)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 School of Excellence Chandigarh. All rights reserved.
          </p>
          <div className="footer__legal">
            {["Privacy Policy", "Terms & Conditions", "Sitemap"].map((l) => (
              <button
                key={l}
                type="button"
                className="footer__legal-link"
                onClick={() => onNavigate(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ── App Root ─────────────────────────────────────────────── */
export default function School({ onNavigate }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app-root">
      
      <Hero onNavigate={onNavigate} />
      <StatsBar />
      <LearningSection />
      <HeadSection />
      <FacilitiesSection />
      <NewsSection />
      <TestimonialsSection />
      <AdmissionsSection onOpenModal={() => setModalOpen(true)} />
      
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Admissions Enquiry</h2>
        <form className="modal-form">
          <input type="text" placeholder="Parent/Guardian Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <select required>
            <option value="">Select Grade Applying For</option>
            <option>KG - Grade 5</option>
            <option>Grades 6-8</option>
            <option>Grades 9-10</option>
            <option>Grades 11-12</option>
          </select>
          <textarea placeholder="Additional Message" rows="4"></textarea>
          <button type="submit" className="btn-primary">Submit Enquiry</button>
        </form>
      </Modal>
    </div>
  );
}