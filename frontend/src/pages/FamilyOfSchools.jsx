export default function FamilyOfSchools({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Family of Schools</h1>
        <p>Discover our network of schools and the shared values that connect them.</p>
      </div>
    </main>
  );
}
