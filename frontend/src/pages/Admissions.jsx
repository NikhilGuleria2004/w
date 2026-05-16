export default function Admissions({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Admissions</h1>
        <p>Everything families need to know about joining the school.</p>
      </div>
    </main>
  );
}
