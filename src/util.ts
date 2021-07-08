import { CountryInfo } from "./App";

export const sortData = (data: CountryInfo[]) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};
