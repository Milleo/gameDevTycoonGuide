import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import Select from 'react-select';
import platformsData from "../data/platforms.json";

const FilterFormPlatform = (props) => {
    const { onChange } = props;
    const t = useIntl().formatMessage;
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
            <Card.Header>{ t({id: "filter.title" })}</Card.Header>
            <Form className="p-4">
                <Form.Group className="mb-3">
                    <Form.Label>{ t({id: "platforms" })}</Form.Label>
                    <Select className="multiSelect" onChange={(values) => handleChange(values, "platforms")} options={platformOptions} isMulti></Select>
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

export default FilterFormPlatform;