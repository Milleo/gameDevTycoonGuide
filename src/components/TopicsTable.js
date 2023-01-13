import { Table } from "react-bootstrap";
import { convertNumberToSymbols } from "../utils";

const TopicsTable = (props) => {
    const { data, filteredGenres, filteredAudiences } = props;
    const genreColumns = [
        { value: "action", label: "Action" },
        { value: "adventure", label: "Adventure" },
        { value: "rpg", label: "RPG" },
        { value: "simulation", label: "Simulation" },
        { value: "strategy", label: "Strategy" },
        { value: "casual", label: "Casual" }
    ];
    const audienceColumns = [
        { value: "young", label: "Y" },
        { value: "everyone", label: "E" },
        { value: "adult", label: "A" },
    ]

    let genreFilteredColumns = genreColumns;
    if(filteredGenres.length > 0){
        genreFilteredColumns = genreFilteredColumns.filter((col) => {
            if(filteredGenres.indexOf(col.value) > -1){
                return col;
            }
        });
    }

    let audienceFilteredColumns = audienceColumns;
    if(filteredAudiences.length > 0){
        audienceFilteredColumns = audienceFilteredColumns.filter((col) => {
            if(filteredAudiences.indexOf(col.value) > -1){
                return col;
            }
        });
    }
    
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th rowSpan={2}>Topic</th>
                <th colSpan={genreFilteredColumns.length}>Genres</th>
                <th colSpan={audienceFilteredColumns.length}>Audiences</th>
            </tr>
            <tr>
                { genreFilteredColumns.map((column) => {
                    return <th key={column.value}>{column.label}</th>;
                })}
                { audienceFilteredColumns.map((column) => {
                    return <th key={column.value}>{column.label}</th>;
                })}
            </tr>
        </thead>
        <tbody>
        { data.map((topic) => {
            return <tr key={topic.name}>
                <td>{ topic.name }</td>
                { Object.keys(topic.genres).map((genre) => { return <td  key={`topic.name_${genre}`} className={`value${topic.genres[genre]}`}>
                        { convertNumberToSymbols(topic.genres[genre]) }
                    </td>
                })}
                { Object.keys(topic.audience).map((aud) => { return <td key={`topic.name_${aud}`} className={`value${topic.audience[aud]}`}>
                    { convertNumberToSymbols(topic.audience[aud]) }
                    </td>
                })}
            </tr>
        }) }
        </tbody>
    </Table>
}

export default TopicsTable;