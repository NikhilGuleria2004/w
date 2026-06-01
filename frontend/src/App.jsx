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
  '/beyond-learning/holistic-education': { component: PAGE_COMPONENTS['Holistic Education'], props: { initialSection: 'Holistic Education' }, title: 'Holistic Education' },
  '/beyond-learning/co-curricular-activities': { component: PAGE_COMPONENTS['Co-Curricular Activities'], props: { initialSection: 'Co-Curricular Activities' }, title: 'Co-Curricular Activities' },
  '/beyond-learning/sports-at-school': { component: PAGE_COMPONENTS['Sports at School'], props: { initialSection: 'Sports at School' }, title: 'Sports at School' },

  '/boarding': { component: PAGE_COMPONENTS.Boarding, title: 'Boarding' },
  '/boarding/overview': { component: PAGE_COMPONENTS.Boarding, title: 'Boarding' },
  '/boarding/house-system': { component: PAGE_COMPONENTS['House System'], title: 'House System' },
  '/boarding/pastoral-care': { component: PAGE_COMPONENTS['Pastoral Care'], title: 'Pastoral Care' },
  '/boarding/boarding-life': { component: PAGE_COMPONENTS['Boarding Life'], title: 'Boarding Life' },

  '/facilities': { component: PAGE_COMPONENTS.Facilities, title: 'Facilities' },
  '/privacy-policy': { component: PAGE_COMPONENTS['Privacy Policy'], title: 'Privacy Policy' },
  '/terms-and-conditions': { component: PAGE_COMPONENTS['Terms & Conditions'], title: 'Terms & Conditions' },
  '/sitemap': { component: PAGE_COMPONENTS.Sitemap, title: 'Sitemap' },
  '/parent-portal': { component: PAGE_COMPONENTS.ParentPortal, title: 'Parent Portal' },

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

  const hideNavbarRoutes = ['/parent-portal'];
  const showNavbar = !hideNavbarRoutes.includes(pathname);
  return (
  <>
    {showNavbar && (
      <Navbar onNavigate={navigate} pathname={pathname} />
    )}

    <div key={pathname} className="page-fade-in">
      {ActivePage ? (
        <ActivePage onBack={() => navigate('/')} {...route.props} />
      ) : (
        <School onNavigate={navigate} />
      )}
    </div>

    <Footer onNavigate={navigate} />
  </>
);
}

export default App;
