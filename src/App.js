import 'bootstrap/dist/css/bootstrap.min.css';
import "./theme.css";
import { Tab, Tabs } from 'react-bootstrap';
import PlatformsSection from "./components/PlatformsSection";
import TopicsSection from "./components/TopicsSection";

function App() {
  return (
    <div className="App p-3">
      <Tabs defaultAcitveKey="topics">
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