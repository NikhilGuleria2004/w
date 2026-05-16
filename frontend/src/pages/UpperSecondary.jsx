export default function UpperSecondary({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Upper Secondary</h1>
        <p>Explore our rigorous programme for Grades 9-10 and academic growth.</p>
      </div>
    </main>
  );
}
