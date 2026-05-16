export default function Facilities({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Facilities</h1>
        <p>Learn about our campus facilities, sports spaces, and specialised learning environments.</p>
      </div>
    </main>
  );
}
