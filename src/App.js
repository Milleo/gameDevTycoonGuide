import 'bootstrap/dist/css/bootstrap.min.css';
import "./theme.css";
import { Tab, Tabs } from 'react-bootstrap';
import PlatformsSection from "./components/PlatformsSection";
import TopicsSection from "./components/TopicsSection";
import BestMatchesSection from "./components/BestMatchesSection";

function App() {
  return (
    <div className="App p-3">
      <Tabs defaultacitvekey="best">
        <Tab eventKey="best" title="Find best matches">
          <BestMatchesSection />
        </Tab>
        <Tab eventKey="topics" title="Topics">
          <TopicsSection />
        </Tab>
        <Tab eventKey="platforms" title="Platforms">
          <PlatformsSection />
        </Tab>
        
      </Tabs>
    </div>
  );
}

export default App;