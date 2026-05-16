export default function SchoolHeritage({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>School Heritage</h1>
        <p>Learn about the history, traditions, and legacy behind our school.</p>
      </div>
    </main>
  );
}
