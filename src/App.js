import 'bootstrap/dist/css/bootstrap.min.css';
import GenresTable from './components/GenresTable';
import FilterFormTopics from './components/FilterFormTopics';
import FilterFormPlatform from './components/FilterFormPlatform';
import "./theme.css";
import topicsData from "./data/topics.json";
import platformsData from "./data/platforms.json";
import { useState } from 'react';
import PlatformsTable from './components/PlatformsTable';

function App() {
  const genresDefaultValues = ["action", "adventure", "rpg", "simulation", "strategy", "casual"];
  const audiencesDefaultValues = ["young", "everyone", "adult"];

  const [filteredPlatforms, setFilteredPlatforms] = useState(platformsData);
  const [filteredData, setFilteredData] = useState(topicsData);
  const [filteredGenres, setFilteredGenres] = useState(genresDefaultValues);
  const [filteredAudiences, setFilteredAudiences] = useState(audiencesDefaultValues);

  const handleChangePlatforms = (platforms, genres, audiences) => {
    const platformArr = (platforms.length == 0)?[]:platforms.map((v) => v.value);
    const genresArr = (genres.length == 0)?genresDefaultValues:genres.map((v) => v.value);
    const audiencesArr = (audiences.length == 0)?audiencesDefaultValues:audiences.map((v) => v.value);
    let result = platformsData;
    
    setFilteredAudiences(audiencesArr);
    setFilteredGenres(genresArr);

    if(platformArr.length > 0)
      result = platformsData.filter((v) => platformArr.indexOf(v.name) > -1);

    result = result.map((platform, index) => {
      return {
        name: platform.name,
        genres: Object.keys(platformsData[index].genres)
          .filter((genre) => genresArr.indexOf(genre) > -1)
          .reduce((obj, key) => {
            return Object.assign(obj, { [key]: platform.genres[key] })
          }, {}),
        audience: Object.keys(platformsData[index].audience)
        .filter((genre) => audiencesArr.indexOf(genre) > -1)
        .reduce((obj, key) => {
          return Object.assign(obj, { [key]: platform.audience[key] })
        }, {})
      };
    });

    setFilteredPlatforms(result);
  }

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
    <div className="App">
      <FilterFormTopics onChange={ handleChangeTopics }  />
      <GenresTable data={filteredData} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
      <FilterFormPlatform onChange={ handleChangePlatforms }  />
      <PlatformsTable data={filteredPlatforms} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
    </div>
  );
}

export default App;