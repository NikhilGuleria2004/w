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

function RevealSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(36px)" : "translateY(0)",
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
  "Holistic Education",
  "Co-Curricular Activities",
  "Sports at School",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="beyond-subnav">
      <div className="beyond-container">
        <div className="beyond-subnav__inner">
          {SUB_LINKS.map((l) => (
            <button
              key={l}
              className={`beyond-subnav__btn ${
                active === l ? "beyond-subnav__btn--active" : ""
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
    <section className="beyond-hero">
      <div className="beyond-hero__grid" />
      <div className="beyond-hero__orb beyond-hero__orb--a" />
      <div className="beyond-hero__orb beyond-hero__orb--b" />

      <div className="beyond-container beyond-hero__content">
        <div style={fade(150)} className="beyond-hero__eyebrow">
          <span className="beyond-hero__slash">— </span>
          Beyond Learning
          <span className="beyond-hero__slash"> —</span>
        </div>

        <h1 className="beyond-hero__title" style={fade(300)}>

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

        <p className="beyond-hero__sub" style={fade(500)}>
          Character · Creativity · Leadership · Sport
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="beyond-section">
      <div className="beyond-container">

        <RevealSection>
          <div className="beyond-section-header">
            <p className="beyond-label">Beyond Learning</p>
            <h2 className="beyond-section-title">
              A Holistic Educational Experience
            </h2>
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
    </div>
  );
}

/* ── Holistic Education ───────────────────────────────────── */
function HolisticEducation() {
  return (
    <div className="beyond-section">
      <div className="beyond-container">

        <RevealSection>
          <div className="beyond-section-header">
            <p className="beyond-label">Holistic Education</p>
            <h2 className="beyond-section-title">
              Nurturing Every Dimension of Growth
            </h2>
          </div>
        </RevealSection>

        <RevealSection delay={120}>
          <div className="stage__content">
            <div className="stage__card">
              <p>
                We believe education should inspire intellectual, emotional,
                physical, creative, and ethical growth. Students are supported
                not only academically but also as individuals discovering who
                they are and who they can become.
              </p>

              <p>
                Through mentorship, wellbeing initiatives, leadership
                opportunities, and collaborative experiences, students build
                resilience, confidence, and a strong sense of purpose.
              </p>
            </div>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}

/* ── Co-Curricular Activities ─────────────────────────────── */
function CoCurricularActivities() {
  return (
    <div className="beyond-section">
      <div className="beyond-container">

        <RevealSection>
          <div className="beyond-section-header">
            <p className="beyond-label">Co-Curricular Activities</p>
            <h2 className="beyond-section-title">
              Opportunities Beyond Academics
            </h2>
          </div>
        </RevealSection>

        <div className="activities__grid">
          {CO_CURRICULARS.map((a, i) => (
            <RevealSection key={a.title} delay={i * 120}>
              <div className="activities__card">
                <span className="activities__icon">{a.icon}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Sports ───────────────────────────────────────────────── */
function SportsAtSchool() {
  return (
    <div className="beyond-section">
      <div className="beyond-container">

        <RevealSection>
          <div className="beyond-section-header">
            <p className="beyond-label">Sports at School</p>
            <h2 className="beyond-section-title">
              Building Strength, Teamwork & Discipline
            </h2>
          </div>
        </RevealSection>

        <div className="sports__grid">
          {SPORTS.map((s, i) => (
            <RevealSection key={s.sport} delay={i * 100}>
              <div className="sports__card">
                <h3>{s.sport}</h3>
                <p>{s.detail}</p>
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
  "Holistic Education": <HolisticEducation />,
  "Co-Curricular Activities": <CoCurricularActivities />,
  "Sports at School": <SportsAtSchool />,
};

/* ── Page Root ────────────────────────────────────────────── */
export default function BeyondLearning({
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
    <div className="beyond-root">

      <BeyondHero activeSection={activeSection} />

      <SubNav
        active={activeSection}
        onSelect={setActiveSection}
      />

      <main>{SECTION_MAP[activeSection]}</main>

    </div>
  );
}