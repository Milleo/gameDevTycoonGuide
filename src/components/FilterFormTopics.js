import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Select from 'react-select';
import topicsData from "../data/topics.json";

const FilterFormTopics = (props) => {
    const { onChange } = props;
    const formData = { topics: [], platforms: [], audiences: [] };
    const t = useIntl().formatMessage;

    const topicsOptions = topicsData.map((topic) => { return { value: topic.name, label: topic.name } });
    const genresOptions = Object.keys(topicsData[0].genres).map((genre) => { return { value: genre, label: genre } });
    const audiencesOptions = Object.keys(topicsData[0].audience).map((aud) => { return { value: aud, label: aud } });

    const handleChange = (value, field) => {
        formData[field] = value
        onChange(formData);
    }
    
    return <Container>
        <Card className="mb-3">
            <Card.Header>{ t({id: "filter.title" })}</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "topics" })}</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "topics")} options={topicsOptions} isMulti></Select>
                </Form.Group>
                <Row>
                    <Col md="8">
                        <Form.Group className="mb-3">
                            <Form.Label>{ t({id: "genres" })}</Form.Label>
                            <Select className="multiSelect" onChange={(values) => handleChange(values, "genres")} options={genresOptions} isMulti></Select>
                        </Form.Group>
                    </Col>
                    <Col md="4">
                        <Form.Group className="mb-3">
                            <Form.Label>{ t({id: "audience" })}</Form.Label>
                            <Select className="multiSelect" onChange={(values) => handleChange(values, "audiences")} options={audiencesOptions} isMulti></Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card>
    </Container>
}

export default FilterFormTopics;