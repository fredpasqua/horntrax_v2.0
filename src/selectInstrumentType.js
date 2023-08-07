import React from "react";
import Select from "react-select";

export default function DropDown({ data, action, selector }) {
  //event handler calls function from app.js to update state of selected instrument types
  const handleChange = (e) => {
    action(e);
  };

  //create a variable to hold object to inject into types array for clearing the selected type sort
  let reset = { value: "", label: "All Types" };

  //creates types variable for use by react.select component
  let types = data
    .map((item) => ({
      value: item.type,
      label: item.type,
    }))

    .filter(
      (v, i, a) =>
        a.findIndex((v2) => JSON.stringify(v2) === JSON.stringify(v)) === i
    );
  types.push(reset);

  //Alphabetize list of options for react.select component
  types.sort((a, b) => (a.value > b.value ? 1 : -1));

  return (
    <div>
      <div>
        <Select
          className="dropdown"
          options={types}
          placeholder="All Types"
          onChange={(e) => handleChange(e.value)}
        />
      </div>
    </div>
  );
}
