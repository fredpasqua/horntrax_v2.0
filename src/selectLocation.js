import React from "react";
import Select from "react-select";

export default function DropDownLocations({ data, action, selector }) {
  //event handler calls function from app.js to update state of selectedDepartments
  const handleChange = (e) => {
    action(e);
  };

  //create a variable to hold object to inject into departments array for clearing the selectedDepartment sort
  let reset = { value: "", label: "All Locations" };

  //creates departments variable for use by react.select component
  let types = data
    .map((item) => ({
      value: item.location,
      label: item.location,
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
          placeholder="All Locations"
          onChange={(e) => handleChange(e.value)}
        />
      </div>
    </div>
  );
}
