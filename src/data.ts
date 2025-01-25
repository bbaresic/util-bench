const arrayObject1 = { arr: [1, 2, 3, { a: 1, b: 2 }, 5] };
const arrayObject2 = { arr: [1, 2, 3, { a: 1, b: 3 }, 5] };

const deepNestedObject1 = {
	a: { b: { c: { d: { e: { f: { g: 1, h: 1 } } } } } },
};
const deepNestedObject2 = {
	a: { b: { c: { d: { e: { f: { g: 2, h: 1 } } } } } },
};

const differentTypesObject1 = { a: 1, b: "string", c: true, d: [1, 2, 3] };
const differentTypesObject2 = { a: 1, b: "string", c: true, d: [1, 2, 4] };

const largeObject1: Record<string, number> = {};
const largeObject2: Record<string, number> = {};
const largeObject3: Record<string, number> = {};

for (let i = 0; i < 1000; i++) {
	largeObject1[`key${i}`] = i;
	largeObject2[`key${i}`] = i;
	largeObject3[`key${i + 1000}`] = i + 1;
}

const nestedObject1 = {
	a: 1,
	b: { x: 10, y: 20, z: { p: 100, q: 200 } },
	c: 3,
};
const nestedObject2 = {
	a: 1,
	b: { x: 10, y: 20, z: { p: 100, q: 201 } },
	c: 3,
};

const simpleObject1 = { a: 1, b: 2, c: 3 };
const simpleObject2 = { a: 1, b: 2, c: 4 };

export const testCases = {
	simple: [simpleObject1, simpleObject2],
	nested: [nestedObject1, nestedObject2],
	large: [largeObject1, largeObject2, largeObject3],
	deepNested: [deepNestedObject1, deepNestedObject2],
	array: [arrayObject1, arrayObject2],
	differentTypes: [differentTypesObject1, differentTypesObject2],
};
