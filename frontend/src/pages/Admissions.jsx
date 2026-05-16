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
    desc: "Complete the application process, including assessments and interactions appropriate to the student’s age.",
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
    a: "Yes. Both day and boarding options are available depending on the student’s year group.",
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
  {
    level: "Primary School",
    fee: "₹6,50,000 / year",
  },
  {
    level: "Lower Secondary",
    fee: "₹8,20,000 / year",
  },
  {
    level: "Upper Secondary",
    fee: "₹9,80,000 / year",
  },
  {
    level: "Sixth Form",
    fee: "₹11,50,000 / year",
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

/* ── Subnav ───────────────────────────────────────────────── */
const SUB_LINKS = [
  "Overview",
  "Admissions Process",
  "Term Dates",
  "FAQs",
  "Fees",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="admissions-subnav">
      <div className="admissions-container">
        <div className="admissions-subnav__inner">
          {SUB_LINKS.map((l) => (
            <button
              key={l}
              className={`admissions-subnav__btn ${
                active === l ? "admissions-subnav__btn--active" : ""
              }`}
              onClick={() => onSelect(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
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
    <section className="admissions-hero">
      <div className="admissions-hero__grid" />
      <div className="admissions-hero__orb admissions-hero__orb--a" />
      <div className="admissions-hero__orb admissions-hero__orb--b" />

      <div className="admissions-container admissions-hero__content">
        <div style={fade(150)} className="admissions-hero__eyebrow">
          <span className="admissions-hero__slash">— </span>
          Admissions
          <span className="admissions-hero__slash"> —</span>
        </div>

        <h1 className="admissions-hero__title" style={fade(300)}>
          {activeSection === "Overview" && (
            <>
              Begin Your
              <br />
              <em>School Journey</em>
            </>
          )}

          {activeSection === "Admissions Process" && (
            <>
              The Admissions
              <br />
              <em>Process</em>
            </>
          )}

          {activeSection === "Term Dates" && (
            <>
              Academic
              <br />
              <em>Calendar</em>
            </>
          )}

          {activeSection === "FAQs" && (
            <>
              Frequently Asked
              <br />
              <em>Questions</em>
            </>
          )}

          {activeSection === "Fees" && (
            <>
              Tuition &
              <br />
              <em>Fees</em>
            </>
          )}
        </h1>

        <p className="admissions-hero__sub" style={fade(500)}>
          Welcoming Students from India & Around the World
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="admissions-section">
      <div className="admissions-container">

        <RevealSection>
          <div className="admissions-section-header">
            <p className="admissions-label">Admissions</p>
            <h2 className="admissions-section-title">
              A Warm Welcome to Future Families
            </h2>
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div className="overview__content">
            <p>
              Joining School Bengaluru means becoming part of a vibrant and
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
    </div>
  );
}

/* ── Admissions Process ───────────────────────────────────── */
function AdmissionsProcess() {
  return (
    <div className="admissions-section">
      <div className="admissions-container">

        <RevealSection>
          <div className="admissions-section-header">
            <p className="admissions-label">Admissions Process</p>
            <h2 className="admissions-section-title">
              Four Simple Steps
            </h2>
          </div>
        </RevealSection>

        <div className="process__steps">
          {ADMISSION_STEPS.map((s, i) => (
            <RevealSection key={s.step} delay={i * 120}>
              <div className="process__card">
                <div className="process__step">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Term Dates ───────────────────────────────────────────── */
function TermDates() {
  return (
    <div className="admissions-section">
      <div className="admissions-container">

        <RevealSection>
          <div className="admissions-section-header">
            <p className="admissions-label">Academic Year</p>
            <h2 className="admissions-section-title">
              Term Dates
            </h2>
          </div>
        </RevealSection>

        <div className="terms__grid">
          {TERM_DATES.map((t, i) => (
            <RevealSection key={t.term} delay={i * 120}>
              <div className="terms__card">
                <h3>{t.term}</h3>
                <p className="terms__dates">{t.dates}</p>
                <p>{t.note}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── FAQs ─────────────────────────────────────────────────── */
function FAQs() {
  return (
    <div className="admissions-section">
      <div className="admissions-container">

        <RevealSection>
          <div className="admissions-section-header">
            <p className="admissions-label">FAQs</p>
            <h2 className="admissions-section-title">
              Frequently Asked Questions
            </h2>
          </div>
        </RevealSection>

        <div className="faq__list">
          {FAQS.map((f, i) => (
            <RevealSection key={f.q} delay={i * 100}>
              <div className="faq__item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Fees ─────────────────────────────────────────────────── */
function Fees() {
  return (
    <div className="admissions-section">
      <div className="admissions-container">

        <RevealSection>
          <div className="admissions-section-header">
            <p className="admissions-label">Fees</p>
            <h2 className="admissions-section-title">
              Tuition & School Fees
            </h2>
          </div>
        </RevealSection>

        <div className="fees__grid">
          {FEES.map((f, i) => (
            <RevealSection key={f.level} delay={i * 100}>
              <div className="fees__card">
                <h3>{f.level}</h3>
                <p>{f.fee}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
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
export default function Admissions({
  initialSection = "Overview",
}) {
  const [activeSection, setActiveSection] =
    useState(initialSection);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeSection]);

  return (
    <div className="admissions-root">
      <AdmissionsHero activeSection={activeSection} />

      <SubNav
        active={activeSection}
        onSelect={setActiveSection}
      />

      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}