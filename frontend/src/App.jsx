import { useEffect, useState } from 'react';
import School from './school';
import { PAGE_COMPONENTS } from './pages';
import Learning from './Learning';

const normalizePath = (path) => {
  const cleaned = (path || '/').replace(/\/+$|\/+(?=\?)/g, '');
  return cleaned === '' ? '/' : cleaned.toLowerCase();
};

const ROUTES = {
  '/discover': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Overview' } },
  '/discover/overview': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Overview' } },
  '/discover/school-heritage': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'School Heritage' } },
  '/discover/head-of-school': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Head of School' } },
  '/discover/the-journey': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'The Journey' } },
  '/discover/family-of-schools': { component: PAGE_COMPONENTS.Discover, props: { initialSection: 'Family of Schools' } },

  '/learning': { component: PAGE_COMPONENTS.Learning },
  '/learning/primary-school': { component: PAGE_COMPONENTS['Primary School'] },
  '/learning/lower-secondary': { component: PAGE_COMPONENTS['Lower Secondary'] },
  '/learning/upper-secondary': { component: PAGE_COMPONENTS['Upper Secondary'] },
  '/learning/sixth-form': { component: PAGE_COMPONENTS['Sixth Form'] },

  '/admissions': { component: PAGE_COMPONENTS.Admissions },
  '/admissions/overview': { component: PAGE_COMPONENTS.Admissions },
  '/admissions/admissions-process': { component: PAGE_COMPONENTS['Admissions Process'] },
  '/admissions/term-dates': { component: PAGE_COMPONENTS['Term Dates'] },
  '/admissions/faqs': { component: PAGE_COMPONENTS.FAQs },
  '/admissions/fees': { component: PAGE_COMPONENTS.Fees },

  '/beyond-learning': { component: PAGE_COMPONENTS['Beyond Learning'] },
  '/beyond-learning/holistic-education': { component: PAGE_COMPONENTS['Holistic Education'] },
  '/beyond-learning/co-curricular-activities': { component: PAGE_COMPONENTS['Co-Curricular Activities'] },
  '/beyond-learning/sports-at-school': { component: PAGE_COMPONENTS['Sports at School'] },

  '/boarding': { component: PAGE_COMPONENTS.Boarding },
  '/boarding/overview': { component: PAGE_COMPONENTS.Boarding },
  '/boarding/house-system': { component: PAGE_COMPONENTS['House System'] },
  '/boarding/pastoral-care': { component: PAGE_COMPONENTS['Pastoral Care'] },
  '/boarding/boarding-life': { component: PAGE_COMPONENTS['Boarding Life'] },

  '/facilities': { component: PAGE_COMPONENTS.Facilities },
  '/privacy-policy': { component: PAGE_COMPONENTS['Privacy Policy'] },
  '/terms-and-conditions': { component: PAGE_COMPONENTS['Terms & Conditions'] },
  '/sitemap': { component: PAGE_COMPONENTS.Sitemap },
};

function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const route = ROUTES[pathname] ?? null;
  const ActivePage = route?.component ?? null;

  const navigate = (path) => {
    const nextPath = normalizePath(path);
    if (nextPath !== pathname) {
      window.history.pushState({}, '', nextPath);
      setPathname(nextPath);
    }
  };

  return (


    <>
      {ActivePage ? (
        <ActivePage onBack={() => navigate('/')} {...route.props} />
      ) : (
        <School onNavigate={navigate} />
      )}
    </>
  );
}

export default App;
