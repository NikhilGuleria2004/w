export default function ContactUs({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Contact Us</h1>
        <p>Ways to reach our admissions team and connect with the school.</p>
      </div>
    </main>
  );
}
