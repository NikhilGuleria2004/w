export default function ParentLogin({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Parent Login</h1>
        <p>Access the parent portal for school updates, reports, and messaging.</p>
      </div>
    </main>
  );
}
