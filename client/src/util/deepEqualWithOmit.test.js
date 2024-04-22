import { describe, expect, test } from "vitest";

import deepEqualWithOmit from "./deepEqualWithOmit";

describe("deepEqualWithOmit", () => {
  const deeplyNestedObject1 = {
    main: {
      secondary: [{ id: "not hello", notId: "hello" }],
      id: "not hello",
      notId: "hello",
    },
  };

  const deeplyNestedObject2 = {
    main: {
      secondary: [{ id: "hello", notId: "hello" }],
      id: "hello",
      notId: "hello",
    },
  };

  test("should omit specific fields", () => {
    const result = deepEqualWithOmit(deeplyNestedObject1, deeplyNestedObject2, [
      "id",
    ]);

    expect(result).toBe(true);
  });

  test("should be false when not omitting fields", () => {
    const result = deepEqualWithOmit(deeplyNestedObject1, deeplyNestedObject2);

    expect(result).toBe(false);
  });
});
