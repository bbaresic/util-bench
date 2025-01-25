# Prebid Util Benchmarks

This tries to benchmark a updated implementation of Prebid Util functions, specifically `deepEqual` and `mergeDeep`.

This is a micro-benchmark, and that comes with caveats (especially because different data will give different results).

The data used to test is in `src/data.ts`.
`src/old-util.js` contain the current versions of the functions, and `src/new-util.js` has the new one.

## Prerequisites

- Node
- NPM

I use [proto](https://moonrepo.dev/proto) to manage my Node/NPM versions.
To get the same version that I am using, look into the `.prototools` file.

## How to Run in Node

1. `npm i`
2. `npm run start`
3. `npm run start:markdown` - generates the benchmark results and a summary as markdown in the dist folder

## Summary

| Task name                  | Latency Improvement (%) | Throughput Improvement (%) |
| :------------------------- | :---------------------- | :------------------------- |
| deepEqual - array          | -3.54% improvement      | +3.73% improvement         |
| deepEqual - deepNested     | -13.50% improvement     | +12.37% improvement        |
| deepEqual - large          | -6.65% improvement      | +6.74% improvement         |
| deepEqual - nested         | -8.04% improvement      | +10.83% improvement        |
| deepEqual - simple         | -7.95% improvement      | +6.39% improvement         |
| deepEqual - differentTypes | -5.70% improvement      | +6.32% improvement         |

| Task name                  | Latency Improvement (%) | Throughput Improvement (%) |
| :------------------------- | :---------------------- | :------------------------- |
| mergeDeep - array          | -45.63% improvement     | +89.51% improvement        |
| mergeDeep - deepNested     | -13.08% improvement     | +11.02% improvement        |
| mergeDeep - large          | -79.25% improvement     | +385.26% improvement       |
| mergeDeep - nested         | -44.77% improvement     | +80.33% improvement        |
| mergeDeep - simple         | -55.16% improvement     | +131.13% improvement       |
| mergeDeep - differentTypes | -56.45% improvement     | +137.66% improvement       |

## Results (MacBook Pro M2)

| Task name                     | Latency average (ns) | Latency median (ns) | Throughput average (ops/s) | Throughput median (ops/s) | Samples  |
| :---------------------------- | :------------------- | :------------------ | :------------------------- | :------------------------ | :------- |
| deepEqualOld - array          | 331.43 ± 0.28%       | 333.00              | 3135562 ± 0.01%            | 3003003                   | 3017244  |
| deepEqual - array             | 319.69 ± 0.30%       | 292.00              | 3252460 ± 0.01%            | 3424658                   | 3128062  |
| deepEqualOld - deepNested     | 287.61 ± 0.45%       | 250.00              | 3779989 ± 0.01%            | 4000000                   | 3476986  |
| deepEqual - deepNested        | 248.77 ± 0.36%       | 250.00              | 4247397 ± 0.01%            | 4000000                   | 4019730  |
| deepEqualOld - large          | 55271.16 ± 0.26%     | 53000.00            | 18323 ± 0.12%              | 18868                     | 18093    |
| deepEqual - large             | 51595.76 ± 0.22%     | 50166.00            | 19558 ± 0.09%              | 19934                     | 19382    |
| deepEqualOld - nested         | 224.90 ± 0.43%       | 208.00              | 4710558 ± 0.01%            | 4807692                   | 4446323  |
| deepEqual - nested            | 206.82 ± 1.97%       | 208.00              | 5220827 ± 0.01%            | 4807692                   | 4835107  |
| deepEqualOld - simple         | 105.41 ± 2.47%       | 84.00               | 10232723 ± 0.01%           | 11904762                  | 9487104  |
| deepEqual - simple            | 97.03 ± 0.12%        | 84.00               | 10886491 ± 0.01%           | 11904762                  | 10306033 |
| deepEqualOld - differentTypes | 286.46 ± 0.25%       | 291.00              | 3597831 ± 0.01%            | 3436426                   | 3490926  |
| deepEqual - differentTypes    | 270.13 ± 0.33%       | 250.00              | 3825171 ± 0.01%            | 4000000                   | 3701909  |

| Task name                     | Latency average (ns) | Latency median (ns) | Throughput average (ops/s) | Throughput median (ops/s) | Samples |
| :---------------------------- | :------------------- | :------------------ | :------------------------- | :------------------------ | :------ |
| mergeDeepOld - array          | 531.02 ± 0.42%       | 500.00              | 1987906 ± 0.01%            | 2000000                   | 1883183 |
| mergeDeep - array             | 288.71 ± 0.65%       | 250.00              | 3767291 ± 0.01%            | 4000000                   | 3463626 |
| mergeDeepOld - deepNested     | 1734.54 ± 0.77%      | 1584.00             | 613841 ± 0.02%             | 631313                    | 576521  |
| mergeDeep - deepNested        | 1507.74 ± 0.25%      | 1458.00             | 681495 ± 0.02%             | 685871                    | 663243  |
| mergeDeepOld - large          | 431601.73 ± 0.20%    | 427334.00           | 2321 ± 0.14%               | 2340                      | 2317    |
| mergeDeep - large             | 89550.51 ± 0.25%     | 87166.00            | 11263 ± 0.13%              | 11472                     | 11167   |
| mergeDeepOld - nested         | 1846.04 ± 0.24%      | 1792.00             | 555216 ± 0.02%             | 558036                    | 541702  |
| mergeDeep - nested            | 1019.51 ± 0.21%      | 1000.00             | 1001240 ± 0.01%            | 1000000                   | 980860  |
| mergeDeepOld - simple         | 749.63 ± 0.05%       | 750.00              | 1345391 ± 0.01%            | 1333333                   | 1333984 |
| mergeDeep - simple            | 336.15 ± 0.43%       | 333.00              | 3109569 ± 0.01%            | 3003003                   | 2974851 |
| mergeDeepOld - differentTypes | 844.27 ± 0.46%       | 792.00              | 1226639 ± 0.01%            | 1262626                   | 1184451 |
| mergeDeep - differentTypes    | 367.67 ± 0.71%       | 333.00              | 2915247 ± 0.01%            | 3003003                   | 2719795 |
