export default function ApplyNow({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Apply Now</h1>
        <p>Begin your application journey with details on how to join our school.</p>
      </div>
    </main>
  );
}
