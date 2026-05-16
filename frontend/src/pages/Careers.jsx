export default function Careers({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Careers</h1>
        <p>Current opportunities to join our staff and faculty community.</p>
      </div>
    </main>
  );
}
