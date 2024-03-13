import { expect, test, describe, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

describe("SideBar", () => {
    beforeEach(() => {
        render(<SideBar/>);
    });

    test("renders the primary color box", () => {
        const primaryColorBox = screen.getByText("PRIMARY COLOR");
        expect(primaryColorBox).toBeDefined();
    });

    test("renders the secondary color box", () => {
        const secondaryColorBox = screen.getByText("SECONDARY COLOR");
        expect(secondaryColorBox).toBeDefined();
    });

    test("renders the add a field button", () => {
        const addAFieldButton = screen.getByText("Add a field", { selector: "button"});
        expect(addAFieldButton).toBeDefined();
    });

    test("renders the sign button", () => {
        const signButton = screen.getByText("Sign", { selector: "button"});
        expect(signButton).toBeDefined();
    });

    test("renders the preview button", () => {
        const previewButton = screen.getByText("Preview", { selector: "button"});
        expect(previewButton).toBeDefined();
    });
})