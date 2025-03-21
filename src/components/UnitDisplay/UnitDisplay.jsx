import React from "react";
import { Unit } from "./UnitDisplay.style";
import PropTypes from "prop-types";

const unitTypes = ["none", "m", "m2", "m3", "t", "kg", "pcs."];

const UnitDisplay = ({ unit }) => {
  console.log(unit);
  const showUnit = unit !== "none" && unit !== "category";

  console.log("showUnit: ", showUnit);

  if (!showUnit) return null;

  if (!unit) return null;

  return <Unit>Unit: {unit}</Unit>;
};

UnitDisplay.propTypes = {
  unit: PropTypes.oneOf(unitTypes),
};

UnitDisplay.defaultProps = {
  unit: "none",
};

export default UnitDisplay;
