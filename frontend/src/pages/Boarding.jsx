export default function Boarding({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Boarding</h1>
        <p>Information about boarding life, pastoral support, and campus living.</p>
      </div>
    </main>
  );
}
