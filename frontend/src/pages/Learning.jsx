export default function Learning({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Learning</h1>
        <p>See how our curriculum, teaching, and student support work together to create success.</p>
      </div>
    </main>
  );
}
