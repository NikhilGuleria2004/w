export default function PastoralCare({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Pastoral Care</h1>
        <p>The care, guidance, and wellbeing systems that help every learner thrive.</p>
      </div>
    </main>
  );
}
