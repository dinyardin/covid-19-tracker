import { CountryInfo } from "./App";
import { Data } from "./components/Graph";

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
