import SingleColumn from './layouts/SingleColumn'
import TwoColumn from './layouts/TwoColumn'
import OneThirdTwoThirds from './layouts/OneThirdTwoThirds'
import TwoThirdsOneThird from './layouts/TwoThirdsOneThird'
import ThreeColumn from './layouts/ThreeColumn'
import FourColumn from './layouts/FourColumn'
import FeaturesGrid from './blocks/FeaturesGrid'
import CtaBanner from './blocks/CtaBanner'
import StatsNumbers from './blocks/StatsNumbers'
import Testimonials from './blocks/Testimonials'
import TeamPeople from './blocks/TeamPeople'
import LogoWall from './blocks/LogoWall'
import SplitImageText from './blocks/SplitImageText'
import BigPicSection from './blocks/BigPicSection'
import Gallery from './blocks/Gallery'
import ConditionsStatus from './blocks/ConditionsStatus'
import StatCallout from './blocks/StatCallout'
import StaffProCard from './blocks/StaffProCard'
import EventPromo from './blocks/EventPromo'
import LessonPackage from './blocks/LessonPackage'

const SECTION_MAP = {
  sectionSingleColumn:      SingleColumn,
  sectionTwoColumn:         TwoColumn,
  sectionOneThirdTwoThirds: OneThirdTwoThirds,
  sectionTwoThirdsOneThird: TwoThirdsOneThird,
  sectionThreeColumn:       ThreeColumn,
  sectionFourColumn:        FourColumn,
  sectionFeaturesGrid:      FeaturesGrid,
  sectionCtaBanner:         CtaBanner,
  sectionStatsNumbers:      StatsNumbers,
  sectionTestimonials:      Testimonials,
  sectionTeamPeople:        TeamPeople,
  sectionLogoWall:          LogoWall,
  sectionSplitImageText:    SplitImageText,
  sectionBigPic:            BigPicSection,
  sectionGallery:           Gallery,
  sectionConditionsStatus:  ConditionsStatus,
  sectionStatCallout:       StatCallout,
  sectionStaffProCard:      StaffProCard,
  sectionEventPromo:        EventPromo,
  sectionLessonPackage:     LessonPackage,
}

export default function SectionRenderer({ sections = [] }) {
  if (!sections?.length) return null
  return (
    <>
      {sections.map((section) => {
        const Component = SECTION_MAP[section._type]
        if (!Component) return null
        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
