import 'bootstrap/dist/css/bootstrap.min.css';
import GenresTable from './components/GenresTable';
import FilterForm from './components/FilterForm';
import "./theme.css";

function App() {
  return (
    <div className="App">
      <FilterForm />
      <GenresTable />
    </div>
  );
}

export default App;