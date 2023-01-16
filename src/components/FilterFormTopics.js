import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import topicsData from "../data/topics.json";

const FilterFormTopics = (props) => {
    const { onChange } = props;
    const [ topics, setTopics ] = useState([]);
    const [ genres, setGenres ] = useState([]);
    const [ audiences, setAudiences ] = useState([]);

    const topicsOptions = topicsData.map((topic) => { return { value: topic.name, label: topic.name } });
    const genresOptions = Object.keys(topicsData[0].genres).map((genre) => { return { value: genre, label: genre } });
    const audiencesOptions = Object.keys(topicsData[0].audience).map((aud) => { return { value: aud, label: aud } });

    const handleChange = (value, field) => {
        switch(field){
            case "topics":
                setTopics(value);
                break;
            case "genres":
                setGenres(value);
                break;
            case "audiences":
                setAudiences(value);
                break;
            default:
                break;
        }
        onChange(topics, genres, audiences);
    }
    
    return <Container>
        <Card className="mb-3">
            <Card.Header>Filter</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>Topic</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "topics")} options={topicsOptions} isMulti></Select>
                </Form.Group>
                <Row>
                    <Col md="8">
                        <Form.Group className="mb-3">
                            <Form.Label>Genres</Form.Label>
                            <Select className="multiSelect" onChange={(values) => handleChange(values, "genres")} options={genresOptions} isMulti></Select>
                        </Form.Group>
                    </Col>
                    <Col md="4">
                        <Form.Group className="mb-3">
                            <Form.Label>Audience</Form.Label>
                            <Select className="multiSelect" onChange={(values) => handleChange(values, "audiences")} options={audiencesOptions} isMulti></Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card>
    </Container>
}

export default FilterFormTopics;