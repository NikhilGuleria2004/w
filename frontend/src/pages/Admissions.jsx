import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Submit Enquiry",
    desc: "Connect with our Admissions Team to begin your journey and learn more about the school.",
  },
  {
    step: "02",
    title: "Visit the Campus",
    desc: "Experience our learning spaces, meet educators, and discover student life firsthand.",
  },
  {
    step: "03",
    title: "Application & Assessment",
    desc: "Complete the application process, including assessments and interactions appropriate to the student's age.",
  },
  {
    step: "04",
    title: "Offer & Enrolment",
    desc: "Successful applicants receive an offer and officially join the School community.",
  },
];

const TERM_DATES = [
  {
    term: "Autumn Term",
    dates: "August – December",
    note: "Term begins with orientation and academic induction.",
  },
  {
    term: "Spring Term",
    dates: "January – March",
    note: "Focused academic learning with co-curricular showcases.",
  },
  {
    term: "Summer Term",
    dates: "April – June",
    note: "Final assessments, celebrations, and enrichment programmes.",
  },
];

const FAQS = [
  {
    q: "What curriculum does the school offer?",
    a: "The school offers internationally recognised Cambridge and IB pathways.",
  },
  {
    q: "Do you offer boarding?",
    a: "Yes. Both day and boarding options are available depending on the student's year group.",
  },
  {
    q: "Can international students apply?",
    a: "Absolutely. We welcome students from diverse nationalities and backgrounds.",
  },
  {
    q: "Is there an entrance assessment?",
    a: "Students may complete age-appropriate assessments and interactions as part of admissions.",
  },
];

const FEES = [
  { level: "Primary School",   fee: "₹6,50,000 / year" },
  { level: "Lower Secondary",  fee: "₹8,20,000 / year" },
  { level: "Upper Secondary",  fee: "₹9,80,000 / year" },
  { level: "Sixth Form",       fee: "₹11,50,000 / year" },
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
// Uses: .discover-subnav, .discover-subnav__inner,
//       .discover-subnav__btn, .discover-subnav__btn--active
const SUB_LINKS = [
  "Overview",
  "Admissions Process",
  "Term Dates",
  "FAQs",
  "Fees",
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
// Uses: .discover-hero, .discover-hero__grid, .discover-hero__orb--a/b,
//       .discover-hero__ring--lg/sm, .discover-container,
//       .discover-hero__content, .discover-hero__eyebrow,
//       .discover-hero__slash, .discover-hero__title, .discover-hero__sub
function AdmissionsHero({ activeSection }) {
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
          Admissions
          <span className="discover-hero__slash"> —</span>
        </div>

        <h1 className="discover-hero__title" style={fade(300)}>
          {activeSection === "Overview" && (
            <>Begin Your<br /><em>School Journey</em></>
          )}
          {activeSection === "Admissions Process" && (
            <>The Admissions<br /><em>Process</em></>
          )}
          {activeSection === "Term Dates" && (
            <>Academic<br /><em>Calendar</em></>
          )}
          {activeSection === "FAQs" && (
            <>Frequently Asked<br /><em>Questions</em></>
          )}
          {activeSection === "Fees" && (
            <>Tuition &<br /><em>Fees</em></>
          )}
        </h1>

        <p className="discover-hero__sub" style={fade(500)}>
          Welcoming Students from India & Around the World
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
// overview__content → overview__text (already in CSS), capped width via
// overview__grid single-column
function Overview() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              A Warm Welcome to Future Families
            </h2>
            <p className="discover-section-intro">Admissions</p>
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div
            className="overview__text"
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <p>
              Joining School of Excellence Chandigarh means becoming part of a vibrant and
              globally connected learning community rooted in excellence,
              character, and opportunity.
            </p>
            <p>
              We seek students who are curious, motivated, compassionate,
              and eager to contribute to school life both inside and outside
              the classroom.
            </p>
            <p>
              Our Admissions Team is here to guide families through every
              stage of the journey — from initial enquiry to enrolment.
            </p>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}

/* ── Admissions Process ───────────────────────────────────── */
// process__steps / process__card / process__step →
//   journey__steps grid + journey__step-num / journey__step-title /
//   journey__step-desc (all defined in CSS)
function AdmissionsProcess() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Four Simple Steps</h2>
            <p className="discover-section-intro">Admissions Process</p>
          </div>
        </RevealSection>

        <div className="journey__steps">
          {ADMISSION_STEPS.map((s, i) => (
            <RevealSection key={s.step} delay={i * 120}>
              <div className="journey__step">
                <div className="journey__step-num">{s.step}</div>
                <h3 className="journey__step-title">{s.title}</h3>
                <p className="journey__step-desc">{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Term Dates ───────────────────────────────────────────── */
// terms__grid / terms__card / terms__dates →
//   3-col inline grid + heritage__card + heritage__year for dates label
function TermDates() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Term Dates</h2>
            <p className="discover-section-intro">Academic Year</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {TERM_DATES.map((t, i) => (
            <RevealSection key={t.term} delay={i * 120}>
              <div className="heritage__card">
                <span className="heritage__year" style={{ fontSize: "20px" }}>
                  {t.dates}
                </span>
                <h3 className="heritage__card-title">{t.term}</h3>
                <p className="heritage__card-desc">{t.note}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── FAQs ─────────────────────────────────────────────────── */
// faq__list / faq__item →
//   stacked overview__pull-quote cards (bar + question/answer layout)
function FAQs() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Frequently Asked Questions
            </h2>
            <p className="discover-section-intro">FAQs</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {FAQS.map((f, i) => (
            <RevealSection key={f.q} delay={i * 100}>
              <div className="overview__pull-quote">
                <div className="overview__pull-quote-bar" />
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: "var(--white)",
                      margin: "0 0 10px",
                    }}
                  >
                    {f.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "17px",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.55)",
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Fees ─────────────────────────────────────────────────── */
// fees__grid / fees__card →
//   family__grid + family__card pattern (already defined in CSS)
function Fees() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">Tuition & School Fees</h2>
            <p className="discover-section-intro">Fees</p>
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div className="family__grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {FEES.map((f) => (
              <div className="family__card" key={f.level}>
                <p className="family__country">{f.level}</p>
                <p className="family__city" style={{ fontSize: "20px" }}>{f.fee}</p>
              </div>
            ))}
          </div>
        </RevealSection>

      </div>
    </section>
  );
}

/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  Overview: <Overview />,
  "Admissions Process": <AdmissionsProcess />,
  "Term Dates": <TermDates />,
  FAQs: <FAQs />,
  Fees: <Fees />,
};

/* ── Page Root ────────────────────────────────────────────── */
// Uses: .discover-root
export default function Admissions({ initialSection = "Overview" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <AdmissionsHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}