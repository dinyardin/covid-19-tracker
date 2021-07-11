import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Infobox.css";

interface Props {
  title: string;
  cases: string;
  total: string;
  onClick: () => void;
  active: boolean;
  isRed?: boolean;
  isGrey?: boolean;
  isLoading: boolean;
}

function InfoBox(props: Props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && "infoBox--selected"} ${
        props.isRed && "infoBox--red"
      } ${props.isGrey && "infoBox--grey"}`}
    >
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__tile" color="textSecondary">
          {props.title}
        </Typography>

        {/* Number of Cases */}
        <h2
          className={`infoBox__cases ${
            !props.isRed && "infoBox__cases--green"
          } ${props.isGrey && "infoBox__cases--grey"}`}
        >
          {" "}
          Today:
          {props.isLoading ? (
            <i className="fa fa-cog fa-spin fa-fw" />
          ) : (
            props.cases
          )}
        </h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          Total Cases:
          {props.total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
