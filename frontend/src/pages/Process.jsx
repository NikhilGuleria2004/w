export default function Process({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Process</h1>
        <p>Read the steps to complete your application successfully.</p>
      </div>
    </main>
  );
}
