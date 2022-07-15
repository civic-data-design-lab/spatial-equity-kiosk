import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>SPATIAL EQUITY NYC</h3>
      </div>
      <div className="sidebar-body">
        <div className="chapters">Spatial Equity</div>
        <div className="chapters">Issues in NYC</div>
        <div className="chapters">Community Profiles</div>
      </div>
    </div>
  );
}
