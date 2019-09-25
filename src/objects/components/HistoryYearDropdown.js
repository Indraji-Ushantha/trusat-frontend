import React, { useState, useEffect } from "react";
import { useTrusatPostApi } from "../../app/helpers";
import HistoryMonthTable from "./HistoryMonthTable";
import { useObjectsState } from "../../objects/objects-context";

export default function HistoryYearDropdown() {
  const { noradNumber, yearLaunched } = useObjectsState();
  const [yearChosen, setYearChosen] = useState("2019");
  const [{ isLoading, isError, data }, doPost, withData] = useTrusatPostApi();

  useEffect(() => {
    if (noradNumber && yearChosen) {
      doPost(`/object/history`);
      withData(
        JSON.stringify({
          norad_number: noradNumber,
          year: yearChosen
        })
      );
    }
  }, [yearChosen, noradNumber, doPost, withData]);

  const renderMonthTables = () => {
    return Object.keys(data).map((monthKey, index) => {
      if (data[monthKey]) {
        return (
          <HistoryMonthTable
            key={monthKey}
            monthName={monthKey}
            monthData={data[monthKey]}
          />
        );
      }
    });
  };

  const years = [
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011"
  ];

  return (
    <section className="history-year-dropdown">
      {years.map(year => {
        return (
          <div key={year} className="history-year-dropdown__row">
            <h1
              onClick={() => {
                if (year !== yearChosen) {
                  setYearChosen(year);
                } else {
                  setYearChosen("");
                }
              }}
            >
              <p
                className={
                  year === yearChosen
                    ? "history-year-dropdown__year-text--highlight"
                    : "history-year-dropdown__year-text"
                }
              >
                {year}
              </p>
            </h1>
            {yearChosen === year ? renderMonthTables() : null}
          </div>
        );
      })}
    </section>
  );
}
