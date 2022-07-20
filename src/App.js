import "./App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import HomeCarousel from "./components/HomeCarousel";
import IssueSection from "./components/IssueSection";


function App() {
  return (
    <Container fluid className={"h-100 p-0"}>
        <Row className={"h-100 no-padding no-margin"}>
            <Col className={"col-6 h-100 no-padding no-margin"}>
                <Sidebar />
            </Col>
            <Col className={"d-flex flex-column col-6 h-100 p-0 black-border"}>
                <HomeCarousel/>
            </Col>
        </Row>
    </Container>
  );
}

export default App;
