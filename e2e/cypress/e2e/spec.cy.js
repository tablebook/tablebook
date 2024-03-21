beforeEach(() => {
  cy.visit("/");
});

describe("Page", () => {
  it("loads", () => {});

  it("displays tablebook content", () => {
    cy.contains(/tablebook/i);
  });
});
