import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   CENTERING HELPERS
───────────────────────────────────────────── */
const containerStyle = {
  width: "100%",
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "0 24px",
  boxSizing: "border-box",
};

const sectionStyle = {
  padding: "64px 0",
};

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const MOCK_ACCOUNTS = {
  "parent@school.com": {
    password: "demo1234",
    name: "Rajiv Sharma",
    children: [
      {
        id: 1,
        name: "Aanya Sharma",
        year: "Year 9 · Upper Secondary",
        avatar: "AS",
        attendance: 94,
        gpa: "A–",
        nextAssessment: "Mathematics — 12 Jun",
        fees: { status: "Paid", next: "Aug 2025", amount: "₹9,80,000" },
        subjects: [
          { name: "Mathematics",  grade: "A",  score: 91 },
          { name: "Sciences",     grade: "A–", score: 87 },
          { name: "English",      grade: "B+", score: 83 },
          { name: "History",      grade: "A",  score: 90 },
          { name: "Computer Sci", grade: "A+", score: 97 },
        ],
        notices: [
          { date: "30 May", text: "Sports Day — 14 June. Kit required." },
          { date: "27 May", text: "Mathematics assessment rescheduled to 12 Jun." },
          { date: "20 May", text: "Term report published. Check the Documents tab." },
        ],
      },
      {
        id: 2,
        name: "Rohan Sharma",
        year: "Year 5 · Primary",
        avatar: "RS",
        attendance: 98,
        gpa: "A",
        nextAssessment: "English — 18 Jun",
        fees: { status: "Paid", next: "Aug 2025", amount: "₹6,50,000" },
        subjects: [
          { name: "English",     grade: "A",  score: 93 },
          { name: "Mathematics", grade: "A–", score: 88 },
          { name: "Science",     grade: "A+", score: 96 },
          { name: "Art",         grade: "A",  score: 91 },
          { name: "PE",          grade: "A+", score: 98 },
        ],
        notices: [
          { date: "29 May", text: "School trip to Science Museum — 20 June. Consent form due." },
          { date: "24 May", text: "Art exhibition on 7 June. All families welcome." },
        ],
      },
    ],
  },
};

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({ title, sub, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: "40px" }}>
      {sub && (
        <p style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          margin: "0 0 10px",
        }}>{sub}</p>
      )}
      <h2 style={{
        fontFamily: "var(--font-display, serif)",
        fontSize: "clamp(22px, 3vw, 34px)",
        fontWeight: 400,
        color: "var(--white, #fff)",
        margin: 0,
        lineHeight: 1.2,
      }}>{title}</h2>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOGIN PAGE
───────────────────────────────────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [loaded, setLoaded]     = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const fade = (ms) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(32px)",
    transition: `opacity 0.85s ease ${ms}ms, transform 0.85s ease ${ms}ms`,
  });

  const handleSubmit = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const account = MOCK_ACCOUNTS[email.toLowerCase().trim()];
      if (account && account.password === password) {
        onLogin(account);
      } else {
        setError("Invalid email or password. Try: parent@school.com / demo1234");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="discover-root" style={{ minHeight: "100vh" }}>
      {/* decorative background */}
      <div className="discover-hero" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div className="discover-hero__grid" />
        <div className="discover-hero__orb discover-hero__orb--a" />
        <div className="discover-hero__orb discover-hero__orb--b" />
        <div className="discover-hero__ring discover-hero__ring--lg" />
        <div className="discover-hero__ring discover-hero__ring--sm" />
      </div>

      {/* centered login card */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 20px",
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* eyebrow */}
          <div
            className="discover-hero__eyebrow"
            style={{ ...fade(100), textAlign: "center", justifyContent: "center", display: "flex", gap: "4px" }}
          >
            <span className="discover-hero__slash">—&nbsp;</span>
            Parent Portal
            <span className="discover-hero__slash">&nbsp;—</span>
          </div>

          {/* heading */}
          <h1
            className="discover-hero__title"
            style={{ ...fade(220), marginBottom: "8px", textAlign: "center" }}
          >
            Welcome<br /><em>Back</em>
          </h1>

          <p
            className="discover-hero__sub"
            style={{ ...fade(340), marginBottom: "40px", textAlign: "center" }}
          >
            School of Excellence Chandigarh
          </p>

          {/* form card */}
          <div
            className="heritage__card"
            style={{
              ...fade(400),
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@school.com"
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {error && (
              <p style={{
                fontFamily: "var(--font-body, sans-serif)",
                fontSize: "13px",
                color: "#ff6b6b",
                margin: 0,
                padding: "10px 14px",
                background: "rgba(255,107,107,0.08)",
                borderRadius: "6px",
                border: "1px solid rgba(255,107,107,0.2)",
              }}>{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="discover-subnav__btn discover-subnav__btn--active"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "14px",
                letterSpacing: "0.08em",
                marginTop: "4px",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {loading ? "Signing In…" : "Sign In"}
            </button>

            <p style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
              textAlign: "center",
            }}>
              Demo: parent@school.com&nbsp;/&nbsp;demo1234
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontFamily: "var(--font-body, sans-serif)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const inputStyle = {
  fontFamily: "var(--font-body, sans-serif)",
  fontSize: "15px",
  color: "var(--white, #fff)",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  padding: "12px 14px",
  outline: "none",
  transition: "border-color 0.2s",
  width: "100%",
  boxSizing: "border-box",
};

/* ─────────────────────────────────────────────
   DASHBOARD NAV
───────────────────────────────────────────── */
const DASH_TABS = ["Overview", "Academics", "Attendance", "Fees", "Notices"];

function DashNav({ active, onSelect, account, onLogout }) {
  return (
    <div className="discover-subnav" style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{
        ...containerStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
        padding: "0 24px",
      }}>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {DASH_TABS.map((t) => (
            <button
              key={t}
              className={`discover-subnav__btn ${active === t ? "discover-subnav__btn--active" : ""}`}
              onClick={() => onSelect(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.05em",
          }}>
            {account.name}
          </span>
          <button
            className="discover-subnav__btn"
            onClick={onLogout}
            style={{ fontSize: "11px", padding: "6px 14px" }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHILD SELECTOR
───────────────────────────────────────────── */
function ChildSelector({ children, active, onSelect }) {
  return (
    <div style={{
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "0",
    }}>
      {children.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 18px",
            borderRadius: "40px",
            border: active.id === c.id
              ? "1px solid rgba(255,255,255,0.4)"
              : "1px solid rgba(255,255,255,0.1)",
            background: active.id === c.id
              ? "rgba(255,255,255,0.08)"
              : "transparent",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "11px", fontWeight: 700,
            color: "var(--white, #fff)",
            letterSpacing: "0.05em",
            border: "1px solid rgba(255,255,255,0.15)",
            flexShrink: 0,
          }}>
            {c.avatar}
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "13px", fontWeight: 700,
              color: "var(--white, #fff)", margin: 0,
            }}>{c.name}</p>
            <p style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)", margin: 0,
            }}>{c.year}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, sub, delay = 0 }) {
  return (
    <RevealSection delay={delay}>
      <div className="family__card" style={{ textAlign: "center" }}>
        <p className="family__country">{label}</p>
        <p className="family__city" style={{ fontSize: "28px", fontWeight: 700 }}>{value}</p>
        {sub && (
          <p style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: "4px 0 0",
          }}>{sub}</p>
        )}
      </div>
    </RevealSection>
  );
}

/* ─────────────────────────────────────────────
   TAB: OVERVIEW
───────────────────────────────────────────── */
function TabOverview({ child }) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        <RevealSection>
          <SectionHeader title={child.name} sub={child.year} />
        </RevealSection>

        {/* stat grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}>
          <StatCard label="Attendance"      value={`${child.attendance}%`}            sub="This term"                           delay={0}   />
          <StatCard label="Overall Grade"   value={child.gpa}                          sub="Current average"                     delay={80}  />
          <StatCard label="Fee Status"      value={child.fees.status}                  sub={`Next due: ${child.fees.next}`}      delay={160} />
          <StatCard label="Next Assessment" value={child.nextAssessment.split("—")[0]} sub={child.nextAssessment.split("—")[1]?.trim()} delay={240} />
        </div>

        {/* notices */}
        <RevealSection delay={100}>
          <SectionHeader title="Recent Notices" />
        </RevealSection>

        <div style={{
          display: "flex", flexDirection: "column", gap: "12px",
          maxWidth: "700px", margin: "0 auto",
        }}>
          {child.notices.map((n, i) => (
            <RevealSection key={i} delay={i * 80}>
              <div className="overview__pull-quote">
                <div className="overview__pull-quote-bar" />
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", gap: "12px", width: "100%",
                }}>
                  <p style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px", color: "rgba(255,255,255,0.75)",
                    margin: 0, lineHeight: 1.6,
                  }}>{n.text}</p>
                  <span style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "11px", color: "rgba(255,255,255,0.3)",
                    whiteSpace: "nowrap", paddingTop: "2px",
                    letterSpacing: "0.06em",
                  }}>{n.date}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TAB: ACADEMICS
───────────────────────────────────────────── */
function TabAcademics({ child }) {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        <RevealSection>
          <SectionHeader title="Academic Results" sub={child.name} />
        </RevealSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
        }}>
          {child.subjects.map((s, i) => (
            <RevealSection key={s.name} delay={i * 100}>
              <div className="journey__step" style={{ textAlign: "center" }}>
                <div className="journey__step-num" style={{ fontSize: "20px", margin: "0 auto 12px" }}>{s.grade}</div>
                <h3 className="journey__step-title">{s.name}</h3>
                <div style={{
                  marginTop: "14px",
                  height: "4px",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${s.score}%`,
                    background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.2))",
                    borderRadius: "2px",
                    transition: "width 1s ease",
                  }} />
                </div>
                <p className="journey__step-desc" style={{ marginTop: "8px" }}>{s.score} / 100</p>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TAB: ATTENDANCE
───────────────────────────────────────────── */
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

function TabAttendance({ child }) {
  const bars = MONTHS.map((m, i) => {
    const base = child.attendance;
    const val = Math.min(100, Math.max(72, base + Math.sin(i * 1.7 + child.id) * 6));
    return { month: m, val: Math.round(val) };
  });

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        <RevealSection>
          <SectionHeader title="Attendance Record" sub={child.name} />
        </RevealSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "40px",
        }}>
          <StatCard label="This Term"    value={`${child.attendance}%`}                     delay={0}   />
          <StatCard label="Days Present" value={Math.round(child.attendance * 1.85)}         sub="of ~185 school days" delay={80}  />
          <StatCard label="Absences"     value={Math.round((100 - child.attendance) * 1.85)} sub="days this year"     delay={160} />
        </div>

        <RevealSection delay={160}>
          <div className="heritage__card" style={{ padding: "28px 24px" }}>
            <h3 className="heritage__card-title" style={{ marginBottom: "24px", textAlign: "center" }}>
              Monthly Attendance
            </h3>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "10px",
              height: "140px",
            }}>
              {bars.map((b, i) => (
                <div key={b.month} style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "6px",
                }}>
                  <div style={{
                    width: "100%",
                    height: `${b.val}%`,
                    background: b.val >= 90
                      ? "linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1))"
                      : "linear-gradient(180deg, rgba(255,180,100,0.5), rgba(255,180,100,0.15))",
                    borderRadius: "4px 4px 0 0",
                    transition: `height 0.8s ease ${i * 60}ms`,
                    minHeight: "8px",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.05em",
                  }}>{b.month}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TAB: FEES
───────────────────────────────────────────── */
const FEE_HISTORY = [
  { term: "Autumn 2024", amount: null, status: "Paid",     date: "1 Aug 2024" },
  { term: "Spring 2025", amount: null, status: "Paid",     date: "2 Jan 2025" },
  { term: "Summer 2025", amount: null, status: "Paid",     date: "1 Apr 2025" },
  { term: "Autumn 2025", amount: null, status: "Upcoming", date: "1 Aug 2025" },
];

function TabFees({ child }) {
  const history = FEE_HISTORY.map((f) => ({ ...f, amount: child.fees.amount }));

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        <RevealSection>
          <SectionHeader title="Fees & Payments" sub={child.name} />
        </RevealSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}>
          <StatCard label="Annual Fee"     value={child.fees.amount} delay={0}   />
          <StatCard label="Payment Status" value={child.fees.status} delay={80}  />
          <StatCard label="Next Due"       value={child.fees.next}   delay={160} />
        </div>

        <RevealSection delay={120}>
          <SectionHeader title="Payment History" />
        </RevealSection>

        <div style={{
          display: "flex", flexDirection: "column", gap: "12px",
          maxWidth: "700px", margin: "0 auto",
        }}>
          {history.map((f, i) => (
            <RevealSection key={f.term} delay={i * 80}>
              <div className="overview__pull-quote" style={{
                borderColor: f.status === "Upcoming" ? "rgba(255,200,80,0.3)" : undefined,
              }}>
                <div className="overview__pull-quote-bar" style={{
                  background: f.status === "Upcoming" ? "rgba(255,200,80,0.5)" : undefined,
                }} />
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", width: "100%", flexWrap: "wrap", gap: "8px",
                }}>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "15px", fontWeight: 700,
                      color: "var(--white, #fff)", margin: "0 0 2px",
                    }}>{f.term}</p>
                    <p style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.35)", margin: 0,
                    }}>{f.date}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "16px", fontWeight: 700,
                      color: "var(--white, #fff)", margin: "0 0 2px",
                    }}>{f.amount}</p>
                    <span style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: f.status === "Paid" ? "rgba(100,220,140,0.8)" : "rgba(255,200,80,0.8)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: f.status === "Paid" ? "rgba(100,220,140,0.08)" : "rgba(255,200,80,0.08)",
                    }}>{f.status}</span>
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

/* ─────────────────────────────────────────────
   TAB: NOTICES
───────────────────────────────────────────── */
const ALL_NOTICES = [
  { date: "30 May", tag: "Sport",    text: "Sports Day — 14 June. PE kit, sunscreen, and packed lunch required. All families welcome from 9 AM." },
  { date: "27 May", tag: "Academic", text: "Mathematics assessment rescheduled to 12 June due to inter-house competitions." },
  { date: "24 May", tag: "Art",      text: "Annual art exhibition will be held on 7 June in the Main Hall. All families warmly invited." },
  { date: "20 May", tag: "Report",   text: "Term reports for all students have been published. Visit the Documents section to view." },
  { date: "15 May", tag: "Trip",     text: "Year 5 Science Museum trip on 20 June. Please return consent forms and payment by 10 June." },
  { date: "10 May", tag: "General",  text: "School closes for Founders' Day on 6 June. Classes resume on 9 June." },
];

function TabNotices() {
  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>

        <RevealSection>
          <SectionHeader title="School Notices" sub="Latest Communications" />
        </RevealSection>

        <div style={{
          display: "flex", flexDirection: "column", gap: "14px",
          maxWidth: "760px", margin: "0 auto",
        }}>
          {ALL_NOTICES.map((n, i) => (
            <RevealSection key={i} delay={i * 70}>
              <div className="overview__pull-quote">
                <div className="overview__pull-quote-bar" />
                <div style={{ width: "100%" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "8px", alignItems: "center",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "10px", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      padding: "3px 8px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "4px",
                    }}>{n.tag}</span>
                    <span style={{
                      fontFamily: "var(--font-body, sans-serif)",
                      fontSize: "11px", color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.06em",
                    }}>{n.date}</span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-body, sans-serif)",
                    fontSize: "15px", color: "rgba(255,255,255,0.75)",
                    margin: 0, lineHeight: 1.7,
                  }}>{n.text}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD ROOT
───────────────────────────────────────────── */
function Dashboard({ account, onLogout }) {
  const [activeTab,   setActiveTab]   = useState("Overview");
  const [activeChild, setActiveChild] = useState(account.children[0]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activeTab, activeChild]);

  const renderTab = () => {
    switch (activeTab) {
      case "Overview":   return <TabOverview   child={activeChild} />;
      case "Academics":  return <TabAcademics  child={activeChild} />;
      case "Attendance": return <TabAttendance child={activeChild} />;
      case "Fees":       return <TabFees       child={activeChild} />;
      case "Notices":    return <TabNotices />;
      default:           return null;
    }
  };

  return (
    <div className="discover-root" style={{ minHeight: "100vh" }}>
      <DashNav
        active={activeTab}
        onSelect={setActiveTab}
        account={account}
        onLogout={onLogout}
      />

      {/* hero banner */}
      <section className="discover-hero" style={{ minHeight: "240px", position: "relative" }}>
        <div className="discover-hero__grid" />
        <div className="discover-hero__orb discover-hero__orb--a" style={{ opacity: 0.4 }} />
        <div className="discover-hero__orb discover-hero__orb--b" style={{ opacity: 0.3 }} />

        <div style={{
          ...containerStyle,
          position: "relative",
          zIndex: 1,
          paddingTop: "40px",
          paddingBottom: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div className="discover-hero__eyebrow" style={{ justifyContent: "center", display: "flex", gap: "4px" }}>
            <span className="discover-hero__slash">—&nbsp;</span>
            Parent Dashboard
            <span className="discover-hero__slash">&nbsp;—</span>
          </div>

          <h1
            className="discover-hero__title"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", marginBottom: "28px", textAlign: "center" }}
          >
            Hello,&nbsp;<em>{account.name.split(" ")[0]}</em>
          </h1>

          {activeTab !== "Notices" && (
            <ChildSelector
              children={account.children}
              active={activeChild}
              onSelect={setActiveChild}
            />
          )}
        </div>
      </section>

      <main>{renderTab()}</main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function ParentPortal() {
  const [account, setAccount] = useState(null);

  return account
    ? <Dashboard account={account} onLogout={() => setAccount(null)} />
    : <LoginPage onLogin={setAccount} />;
}