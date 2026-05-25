import { useState, useEffect, useRef } from "react";
import "./Pages.css";
import schoolimg from './schoolimg.webp';
/* ── Data ─────────────────────────────────────────────────── */

const HOLISTIC_PILLARS = [
  {
    icon: "◎",
    title: "Creative Expression",
    desc: "Students explore music, drama, visual arts, and performance to develop imagination and confidence.",
  },
  {
    icon: "◈",
    title: "Leadership & Service",
    desc: "Meaningful service opportunities encourage empathy, responsibility, and global citizenship.",
  },
  {
    icon: "◉",
    title: "Wellbeing & Character",
    desc: "Emotional wellbeing and strong values are central to every student's journey.",
  },
  {
    icon: "◇",
    title: "Innovation & Exploration",
    desc: "Students are encouraged to think critically, solve problems, and embrace new ideas.",
  },
];
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
    desc: "Emotional wellbeing and personal development are central to boarding life  jjkhbv.",
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
    desc: "Structured prep sessions and academic mentoring help students thrive and more fun for students.",
    icon: "📘",
  },
  {
    title: "Lifelong Friendships",
    desc: "Boarding builds independence, confidence, and friendships that last a lifetime and longer.", 
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

/* ── Sub-nav ──────────────────────────────────────────────── */
// Uses: .discover-subnav, .discover-subnav__inner,
//       .discover-subnav__btn, .discover-subnav__btn--active
const SUB_LINKS = [
  "Overview",
  "House System",
  // "Pastoral Care",
  "Boarding Life",
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
    <section className="discover-hero">
      <div className="discover-hero__grid" />
      <div className="discover-hero__orb discover-hero__orb--a" />
      <div className="discover-hero__orb discover-hero__orb--b" />
      <div className="discover-hero__ring discover-hero__ring--lg" />
      <div className="discover-hero__ring discover-hero__ring--sm" />

      <div className="discover-container discover-hero__content">
        <div style={fade(150)} className="discover-hero__eyebrow">
          <span className="discover-hero__slash">— </span>
          Boarding
          <span className="discover-hero__slash"> —</span>
        </div>

        <h1 className="discover-hero__title" style={fade(300)}>
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

        <p className="discover-hero__sub" style={fade(500)}>
          Independence · Community · Wellbeing · Growth
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .overview__grid, .overview__text
function Overview() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              A Warm & Supportive Boarding Experience
            </h2>
            <p className="discover-section-intro">Boarding</p>
          </div>
        </RevealSection>

        <div className="overview__grid">
          <RevealSection delay={120}>
            <div className="overview__text">
              <p>
                Boarding at School of Excellence Chandigarh offers students a safe,
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
            <div className='Boardingimg'>
              <img src="./schoolimg.webp" alt="" />
            </div>
          </RevealSection>
          <RevealSection delay={120}> 
            <RevealSection delay={220}>
            <div className="overview__values">
              {HOLISTIC_PILLARS.map((v, i) => (
                <div
                  className="overview__value-item"
                  key={v.title}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="overview__value-icon">{v.icon}</span>
                  <div>
                    <h4 className="overview__value-title">{v.title}</h4>
                    <p className="overview__value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
          </RevealSection>
        </div>

      </div>
    </section>
  );
}

/* ── House System ─────────────────────────────────────────── */
// houses__grid / houses__card / houses__colour →
//   2-col grid + heritage__card + heritage__year for the colour label
function HouseSystem() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Building Identity & Community
            </h2>
            <p className="discover-section-intro">House System</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {HOUSES.map((h, i) => (
            <RevealSection key={h.name} delay={i * 100}>
              <div className="heritage__card">
                <span className="heritage__year" style={{ fontSize: "18px", marginBottom: "6px" }}>
                  {h.colour}
                </span>
                <h3 className="heritage__card-title">{h.name}</h3>
                <p className="heritage__card-desc">{h.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <div className="heritageHiddenB">
            <p>Crimson
Ash House
Known for leadership, courage, and a strong sense of community.

Emerald
Cedar House
Celebrating creativity, collaboration, and innovation.

Royal Blue
Oak House
Focused on resilience, academic ambition, and teamwork.

Gold
Willow House
Recognised for compassion, balance, and holistic excellence.</p>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}

/* ── Pastoral Care ────────────────────────────────────────── */
// pastoral__grid / pastoral__card / pastoral__icon →
//   overview__values + overview__value-item pattern
function PastoralCare() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Supporting Every Student
            </h2>
            <p className="discover-section-intro">Pastoral Care</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            height: "100%",

          }}
        >
          {PASTORAL_POINTS.map((p, i) => (
            <RevealSection key={p.title} delay={i * 100}>
              <div className="overview__value-item">
                {/* <span className="overview__value-icon">{p.icon}</span> */}
                <div>
                  <h4 className="overview__value-title">{p.title}</h4>
                  <p className="overview__value-desc">{p.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>


      </div>
    </section>
  );
}

/* ── Boarding Life ────────────────────────────────────────── */
// life__grid / life__card / life__icon →
//   2-col grid + overview__value-item with emoji icon
function BoardingLife() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Life Beyond the School Day
            </h2>
            <p className="discover-section-intro">Boarding Life</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {BOARDING_LIFE.map((b, i) => (
            <RevealSection key={b.title} delay={i * 120}>
              <div className="overview__value-item" style={{ flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>{b.icon}</span>
                <div>
                  <h4 className="overview__value-title">{b.title}</h4>
                  <p className="overview__value-desc">{b.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  Overview: <Overview />,
  "House System": <HouseSystem />,
  // "Pastoral Care": <PastoralCare />,
  "Boarding Life": <BoardingLife />,
};

/* ── Page Root ────────────────────────────────────────────── */
// Uses: .discover-root
export default function Boarding({ initialSection = "Overview" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <BoardingHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}