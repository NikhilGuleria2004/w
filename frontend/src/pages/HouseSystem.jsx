export default function HouseSystem({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>House System</h1>
        <p>See how our house community supports connection, wellbeing, and healthy competition.</p>
      </div>
    </main>
  );
}
