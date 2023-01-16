import { Table } from "react-bootstrap";
import { useIntl } from "react-intl";
import { convertNumberToSymbols } from "../utils";

const PlatformsTable = (props) => {
    const { data, filteredGenres, filteredAudiences } = props;
    const t = useIntl().formatMessage
    const genreColumns = [
        { value: "action", label: t({ id: "genres.action"}) },
        { value: "adventure", label: t({ id: "genres.adventure"}) },
        { value: "rpg", label: t({ id: "genres.rpg"}) },
        { value: "simulation", label: t({ id: "genres.simulation"}) },
        { value: "strategy", label: t({ id: "genres.strategy"}) },
        { value: "casual", label: t({ id: "genres.casual"}) }
    ];
    const audienceColumns = [
        { value: "young", label: t({ id: "audienceLabels.young" }) },
        { value: "everyone", label: t({ id: "audienceLabels.everyone" }) },
        { value: "adult", label: t({ id: "audienceLabels.adult" }) },
    ]

    let genreFilteredColumns = genreColumns;
    if(filteredGenres.length > 0){
        genreFilteredColumns = genreFilteredColumns.filter((col) => {
            if(filteredGenres.indexOf(col.value) > -1){
                return col;
            }
            return null;
        });
    }

    let audienceFilteredColumns = audienceColumns;
    if(filteredAudiences.length > 0){
        audienceFilteredColumns = audienceFilteredColumns.filter((col) => {
            if(filteredAudiences.indexOf(col.value) > -1){
                return col;
            }
            return null;
        });
    }
    
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th rowSpan={2}>{ t({id: "platform" })}</th>
                <th colSpan={genreFilteredColumns.length}>{ t({id: "genres" })}</th>
                <th colSpan={audienceFilteredColumns.length}>{ t({id: "audiences" })}</th>
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

export default PlatformsTable;