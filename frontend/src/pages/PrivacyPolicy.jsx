export default function PrivacyPolicy({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Privacy Policy</h1>
        <p>Read the school privacy policy and how we protect your personal data.</p>
      </div>
    </main>
  );
}
