export default function VirtualTour({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Virtual Tour</h1>
        <p>Take a digital tour of the campus, classrooms, and campus life.</p>
      </div>
    </main>
  );
}
