export default function TermDates({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Term Dates</h1>
        <p>Review the school year calendar, holidays, and important term milestones.</p>
      </div>
    </main>
  );
}
