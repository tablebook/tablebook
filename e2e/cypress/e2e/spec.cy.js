beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit("/");
});

describe("Page", () => {
  it("loads", () => {});

  it("displays tablebook content", () => {
    cy.contains(/tablebook/i);
  });
});

describe("Scenarios", () => {
  it("Filling out minutes and sharing", () => {
    // Enter title
    cy.getByPlaceHolder("Enter the main title")
      .should("exist")
      .type("Test minutes");

    // Change agenda
    cy.getByValue("Agenda").should("exist").type(" today");
    cy.getByPlaceHolder("Enter the content")
      .first()
      .should("exist")
      .type("- Agenda test item 1\n- Agenda test item 2");

    // Delete decisions
    cy.getByValue("Decisions").should("exist");
    cy.getByTestId("deleteButton").eq(1).click();
    cy.getByValue("Decisions").should("not.exist");

    // Add plans
    cy.getByPlaceHolder("Enter the title").last().type("Plans");
    cy.getByPlaceHolder("Enter the content")
      .last()
      .type("- Plan item 1\n- Plan item 2");

    // Add intro segment
    cy.contains("Add field").click();
    cy.getByPlaceHolder("Enter the title").last().type("Intro");
    cy.getByPlaceHolder("Enter the content")
      .last()
      .type("- Starting item 1#\n- Starting item 2#");

    // Move intro segment to first
    cy.getByTestId("upButton").last().click();
    cy.getByTestId("upButton").eq(0).click();

    cy.getByTestId("segment-component")
      .first()
      .getByValue("Intro")
      .should("exist");

    cy.getByTestId("segment-component")
      .first()
      .get("textarea")
      .should("have.html", "- Starting item 1#\n- Starting item 2#");

    // Change color
    cy.getByTestId("color-picker-box").first().click();
    cy.getByTestId("color-picker-box")
      .parent()
      .find("input")
      .clear()
      .type("ffb2b2");

    cy.get("body").click(); // Click outside

    cy.getByTestId("color-picker-box").last().click();
    cy.getByTestId("color-picker-box")
      .parent()
      .find("input")
      .clear()
      .type("552a2a");

    cy.get("body").click(); // Click outside

    cy.getByTestId("editor-component").should(
      "have.css",
      "background-color",
      "rgb(85, 42, 42)",
    );

    cy.getByPlaceHolder("Enter the main title").should(
      "have.css",
      "color",
      "rgb(255, 178, 178)",
    );

    // Sign
    cy.getByTestId("signButton").click();
    cy.get("canvas").should("exist");
    cy.getByPlaceHolder("Enter name clarification").type("Tester");
    cy.contains("Confirm").click();

    // Check signature
    cy.contains("Tester");
    const date = new Date().toISOString().replace(/T.*/, "");
    cy.contains(date);

    // Share
    cy.contains("Share").click();
    cy.getByTestId("read-only-link").find("button").click();
    cy.contains(/Couldn't copy link to clipboard|Link copied to clipboard/); // Cypress browser clipboard sometimes doesn't work

    // Link starts with baseurl
    cy.getByTestId("write-link")
      .find("input")
      .invoke("val")
      .should(
        "match",
        new RegExp(`^${Cypress.config().baseUrl.replace(/\./g, "\\.")}`), // Starts with baseUrl
      );

    // Visit write link
    cy.getByTestId("write-link")
      .find("input")
      .invoke("val")
      .then((value) => {
        cy.visit(value);
      });

    // Correct minutes loaded in correct state
    cy.contains("Editing stored minutes");
    cy.getByPlaceHolder("Enter the main title").should(
      "have.value",
      "Test minutes",
    );
    cy.contains("Add field");

    // Edit and save
    cy.getByPlaceHolder("Enter the main title").type(" edited");
    cy.contains("Save").click();
    cy.contains("Minutes saved");

    // Edit and reload
    cy.getByPlaceHolder("Enter the main title").type(" twice");
    cy.contains("Reload").click();
    cy.contains("Successfully loaded minutes");
    cy.getByPlaceHolder("Enter the main title").should(
      "have.value",
      "Test minutes edited",
    );

    // Visit read link
    cy.contains("Share").click();

    cy.getByTestId("read-only-link")
      .find("input")
      .invoke("val")
      .then((value) => {
        cy.visit(value);
      });

    // Correct minutes loaded in correct state
    cy.contains("Reading stored minutes");
    cy.getByPlaceHolder("Enter the main title").should(
      "have.value",
      "Test minutes edited",
    );
    cy.contains("Add field").should("not.exist");

    // Create new minutes
    cy.contains("Create New").click();

    cy.getByPlaceHolder("Enter the main title").should("have.value", "");
  });
});
