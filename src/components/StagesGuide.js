import { Card, Table } from "react-bootstrap"
import { useIntl } from "react-intl";

const StagesGuide = () => {
    const t = useIntl().formatMessage;

    const data = [
        { name: t({ id: "genres.action" }), grades: [4, 3, 1, 0, 3, 4, 2, 4, 3] },
        { name: t({ id: "genres.adventure" }), grades: [1, 2, 4, 4, 2, 1, 4, 3, 2] },
        { name: t({ id: "genres.rpg" }), grades: [1, 3, 4, 4, 3, 2, 4, 3, 2] },
        { name: t({ id: "genres.simulation" }), grades: [3, 4, 2, 1, 3, 4, 2, 4, 3] },
        { name: t({ id: "genres.strategy" }), grades: [3, 4, 2, 1, 4, 3, 4, 2, 3] },
        { name: t({ id: "genres.casual" }), grades: [0, 4, 1, 1, 4, 0, 1, 4, 3] },
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
        <Card.Header>{t({id: "stagesDevelopment"})}</Card.Header>
        <Card.Body>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th rowSpan={2}>{t({id: "genre" })}</th>
                        <th colSpan={3}>{t({id: "stagesGuide.stage1" })}</th>
                        <th colSpan={3}>{t({id: "stagesGuide.stage2" })}</th>
                        <th colSpan={3}>{t({id: "stagesGuide.stage3" })}</th>
                    </tr>
                    <tr>
                        <th>{t({ id: "stagesDevelopment.engine" })}</th>
                        <th>{t({ id: "stagesDevelopment.gameplay" })}</th>
                        <th>{t({ id: "stagesDevelopment.story" })}</th>
                        <th>{t({ id: "stagesDevelopment.dialogues" })}</th>
                        <th>{t({ id: "stagesDevelopment.levelDesign" })}</th>
                        <th>{t({ id: "stagesDevelopment.ai" })}</th>
                        <th>{t({ id: "stagesDevelopment.worldDesign" })}</th>
                        <th>{t({ id: "stagesDevelopment.graphics" })}</th>
                        <th>{t({ id: "stagesDevelopment.sound" })}</th>
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