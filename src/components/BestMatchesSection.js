import FilterFormMatches from "./FilterFormMatches"
import topicsData from "../data/topics.json";
import platformsData from "../data/platforms.json";
import { Fragment, useState } from "react";
import TopicsTable from "./TopicsTable";

const BestMatchesSection = () => {
    const genresDefaultValues = ["action", "adventure", "rpg", "simulation", "strategy", "casual"];
    const [filteredGenres, setFilteredGenres] = useState(genresDefaultValues);
    const [filteredData, setFilteredData] = useState(topicsData);
    const [filteredAudiences, setFilteredAudiences] = useState([]);

    const handleChange = (platforms, topics, hasAudience) => {
        const platformsArr = platforms.map((p) => p.value);
        const topicsArr = topics.map((t) => t.value);
        
        /* If there's no audience research then show just the result for everyone */
        const audiencesArr = hasAudience?["young", "everyone", "adult"]:["everyone"];
        const bestGenres = [];
        let result = topicsData;

        if(topicsArr.length > 0)
            result = topicsData.filter((v) => topicsArr.indexOf(v.name) > -1);

        if(platformsArr.length > 0){
            let platformObjs = platformsData.filter((p) => platformsArr.indexOf(p.name) > -1);
            platformObjs.forEach((p) => {
                Object.keys(p.genres).forEach((genreKey) => {
                    const val = p.genres[genreKey];
                    if(val === 4){
                        bestGenres.push(genreKey);
                    }
                });
            });
        }else{
            Object.keys(platformsData[0].genres).map((genre) => bestGenres.push(genre));
        }
        
        /* Filtering by audience an removing genres not filtered */
        result = result.map((topic, index) => {
            return {
                name: topic.name,
                genres: Object.keys(result[index].genres)
                .filter((genre) => bestGenres.indexOf(genre) > -1)
                .reduce((obj, key) => {
                    return Object.assign(obj, { [key]: topic.genres[key] })
                }, {}),
                audience: Object.keys(result[index].audience)
                .filter((aud) => audiencesArr.indexOf(aud) > -1)
                .reduce((obj, key) => {
                return Object.assign(obj, { [key]: topic.audience[key] })
                }, {})
            };
        });

        /* Removing any Topic that has less than 4 of score */
        result = result.filter((r) => {
            return Object.values(r.genres).some((v) => v === 4)
        });

        /* Sorting by the sum of all the scores */
        if(platformsArr.length > 0 || topicsArr.length > 0){
            result.sort((a, b) => {
                const sumA = Object.values(a.genres).reduce((sum, val) => sum + val, 0) + Object.values(a.audience).reduce((sum, val) => sum + val, 0);
                const sumB = Object.values(b.genres).reduce((sum, val) => sum + val, 0) + Object.values(b.audience).reduce((sum, val) => sum + val, 0);
                if(sumA < sumB) return 1;
                if(sumA > sumB) return -1;
                return 0;
            })
        }

        setFilteredData(result);
        setFilteredGenres(bestGenres);
        setFilteredAudiences(audiencesArr);
            
    }

    return <Fragment>
        <FilterFormMatches onChange={ handleChange } />
        <TopicsTable data={filteredData} filteredAudiences={filteredAudiences} filteredGenres={filteredGenres} />
    </Fragment>
}

export default BestMatchesSection;