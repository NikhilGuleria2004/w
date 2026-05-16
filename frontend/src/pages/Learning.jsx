import { useState, useEffect, useRef } from "react";
import "./Pages.css";

/* ── Data ─────────────────────────────────────────────────── */
const LEARNING_MILESTONES = [
  {
    year: "Primary",
    title: "Foundation Years",
    desc: "A nurturing environment where curiosity, creativity, and confidence begin to flourish through joyful learning experiences.",
  },
  {
    year: "Lower Secondary",
    title: "Exploration & Discovery",
    desc: "Students deepen their understanding across subjects while developing independence, collaboration, and critical thinking skills.",
  },
  {
    year: "Upper Secondary",
    title: "Academic Pathways",
    desc: "A rigorous and internationally focused curriculum prepares students for future academic success and personal growth.",
  },
  {
    year: "Sixth Form",
    title: "University Preparation",
    desc: "Students refine leadership, intellectual independence, and global perspectives as they prepare for top universities worldwide.",
  },
];

const LEARNING_PROGRAMMES = [
  {
    stage: "Primary School",
    age: "Ages 5 – 11",
    focus: "Creativity, Literacy & Confidence",
    icon: "🌱",
  },
  {
    stage: "Lower Secondary",
    age: "Ages 11 – 14",
    focus: "Exploration & Skill Building",
    icon: "📘",
  },
  {
    stage: "Upper Secondary",
    age: "Ages 14 – 16",
    focus: "Academic Excellence & Direction",
    icon: "🎓",
  },
  {
    stage: "Sixth Form",
    age: "Ages 16 – 18",
    focus: "Leadership & University Readiness",
    icon: "🌍",
    active: true,
  },
];

const VALUES = [
  {
    icon: "◈",
    title: "Student-Centred Learning",
    desc: "Every child learns differently. Our programmes are designed to inspire curiosity, independence, and confidence.",
  },
  {
    icon: "◉",
    title: "Global Curriculum",
    desc: "Cambridge and IB pathways provide internationally recognised academic excellence.",
  },
  {
    icon: "◎",
    title: "Holistic Development",
    desc: "Sport, arts, leadership, and service are integrated into every stage of learning.",
  },
  {
    icon: "◇",
    title: "Future Readiness",
    desc: "Students graduate with the skills, resilience, and vision needed to thrive in a changing world.",
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
  "Overview",
  "Primary School",
  "Lower Secondary",
  "Upper Secondary",
  "Sixth Form",
];

function SubNav({ active, onSelect }) {
  return (
    <div className="learning-subnav">
      <div className="learning-container">
        <div className="learning-subnav__inner">
          {SUB_LINKS.map((l) => (
            <button
              key={l}
              className={`learning-subnav__btn ${
                active === l ? "learning-subnav__btn--active" : ""
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
function LearningHero({ activeSection }) {
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
    <section className="learning-hero">
      <div className="learning-hero__grid" />
      <div className="learning-hero__orb learning-hero__orb--a" />
      <div className="learning-hero__orb learning-hero__orb--b" />
      <div className="learning-hero__ring learning-hero__ring--lg" />
      <div className="learning-hero__ring learning-hero__ring--sm" />

      <div className="learning-container learning-hero__content">
        <div style={fade(150)} className="learning-hero__eyebrow">
          <span className="learning-hero__slash">— </span>
          Learning
          <span className="learning-hero__slash"> —</span>
        </div>

        <h1 className="learning-hero__title" style={fade(300)}>
          {activeSection === "Overview" && (
            <>
              A Journey of
              <br />
              <em>Learning & Growth</em>
            </>
          )}

          {activeSection === "Primary School" && (
            <>
              Inspiring Young
              <br />
              <em>Curious Minds</em>
            </>
          )}

          {activeSection === "Lower Secondary" && (
            <>
              Building
              <br />
              <em>Confidence & Discovery</em>
            </>
          )}

          {activeSection === "Upper Secondary" && (
            <>
              Academic
              <br />
              <em>Excellence Begins</em>
            </>
          )}

          {activeSection === "Sixth Form" && (
            <>
              Preparing for
              <br />
              <em>the World Beyond</em>
            </>
          )}
        </h1>

        <p className="learning-hero__sub" style={fade(500)}>
          Cambridge & IB Curriculum · Global Learning Pathways
        </p>
      </div>
    </section>
  );
}

/* ── Overview ─────────────────────────────────────────────── */
function Overview() {
  return (
    <div className="learning-section">
      <div className="learning-container">

        <RevealSection>
          <div className="learning-section-header">
            <p className="learning-label">Our Learning Philosophy</p>
            <h2 className="learning-section-title">
              Education for Every Stage
            </h2>
          </div>
        </RevealSection>

        <div className="overview__grid">
          <RevealSection delay={100}>
            <div className="overview__text">
              <p>
                At School Bengaluru, learning is a journey that evolves with
                every child. From the first years of discovery to university
                preparation, students are supported academically, socially, and
                emotionally.
              </p>

              <p>
                Our curriculum blends academic rigour with creativity,
                leadership, sport, service, and innovation — ensuring students
                develop both knowledge and character.
              </p>

              <p>
                Through the Cambridge and IB pathways, students gain the skills,
                confidence, and global outlook needed to thrive in the modern
                world.
              </p>
            </div>
          </RevealSection>

          <RevealSection delay={250}>
            <div className="overview__values">
              {VALUES.map((v, i) => (
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

/* ── Learning Section Template ───────────────────────────── */
function LearningStage({
  label,
  title,
  intro,
  paragraphs,
}) {
  return (
    <div className="learning-section">
      <div className="learning-container">

        <RevealSection>
          <div className="learning-section-header">
            <p className="learning-label">{label}</p>
            <h2 className="learning-section-title">{title}</h2>
            <p className="learning-section-intro">{intro}</p>
          </div>
        </RevealSection>

        <div className="stage__content">
          {paragraphs.map((p, i) => (
            <RevealSection key={i} delay={i * 120}>
              <div className="stage__card">
                <p>{p}</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ── Individual Sections ─────────────────────────────────── */
function PrimarySchool() {
  return (
    <LearningStage
      label="Primary School"
      title="A Joyful Start to Learning"
      intro="Where confidence, creativity, and curiosity begin."
      paragraphs={[
        "Our Primary School nurtures a love for learning through engaging and imaginative experiences across literacy, mathematics, science, arts, and sport.",
        "Students are encouraged to explore, collaborate, and develop independence in a safe and supportive environment.",
        "A strong emphasis on wellbeing and character ensures every child feels valued, confident, and inspired.",
      ]}
    />
  );
}

function LowerSecondary() {
  return (
    <LearningStage
      label="Lower Secondary"
      title="Exploration & Independence"
      intro="Encouraging students to think critically and discover their strengths."
      paragraphs={[
        "Lower Secondary students experience a broad and balanced curriculum designed to deepen knowledge and build confidence across disciplines.",
        "Students begin developing stronger analytical, collaborative, and communication skills through project-based and inquiry-led learning.",
        "Academic growth is complemented by leadership opportunities, sport, creative arts, and service programmes.",
      ]}
    />
  );
}

function UpperSecondary() {
  return (
    <LearningStage
      label="Upper Secondary"
      title="Focused Academic Excellence"
      intro="Preparing students for future success through challenge and ambition."
      paragraphs={[
        "Upper Secondary students follow rigorous academic pathways that prepare them for internationally recognised qualifications.",
        "Our teachers guide students toward intellectual independence, resilience, and strong academic achievement.",
        "Students are supported through mentoring, career guidance, and opportunities that help shape their future aspirations.",
      ]}
    />
  );
}

function SixthForm() {
  return (
    <LearningStage
      label="Sixth Form"
      title="Leadership & University Preparation"
      intro="The final stage before university and beyond."
      paragraphs={[
        "Sixth Form students engage in advanced study that encourages intellectual depth, independent research, and global awareness.",
        "Leadership, service, innovation, and personal responsibility are central to the Sixth Form experience.",
        "Students graduate prepared for the world's leading universities and equipped to make meaningful contributions to society.",
      ]}
    />
  );
}

/* ── Section Map ──────────────────────────────────────────── */
const SECTION_MAP = {
  Overview: <Overview />,
  "Primary School": <PrimarySchool />,
  "Lower Secondary": <LowerSecondary />,
  "Upper Secondary": <UpperSecondary />,
  "Sixth Form": <SixthForm />,
};

/* ── Page Root ────────────────────────────────────────────── */
export default function Learning({
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
    <div className="learning-root">
      <LearningHero activeSection={activeSection} />

      <SubNav
        active={activeSection}
        onSelect={setActiveSection}
      />

      <main>{SECTION_MAP[activeSection]}</main>
    </div>
  );
}