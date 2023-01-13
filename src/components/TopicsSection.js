import TopicsTable from './TopicsTable';
import FilterFormTopics from './FilterFormTopics';
import topicsData from "../data/topics.json";
import { Fragment, useState } from 'react';

const TopicsSection = () => {
    const genresDefaultValues = ["action", "adventure", "rpg", "simulation", "strategy", "casual"];
    const audiencesDefaultValues = ["young", "everyone", "adult"];

    
    const [filteredData, setFilteredData] = useState(topicsData);
    const [filteredGenres, setFilteredGenres] = useState(genresDefaultValues);
    const [filteredAudiences, setFilteredAudiences] = useState(audiencesDefaultValues);

    

    const handleChangeTopics = (topics, genres, audiences) => {
        const topicsArr = (topics.length === 0)?[]:topics.map((v) => v.value);
        const genresArr = (genres.length === 0)?genresDefaultValues:genres.map((v) => v.value);
        const audiencesArr = (audiences.length === 0)?audiencesDefaultValues:audiences.map((v) => v.value);
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
    
    return <Fragment>
        <FilterFormTopics onChange={ handleChangeTopics }  />
        <TopicsTable data={filteredData} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
    </Fragment>
}

export default TopicsSection;