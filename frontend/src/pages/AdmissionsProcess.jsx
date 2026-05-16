export default function AdmissionsProcess({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Admissions Process</h1>
        <p>A step-by-step guide to the application, assessment, and enrolment journey.</p>
      </div>
    </main>
  );
}
