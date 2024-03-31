import React from "react";
import { describe, beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from "@mui/material";
import SegmentContainer from "./SegmentContainer";

describe("SegmentContainer", () => {
  beforeEach(() => {
    render(
      <SegmentContainer>
        <Typography>test child</Typography>
      </SegmentContainer>,
    );
  });

  test("renders its children", () => {
    const childTypography = screen.getByText("test child");
    expect(childTypography).toBeInTheDocument();
  });
});
