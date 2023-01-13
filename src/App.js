import 'bootstrap/dist/css/bootstrap.min.css';
import GenresTable from './components/GenresTable';
import FilterForm from './components/FilterForm';
import "./theme.css";
import topicsData from "./data/topics.json";
import { useState } from 'react';

function App() {
  const [topicsDataFiltered, setTopicsDataFiltered] = useState(topicsData);
  const [filteredGenres, setFilteredGenres] = useState(["action", "adventure", "rpg", "simulation", "strategy", "casual"]);
  const [filteredAudiences, setFilteredAudiences] = useState(["young", "everyone", "adult"]);

  const handleChangeTopic = (values) => {
    const valuesArr = values.map((v) => v.value);
    if(valuesArr.length === 0){
      setTopicsDataFiltered(topicsData);
      return;
    }

    const result = topicsData.filter((v) => valuesArr.indexOf(v.name) > -1);
    setTopicsDataFiltered(result);
  }

  const handleChangeGenre = (values) => {
    const valuesArr = values.map((v) => v.value);
    setFilteredGenres(valuesArr);
    if(valuesArr.length === 0){
      setTopicsDataFiltered(topicsData);
      return;
    }
    
    const result = topicsData.map((topic, index) => {
      return {
        name: topic.name,
        genres: Object.keys(topicsData[index].genres)
          .filter((genre) => valuesArr.indexOf(genre) > -1)
          .reduce((obj, key) => {
            return Object.assign(obj, { [key]: topic.genres[key] })
          }, {}),
        audience: topicsData[index].audience
      };
    });

    setTopicsDataFiltered(result);
  }
  const handleChangeAudience = (values) => {
    const valuesArr = values.map((v) => v.value);
    setFilteredAudiences(valuesArr);
    if(valuesArr.length === 0){
      setTopicsDataFiltered(topicsData);
      return;
    }
    
    const result = topicsData.map((topic, index) => {
      return {
        name: topic.name,
        audience: Object.keys(topicsData[index].audience)
          .filter((genre) => valuesArr.indexOf(genre) > -1)
          .reduce((obj, key) => {
            return Object.assign(obj, { [key]: topic.audience[key] })
          }, {}),
        genres: topicsData[index].genres
      };
    });

    setTopicsDataFiltered(result);
  }

  return (
    <div className="App">
      <FilterForm onChangeTopic={ handleChangeTopic } onChangeGenre={ handleChangeGenre } onChangeAudience={ handleChangeAudience } />
      <GenresTable data={topicsDataFiltered} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
    </div>
  );
}

export default App;