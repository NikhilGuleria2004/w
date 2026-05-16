export default function Fees({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Fees</h1>
        <p>Details on tuition, boarding, and available payment options.</p>
      </div>
    </main>
  );
}
