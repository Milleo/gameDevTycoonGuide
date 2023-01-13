import 'bootstrap/dist/css/bootstrap.min.css';
import GenresTable from './components/GenresTable';
import FilterFormTopics from './components/FilterFormTopics';
import "./theme.css";
import topicsData from "./data/topics.json";
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PlatformsSection from "./components/PlatformsSection";

function App() {
  const genresDefaultValues = ["action", "adventure", "rpg", "simulation", "strategy", "casual"];
  const audiencesDefaultValues = ["young", "everyone", "adult"];

  
  const [filteredData, setFilteredData] = useState(topicsData);
  const [filteredGenres, setFilteredGenres] = useState(genresDefaultValues);
  const [filteredAudiences, setFilteredAudiences] = useState(audiencesDefaultValues);

  

  const handleChangeTopics = (topics, genres, audiences) => {
    const topicsArr = (topics.length == 0)?[]:topics.map((v) => v.value);
    const genresArr = (genres.length == 0)?genresDefaultValues:genres.map((v) => v.value);
    const audiencesArr = (audiences.length == 0)?audiencesDefaultValues:audiences.map((v) => v.value);
    let result = topicsData;
    
    setFilteredAudiences(audiencesArr);
    setFilteredGenres(genresArr);

    if(topicsArr.length > 0)
      result = topicsData.filter((v) => topicsArr.indexOf(v.name) > -1);

    result = result.map((topic, index) => {
      return {
        name: topic.name,
        genres: Object.keys(topicsData[index].genres)
          .filter((genre) => genresArr.indexOf(genre) > -1)
          .reduce((obj, key) => {
            return Object.assign(obj, { [key]: topic.genres[key] })
          }, {}),
        audience: Object.keys(topicsData[index].audience)
        .filter((genre) => audiencesArr.indexOf(genre) > -1)
        .reduce((obj, key) => {
          return Object.assign(obj, { [key]: topic.audience[key] })
        }, {})
      };
    });

    setFilteredData(result);
  }

  return (
    <div className="App p-3">
      <Tabs defaultAcitveKey="topics">
        <Tab eventKey="topics" title="Topics">
          <FilterFormTopics onChange={ handleChangeTopics }  />
          <GenresTable data={filteredData} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
        </Tab>
        <Tab eventKey="platforms" title="Platforms">
          <PlatformsSection />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;