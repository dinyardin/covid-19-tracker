import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  title: string;
  cases: number;
  total: number;
}

function InfoBox(props: Props) {
  return (
    <Card className="infoBox">
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
