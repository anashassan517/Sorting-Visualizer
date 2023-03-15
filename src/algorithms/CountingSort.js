import React from "react";
import { newTrace, addToTrace, lastSorted, createKey } from "./helpers";

const CountingSort = (nums) => {
  // Set up code for tracing the algorithm
  const trace = newTrace(nums);

  // Sorting Algorithm with trace capture
  let min = Math.min.apply(Math, nums); // 1
  let max = Math.max.apply(Math, nums);
  let i = min,
    j = 0,
    len = nums.length,
    count = [];
  for (i; i <= max; i++) {
    count[i] = 0;
    addToTrace(trace, nums, [], [], [i, i + 1]);
  }
  addToTrace(trace, nums, lastSorted(trace), [i, i + 1]);

  for (i = 0; i < len; i++) {
    addToTrace(trace, nums, [], [], [i, i + 1]);
    count[nums[i]] += 1;
    addToTrace(trace, nums, [], [], [i, i + 1]);

    addToTrace(trace, nums, lastSorted(trace), [i, i + 1]);
  }
  addToTrace(trace, nums, lastSorted(trace), [i, i + 1]);

  for (i = min; i <= max; i++) {
    while (count[i] > 0) {
      addToTrace(trace, nums, [], [], [i, i + 1]);

      nums[j] = i;
      j++;
      count[i]--;
      addToTrace(trace, nums, [...lastSorted(trace), nums.length - 1 - i]);
      addToTrace(trace, nums, [...Array(nums.length).keys()]);
    }
  }
  addToTrace(trace, nums, [...Array(nums.length).keys()]);
  addToTrace(trace, nums, [...lastSorted(trace), nums.length - 1 - i]);

  // Visualize: final value is sorted

  return trace;
};

export const CountingSortKey = createKey("", "");
export const CountingSortDesc = {
  title: "Counting Sort",
  description: (
    <p>
      <a
        href="https://en.wikipedia.org/wiki/Counting_sort"
        target="_blank"
        rel="noopener noreferrer"
      >
        This Algorithm
      </a>{" "}
      sorts the number of objects that possess distinct key values, and applying
      prefix sum on those counts to determine the positions of each key value in
      the output sequence. Its running time is linear in the number of items and
      the difference between the maximum key value and the minimum key value, so
      it is only suitable for direct use in situations where the variation in
      keys is not significantly greater than the number of items. It is non
      comparison based sorting.
    </p>
  ),
  worstCase: <span>O(n+k)</span>,
  avgCase: <span>O(n+k)</span>,
  bestCase: <span>O(n+k)</span>,
  space: <span>O(K)</span>,
};
export default CountingSort;
