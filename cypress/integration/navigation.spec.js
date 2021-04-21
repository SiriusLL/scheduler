

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should find the day that contains Tuesday", () => {
    cy.visit("/");
    //cy.contains("li", "Tuesday")
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)");
    .should("have.class", "day-list__item--selected")

  });
});