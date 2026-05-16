export default function PrimarySchool({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Primary School</h1>
        <p>An introduction to our joyful primary programme for KG through Grade 5.</p>
      </div>
    </main>
  );
}
