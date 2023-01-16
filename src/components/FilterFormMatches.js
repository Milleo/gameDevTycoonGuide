import { Card, Col, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Select from 'react-select';
import platformsData from "../data/platforms.json";
import topicsData from "../data/topics.json";
import StagesGuide from "./StagesGuide";

const FilterFormMatches = (props) => {
    const { onChange } = props;
    const formData = { topics: [], platforms: [], hasAudience: false, hasCasual: false };
    const t = useIntl().formatMessage;

    const topicsOptions = topicsData.map((topic) => { return { value: topic.name, label: topic.name } });
    const platformOptions = platformsData.map((platform) => { return { value: platform.name, label: platform.name } });

    const handleChange = (value, field) => {
        formData[field] = value;
        onChange(formData);
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
                    <Form.Check onClick={(e) => handleChange(e.target.checked, "hasAudience")} type="switch" label={ t({id: "filter.matches.audience" })} id="audience-available" />
                    <Form.Check onClick={(e) => handleChange(e.target.checked, "hasCasual")} type="switch" label={ t({id: "filter.matches.casual" })} id="casual-games-available" />
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