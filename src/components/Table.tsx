import React from "react";
import { CountryInfo } from "../App";
import "./Table.css";

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
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
