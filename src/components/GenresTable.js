import { Table } from "react-bootstrap";
import { convertNumberToSymbols } from "../utils";

const GenresTable = (props) => {
    const { data } = props;
    return <Table striped bordered hover>
        <thead>
            <tr>
                <th rowSpan={2}>Topic</th>
                <th colSpan={6}>Genres</th>
                <th colSpan={3}>Audiences</th>
            </tr>
            <tr>
                <th>Action</th>
                <th>Adventure</th>
                <th>RPG</th>
                <th>Simulation</th>
                <th>Strategy</th>
                <th>Casual</th>
                <th>Y</th>
                <th>E</th>
                <th>M</th>
            </tr>
        </thead>
        <tbody>
        { data.map((topic) => {
            return <tr>
                <td>{ topic.name }</td>
                { Object.keys(topic.genres).map((genre) => { return <td className={`value${topic.genres[genre]}`}>
                        { convertNumberToSymbols(topic.genres[genre]) }
                    </td>
                })}
                { Object.keys(topic.audience).map((aud) => { return <td className={`value${topic.audience[aud]}`}>
                    { convertNumberToSymbols(topic.audience[aud]) }
                    </td>
                })}
            </tr>
        }) }
        </tbody>
    </Table>
}

export default GenresTable;