import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import {Accordion} from "react-bootstrap";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";

export default function Sidebar() {

  const [open, setOpen] = useState(true);

  return (
    <div className="d-flex flex-row sidebar h-100">
      <div className={`${open? "":"collapsed "}collapse sidebar-header d-flex flex-column justify-content-between`}>
          <h3>NYC Spatial Equity Tool</h3>
          <p>
              Introduction text. Text on what Spatial Equity is.
              Text about the tool. What are the purposes? For whom is it made for?
              Introduction text. Text on what Spatial Equity is. Text about the tool.
              What are the purposes? For whom is it made for?Introduction text.
              Text on what Spatial Equity is. Text about the tool. What are the purposes?
              For whom is it made for?
          </p>
      </div>
      <div className={`${open? "":"collapsed "}collapse sidebar-body d-flex flex-column col-6`}>
        <div className="chapters">
            <h5>What is</h5>
            <h1>Spatial Equity</h1>
        </div>
        <div className="chapters" onClick={() => {
            console.log("collapsing")
            setOpen(!open)
        }}>
            <h5>Explore Spatial Equity by</h5>
            <h1>Issues in NYC</h1>
        </div>
        <div className="chapters" onClick={() => {
            console.log("collapsing")
            setOpen(!open)
        }}>
            <h5>Explore Spatial Equity by</h5>
            <h1>Community Profiles</h1>
        </div>
      </div>

        <Accordion className={"col-3 position-absolute d-flex flex-column h-100"} id={"issues-column"}>
            <AccordionItem eventKey="0">
            <AccordionBody className="chapters issues-health">
            <h5>Health</h5>
            <h5>Text explanation about “health”. Felis donec et odio pellentesque.
                Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat in.
                Vel turpis nunc eget lorem dolor sed viverra. </h5>
            </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="1">
        <AccordionBody className="chapters issues-environment">
            <h5>Environment</h5>
            <h5>Text explanation about “environment”. Turpis egestas pretium aenean pharetra magna.
                Sed odio morbi quis commodo odio aenean sed adipiscing.</h5>
        </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey={"2"}>
        <AccordionBody className="chapters issues-infrastructure">
            <h5>Infrastructure</h5>
            <h5>Text explanation about “infrastructure” Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
        </AccordionBody>
                </AccordionItem>
        </Accordion>

    </div>
  );
}
