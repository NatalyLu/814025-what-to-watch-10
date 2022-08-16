import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import {filmTabs} from '../../const';

type TabsProps = {
  activeType: string;
}

function Tabs(props: TabsProps): JSX.Element {
  const {activeType} = props;
  const [OVERVIEW, DETAILS, REVIEWS] = filmTabs;

  const getComponentByType = (type: string): (JSX.Element | null) => {
    switch (type) {
      case OVERVIEW:
        return <OverviewTab />;
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
