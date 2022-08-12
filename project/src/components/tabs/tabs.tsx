import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import {FilmTabs} from '../../const';
import {Review} from '../../types/types';

type TabsProps = {
  activeType: string;
  review: Review;
}

function Tabs(props: TabsProps): JSX.Element {
  const {activeType, review} = props;
  const [OVERVIEW, DETAILS, REVIEWS] = FilmTabs;

  const getComponentByType = (type: string): (JSX.Element | null) => {
    switch (type) {
      case OVERVIEW:
        return <OverviewTab review={review} />;
      case DETAILS:
        return <DetailsTab />;
      case REVIEWS:
        return <ReviewsTab />;
      default:
        return null;
    }
  };
  return(
    <>
      {getComponentByType(activeType)}
    </>
  );
}

export default Tabs;
