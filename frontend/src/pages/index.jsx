import Discover from '../Discover.jsx';
import Overview from './Overview.jsx';
import SchoolHeritage from './SchoolHeritage.jsx';
import HeadOfSchool from './HeadOfSchool.jsx';
import TheJourney from './TheJourney.jsx';
import FamilyOfSchools from './FamilyOfSchools.jsx';
import Learning from './Learning.jsx';
import PrimarySchool from './PrimarySchool.jsx';
import LowerSecondary from './LowerSecondary.jsx';
import UpperSecondary from './UpperSecondary.jsx';
import SixthForm from './SixthForm.jsx';
import Admissions from './Admissions.jsx';
import AdmissionsProcess from './AdmissionsProcess.jsx';
import TermDates from './TermDates.jsx';
import FAQs from './FAQs.jsx';
import Fees from './Fees.jsx';
import BeyondLearning from './BeyondLearning.jsx';
import HolisticEducation from './HolisticEducation.jsx';
import CoCurricularActivities from './CoCurricularActivities.jsx';
import SportsAtSchool from './SportsAtSchool.jsx';
import Boarding from './Boarding.jsx';
import HouseSystem from './HouseSystem.jsx';
import PastoralCare from './PastoralCare.jsx';
import BoardingLife from './BoardingLife.jsx';
import Facilities from './Facilities.jsx';
import ApplyNow from './ApplyNow.jsx';
import Process from './Process.jsx';
import ContactUs from './ContactUs.jsx';
import Careers from './Careers.jsx';
import VirtualTour from './VirtualTour.jsx';
import ParentLogin from './ParentLogin.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import Sitemap from './Sitemap.jsx';
import Enquire from './Enquire.jsx';

const createDiscoverSection = (section) => (props) => <Discover {...props} initialSection={section} />;

export const PAGE_COMPONENTS = {
  Discover,
  Overview: createDiscoverSection('Overview'),
  'School Heritage': createDiscoverSection('School Heritage'),
  'Head of School': createDiscoverSection('Head of School'),
  'The Journey': createDiscoverSection('The Journey'),
  'Family of Schools': createDiscoverSection('Family of Schools'),
  Learning,
  'Primary School': PrimarySchool,
  'Lower Secondary': LowerSecondary,
  'Upper Secondary': UpperSecondary,
  'Sixth Form': SixthForm,
  Admissions,
  'Admissions Process': AdmissionsProcess,
  'Term Dates': TermDates,
  FAQs,
  Fees,
  'Beyond Learning': BeyondLearning,
  'Holistic Education': HolisticEducation,
  'Co-Curricular Activities': CoCurricularActivities,
  'Sports at School': SportsAtSchool,
  Boarding,
  'House System': HouseSystem,
  'Pastoral Care': PastoralCare,
  'Boarding Life': BoardingLife,
  Facilities,
  'Apply Now': ApplyNow,
  Process,
  'Contact Us': ContactUs,
  Careers,
  'Virtual Tour': VirtualTour,
  'Parent Login': ParentLogin,
  'Privacy Policy': PrivacyPolicy,
  'Terms & Conditions': TermsAndConditions,
  Sitemap,
  Enquire
};
