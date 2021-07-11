import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { buildChartData } from "../util";
import numeral from "numeral";

export interface Data {
  cases: any;
  deaths: any;
  recovered: any;
}

const data_initial = {
  cases: {},
  deaths: {},
  recovered: {},
};

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem: any) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: any) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

interface Type {
  type: "cases" | "deaths" | "recovered";
  className: string;
}

function Graph(props: Type) {
  const [data, setData] = useState<any>(data_initial);
  const url: string =
    "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

  useEffect(() => {
    const fetchData = async () => {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, props.type);
          setData(chartData);
        });
    };

    fetchData();
  }, [props.type]);

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          type="segment"
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Graph;
