import { Bench } from "tinybench";
import { testCases } from "./data.js";
import { type BenchmarkResult, generateAndWriteMarkdown, generateSummaryJson } from "./helpers.js";
import { deepEqual, mergeDeep } from "./new-util.js";
import { deepEqualOld, mergeDeepOld } from "./old-util.js";

const WRITE_TO_FILE = process.env.WRITE_TO_FILE === "true";

const testCasesCopy = structuredClone(testCases);
const { array, deepNested, large, nested, simple, differentTypes } = testCases;
const {
	array: arrayCopy,
	deepNested: deepNestedCopy,
	large: largeCopy,
	nested: nestedCopy,
	simple: simpleCopy,
	differentTypes: differentTypesCopy,
} = testCasesCopy;
const benchDeepEqual = new Bench({ time: 1000, iterations: 1000 });
const benchMergeDeep = new Bench({ time: 1000, iterations: 1000 });
(async () => {
	benchDeepEqual
		.add("deepEqualOld - array", () => {
			deepEqualOld(array[0], array[1]);
		})
		.add("deepEqual - array", () => {
			deepEqual(array[0], array[1]);
		})
		.add("deepEqualOld - deepNested", () => {
			deepEqualOld(deepNested[0], deepNested[1]);
		})
		.add("deepEqual - deepNested", () => {
			deepEqual(deepNested[0], deepNested[1]);
		})
		.add("deepEqualOld - large", () => {
			deepEqualOld(large[0], large[1]);
		})
		.add("deepEqual - large", () => {
			deepEqual(large[0], large[1]);
		})
		.add("deepEqualOld - nested", () => {
			deepEqualOld(nested[0], nested[1]);
		})
		.add("deepEqual - nested", () => {
			deepEqual(nested[0], nested[1]);
		})
		.add("deepEqualOld - simple", () => {
			deepEqualOld(simple[0], simple[1]);
		})
		.add("deepEqual - simple", () => {
			deepEqual(simple[0], simple[1]);
		})
		.add("deepEqualOld - differentTypes", () => {
			deepEqualOld(differentTypes[0], differentTypes[1]);
		})
		.add("deepEqual - differentTypes", () => {
			deepEqual(differentTypes[0], differentTypes[1]);
		});

	console.log("deepEqual bench running...");
	await benchDeepEqual.run();
	console.log("deepEqual bench finished");

	benchMergeDeep
		.add("mergeDeepOld - array", () => {
			mergeDeepOld(arrayCopy[0], arrayCopy[1]);
		})
		.add("mergeDeep - array", () => {
			mergeDeep(array[0], array[1]);
		})
		.add("mergeDeepOld - deepNested", () => {
			mergeDeepOld(deepNestedCopy[0], deepNestedCopy[1]);
		})
		.add("mergeDeep - deepNested", () => {
			mergeDeep(deepNested[0], deepNested[1]);
		})
		.add("mergeDeepOld - large", () => {
			mergeDeepOld(largeCopy[0], largeCopy[2]);
		})
		.add("mergeDeep - large", () => {
			mergeDeep(large[0], large[2]);
		})
		.add("mergeDeepOld - nested", () => {
			mergeDeepOld(nestedCopy[0], nestedCopy[1]);
		})
		.add("mergeDeep - nested", () => {
			mergeDeep(nested[0], nested[1]);
		})
		.add("mergeDeepOld - simple", () => {
			mergeDeepOld(simpleCopy[0], simpleCopy[1]);
		})
		.add("mergeDeep - simple", () => {
			mergeDeep(simple[0], simple[1]);
		})
		.add("mergeDeepOld - differentTypes", () => {
			mergeDeepOld(differentTypesCopy[0], differentTypesCopy[1]);
		})
		.add("mergeDeep - differentTypes", () => {
			mergeDeep(differentTypes[0], differentTypes[1]);
		});

	console.log("mergeDeep bench running...");
	await benchMergeDeep.run();
	console.log("mergeDeep bench finished");

	const benchDeepEqualJson = benchDeepEqual.table() as BenchmarkResult[];
	const benchMergeDeepJson = benchMergeDeep.table() as BenchmarkResult[];

	if (WRITE_TO_FILE) {
		console.log("writing results to table...");
		generateAndWriteMarkdown([benchDeepEqualJson, benchMergeDeepJson]);
	} else {
		console.table(benchDeepEqualJson);
		console.table(generateSummaryJson(benchDeepEqualJson));
		console.table(benchMergeDeepJson);
		console.table(generateSummaryJson(benchDeepEqualJson));
	}
})();
