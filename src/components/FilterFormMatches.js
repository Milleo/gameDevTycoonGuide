import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Select from 'react-select';
import platformsData from "../data/platforms.json";
import topicsData from "../data/topics.json";
import StagesGuide from "./StagesGuide";

const FilterFormMatches = (props) => {
    const { onChange } = props;
    const [ topics, setTopics ] = useState([]);
    const [ platforms, setPlatforms ] = useState([]);
    const [ audienceAvailable, setAudienceAvailable ] = useState(false);
    const [ casualAvailable, setCasualAvailable ] = useState(false);
    const t = useIntl().formatMessage;

    const topicsOptions = topicsData.map((topic) => { return { value: topic.name, label: topic.name } });
    const platformOptions = platformsData.map((platform) => { return { value: platform.name, label: platform.name } });

    const handleChange = (value, field) => {
        switch(field){
            case "platforms":
                setPlatforms(value);
                break;
            case "topics":
                setTopics(value);
                break;
            case "audienceAvailable":
                setAudienceAvailable(value);
                break;
            case "casualAvailable":
                setCasualAvailable(value);
                break;
            default:
                break;
        }
        onChange(platforms, topics, audienceAvailable, casualAvailable);
    }
    
    return <Row>
        <Col md="6">
        <Card className="mb-3">
            <Card.Header>{ t({id: "filter.title" })}</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "filter.matches.platforms" })}</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "platforms")} options={platformOptions} isMulti></Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "filter.matches.topics" })}</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "topics")} options={topicsOptions} isMulti></Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check onClick={(e) => handleChange(e.target.checked, "audienceAvailable")} type="switch" label={ t({id: "filter.matches.audience" })} id="audience-available" />
                    <Form.Check onClick={(e) => handleChange(e.target.checked, "casualAvailable")} type="switch" label={ t({id: "filter.matches.casual" })} id="casual-games-available" />
                </Form.Group>
            </Form>
        </Card>
        </Col>
        <Col md="6">
            <StagesGuide />
        </Col>
    </Row>
}

export default FilterFormMatches;