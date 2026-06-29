import { SchemaTypeDefinition } from 'sanity';

// DOCUMENTS
import membershipsType from './membershipsType';
import newsType from './newsType';
import eventType from './eventType';
import tickerType from './tickerType';
import blogType from './blogType';
import testBedType from './testBedType';
import testBed2Type from './testBed2Type';
import instructorsType from './instructorsType';
import weekdayRates from './objects/weekdayRates';
import weekendRates from './objects/weekendRates';
import twilightRates from './objects/twilightRates';
import nonStandardRates from './objects/nonStandardRates';

// OBJECTS
import rawHtml from './objects/rawHtml';
import tableBlock from './objects/tableBlock';
import tickerArray from './objects/tickerArray';
import linkDetails from './objects/linkDetails';

// SECTIONS
import {
  sectionSingleColumn, sectionTwoColumn, sectionOneThirdTwoThirds,
  sectionTwoThirdsOneThird, sectionThreeColumn, sectionFourColumn,
  sectionFeaturesGrid, sectionCtaBanner, sectionStatsNumbers,
  sectionTestimonials, sectionTeamPeople, sectionLogoWall,
  sectionSplitImageText, sectionBigPic, sectionGallery,
  sectionConditionsStatus, sectionStatCallout, sectionStaffProCard,
  sectionEventPromo, sectionLessonPackage,
} from './sections/index';

export const schemaTypes: SchemaTypeDefinition[] = [
  blogType,
  rawHtml,
  newsType,
  eventType,
  tickerArray,
  tickerType,
  linkDetails,
  weekdayRates,
  weekendRates,
  twilightRates,
  nonStandardRates,
  membershipsType,
  testBedType,
  testBed2Type,
  instructorsType,
  tableBlock,
  // Sections
  sectionSingleColumn, sectionTwoColumn, sectionOneThirdTwoThirds,
  sectionTwoThirdsOneThird, sectionThreeColumn, sectionFourColumn,
  sectionFeaturesGrid, sectionCtaBanner, sectionStatsNumbers,
  sectionTestimonials, sectionTeamPeople, sectionLogoWall,
  sectionSplitImageText, sectionBigPic, sectionGallery,
  sectionConditionsStatus, sectionStatCallout, sectionStaffProCard,
  sectionEventPromo, sectionLessonPackage,
];
