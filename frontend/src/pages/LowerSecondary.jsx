export default function LowerSecondary({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Lower Secondary</h1>
        <p>Find out how Grades 6-8 build knowledge, character, and confidence.</p>
      </div>
    </main>
  );
}
