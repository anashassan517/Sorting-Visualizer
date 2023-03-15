import React from "react";
import { newTrace, addToTrace, lastSorted, createKey } from "./helpers";

var start = new Date().getTime();
const BucketSort = (arr) => {
  const trace = newTrace(arr);
  // Set up code for tracing the algorithm

  if (arr.length === 0) {
    return arr;
  }
  let i,
    minValue = arr[0],
    maxValue = arr[0],
    bucketSize = 5;
  arr.forEach(function (currentVal) {
    if (currentVal < minValue) {
      minValue = currentVal;
    } else if (currentVal > maxValue) {
      maxValue = currentVal;
    }
  });
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  let allBuckets = new Array(bucketCount);
  for (i = 0; i < allBuckets.length; i++) {
    allBuckets[i] = [];
    // addToTrace(trace, arr, lastSorted(trace), [i]);
    addToTrace(trace, arr, lastSorted(trace), [i, i + 1]);

    // addToTrace(trace, arr, [], [], [], [i]);
  }
  arr.forEach(function (currentVal) {
    allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(
      currentVal
    );
  });
  arr.length = 0;
  allBuckets.forEach(function (bucket) {
    insertion(bucket);
    // addToTrace(trace, arr, lastSorted(trace), [i]);

    bucket.forEach(function (element) {
      arr.push(element);
    });
    // addToTrace(trace, arr, lastSorted(trace), [], [j, j + 1]);
  });
  addToTrace(trace, arr, [...Array(arr.length).keys()]);
  function insertion(arr) {
    // const trace = newTrace(arr);

    let length = arr.length;
    let i, j;
    for (i = 1; i < length; i++) {
      addToTrace(trace, arr, [], [], [i, i + 1]);

      let temp = arr[i];
      for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
        addToTrace(trace, arr, [], [], [i, j]);

        arr[j + 1] = arr[j];
        // addToTrace(trace, arr, lastSorted(trace), [], [j, j + 1]);
      }
      arr[j + 1] = temp;
      // addToTrace(trace, arr, [...lastSorted(trace), arr.length - 1 - i]);
      addToTrace(trace, arr, [...Array(arr.length).keys()]);
    }
  }
  var end = new Date().getTime();
  var time = end - start;
  alert("Execution time: " + time);
  return trace;
};

export const BucketSortKey = createKey("Creating Buckets", "Sorting Buckets");
export const BucketSortDesc = {
  title: "Bucket Sort",
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Bucket_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bucket Sort
      </a>{" "}
      is a sorting algorithm that works by distributing the elements of an array
      into a number of buckets. Each bucket is then sorted individually, either
      using a different sorting algorithm, or by recursively applying the bucket
      sorting algorithm. It is a distribution sort, a generalization of
      pigeonhole sort that allows multiple keys per bucket, and is a cousin of
      radix sort in the most-to-least significant digit flavor. Bucket sort can
      be implemented with comparisons and therefore can also be considered a
      alert("Execution time: " + time); comparison sort algorithm.
    </p>
  ),
  worstCase: (
    <span>
      O(n<sup>2</sup>)
    </span>
  ),
  avgCase: <span>O(n+k)</span>,
  bestCase: <span>O(n+k)</span>,
  space: <span>O(n)</span>,
};
export default BucketSort;
