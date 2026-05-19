import { useEffect, useState } from 'react';
import School, {Navbar, Footer} from './school';
import { PAGE_COMPONENTS } from './pages';

const normalizePath = (path) => {
  const cleaned = (path || '/').replace(/\/+$|\/+(?=\?)/g, '');
  return cleaned === '' ? '/' : cleaned.toLowerCase();
};

const ROUTES = {
  '/discover': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Overview' }, title: 'Discover' },
  '/discover/overview': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Overview' }, title: 'Discover' },
  '/discover/school-heritage': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'School Heritage' }, title: 'School Heritage' },
  '/discover/head-of-school': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Head of School' }, title: 'Head of School' },
  '/discover/the-journey': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'The Journey' }, title: 'The Journey' },
  '/discover/family-of-schools': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Family of Schools' }, title: 'Family of Schools' },

  '/learning': { component: PAGE_COMPONENTS.Learning, title: 'Learning' },
  '/learning/primary-school': { component: PAGE_COMPONENTS['Primary School'], title: 'Primary School' },
  '/learning/lower-secondary': { component: PAGE_COMPONENTS['Lower Secondary'], title: 'Lower Secondary' },
  '/learning/upper-secondary': { component: PAGE_COMPONENTS['Upper Secondary'], title: 'Upper Secondary' },
  '/learning/sixth-form': { component: PAGE_COMPONENTS['Sixth Form'], title: 'Sixth Form' },

  '/admissions': { component: PAGE_COMPONENTS.Admissions, title: 'Admissions' },
  '/admissions/overview': { component: PAGE_COMPONENTS.Admissions, title: 'Admissions' },
  '/admissions/admissions-process': { component: PAGE_COMPONENTS['Admissions Process'], title: 'Admissions Process' },
  '/admissions/term-dates': { component: PAGE_COMPONENTS['Term Dates'], title: 'Term Dates' },
  '/admissions/faqs': { component: PAGE_COMPONENTS.FAQs, title: 'FAQs' },
  '/admissions/fees': { component: PAGE_COMPONENTS.Fees, title: 'Fees' },

  '/beyond-learning': { component: PAGE_COMPONENTS['Beyond Learning'], title: 'Beyond Learning' },
  '/beyond-learning/holistic-education': { component: PAGE_COMPONENTS['Holistic Education'], title: 'Holistic Education' },
  '/beyond-learning/co-curricular-activities': { component: PAGE_COMPONENTS['Co-Curricular Activities'], title: 'Co-Curricular Activities' },
  '/beyond-learning/sports-at-school': { component: PAGE_COMPONENTS['Sports at School'], title: 'Sports at School' },

  '/boarding': { component: PAGE_COMPONENTS.Boarding, title: 'Boarding' },
  '/boarding/overview': { component: PAGE_COMPONENTS.Boarding, title: 'Boarding' },
  '/boarding/house-system': { component: PAGE_COMPONENTS['House System'], title: 'House System' },
  '/boarding/pastoral-care': { component: PAGE_COMPONENTS['Pastoral Care'], title: 'Pastoral Care' },
  '/boarding/boarding-life': { component: PAGE_COMPONENTS['Boarding Life'], title: 'Boarding Life' },

  '/facilities': { component: PAGE_COMPONENTS.Facilities, title: 'Facilities' },
  '/privacy-policy': { component: PAGE_COMPONENTS['Privacy Policy'], title: 'Privacy Policy' },
  '/terms-and-conditions': { component: PAGE_COMPONENTS['Terms & Conditions'], title: 'Terms & Conditions' },
  '/sitemap': { component: PAGE_COMPONENTS.Sitemap, title: 'Sitemap' },

  '/enquire': { component: PAGE_COMPONENTS.Enquire, title: 'Enquire Now' },
};

const SITE_NAME = 'School of Excellence';

function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const route = ROUTES[pathname];
    document.title = route?.title
      ? `${route.title} — ${SITE_NAME}`
      : SITE_NAME;
  }, [pathname]);

  const route = ROUTES[pathname] ?? null;
  const ActivePage = route?.component ?? null;

  const navigate = (path) => {
    const nextPath = normalizePath(path);
    if (nextPath !== pathname) {
      window.history.pushState({}, '', nextPath);
      setPathname(nextPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onNavigate={navigate} pathname={pathname} />
      <div key={pathname} className="page-fade-in">
        {ActivePage ? (
          <ActivePage onBack={() => navigate('/')} {...route.props} />
        ) : (
          <School onNavigate={navigate} />
        )}
      </div>
      <Footer onNavigate={navigate} />

      <a
        href="https://wa.me/919220443344"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" width="28" height="28">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.77L0 32l8.489-2.001A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.267 13.267 0 01-6.756-1.843l-.484-.287-5.04 1.188 1.274-4.91-.316-.504A13.222 13.222 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.273-9.878c-.398-.2-2.355-1.163-2.72-1.295-.365-.133-.63-.2-.896.2-.265.398-1.029 1.295-1.261 1.56-.232.266-.465.3-.863.1-.398-.2-1.681-.619-3.2-1.976-1.183-1.055-1.981-2.358-2.213-2.756-.232-.398-.025-.613.174-.811.18-.178.398-.465.597-.697.2-.232.266-.398.398-.664.133-.265.067-.498-.033-.697-.1-.2-.896-2.158-1.228-2.955-.323-.775-.65-.67-.896-.682l-.763-.013c-.266 0-.697.1-1.063.498-.365.398-1.394 1.362-1.394 3.32 0 1.958 1.427 3.85 1.626 4.116.2.266 2.808 4.287 6.804 6.013.951.41 1.693.655 2.272.838.954.303 1.823.26 2.51.158.766-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.1-.166-.365-.266-.763-.465z"/>
        </svg>
      </a>
    </>
  );
}

export default App;
