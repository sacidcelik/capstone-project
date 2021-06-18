/* eslint-disable no-undef */

/// <reference types='Cypress' />

describe('Use the Navigation', () => {
  it('Visits the Home Page', () => {
    cy.visit('/home');
    cy.get('h2').should('contain', 'Home');
  });
  it('navigates to the My Shelves Page', () => {
    cy.visit('/home');
    cy.get('[href="/myshelves"]').click();
    cy.url().should('include', '/myshelves');
    cy.get('h2').should('contain', 'Shelves');
  });
  it('navigates to the My Books Page', () => {
    cy.visit('/home');
    cy.get('[href="/mybooks"]').click();
    cy.url().should('include', '/mybooks');
    cy.get('h2').should('contain', 'Books');
  });
  it('navigates back to Home', () => {
    cy.visit('/home');
    cy.get('[href="/mybooks"]').click();
    cy.url().should('include', '/mybooks');
    cy.get('[href="/home"]').first().click();
    cy.url().should('include', '/home');
    cy.get('h2').should('contain', 'Home');
  });
});
