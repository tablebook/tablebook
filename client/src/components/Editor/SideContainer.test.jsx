import React from "react";
import { describe, beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Typography } from "@mui/material";
import SideContainer from "./SideContainer";

describe("SideContainer", () => {
  beforeEach(() => {
    render(
      <SideContainer>
        <Typography>test child</Typography>
      </SideContainer>,
    );
  });

  test("renders its children", () => {
    const childTypography = screen.getByText("test child");
    expect(childTypography).toBeInTheDocument();
  });
});
