import 'bootstrap/dist/css/bootstrap.min.css';
import GenresTable from './components/GenresTable';
import FilterForm from './components/FilterForm';
import "./theme.css";
import topicsData from "./data/topics.json";
import { useState } from 'react';

function App() {
  const [topicsDataFiltered, setTopicsDataFiltered] = useState(topicsData);

  const handleChangeTopic = (values) => {
    const valuesArr = values.map((v) => v.value);
    if(valuesArr.length == 0){
      setTopicsDataFiltered(topicsData);
      return;
    }

    const result = topicsData.filter((v) => valuesArr.indexOf(v.name) > -1);
    setTopicsDataFiltered(result);
  }

  return (
    <div className="App">
      <FilterForm onChangeTopic={ handleChangeTopic } />
      <GenresTable data={topicsDataFiltered} />
    </div>
  );
}

export default App;