import React, { useEffect } from "react";
import { Select } from "antd";

const Option = Select.Option;

export const Measurements = props => {
  let MeasurementOptions;

  useEffect(() => {
    console.log(props.selectedMeasurement);
    MeasurementOptions = props.measurements.map((measurement, index) => {
      return (
        <option
          key={index + 1}
          name="measurement-option"
          value={measurement.toString()}
        >
          {measurement}
        </option>
      );
    });
  });

  return (
    <>
      <h3 className="stepper-description">What is the serving size?</h3>
      {props.oneMeasurementRequiredMessage}
      <div className="stepper-content flex row justify-start align-center wrap">
        <Select
          id="measurements-select"
          defaultValue="Select a measurement"
          value={props.selectedMeasurement}
          onChange={props.handleOnChange}
          showSearch
          style={{ width: 200 }}
          placeholder="Select a measurement"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {props.measurements.map((measurement, index) => {
            return (
              <Option
                key={index + 1}
                name="measurement-option"
                value={measurement.toString()}
              >
                {measurement}
              </Option>
            );
          })}
        </Select>
      </div>
    </>
  );
};

export default Measurements;
