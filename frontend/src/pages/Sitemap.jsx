export default function Sitemap({ onBack }) {
  return (
    <main className="page-view">
      <div className="page-view-inner">
        <button type="button" className="page-view-back" onClick={onBack}>
          ← Back to home
        </button>
        <h1>Sitemap</h1>
        <p>Find a quick overview of the pages and sections available on the site.</p>
      </div>
    </main>
  );
}
