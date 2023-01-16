import { Fragment, useState } from "react";
import PlatformsTable from './PlatformsTable';
import platformsData from "../data/platforms.json";
import FilterFormPlatform from './FilterFormPlatform';

const PlatformsSection = () => {
    const genresDefaultValues = ["action", "adventure", "rpg", "simulation", "strategy", "casual"];
    const audiencesDefaultValues = ["young", "everyone", "adult"];
    const [filteredPlatforms, setFilteredPlatforms] = useState(platformsData);
    const [filteredGenres, setFilteredGenres] = useState(genresDefaultValues);
    const [filteredAudiences, setFilteredAudiences] = useState(audiencesDefaultValues);

    const handleChangePlatforms = ({platforms, genres, audiences}) => {
        const platformArr = (platforms.length === 0)?[]:platforms.map((v) => v.value);
        const genresArr = (genres.length === 0)?genresDefaultValues:genres.map((v) => v.value);
        const audiencesArr = (audiences.length === 0)?audiencesDefaultValues:audiences.map((v) => v.value);
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

    return <Fragment>
        <FilterFormPlatform onChange={ handleChangePlatforms }  />
        <PlatformsTable data={filteredPlatforms} filteredGenres={ filteredGenres } filteredAudiences={ filteredAudiences } />
    </Fragment>
}

export default PlatformsSection;