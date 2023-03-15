import React, { Component } from "react";
import "./App.css";

import AppControls from "./components/molecules/AppControls";
import TopBar from "./components/organisms/TopBar";
import SortVisualizer from "./components/organisms/SortVisualizer";
import Footer from "./components/molecules/Footer";

import BubbleSort, {
  BubbleSortKey,
  BubbleSortDesc,
} from "./algorithms/BubbleSort";

import InsertionSort, {
  InsertionSortKey,
  InsertionSortDesc,
} from "./algorithms/InsertionSort";
import MergeSort, { MergeSortKey, MergeSortDesc } from "./algorithms/MergeSort";
import QuickSort, { QuickSortKey, QuickSortDesc } from "./algorithms/QuickSort";

import HeapSort, { HeapSortKey, HeapSortDesc } from "./algorithms/HeapSort";
import BucketSort, {
  BucketSortKey,
  BucketSortDesc,
} from "./algorithms/BucketSort";

import RadixSort, { RadixSortKey, RadixSortDesc } from "./algorithms/RadixSort";

import CountingSort, {
  CountingSortKey,
  CountingSortDesc,
} from "./algorithms/CountingSort";

class App extends Component {
  state = {
    array: [],
    arraySize: 1000,
    trace: [],
    algorithm: null,
    appDrawerOpen: false,
  };

  ALGORITHM = {
    "Bubble Sort": BubbleSort,
    "Insertion Sort": InsertionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Heap Sort": HeapSort,
    "Radix Sort": RadixSort,
    "Bucket Sort": BucketSort,
    "Counting Sort": CountingSort,
  };

  ALGORITHM_KEY = {
    "Bubble Sort": BubbleSortKey,
    "Insertion Sort": InsertionSortKey,
    "Merge Sort": MergeSortKey,
    "Quick Sort": QuickSortKey,
    "Heap Sort": HeapSortKey,
    "Radix Sort": RadixSortKey,
    "Bucket Sort": BucketSortKey,
    "Counting Sort": CountingSortKey,
  };

  ALGORITHM_DESC = {
    "Bubble Sort": BubbleSortDesc,
    "Insertion Sort": InsertionSortDesc,
    "Merge Sort": MergeSortDesc,
    "Quick Sort": QuickSortDesc,
    "Heap Sort": HeapSortDesc,
    "Radix Sort": RadixSortDesc,
    "Bucket Sort": BucketSortDesc,
    "Counting Sort": CountingSortDesc,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomArray = () => {
    // Generate pseudo-random number between 1 and max
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    // Generate an array of length max
    const array = Array(this.state.arraySize)
      .fill(0)
      .map(() => getRandomInt(this.state.arraySize * 5));

    this.setState(
      {
        array,
        trace: [],
      },
      this.createTrace
    );
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ algorithm }, this.generateRandomArray);
  };

  handlefilling = () => {
    let upload = document.getElementById("upload");
    function fileupload() {
      let file1 = "randoms.txt";
      let file2 = "millionrandom.txt";
      let file3 = "t10.txt";
      let arr = [];
      let arrfile;
      upload.addEventListener("change", () => {
        let fr = new FileReader();
        fr.onload = function () {
          arrfile = JSON.parse(fr.result);
          arr = arrfile.split(",");
          console.log(arr);
          createNewArray(arr);
        };
        fr.readAsText(upload.files[0]);
      });
    }
    function createNewArray(arr = []) {
      deleteChild();
      console.log(arr);

      let array = [];
      for (let i = 0; i < arr.length; i++) {
        array.push(arr[i]);
      }
      console.log(array);

      // select the div #bars element
      const bars = document.querySelector("#bars");

      // create multiple element div using loop and adding class 'bar col'
      for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i] * 2}px`;
        bar.classList.add("bar");
        bar.classList.add("flex-item");
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
      }
    }

    // Helper function to delete all the previous bars so that new can be added
    function deleteChild() {
      const bar = document.querySelector("#bars");
      bar.innerHTML = "";
    }

    const newfile = document.querySelector(".upload");
    upload.addEventListener("change", function () {
      fileupload();
    });
  };

  handleArraySizeChange = (size) => {
    size = Number(size);
    size = size < 1000 ? 10 : size;
    size = size > 1000 ? 10000 : size;

    // size = Number(size);
    // size = size > 10 ? 100 : size;
    // size = size < 0 ? 0 : size;
    this.setState({ arraySize: size }, this.generateRandomArray);
  };

  createTrace = () => {
    const numbers = [...this.state.array];
    const sort = this.ALGORITHM[this.state.algorithm];
    if (sort) {
      const trace = sort(numbers);
      this.setState({ trace });
    }
  };

  toggleAppDrawer = () => {
    this.setState((prevState) => ({
      appDrawerOpen: !prevState.appDrawerOpen,
    }));
  };

  render() {
    let theme = `App`;
    const colorKey = this.ALGORITHM_KEY[this.state.algorithm];
    const desc = this.ALGORITHM_DESC[this.state.algorithm];

    const controls = (
      <AppControls
        onGenerateRandomArray={this.generateRandomArray}
        algorithm={this.state.algorithm}
        onAlgorithmChange={this.handleAlgorithmChange}
        arraySize={this.state.arraySize}
        onArraySizeChange={this.handleArraySizeChange}
        // onFileRead={this.state.handlefilling}
      />
    );

    return (
      <div className={theme}>
        <TopBar
          drawerOpen={this.state.appDrawerOpen}
          toggleDrawer={this.toggleAppDrawer}
        >
          {controls}
        </TopBar>

        <main className="App__Body">
          <SortVisualizer
            array={this.state.array}
            trace={this.state.trace}
            colorKey={colorKey}
            desc={desc}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
