import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import user from "./lnr-user.svg";

const NutrientData = props => {
  useEffect(() => {});
  // Should be no undefined values.
  // TODO should be no undefined data passed
  // should be const OutOfText on a single line
  let OutOfText = "";
  let color = "";

  if (props.total) {
    OutOfText = props.total.toString() + " out of " + props.rda.toString();
  }

  let width = !props.total ? 0 : (props.total / props.rda) * 100;

  if (width > 100) {
    width = 100;
  }

  if (width <= 5) {
    color = "rgb(0, 10, 37)";
  } else if (width > 5 && width <= 10) {
    color = "rgb(0, 11, 38)";
  } else if (width > 10 && width <= 15) {
    color = "rgb(0, 12, 39)";
  } else if (width > 15 && width <= 20) {
    color = "rgb(0, 13, 40)";
  } else if (width > 20 && width <= 25) {
    color = "rgb(0, 14, 41)";
  } else if (width > 25 && width <= 30) {
    color = "rgb(0, 15, 42)";
  } else if (width > 30 && width <= 35) {
    color = "rgb(0, 16, 43)";
  } else if (width > 35 && width <= 40) {
    color = "rgb(0, 17, 44)";
  } else if (width > 40 && width <= 45) {
    color = "rgb(0, 18, 45)";
  } else if (width > 45 && width <= 50) {
    color = "rgb(0, 19, 46)";
  } else if (width > 50 && width <= 55) {
    color = "rgb(0, 20, 47)";
  } else if (width > 55 && width <= 60) {
    color = "rgb(0, 21, 48)";
  } else if (width > 60 && width <= 65) {
    color = "rgb(0, 22, 49)";
  } else if (width > 65 && width <= 70) {
    color = "rgb(0, 23, 50)";
  } else if (width > 70 && width <= 75) {
    color = "rgb(0, 24, 51)";
  } else if (width > 75 && width <= 80) {
    color = "rgb(0, 25, 52)";
  } else if (width > 85 && width <= 85) {
    color = "rgb(0, 26, 53)";
  } else if (width > 85 && width <= 90) {
    color = "rgb(0, 27, 54)";
  } else if (width > 90 && width <= 95) {
    color = "rgb(0, 28, 55)";
  } else if (width > 95 && width <= 100) {
    color = "rgb(0, 29, 56)";
  }

  color = "#5f89ad";

  console.log(color);
  width += "%";

  const styles = {
    percentage: {
      width,
      background: color,
      animation: "animatePercentage 1s"
    },
    modal: {}
  };

  return (
    <div className="nutrient-container" styles={styles}>
      <div styles={styles} className="nutrient flex space-between align-center">
        <div className="percentage" style={styles.percentage}></div>
        <div className="nutrient-name-and-data">
          <div className="nutrient-name">{props.name}</div>
          <div className="nutrient-data">
            {OutOfText}
            {props.measurement}
            {false && (
              <i
                className="lnr lnr-user icon"
                onClick={() => props.showDetailsModal(props.name)}
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

NutrientData.displayName = "NutrientData";

// NutrientData.propTypes = {
//     className: PropTypes.string,
// };

export default NutrientData;
