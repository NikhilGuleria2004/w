export default function BoardingLife({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Boarding Life</h1>
        <p>A glimpse into the daily routines, clubs, and community of boarding students.</p>
      </div>
    </main>
  );
}
