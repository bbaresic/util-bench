import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tablemark from "tablemark";

export type BenchmarkResult = {
	"Task name": string;
	"Latency average (ns)": string;
	"Latency median (ns)": string;
	"Throughput average (ops/s)": string;
	"Throughput median (ops/s)": string;
	Samples: number;
};

export type SummaryResult = {
	"Task name": string;
	"Latency Improvement (%)": string;
	"Throughput Improvement (%)": string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function calculatePercentChange(oldValue: number, newValue: number): number {
	if (oldValue === 0) return 0;
	return ((newValue - oldValue) / oldValue) * 100;
}

function formatChange(percent: number, higherIsBetter: boolean): string {
	const sign = percent >= 0 ? "+" : "";
	const formatted = `${sign}${percent.toFixed(2)}%`;
	const isImprovement = higherIsBetter ? percent > 0 : percent < 0;
	return `${formatted} ${isImprovement ? "improvement" : "regression"}`;
}

export function generateSummaryJson(results: BenchmarkResult[], differenceSymbol = "old"): SummaryResult[] {
	const differenceSymbolRegex = new RegExp(differenceSymbol, "i");
	const nonNumericRegex = /[^\d.]/g;

	const oldMap: Record<string, BenchmarkResult> = {};
	const newMap: Record<string, BenchmarkResult> = {};

	// Separate old vs new
	for (const result of results) {
		const normalizedName = result["Task name"].replace(differenceSymbolRegex, "").trim().toLowerCase();

		if (result["Task name"].toLowerCase().includes(differenceSymbol)) {
			oldMap[normalizedName] = result;
		} else {
			newMap[normalizedName] = result;
		}
	}

	const summary: SummaryResult[] = [];

	Object.keys(oldMap).forEach((name) => {
		if (newMap[name]) {
			const oldVal = oldMap[name];
			const newVal = newMap[name];

			const oldLatency = Number.parseFloat(oldVal["Latency average (ns)"].replace(nonNumericRegex, ""));
			const newLatency = Number.parseFloat(newVal["Latency average (ns)"].replace(nonNumericRegex, ""));
			const latencyChange = calculatePercentChange(oldLatency, newLatency);
			const latencyStr = formatChange(latencyChange, false);

			const oldThroughput = Number.parseFloat(oldVal["Throughput average (ops/s)"].replace(nonNumericRegex, ""));
			const newThroughput = Number.parseFloat(newVal["Throughput average (ops/s)"].replace(nonNumericRegex, ""));
			const throughputChange = calculatePercentChange(oldThroughput, newThroughput);
			const throughputStr = formatChange(throughputChange, true);

			summary.push({
				"Task name": newVal["Task name"],
				"Latency Improvement (%)": latencyStr,
				"Throughput Improvement (%)": throughputStr,
			});
		}
	});

	return summary;
}

export function generateBenchmarkMarkdown(tables: BenchmarkResult[][]): string {
	let markdown = "";
	tables.forEach((table) => {
		markdown += `${tablemark(table, { caseHeaders: false })}\n\n`;
	});
	return markdown;
}

export function generateSummaryMarkdown(tables: BenchmarkResult[][], differenceSymbol = "old"): string {
	let markdown = "";
	tables.forEach((table) => {
		const summary = generateSummaryJson(table, differenceSymbol);
		markdown += `${tablemark(summary, { caseHeaders: false })}\n\n`;
	});
	return markdown;
}

export function generateAndWriteMarkdown(tables: BenchmarkResult[][]): string {
	const benchmarkMarkdown = generateBenchmarkMarkdown(tables);
	const summaryMarkdown = generateSummaryMarkdown(tables);

	const outputDir = path.join(__dirname, "benchmark-results");
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	const benchmarkPath = path.join(outputDir, "benchmark-results.md");
	const summaryPath = path.join(outputDir, "summary.md");

	console.log(`Benchmark path: ${benchmarkPath}`);
	console.log(`Summary path: ${summaryPath}`);

	try {
		fs.writeFileSync(benchmarkPath, benchmarkMarkdown);
		fs.writeFileSync(summaryPath, summaryMarkdown);
		console.log("Files written successfully.");
	} catch (error) {
		console.error("Error writing files:", error);
	}

	return benchmarkMarkdown + summaryMarkdown;
}
