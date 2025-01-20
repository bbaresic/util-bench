# Prebid Util Benchmarks

This tries to benchmark a updated implementation of Prebid Util functions, specifically `deepEqual` and `mergeDeep`.

This is a micro-benchmark, and that comes with caveats.

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

## My Results (MacBook Pro M2)

| **Task Name**                 | **Latency Avg (ns)** | **Latency Median (ns)** | **Throughput Avg (ops/s)** | **Throughput Median (ops/s)** | **Samples** |
| ----------------------------- | -------------------- | ----------------------- | -------------------------- | ----------------------------- | ----------- |
| deepEqualOld - array          | 346.88 ± 0.34%       | 333.00                  | 3060470 ± 0.01%            | 3003003                       | 2882814     |
| deepEqual - array             | 327.02 ± 0.36%       | 292.00                  | 3233289 ± 0.01%            | 3424658                       | 3057922     |
| deepEqualOld - deepNested     | 280.96 ± 0.09%       | 250.00                  | 3677474 ± 0.01%            | 4000000                       | 3559282     |
| deepEqual - deepNested        | 263.22 ± 0.14%       | 250.00                  | 3945542 ± 0.01%            | 4000000                       | 3799094     |
| deepEqualOld - large          | 59350.25 ± 0.62%     | 53833.00                | 17548 ± 0.20%              | 18576                         | 16850       |
| deepEqual - large             | 57028.11 ± 0.89%     | 51417.00                | 18406 ± 0.19%              | 19449                         | 17536       |
| deepEqualOld - nested         | 247.85 ± 0.64%       | 209.00                  | 4481655 ± 0.01%            | 4784689                       | 4034774     |
| deepEqual - nested            | 234.36 ± 1.84%       | 208.00                  | 4937229 ± 0.01%            | 4807692                       | 4266912     |
| deepEqualOld - simple         | 113.32 ± 0.23%       | 125.00                  | 9704337 ± 0.01%            | 8000000                       | 8824255     |
| deepEqual - simple            | 105.10 ± 0.22%       | 84.00                   | 10425017 ± 0.01%           | 11904762                      | 9514930     |
| deepEqualOld - differentTypes | 306.08 ± 0.30%       | 292.00                  | 3441048 ± 0.01%            | 3424658                       | 3267075     |
| deepEqual - differentTypes    | 299.52 ± 0.57%       | 291.00                  | 3641159 ± 0.01%            | 3436426                       | 3338722     |

| **Task Name**                 | **Latency Avg (ns)** | **Latency Median (ns)** | **Throughput Avg (ops/s)** | **Throughput Median (ops/s)** | **Samples** |
| ----------------------------- | -------------------- | ----------------------- | -------------------------- | ----------------------------- | ----------- |
| mergeDeepOld - array          | 562.25 ± 0.58%       | 500.00                  | 1935958 ± 0.01%            | 2000000                       | 1778564     |
| mergeDeep - array             | 327.58 ± 0.80%       | 292.00                  | 3421012 ± 0.01%            | 3424658                       | 3052650     |
| mergeDeepOld - deepNested     | 1613.95 ± 0.85%      | 1417.00                 | 684271 ± 0.03%             | 705716                        | 619600      |
| mergeDeep - deepNested        | 1518.31 ± 0.69%      | 1375.00                 | 703170 ± 0.02%             | 727273                        | 658629      |
| mergeDeepOld - large          | 537988.92 ± 0.57%    | 520709.00               | 1876 ± 0.35%               | 1920                          | 1859        |
| mergeDeep - large             | 89401.23 ± 0.76%     | 82562.50 ± 20.50        | 11603 ± 0.21%              | 12112 ± 3                     | 11186       |
| mergeDeepOld - nested         | 2009.20 ± 0.72%      | 1875.00                 | 526159 ± 0.02%             | 533333                        | 497711      |
| mergeDeep - nested            | 1072.80 ± 0.64%      | 1000.00                 | 984056 ± 0.01%             | 1000000                       | 932145      |
| mergeDeepOld - simple         | 810.24 ± 0.21%       | 791.00                  | 1271587 ± 0.01%            | 1264223                       | 1234205     |
| mergeDeep - simple            | 358.76 ± 0.38%       | 333.00                  | 2961781 ± 0.01%            | 3003003                       | 2787397     |
| mergeDeepOld - differentTypes | 829.02 ± 0.45%       | 791.00                  | 1263291 ± 0.01%            | 1264222                       | 1206249     |
| mergeDeep - differentTypes    | 444.14 ± 0.52%       | 417.00                  | 2392547 ± 0.01%            | 2398082                       | 2251817     |

### Summary

| **Task Name**              | **Latency Improvement (%)** | **Throughput Improvement (%)** |
| -------------------------- | --------------------------- | ------------------------------ |
| deepEqual - array          | 5.73% faster                | 5.66% higher                   |
| deepEqual - deepNested     | 6.31% faster                | 7.29% higher                   |
| deepEqual - large          | 3.92% faster                | 4.89% higher                   |
| deepEqual - nested         | 5.44% faster                | 10.18% higher                  |
| deepEqual - simple         | 7.24% faster                | 7.46% higher                   |
| deepEqual - differentTypes | 2.14% faster                | 5.82% higher                   |

| **Task Name**              | **Latency Improvement (%)** | **Throughput Improvement (%)** |
| -------------------------- | --------------------------- | ------------------------------ |
| mergeDeep - array          | 41.73% faster               | 76.67% higher                  |
| mergeDeep - deepNested     | 5.93% faster                | 2.76% higher                   |
| mergeDeep - large          | 83.38% faster               | 518.40% higher                 |
| mergeDeep - nested         | 46.59% faster               | 86.97% higher                  |
| mergeDeep - simple         | 55.72% faster               | 132.92% higher                 |
| mergeDeep - differentTypes | 46.40% faster               | 89.42% higher                  |
