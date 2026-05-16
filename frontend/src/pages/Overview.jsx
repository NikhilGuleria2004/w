export default function Overview({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Overview</h1>
        <p>A concise introduction to the school, campus, curriculum, and community.</p>
      </div>
    </main>
  );
}
