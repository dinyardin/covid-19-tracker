import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { useState, useEffect } from "react";

import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

interface Country {
  name: string;
  value: string;
}

function App() {
  const url: string = "https://disease.sh/v3/covid-19/countries";
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<string>("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country: any) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event: any) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

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
            cases={212321}
            total={123232}
          ></InfoBox>

          <InfoBox
            title="Coronavirus Cases"
            cases={212321}
            total={123232}
          ></InfoBox>

          <InfoBox
            title="Coronavirus Cases"
            cases={212321}
            total={123232}
          ></InfoBox>
        </div>

        {/* Map */}
        <Map></Map>
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            {/* Table */}
            <h3>Live Cases by Country</h3>
            <h3>Worldwide New Cases</h3>
            {/* Graph/Chart */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
