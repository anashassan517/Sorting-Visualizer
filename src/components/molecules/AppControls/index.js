import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./style.css";

// import Button from "../../atoms/Button";
import Menu from "../../molecules/Menu";

const AppControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  arraySize,
  onArraySizeChange,
}) => {
  return (
    <Fragment>
      <Menu
        placeholder="Sort Algorithm"
        items={[
          "Bubble Sort",
          "Insertion Sort",
          "Merge Sort",
          "Quick Sort",
          "Heap Sort",
          "Radix Sort",
          "Bucket Sort",
          "Counting Sort",
        ]}
        selected={algorithm}
        onSelect={onAlgorithmChange}
      />

      <div className="AppControls__Size">
        <span>Size</span>
        <Menu
          placeholder="Array Size"
          items={["10", "1000", "1000000"]}
          selected={String(arraySize)}
          onSelect={onArraySizeChange}
        />
      </div>

      {/* { <Button onClick={onGenerateRandomArray}>Import File</Button> } */}
      {/* { <Button onClick={onFileRead}>Import File</Button> } */}
    </Fragment>
  );
};

AppControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onFileRead: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
};

export default AppControls;
