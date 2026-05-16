export default function Discover({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Discover</h1>
        <p>Explore our school story, values, and what makes our community unique.</p>
      </div>
    </main>
  );
}
