export default function HolisticEducation({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Holistic Education</h1>
        <p>How we develop the whole child through academic, social, and emotional learning.</p>
      </div>
    </main>
  );
}
