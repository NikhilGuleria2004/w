export default function TheJourney({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>The Journey</h1>
        <p>Read about how students progress academically and personally during their time here.</p>
      </div>
    </main>
  );
}
