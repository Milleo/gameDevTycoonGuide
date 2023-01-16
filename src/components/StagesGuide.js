import { Card, Table } from "react-bootstrap"

const StagesGuide = () => {
    const data = [
        { name: "Action", grades: [4, 3, 1, 0, 3, 4, 2, 4, 3] },
        { name: "Adventure", grades: [1, 2, 4, 4, 2, 1, 4, 3, 2] },
        { name: "RPG", grades: [1, 3, 4, 4, 3, 2, 4, 3, 2] },
        { name: "Simulation", grades: [3, 4, 2, 1, 3, 4, 2, 4, 3] },
        { name: "Strategy", grades: [3, 4, 2, 1, 4, 3, 4, 2, 3] },
        { name: "Casual", grades: [0, 4, 1, 1, 4, 0, 1, 4, 3] },
    ];
    const convertValuesToSymbols = (val) => {
        if(val === 2) return "~";
        if(val > 2){
            return "+".repeat(val - 1)
        }else{
            return "-".repeat(3 - val)
        }
    }

    return <Card className="mb-3">
        <Card.Header>Stages of development</Card.Header>
        <Card.Body>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th rowSpan={2}>Genre</th>
                        <th colSpan={3}>Stage 1</th>
                        <th colSpan={3}>Stage 2</th>
                        <th colSpan={3}>Stage 3</th>
                    </tr>
                    <tr>
                        <th>Engine</th>
                        <th>Gameplay</th>
                        <th>Story/Quests</th>
                        <th>Dialogues</th>
                        <th>Level Design</th>
                        <th>AI</th>
                        <th>World Design</th>
                        <th>Graphics</th>
                        <th>Sound</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((d) => {
                        return <tr key={d.name}>
                            <td>{d.name}</td>
                            { d.grades.map((g,i) => {
                                return <td key={`${d.name}_${g}_${i}`} className={`value${g}`}>{convertValuesToSymbols(g)}</td>;
                            })}
                        </tr>
                    })}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
}

export default StagesGuide;