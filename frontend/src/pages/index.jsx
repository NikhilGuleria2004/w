import Discover from '../Discover.jsx';
import Learning from './Learning.jsx';
import Admissions from './Admissions.jsx';
import BeyondLearning from './BeyondLearning.jsx';
import Boarding from './Boarding.jsx';
import Facilities from './Facilities.jsx';
import Enquire from './Enquire.jsx';
import ParentPortal from './ParentPortal.jsx';

const createDiscoverSection = (section) => (props) => (
  <Discover {...props} initialSection={section} />
);

const createBeyondLearningSection = (section) => (props) => (
  <BeyondLearning {...props} initialSection={section} />
);

export const PAGE_COMPONENTS = {
  Discover,
  Overview: createDiscoverSection('Overview'),
  'School Heritage': createDiscoverSection('School Heritage'),
  'Head of School': createDiscoverSection('Head of School'),
  'The Journey': createDiscoverSection('The Journey'),
  'Family of Schools': createDiscoverSection('Family of Schools'),

  Learning,
  Admissions,

  'Beyond Learning': BeyondLearning,
  'Holistic Education': createBeyondLearningSection('Holistic Education'),
  'Co-Curricular Activities': createBeyondLearningSection('Co-Curricular Activities'),
  'Sports at School': createBeyondLearningSection('Sports at School'),

  Boarding,
  Facilities,
  ParentPortal,
  Enquire
};