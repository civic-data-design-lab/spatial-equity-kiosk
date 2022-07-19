import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';

export default function Sidebar() {

  const [open, setOpen] = useState(true);

  return (
    <div className="d-flex flex-row sidebar h-100">

      <Collapse in={open} dimension={'width'}>
                    <div id="example-collapse-text" className={"col-6"}>
      <div className="sidebar-header d-flex flex-column justify-content-between">
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
                    </div>
      </Collapse>
      <div className="sidebar-body d-flex flex-column col-6">
        <div className="chapters flex-grow-1" onClick={() => {
            console.log("collapsing")
            setOpen(!open)
        }}>
            <h5>What is</h5>
            <h1>Spatial Equity</h1>
        </div>
        <div className="chapters flex-grow-1">
            <h5>Explore Spatial Equity by</h5>
            <h1>Issues in NYC</h1>
        </div>
        <div className="chapters flex-grow-1">
            <h5>Explore Spatial Equity by</h5>
            <h1>Community Profiles</h1>
        </div>
      </div>
    </div>
  );
}
