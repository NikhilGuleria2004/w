export default function BeyondLearning({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Beyond Learning</h1>
        <p>Discover the enrichment, wellbeing, and activities that complement the curriculum.</p>
      </div>
    </main>
  );
}
