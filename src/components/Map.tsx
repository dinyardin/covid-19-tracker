import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../util";

interface Props {
  center: any;
  zoom: number;
  countries: any[];
  type: "cases" | "deaths" | "recovered";
}

function Map(props: Props) {
  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(props.countries, props.type)}
      </LeafletMap>
    </div>
  );
}

export default Map;
