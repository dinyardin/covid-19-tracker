import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./Infobox.css";

interface Props {
  title: string;
  cases: string;
  total: string;
  onClick: () => void;
}

function InfoBox(props: Props) {
  return (
    <Card onClick={props.onClick} className="infoBox">
      <CardContent>
        {/* Titke */}
        <Typography className="infoBox__tile" color="textSecondary">
          {props.title}
        </Typography>

        {/* Number of Cases */}
        <h2 className="infoBox__cases">{props.cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {props.total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
