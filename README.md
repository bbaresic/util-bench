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

### Summary

| **Task Name**              | **Latency Improvement (%)** | **Throughput Improvement (%)** |
| -------------------------- | --------------------------- | ------------------------------ |
| deepEqual - array          | 5.73% faster                | 5.66% higher                   |
| deepEqual - deepNested     | 6.31% faster                | 7.29% higher                   |
| deepEqual - large          | 3.92% faster                | 4.89% higher                   |
| deepEqual - nested         | 5.44% faster                | 10.18% higher                  |
| deepEqual - simple         | 7.24% faster                | 7.46% higher                   |
| deepEqual - differentTypes | 2.14% faster                | 5.82% higher                   |
