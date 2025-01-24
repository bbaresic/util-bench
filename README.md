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
| mergeDeep - array          | 43.60% faster               | 88.39% higher                  |
| mergeDeep - deepNested     | 9.58% faster                | 9.52% higher                   |
| mergeDeep - large          | 79.87% faster               | 398.09% higher                 |
| mergeDeep - nested         | 43.05% faster               | 80.61% higher                  |
| mergeDeep - simple         | 53.14% faster               | 114.22% higher                 |
| mergeDeep - differentTypes | 52.47% faster               | 117.37% higher                 |

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
| mergeDeepOld - array          | 529.10 ± 0.51%       | 500.00                  | 2,003,018 ± 0.01%          | 2,000,000                     | 1,889,987   |
| mergeDeep - array             | 298.37 ± 0.89%       | 250.00                  | 3,774,086 ± 0.01%          | 4,000,000                     | 3,351,549   |
| mergeDeepOld - deepNested     | 1,734.54 ± 0.68%     | 1,584.00                | 609,032 ± 0.02%            | 631,313                       | 576,524     |
| mergeDeep - deepNested        | 1,568.35 ± 1.03%     | 1,459.00                | 666,896 ± 0.02%            | 685,401                       | 637,615     |
| mergeDeepOld - large          | 442,580.57 ± 0.33%   | 431,583.00              | 2,270 ± 0.25%              | 2,317                         | 2,260       |
| mergeDeep - large             | 89,096.28 ± 0.23%    | 86,792.00               | 11,308 ± 0.12%             | 11,522                        | 11,224      |
| mergeDeepOld - nested         | 1,856.51 ± 0.20%     | 1,792.00                | 547,660 ± 0.01%            | 558,036                       | 538,647     |
| mergeDeep - nested            | 1,057.30 ± 0.38%     | 1,000.00                | 989,265 ± 0.02%            | 1,000,000                     | 945,807     |
| mergeDeepOld - simple         | 727.28 ± 0.31%       | 667.00                  | 1,437,291 ± 0.01%          | 1,499,250                     | 1,374,987   |
| mergeDeep - simple            | 340.86 ± 0.40%       | 333.00                  | 3,077,178 ± 0.01%          | 3,003,003                     | 2,933,739   |
| mergeDeepOld - differentTypes | 801.65 ± 0.41%       | 750.00                  | 1,308,982 ± 0.02%          | 1,333,333                     | 1,247,430   |
| mergeDeep - differentTypes    | 381.00 ± 0.94%       | 334.00                  | 2,846,617 ± 0.01%          | 2,994,012                     | 2,624,642   |
