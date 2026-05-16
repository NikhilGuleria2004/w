import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const HOUSES = [
  {
    name: "Ash House",
    colour: "Crimson",
    desc: "Known for leadership, courage, and a strong sense of community.",
  },
  {
    name: "Cedar House",
    colour: "Emerald",     
    desc: "Celebrating creativity, collaboration, and innovation.",
  },
  {
    name: "Oak House",
    colour: "Royal Blue",
    desc: "Focused on resilience, academic ambition, and teamwork.",
  },
  {
    name: "Willow House",
    colour: "Gold",
    desc: "Recognised for compassion, balance, and holistic excellence.",
  },
];

const PASTORAL_POINTS = [
  {
    title: "Dedicated House Parents",
    desc: "Experienced residential staff provide guidance, support, and daily care.",
    icon: "◎",
  },
  {
    title: "Student Wellbeing",
    desc: "Emotional wellbeing and personal development are central to boarding life.",
    icon: "◈",
  },
  {
    title: "Safe & Inclusive Environment",
    desc: "Every student is supported within a welcoming and respectful community.",
    icon: "◉",
  },
  {
    title: "Mentorship & Guidance",
    desc: "Students receive personalised mentoring throughout their school journey.",
    icon: "◇",
  },
];

const BOARDING_LIFE = [
  {
    title: "Evening Activities",
    desc: "Students enjoy arts, music, games, and social activities after academic hours.",
    icon: "🎭",
  },
  {
    title: "Weekend Experiences",
    desc: "Excursions, competitions, cultural events, and trips enrich student life.",
    icon: "🌍",
  },
  {
    title: "Study Support",
    desc: "Structured prep sessions and academic mentoring help students thrive.",
    icon: "📘",
  },
  {
    title: "Lifelong Friendships",
    desc: "Boarding builds independence, confidence, and friendships that last a lifetime.",
    icon: "🏡",
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
  "House System",
  "Pastoral Care",
  "Boarding Life",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="boarding-subnav">
      <div className="boarding-container">
        <div className="boarding-subnav__inner">
          {SUB_LINKS.map((l) => (
            <button
              key={l}
              className={`boarding-subnav__btn ${
                active === l ? "boarding-subnav__btn--active" : ""
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
function BoardingHero({ activeSection }) {
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
    <section className="boarding-hero">

      <div className="boarding-hero__grid" />
      <div className="boarding-hero__orb boarding-hero__orb--a" />
      <div className="boarding-hero__orb boarding-hero__orb--b" />

      <div className="boarding-container boarding-hero__content">

        <div style={fade(150)} className="boarding-hero__eyebrow">
          <span className="boarding-hero__slash">— </span>
          Boarding
          <span className="boarding-hero__slash"> —</span>
        </div>

        <h1 className="boarding-hero__title" style={fade(300)}>

          {activeSection === "Overview" && (
            <>
              A Home Beyond
              <br />
              <em>the Classroom</em>
            </>
          )}

          {activeSection === "House System" && (
            <>
              Community Through
              <br />
              <em>the House System</em>
            </>
          )}

          {activeSection === "Pastoral Care" && (
            <>
              Student Wellbeing
              <br />
              <em>& Support</em>
            </>
          )}

          {activeSection === "Boarding Life" && (
            <>
              Life in the
              <br />
              <em>Boarding Community</em>
            </>
          )}

        </h1>

        <p className="boarding-hero__sub" style={fade(500)}>
          Independence · Community · Wellbeing · Growth
        </p>

      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="boarding-section">
      <div className="boarding-container">

        <RevealSection>
          <div className="boarding-section-header">
            <p className="boarding-label">Boarding</p>

            <h2 className="boarding-section-title">
              A Warm & Supportive Boarding Experience
            </h2>
          </div>
        </RevealSection>

        <div className="overview__grid">

          <RevealSection delay={120}>
            <div className="overview__text">
              <p>
                Boarding at School Bengaluru offers students a safe,
                enriching, and vibrant environment where independence,
                responsibility, and lifelong friendships flourish.
              </p>

              <p>
                Our boarding houses are designed to feel like home —
                combining exceptional pastoral care with academic support,
                wellbeing, and a strong sense of belonging.
              </p>

              <p>
                Students benefit from a balanced routine of study,
                co-curricular activities, sport, and social experiences
                within a close-knit international community.
              </p>
            </div>
          </RevealSection>

        </div>

      </div>
    </div>
  );
}

/* ── House System ─────────────────────────────────────────── */
function HouseSystem() {
  return (
    <div className="boarding-section">
      <div className="boarding-container">

        <RevealSection>
          <div className="boarding-section-header">
            <p className="boarding-label">House System</p>

            <h2 className="boarding-section-title">
              Building Identity & Community
            </h2>
          </div>
        </RevealSection>

        <div className="houses__grid">
          {HOUSES.map((h, i) => (
            <RevealSection key={h.name} delay={i * 100}>
              <div className="houses__card">
                <h3>{h.name}</h3>
                <p className="houses__colour">{h.colour}</p>
                <p>{h.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Pastoral Care ────────────────────────────────────────── */
function PastoralCare() {
  return (
    <div className="boarding-section">
      <div className="boarding-container">

        <RevealSection>
          <div className="boarding-section-header">
            <p className="boarding-label">Pastoral Care</p>

            <h2 className="boarding-section-title">
              Supporting Every Student
            </h2>
          </div>
        </RevealSection>

        <div className="pastoral__grid">
          {PASTORAL_POINTS.map((p, i) => (
            <RevealSection key={p.title} delay={i * 100}>
              <div className="pastoral__card">
                <span className="pastoral__icon">{p.icon}</span>

                <h3>{p.title}</h3>

                <p>{p.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Boarding Life ────────────────────────────────────────── */
function BoardingLife() {
  return (
    <div className="boarding-section">
      <div className="boarding-container">

        <RevealSection>
          <div className="boarding-section-header">
            <p className="boarding-label">Boarding Life</p>

            <h2 className="boarding-section-title">
              Life Beyond the School Day
            </h2>
          </div>
        </RevealSection>

        <div className="life__grid">
          {BOARDING_LIFE.map((b, i) => (
            <RevealSection key={b.title} delay={i * 120}>
              <div className="life__card">
                <span className="life__icon">{b.icon}</span>

                <h3>{b.title}</h3>

                <p>{b.desc}</p>
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
  "House System": <HouseSystem />,
  "Pastoral Care": <PastoralCare />,
  "Boarding Life": <BoardingLife />,
};

/* ── Page Root ────────────────────────────────────────────── */
export default function Boarding({
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
    <div className="boarding-root">

      <BoardingHero activeSection={activeSection} />

      <SubNav
        active={activeSection}
        onSelect={setActiveSection}
      />

      <main>{SECTION_MAP[activeSection]}</main>

    </div>
  );
}