import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";

import "./App.css";
import Graph from "./components/Graph";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData, prettyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";

interface Country {
  name: string;
  value: string;
}

export interface CountryInfo {
  country: string;
  cases: number;
  recovered: number;
  deaths: number;
  todayCases: number;
  todayRecovered: number;
  todayDeaths: number;
}

const CountryInfo_initial = {
  country: "",
  cases: 0,
  recovered: 0,
  deaths: 0,
  todayCases: 0,
  todayRecovered: 0,
  todayDeaths: 0,
};

function App() {
  const url: string = "https://disease.sh/v3/covid-19/countries";
  const url_worldwide: string = "https://disease.sh/v3/covid-19/all";
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<string>("worldwide");
  const [countryInfo, setCountryInfo] =
    useState<CountryInfo>(CountryInfo_initial);
  const [tableData, setTableData] = useState<CountryInfo[]>([]);
  const [type, setType] = useState<"cases" | "deaths" | "recovered">("cases");
  const [mapCenter, setMapCenter] = useState<any>({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState<number>(3);
  const [mapCountries, setMapCountries] = useState<any>([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country: any) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          // need to sort the data before setting it
          const sortedData = sortData(data);
          setTableData(sortedData);

          setCountries(countries);

          setMapCountries(data);
          console.log("===========>", data);
        });
    };

    getCountriesData();
  }, []);

  console.log(tableData);

  const onCountryChange = async (event: any) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    // get country specific data
    const _url: string =
      countryCode === "worldwide"
        ? url_worldwide
        : url + `/${event.target.value}`;

    await fetch(_url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);

        // focus the map onto the country selected
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  // since select dropdown shows "worldwide" option by default, we need to show corresponding worldwide data on page load
  useEffect(() => {
    fetch(url_worldwide)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        {/*  Header  */}
        {/*  Title + Select input dropdown */}
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country: Country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* # Info boxes */}
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            onClick={() => setType("cases")}
          ></InfoBox>

          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            onClick={() => setType("recovered")}
          ></InfoBox>

          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            onClick={() => setType("deaths")}
          ></InfoBox>
        </div>

        {/* Map */}
        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          type={type}
        ></Map>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            {/* Table */}
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>

            {/* Graph/Chart */}
            <h3>Worldwide New Cases</h3>
            <Graph type="cases"></Graph>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
