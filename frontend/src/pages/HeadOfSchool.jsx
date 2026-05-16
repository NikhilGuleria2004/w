export default function HeadOfSchool({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Head of School</h1>
        <p>Meet the Head of School and discover the leadership vision for our learners.</p>
      </div>
    </main>
  );
}
