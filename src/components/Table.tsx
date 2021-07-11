import React from "react";
import { CountryInfo } from "../App";
import "./Table.css";
import numeral from "numeral";
interface Props {
  countries: CountryInfo[];
}

function Table(props: Props) {
  return (
    <div className="table">
      {props.countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
