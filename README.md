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
| deepEqual - array          | -9.23% improvement      | +8.50% improvement         |
| deepEqual - deepNested     | -9.08% improvement      | +11.59% improvement        |
| deepEqual - large          | -5.92% improvement      | +8.42% improvement         |
| deepEqual - nested         | -10.85% improvement     | +13.85% improvement        |
| deepEqual - simple         | -18.99% improvement     | +17.45% improvement        |
| deepEqual - differentTypes | -9.44% improvement      | +10.17% improvement        |

| Task name                  | Latency Improvement (%) | Throughput Improvement (%) |
| :------------------------- | :---------------------- | :------------------------- |
| mergeDeep - array          | -40.10% improvement     | +83.07% improvement        |
| mergeDeep - deepNested     | -7.84% improvement      | +8.12% improvement         |
| mergeDeep - large          | -80.00% improvement     | +395.95% improvement       |
| mergeDeep - nested         | -46.51% improvement     | +85.18% improvement        |
| mergeDeep - simple         | -58.41% improvement     | +132.15% improvement       |
| mergeDeep - differentTypes | -56.36% improvement     | +138.65% improvement       |


## Results (MacBook Pro M2)

| Task name                     | Latency average (ns) | Latency median (ns) | Throughput average (ops/s) | Throughput median (ops/s) | Samples |
| :---------------------------- | :------------------- | :------------------ | :------------------------- | :------------------------ | :------ |
| deepEqualOld - array          | 389.94 ± 0.40%       | 375.00              | 2724953 ± 0.01%            | 2666667                   | 2564480 |
| deepEqual - array             | 353.95 ± 0.33%       | 333.00              | 2956457 ± 0.01%            | 3003003                   | 2825294 |
| deepEqualOld - deepNested     | 307.19 ± 1.05%       | 292.00              | 3434427 ± 0.01%            | 3424658                   | 3255357 |
| deepEqual - deepNested        | 279.29 ± 0.36%       | 250.00              | 3832571 ± 0.01%            | 4000000                   | 3580542 |
| deepEqualOld - large          | 59214.79 ± 0.60%     | 55750.00            | 17371 ± 0.15%              | 17937                     | 16888   |
| deepEqual - large             | 55710.91 ± 0.89%     | 51541.00            | 18834 ± 0.16%              | 19402                     | 17950   |
| deepEqualOld - nested         | 280.73 ± 0.46%       | 250.00              | 3777229 ± 0.01%            | 4000000                   | 3562130 |
| deepEqual - nested            | 250.28 ± 0.47%       | 250.00              | 4300209 ± 0.01%            | 4000000                   | 3995558 |
| deepEqualOld - simple         | 149.33 ± 2.40%       | 125.00              | 7661044 ± 0.01%            | 8000000                   | 6696466 |
| deepEqual - simple            | 120.98 ± 0.40%       | 125.00              | 8998020 ± 0.01%            | 8000000                   | 8265833 |
| deepEqualOld - differentTypes | 337.18 ± 0.28%       | 333.00              | 3063344 ± 0.01%            | 3003003                   | 2965802 |
| deepEqual - differentTypes    | 305.35 ± 0.18%       | 292.00              | 3374887 ± 0.01%            | 3424658                   | 3274944 |

| Task name                     | Latency average (ns) | Latency median (ns) | Throughput average (ops/s) | Throughput median (ops/s) | Samples |
| :---------------------------- | :------------------- | :------------------ | :------------------------- | :------------------------ | :------ |
| mergeDeepOld - array          | 540.44 ± 0.59%       | 500.00              | 1972887 ± 0.01%            | 2000000                   | 1850578 |
| mergeDeep - array             | 323.70 ± 1.18%       | 291.00              | 3611748 ± 0.01%            | 3436426                   | 3089913 |
| mergeDeepOld - deepNested     | 1705.74 ± 0.34%      | 1625.00             | 610094 ± 0.02%             | 615385                    | 586256  |
| mergeDeep - deepNested        | 1572.03 ± 0.35%      | 1500.00             | 659664 ± 0.02%             | 666667                    | 636119  |
| mergeDeepOld - large          | 464709.40 ± 1.25%    | 439958.00           | 2204 ± 0.41%               | 2273                      | 2152    |
| mergeDeep - large             | 92962.00 ± 0.41%     | 89000.00            | 10931 ± 0.16%              | 11236                     | 10758   |
| mergeDeepOld - nested         | 1959.30 ± 0.47%      | 1875.00             | 528007 ± 0.02%             | 533333                    | 510387  |
| mergeDeep - nested            | 1048.11 ± 0.31%      | 1000.00             | 977743 ± 0.01%             | 1000000                   | 954098  |
| mergeDeepOld - simple         | 863.15 ± 3.61%       | 791.00              | 1274121 ± 0.02%            | 1264223                   | 1158542 |
| mergeDeep - simple            | 358.97 ± 0.60%       | 333.00              | 2957820 ± 0.01%            | 3003003                   | 2785757 |
| mergeDeepOld - differentTypes | 913.25 ± 0.89%       | 834.00              | 1167189 ± 0.01%            | 1199041                   | 1094986 |
| mergeDeep - differentTypes    | 398.50 ± 1.01%       | 375.00              | 2785454 ± 0.01%            | 2666667                   | 2509735 |
