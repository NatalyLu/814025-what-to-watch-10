import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import {filmTabs} from '../../const';
import {Film} from '../../types/types';

type TabsProps = {
  activeType: string;
  film: Film;
}

function Tabs(props: TabsProps): JSX.Element {
  const {activeType, film} = props;
  const [OVERVIEW, DETAILS, REVIEWS] = filmTabs;

  const getComponentByType = (type: string): (JSX.Element | null) => {
    switch (type) {
      case OVERVIEW:
        return <OverviewTab film={film} />;
      case DETAILS:
        return <DetailsTab film={film} />;
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
