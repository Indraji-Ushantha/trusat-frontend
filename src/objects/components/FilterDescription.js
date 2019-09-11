import React from "react";
import { useObjectsState } from "../objects-context";

export default function FilterDescription() {
  const { observationFilter } = useObjectsState();
  console.log(observationFilter);

  const filterDescriptions = [
    {
      filter: "influence",
      copy:
        "The more accurate and timely your observations—the more weight they will carry in determining the latest orbit predictions."
    },
    {
      filter: "history",
      copy:
        "This is an open record of all observations in the catalog for this object."
    },
    {
      filter: "mySightings",
      copy: "These are your observations of this object."
    }
  ];

  return filterDescriptions.map(description => {
    if (description.filter === observationFilter) {
      return (
        <p
          key={`${description.filter} copy`}
          className="object-observation__filter-explainer"
        >
          {description.copy}
        </p>
      );
    }
  });
}
