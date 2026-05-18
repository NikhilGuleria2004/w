import { useState, useEffect, useRef } from "react";
import "./Pages.css";

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

const CO_CURRICULARS = [
  {
    title: "Music & Performing Arts",
    desc: "Choirs, orchestras, theatre productions, and dance programmes allow students to perform and collaborate creatively.",
    icon: "🎭",
  },
  {
    title: "Debate & Public Speaking",
    desc: "Students build confidence and communication skills through debates, Model UN, and speaking competitions.",
    icon: "🎙️",
  },
  {
    title: "STEM & Innovation",
    desc: "Robotics, coding, and innovation labs inspire curiosity and problem-solving beyond the classroom.",
    icon: "💡",
  },
  {
    title: "Service & Leadership",
    desc: "Students contribute to local and global communities through impactful initiatives and leadership opportunities.",
    icon: "🌍",
  },
];

const SPORTS = [
  {
    sport: "Football",
    detail: "Professional coaching and competitive inter-school fixtures.",
  },
  {
    sport: "Swimming",
    detail: "Olympic-standard aquatic facilities supporting all ability levels.",
  },
  {
    sport: "Tennis",
    detail: "Elite training programmes focused on technique and discipline.",
  },
  {
    sport: "Athletics",
    detail: "Track and field opportunities that promote fitness and resilience.",
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

// Fix: visible → translateY(0), hidden → translateY(36px)
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
  "Holistic Education",
  "Co-Curricular Activities",
  "Sports at School",
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
//       .discover-container, .discover-hero__content,
//       .discover-hero__eyebrow, .discover-hero__slash,
//       .discover-hero__title, .discover-hero__sub
function BeyondHero({ activeSection }) {
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
          Beyond Learning
          <span className="discover-hero__slash"> —</span>
        </div>

        <h1 className="discover-hero__title" style={fade(300)}>
          {activeSection === "Overview" && (
            <>
              Education Beyond
              <br />
              <em>the Classroom</em>
            </>
          )}
          {activeSection === "Holistic Education" && (
            <>
              Developing the
              <br />
              <em>Whole Child</em>
            </>
          )}
          {activeSection === "Co-Curricular Activities" && (
            <>
              Creativity,
              <br />
              <em>Leadership & Discovery</em>
            </>
          )}
          {activeSection === "Sports at School" && (
            <>
              Excellence in
              <br />
              <em>Sport & Wellbeing</em>
            </>
          )}
        </h1>

        <p className="discover-hero__sub" style={fade(500)}>
          Character · Creativity · Leadership · Sport
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
// Uses: .discover-section, .discover-container, .discover-section-header,
//       .discover-section-title, .overview__grid, .overview__text,
//       .overview__values, .overview__value-item, .overview__value-icon,
//       .overview__value-title, .overview__value-desc
function Overview() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              A Holistic Educational Experience
            </h2>
            <p className="discover-section-intro">Beyond Learning</p>
          </div>
        </RevealSection>

        <div className="overview__grid">
          <RevealSection delay={120}>
            <div className="overview__text">
              <p>
                At School Bengaluru, education extends far beyond academic
                achievement. Students are encouraged to discover passions,
                develop talents, and build character through a rich and
                balanced school experience.
              </p>
              <p>
                Through arts, leadership, service, co-curricular programmes,
                and sport, students grow into confident and compassionate
                individuals ready to contribute meaningfully to the world.
              </p>
            </div>
          </RevealSection>

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
        </div>

      </div>
    </section>
  );
}

/* ── Holistic Education ───────────────────────────────────── */
// stage__content / stage__card → overview__value-item pattern
function HolisticEducation() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Nurturing Every Dimension of Growth
            </h2>
            <p className="discover-section-intro">Holistic Education</p>
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
          {[
            "We believe education should inspire intellectual, emotional, physical, creative, and ethical growth. Students are supported not only academically but also as individuals discovering who they are and who they can become.",
            "Through mentorship, wellbeing initiatives, leadership opportunities, and collaborative experiences, students build resilience, confidence, and a strong sense of purpose.",
          ].map((p, i) => (
            <RevealSection key={i} delay={i * 120}>
              <div className="overview__value-item">
                <p className="overview__value-desc" style={{ margin: 0, fontSize: "20px" }}>
                  {p}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Co-Curricular Activities ─────────────────────────────── */
// activities__grid / activities__card → journey__steps / family__card pattern
// Uses: .journey__steps for the grid, .overview__value-item for each card
function CoCurricularActivities() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Opportunities Beyond Academics
            </h2>
            <p className="discover-section-intro">Co-Curricular Activities</p>
          </div>
        </RevealSection>

        <div className="journey__steps" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {CO_CURRICULARS.map((a, i) => (
            <RevealSection key={a.title} delay={i * 120}>
              <div className="overview__value-item" style={{ flexDirection: "column", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>{a.icon}</span>
                <div>
                  <h3 className="overview__value-title">{a.title}</h3>
                  <p className="overview__value-desc">{a.desc}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ── Sports ───────────────────────────────────────────────── */
// sports__grid / sports__card → heritage__card pattern inside a timeline-free wrapper
function SportsAtSchool() {
  return (
    <section className="discover-section">
      <div className="discover-container">

        <RevealSection>
          <div className="discover-section-header">
            <h2 className="discover-section-title">
              Building Strength, Teamwork & Discipline
            </h2>
            <p className="discover-section-intro">Sports at School</p>
          </div>
        </RevealSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
        >
          {SPORTS.map((s, i) => (
            <RevealSection key={s.sport} delay={i * 100}>
              <div className="heritage__card">
                <h3 className="heritage__card-title">{s.sport}</h3>
                <p className="heritage__card-desc">{s.detail}</p>
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
  "Holistic Education": <HolisticEducation />,
  "Co-Curricular Activities": <CoCurricularActivities />,
  "Sports at School": <SportsAtSchool />,
};

/* ── Page Root ────────────────────────────────────────────── */
// Uses: .discover-root
export default function BeyondLearning({ initialSection = "Overview" }) {
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  return (
    <div className="discover-root">
      <BeyondHero activeSection={activeSection} />
      <SubNav active={activeSection} onSelect={setActiveSection} />
      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}