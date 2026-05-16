export default function SixthForm({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Sixth Form</h1>
        <p>Learn about our leadership-focused Year 11-12 pathway and university preparation.</p>
      </div>
    </main>
  );
}
