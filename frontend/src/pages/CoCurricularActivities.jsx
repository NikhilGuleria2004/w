export default function CoCurricularActivities({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Co-Curricular Activities</h1>
        <p>Clubs, arts, and leadership opportunities that extend learning beyond the classroom.</p>
      </div>
    </main>
  );
}
