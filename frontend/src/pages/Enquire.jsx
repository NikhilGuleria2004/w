import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const ENQUIRY_REASONS = [
  "General Information",
  "Admissions Enquiry",
  "Boarding Information",
  "Fee Structure",
  "Campus Visit",
  "Other",
];

const YEAR_GROUPS = [
  "Primary School (Ages 5–11)",
  "Lower Secondary (Ages 11–14)",
  "Upper Secondary (Ages 14–16)",
  "Sixth Form (Ages 16–18)",
  "Not yet decided",
];

const CONTACT_POINTS = [
  {
    icon: "◎",
    title: "Admissions Office",
    desc: "Our team is available Monday to Friday, 8:00 AM – 5:00 PM IST to answer your questions.",
  },
  {
    icon: "◈",
    title: "Email Us",
    desc: "admissions@schoolchandigarh.in — we aim to respond within one working day.",
  },
  {
    icon: "◉",
    title: "Call Us",
    desc: "+91 80 1234 5678 — speak directly with a member of our Admissions Team.",
  },
  {
    icon: "◇",
    title: "Visit the Campus",
    desc: "We welcome prospective families to experience school life in person. Book a tour today.",
  },
];

const VISIT_STEPS = [
  {
    step: "01",
    title: "Submit This Form",
    desc: "Tell us about your child and what you're looking for — we'll be in touch promptly.",
  },
  {
    step: "02",
    title: "Speak with Our Team",
    desc: "A member of our Admissions Team will call or email to answer your initial questions.",
  },
  {
    step: "03",
    title: "Book a Campus Tour",
    desc: "Experience school life firsthand — meet teachers, students, and explore our facilities.",
  },
  {
    step: "04",
    title: "Begin Your Application",
    desc: "When you're ready, we'll guide you through every step of the application process.",
  },
];

/* ── Hooks ────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Sub-nav ──────────────────────────────────────────────── */
const SUB_LINKS = [
  "Enquire Now",
  "Contact Us",
  "Next Steps",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="discover-subnav">
      <div className="discover-subnav__inner">
        {SUB_LINKS.map((l) => (
          <button
            key={l}
            className={`discover-subnav__btn ${
              active === l ? "discover-subnav__btn--active" : ""
            }`}
            onClick={() => onSelect(l)}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function EnquireHero({ activeSection }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(40px)",
    transition: `opacity 0.9s ease ${ms}ms, transform 0.9s ease ${ms}ms`,
  });

  return (
    <section className="discover-hero">
      <div className="discover-hero__grid" />
      <div className="discover-hero__orb discover-hero__orb--a" />
      <div className="discover-hero__orb discover-hero__orb--b" />
      <div className="discover-hero__ring discover-hero__ring--lg" />
      <div className="discover-hero__ring discover-hero__ring--sm" />

      <div className="discover-container discover-hero__content">
        <div style={fade(150)} className="discover-hero__eyebrow">
          <span className="discover-hero__slash">— </span>
          Enquire
          <span className="discover-hero__slash"> —</span>
        </div>

        <h1 className="discover-hero__title" style={fade(300)}>
          {activeSection === "Enquire Now" && (
            <>Begin Your<br /><em>Journey With Us</em></>
          )}
          {activeSection === "Contact Us" && (
            <>We'd Love to<br /><em>Hear From You</em></>
          )}
          {activeSection === "Next Steps" && (
            <>Your Path to<br /><em>School of Excellence</em></>
          )}
        </h1>

        <p className="discover-hero__sub" style={fade(500)}>
          Welcoming Families from India & Around the World
        </p>
      </div>
    </section>
  );
}

/* ── Enquire Now (Form) ───────────────────────────────────── */
// Form styled entirely with existing CSS tokens and inline styles
// No new CSS classes — inputs use inline styles consistent with the design system
function EnquireNow() {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    yearGroup: "",
    reason: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.parentName.trim()) newErrors.parentName = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!formData.yearGroup) newErrors.yearGroup = "Please select a year group.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  /* shared input style — uses CSS vars from Pages.css token set */
  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    padding: "14px 18px",
    fontFamily: "var(--font-body)",
    fontSize: "16px",
    color: "var(--white)",
    outline: "none",
    transition: "border-color 0.25s",
    boxSizing: "border-box",
  };

  const errorStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    color: "rgba(220,80,80,0.9)",
    marginTop: "6px",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(200,169,110,0.8)",
    marginBottom: "8px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
  };

  if (submitted) {
    return (
      <section className="discover-section">
        <div className="discover-container">
          <RevealSection>
            <div
              style={{
                maxWidth: "640px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "2px solid var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 32px",
                  fontSize: "28px",
                }}
              >
                ✓
              </div>
              <h2
                className="discover-section-title"
                style={{ marginBottom: "20px" }}
              >
                Thank You,{" "}
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  {formData.parentName || "Future Family"}
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.8,
                  marginBottom: "40px",
                }}
              >
                Your enquiry has been received. A member of our Admissions Team
                will be in touch within one working day.
              </p>
              <button
                className="btn-discover-outline"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Enquiry
              </button>
            </div>
          </RevealSection>
        </div>
      </section>
    );
  }

  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Enquiry Form</h2>
            <p className="discover-section-intro">
              Fill in the form below and our Admissions Team will be in touch shortly.
            </p>
          </div>
        </RevealSection>

        {/* Two-column layout: form left, info right */}
        <div className="overview__grid">

          {/* ── Form ── */}
          <RevealSection delay={100}>
            <div className="enquire-form-box">
              <div className="enquire-form-grid">
                {/* Parent / Guardian Name */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Parent / Guardian Name *</label>
                  <input
                    style={{ ...inputStyle, borderColor: errors.parentName ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)" }}
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    onFocus={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = errors.parentName ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)")}
                  />
                  {errors.parentName && <span style={errorStyle}>{errors.parentName}</span>}
                </div>

                {/* Child's Name */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Child's Name</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="Child's full name"
                    onFocus={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Email */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    style={{ ...inputStyle, borderColor: errors.email ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)" }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    onFocus={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = errors.email ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)")}
                  />
                  {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>

                {/* Phone */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    style={{ ...inputStyle, borderColor: errors.phone ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)" }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    onFocus={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = errors.phone ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)")}
                  />
                  {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                </div>
              </div>

              {/* Year Group */}
              <div style={{ ...fieldStyle, marginBottom: "20px" }}>
                <label style={labelStyle}>Year Group of Interest *</label>
                <select
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    borderColor: errors.yearGroup ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)",
                    color: formData.yearGroup ? "var(--white)" : "rgba(255,255,255,0.3)",
                  }}
                  name="yearGroup"
                  value={formData.yearGroup}
                  onChange={handleChange}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = errors.yearGroup ? "rgba(220,80,80,0.7)" : "rgba(255,255,255,0.1)")}
                >
                  <option value="" disabled>Select a year group</option>
                  {YEAR_GROUPS.map((y) => (
                    <option key={y} value={y} style={{ background: "#0a1223", color: "var(--white)" }}>{y}</option>
                  ))}
                </select>
                {errors.yearGroup && <span style={errorStyle}>{errors.yearGroup}</span>}
              </div>

              {/* Reason for Enquiry */}
              <div style={{ ...fieldStyle, marginBottom: "20px" }}>
                <label style={labelStyle}>Reason for Enquiry</label>
                <select
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    color: formData.reason
                      ? "var(--white)"
                      : "rgba(255,255,255,0.3)",
                  }}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,169,110,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {ENQUIRY_REASONS.map((r) => (
                    <option
                      key={r}
                      value={r}
                      style={{ background: "#0a1223", color: "var(--white)" }}
                    >
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ ...fieldStyle, marginBottom: "32px" }}>
                <label style={labelStyle}>Your Message</label>
                <textarea
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "120px",
                    lineHeight: 1.7,
                  }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us anything else you'd like us to know…"
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(200,169,110,0.6)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <button
                className="btn-discover-primary"
                style={{ width: "100%", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Submit Enquiry"}
              </button>
            </div>
          </RevealSection>

          {/* ── Side info ── */}
          <RevealSection delay={250}>
            <div className="overview__values">
              {CONTACT_POINTS.map((c, i) => (
                <div
                  className="overview__value-item"
                  key={c.title}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="overview__value-icon">{c.icon}</span>
                  <div>
                    <h4 className="overview__value-title">{c.title}</h4>
                    <p className="overview__value-desc">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>

        </div>
      </div>
    </section>
  );
}

/* ── Contact Us ───────────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro,
//       .overview__pull-quote, .overview__pull-quote-bar,
//       .family__grid, .family__card, .family__country, .family__city
function ContactUs() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Get in Touch</h2>
            <p className="discover-section-intro">
              Our Admissions Team is always happy to help.
            </p>
          </div>
        </RevealSection>

        {/* Contact cards — family__grid repurposed for contact details */}
        <RevealSection delay={100}>
          <div
            className="family__grid"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              marginBottom: "48px",
            }}
          >
            {[
              {
                label: "Address",
                value: "Duke Infosys, Sector 45, Chandigarh – 160047",
              },
              {
                label: "Phone",
                value: "+91 80 1234 5678",
              },
              {
                label: "Email",
                value: "admissions@schoolchandigarh.in",
              },
              {
                label: "Office Hours",
                value: "Mon – Fri, 8:00 AM – 5:00 PM IST",
              },
            ].map((item) => (
              <div className="family__card" key={item.label}>
                <p className="family__country">{item.label}</p>
                <p
                  className="family__city"
                  style={{ fontSize: "17px", lineHeight: 1.5 }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Google Maps embed */}
       {/* Google Maps embed */}
        <RevealSection delay={150}>
        <div
            style={{
            marginBottom: "48px",
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid rgba(200,169,110,0.18)"
            }}
        >
            <iframe
            title="Duke Infosys, Sector 45, Chandigarh"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4773348578524!2d76.75503187635734!3d30.70497858697222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedb2750a2509%3A0xda7ee99548707bc6!2sDuke%20Infosys%20-%20Software%20Development%20Company%20In%20Chandigarh!5e0!3m2!1sen!2sin!4v1779169574593!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
        </RevealSection>

        {/* Pull quote */}
        <RevealSection delay={200}>
          <div className="overview__pull-quote">
            <div className="overview__pull-quote-bar" />
            <div>
              <blockquote>
                "Every family deserves to feel welcome from the very first
                conversation. We are here to listen, guide, and support you
                every step of the way."
              </blockquote>
              <p className="overview__pull-quote-attr">
                Director of Admissions · School of Excellence Chandigarh
              </p>
            </div>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}

/* ── Next Steps ───────────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .discover-section-intro,
//       .journey__steps, .journey__step, .journey__step-num,
//       .journey__step-title, .journey__step-desc,
//       .journey__cta-row, .btn-discover-primary, .btn-discover-outline
function NextSteps() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Your Next Steps</h2>
            <p className="discover-section-intro">
              Here's what happens after you reach out to us.
            </p>
          </div>
        </RevealSection>

        <div className="journey__steps" style={{ marginBottom: "64px" }}>
          {VISIT_STEPS.map((s, i) => (
            <RevealSection key={s.step} delay={i * 120}>
              <div className="journey__step">
                <div className="journey__step-num">{s.step}</div>
                <h3 className="journey__step-title">{s.title}</h3>
                <p className="journey__step-desc">{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>     

        <RevealSection delay={200}>
          <div className="journey__cta-row">
            <button className="btn-discover-primary">Enquire Now</button>
            <button className="btn-discover-outline">Book a Campus Tour</button>
          </div>
        </RevealSection>

      </div> 
    </section>
  );
}
   
/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  "Enquire Now": <EnquireNow />,
  "Contact Us": <ContactUs />,
  "Next Steps": <NextSteps />,
};

/* ── Page Root ────────────────────────────────────────────── */
// Uses: .discover-root
export default function Enquire({ initialSection = "Enquire Now" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <EnquireHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}