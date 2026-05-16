export default function SportsAtSchool({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Sports at School</h1>
        <p>An overview of our competitive teams, facilities, and physical education programme.</p>
      </div>
    </main>
  );
}
