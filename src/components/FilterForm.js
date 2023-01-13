import { Card, Container, FloatingLabel, Form } from "react-bootstrap";
import Select from 'react-select';
import topicsData from "../data/topics.json";

const FilterForm = (props) => {
    const { onChangeTopic } = props;
    const topicsOptions = topicsData.map((topic) => {
        return { value: topic.name, label: topic.name };
    });
    
    return <Container>
        <Card>
            <Card.Header>Filter</Card.Header>
            <Form>
                <Form.Label>Topic</Form.Label>
                <Select onChange={onChangeTopic} options={topicsOptions} isMulti></Select>
            </Form>
        </Card>
    </Container>
}

export default FilterForm;