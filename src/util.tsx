import React from "react";
import { CountryInfo } from "./App";
import { Data } from "./components/Graph";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

// Sort the data to be displayed on the Table component
export const sortData = (data: CountryInfo[]) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const buildChartData = (
  data: Data,
  type: "cases" | "deaths" | "recovered" = "cases"
) => {
  let chartData: any[] = [];
  let lastDataPoint: any;

  for (let date in data[type]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[type][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[type][date];
  }

  return chartData;
};

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    //rgb: "rgb(204, 16, 52)",
    //half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    //rgb: "rgb(125, 215, 29)",
    //half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 500,
  },
  deaths: {
    hex: "#fb4443",
    //rgb: "rgb(251, 68, 67)",
    //half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

// This function is used to draw circles on the map with interactive tooltip
export const showDataOnMap = (
  data: any,
  type: "cases" | "deaths" | "recovered" = "cases"
) =>
  data.map((country: any) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[type].hex}
      fillColor={casesTypeColors[type].hex}
      fillOpacity={0.4}
      radius={Math.sqrt(country[type]) * casesTypeColors[type].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// formating for stats displayed on inbox component
export const prettyPrintStat = (stat: number) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
