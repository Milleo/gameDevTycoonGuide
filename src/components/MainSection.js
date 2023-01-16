import { Tab, Tabs } from 'react-bootstrap';
import PlatformsSection from "./PlatformsSection";
import TopicsSection from "./TopicsSection";
import BestMatchesSection from "./BestMatchesSection";
import { useIntl } from 'react-intl';

const MainSection = () => {
    const t = useIntl().formatMessage;
    return <Tabs defaultacitvekey="best">
        <Tab eventKey="best" title={t({ id: "tabs.best"})}>
            <BestMatchesSection />
        </Tab>
        <Tab eventKey="topics" title={t({ id: "topics"})}>
            <TopicsSection />
        </Tab>
        <Tab eventKey="platforms" title={t({ id: "platforms"})}>
            <PlatformsSection />
        </Tab>
    </Tabs>
}

export default MainSection;