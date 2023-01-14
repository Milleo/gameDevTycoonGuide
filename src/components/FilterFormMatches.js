import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Select from 'react-select';
import platformsData from "../data/platforms.json";
import topicsData from "../data/topics.json";

const FilterFormMatches = (props) => {
    const { onChange } = props;
    const [ topics, setTopics ] = useState([]);
    const [ platforms, setPlatforms ] = useState([]);
    const [ audienceAvailable, setAudienceAvailable ] = useState(false);
    const [ casualAvailable, setCasualAvailable ] = useState(false);
    const t = useIntl().formatMessage;

    const topicsOptions = topicsData.map((topic) => { return { value: topic.name, label: topic.name } });
    const platformOptions = platformsData.map((platform) => { return { value: platform.name, label: platform.name } });

    useEffect(() => onChange(platforms, topics, audienceAvailable, casualAvailable), [topics, platforms, audienceAvailable, casualAvailable])
    
    return <Container>
        <Card className="my-3">
            <Card.Header>{ t({id: "filter.title" })}</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "filter.matches.platforms" })}</Form.Label>
                    <Select className="multiSelect" onChange={setPlatforms} options={platformOptions} isMulti></Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "filter.matches.topics" })}</Form.Label>
                    <Select className="multiSelect" onChange={setTopics} options={topicsOptions} isMulti></Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check onClick={(e) => setAudienceAvailable(e.target.checked)} type="switch" label={ t({id: "filter.matches.audience" })} id="audience-available" />
                    <Form.Check onClick={(e) => setCasualAvailable(e.target.checked)} type="switch" label={ t({id: "filter.matches.casual" })} id="casual-games-available" />
                </Form.Group>
            </Form>
        </Card>
    </Container>
}

export default FilterFormMatches;