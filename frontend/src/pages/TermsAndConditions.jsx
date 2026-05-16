export default function TermsAndConditions({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Terms & Conditions</h1>
        <p>Review the terms and conditions for using our website and services.</p>
      </div>
    </main>
  );
}
