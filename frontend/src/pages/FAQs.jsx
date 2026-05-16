export default function FAQs({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>FAQs</h1>
        <p>Frequently asked questions about admissions, academics, boarding, and school life.</p>
      </div>
    </main>
  );
}
