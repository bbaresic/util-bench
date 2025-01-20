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

## Summary

| **Task Name**              | **Latency Improvement (%)** | **Throughput Improvement (%)** |
| -------------------------- | --------------------------- | ------------------------------ |
| deepEqual - array          | 5.87% faster                | 5.98% higher                   |
| deepEqual - deepNested     | 9.13% faster                | 8.79% higher                   |
| deepEqual - large          | 5.17% faster                | 5.93% higher                   |
| deepEqual - nested         | 8.79% faster                | 9.97% higher                   |
| deepEqual - simple         | 5.65% faster                | 6.05% higher                   |
| deepEqual - differentTypes | 5.44% faster                | 6.73% higher                   |

| **Task Name**              | **Latency Improvement (%)** | **Throughput Improvement (%)** |
| -------------------------- | --------------------------- | ------------------------------ |
| mergeDeep - array          | 43.05% faster               | 78.38% higher                  |
| mergeDeep - deepNested     | 6.79% faster                | 6.69% higher                   |
| mergeDeep - large          | 77.70% faster               | 423.83% higher                 |
| mergeDeep - nested         | 44.78% faster               | 82.66% higher                  |
| mergeDeep - simple         | 55.16% faster               | 133.14% higher                 |
| mergeDeep - differentTypes | 45.06% faster               | 97.81% higher                  |

## Results (MacBook Pro M2)

| **Task Name**                 | **Latency Avg (ns)** | **Latency Median (ns)** | **Throughput Avg (ops/s)** | **Throughput Median (ops/s)** | **Samples** |
| ----------------------------- | -------------------- | ----------------------- | -------------------------- | ----------------------------- | ----------- |
| deepEqualOld - array          | 356.64 ± 0.90%       | 333.00                  | 3011972 ± 0.01%            | 3003003                       | 2803915     |
| deepEqual - array             | 335.70 ± 0.79%       | 292.00                  | 3192239 ± 0.01%            | 3424658                       | 2978847     |
| deepEqualOld - deepNested     | 298.55 ± 2.31%       | 250.00                  | 3672406 ± 0.01%            | 4000000                       | 3349507     |
| deepEqual - deepNested        | 271.27 ± 0.50%       | 250.00                  | 3994761 ± 0.01%            | 4000000                       | 3686359     |
| deepEqualOld - large          | 59362.33 ± 0.49%     | 54458.00                | 17392 ± 0.18%              | 18363                         | 16846       |
| deepEqual - large             | 56289.38 ± 0.55%     | 51542.00                | 18424 ± 0.18%              | 19402                         | 17766       |
| deepEqualOld - nested         | 247.79 ± 1.23%       | 209.00                  | 4487836 ± 0.01%            | 4784689                       | 4035725     |
| deepEqual - nested            | 226.01 ± 0.74%       | 208.00                  | 4935182 ± 0.01%            | 4807692                       | 4424577     |
| deepEqualOld - simple         | 110.98 ± 0.24%       | 125.00                  | 9750154 ± 0.01%            | 8000000                       | 9010804     |
| deepEqual - simple            | 104.70 ± 0.19%       | 84.00                   | 10339965 ± 0.01%           | 11904762                      | 9551259     |
| deepEqualOld - differentTypes | 300.05 ± 0.22%       | 292.00                  | 3456043 ± 0.01%            | 3424658                       | 3332738     |
| deepEqual - differentTypes    | 283.71 ± 0.43%       | 250.00                  | 3688606 ± 0.01%            | 4000000                       | 3524678     |

| **Task Name**                 | **Latency Avg (ns)** | **Latency Median (ns)** | **Throughput Avg (ops/s)** | **Throughput Median (ops/s)** | **Samples** |
| ----------------------------- | -------------------- | ----------------------- | -------------------------- | ----------------------------- | ----------- |
| mergeDeepOld - array          | 553.52 ± 0.35%       | 500.00                  | 1907469 ± 0.01%            | 2000000                       | 1806630     |
| mergeDeep - array             | 315.16 ± 0.43%       | 292.00                  | 3401842 ± 0.01%            | 3424658                       | 3172961     |
| mergeDeepOld - deepNested     | 1724.80 ± 0.36%      | 1625.00                 | 607658 ± 0.02%             | 615385                        | 579777      |
| mergeDeep - deepNested        | 1607.67 ± 0.39%      | 1500.00                 | 648316 ± 0.02%             | 666667                        | 622020      |
| mergeDeepOld - large          | 459869.37 ± 0.42%    | 442584.00               | 2190 ± 0.31%               | 2259                          | 2175        |
| mergeDeep - large             | 102611.95 ± 1.94%    | 90416.00                | 10471 ± 0.27%              | 11060                         | 9746        |
| mergeDeepOld - nested         | 1989.54 ± 0.47%      | 1875.00                 | 525477 ± 0.02%             | 533333                        | 502628      |
| mergeDeep - nested            | 1098.50 ± 0.50%      | 1000.00                 | 959857 ± 0.02%             | 1000000                       | 910329      |
| mergeDeepOld - simple         | 805.80 ± 0.16%       | 791.00                  | 1274497 ± 0.01%            | 1264223                       | 1241002     |
| mergeDeep - simple            | 361.37 ± 0.69%       | 333.00                  | 2971591 ± 0.01%            | 3003003                       | 2767816     |
| mergeDeepOld - differentTypes | 911.57 ± 0.85%       | 833.00                  | 1173979 ± 0.01%            | 1200480                       | 1097003     |
| mergeDeep - differentTypes    | 501.05 ± 1.39%       | 417.00                  | 2322127 ± 0.01%            | 2398082                       | 1995823     |
