import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Select from 'react-select';
import platformsData from "../data/platforms.json";

const FilterFormPlatform = (props) => {
    const { onChange } = props;
    const formData = { "platforms": [], "genres": [], "audiences": []}

    const genresOptions = Object.keys(platformsData[0].genres).map((genre) => { return { value: genre, label: genre } });
    const audiencesOptions = Object.keys(platformsData[0].audience).map((aud) => { return { value: aud, label: aud } });
    const platformOptions = platformsData.map((platform) => { return { value: platform.name, label: platform.name } });

    const handleChange = (value, field) => {
        formData[field] = value
        onChange(formData);
    }
    
    return <Container>
        <Card className="mb-3">
            <Card.Header>Filter</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>Platforms</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "platforms")} options={platformOptions} isMulti></Select>
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

export default FilterFormPlatform;