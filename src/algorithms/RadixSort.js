import React from "react";
import { newTrace, addToTrace, lastSorted, createKey } from "./helpers";

const RadixSort = (nums) => {
  const trace = newTrace(nums);

  let max = Math.max(...nums);
  function foga(t, nums, j) {
    for (let a of t) {
      addToTrace(trace, nums, lastSorted(trace), [a]);

      for (let i = 0; i < a.length; i++) {
        addToTrace(trace, nums, lastSorted(trace), [i]);

        nums[j++] = a[i];
        addToTrace(trace, nums, [...lastSorted(trace), i]);
      }
    }
  }
  let digit = (num, pos) => ~~((num % (pos * 10)) / pos);

  for (let i = 1; i <= max; i *= 10) {
    rSort(nums, i);
  }

  function rSort(nums, keyPos) {
    let bucket = [[], [], [], [], [], [], [], [], [], []];

    for (let i = 0; i < nums.length; i++) {
      addToTrace(trace, nums, lastSorted(trace), [i]);

      // addToTrace(trace, nums, lastSorted(trace), [i, i + 1]);
      bucket[digit(nums[i], keyPos)].push(nums[i]);

      addToTrace(trace, nums, lastSorted(trace), [i, i + 1]);
    }

    foga(bucket.slice(), nums, 0);
    addToTrace(trace, nums, [...Array(nums.length).keys()]);
  }

  return trace;
};

export const RadixSortKey = createKey(
  "Creating Temporary Count Array",
  "Sorting by Count Array"
);
export const RadixSortDesc = {
  title: "Radix Sort",
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Radix_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        Radix Sort
      </a>{" "}
      is a non-comparative sorting algorithm. It avoids comparison by creating
      and distributing elements into buckets according to their radix. For
      elements with more than one significant digit, this bucketing process is
      repeated for each digit, while preserving the ordering of the prior step,
      until all digits have been considered.
    </p>
  ),
  worstCase: <span>O(nk)</span>,
  avgCase: <span>O(nk)</span>,
  bestCase: <span>O(nk)</span>,
  space: <span>O(n+k)</span>,
};
export default RadixSort;
