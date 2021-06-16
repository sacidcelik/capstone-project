/* eslint-disable no-undef */
/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SUB_SHELF = testId('sub-shelf');
const COMPARTMENT = testId('compartment');
const COLOR_PICKER = testId('color-picker');
const COLUMN_PICKER = testId('column-picker');
const COMPARTMENT_PICKER = testId('compartment-picker');
const SHELF_CONFIG = testId('shelf-config');

describe('Create Shelves', () => {
  it('Draws the number of shelves that the user selects', () => {
    cy.visit('/home');
    cy.get('[href="/myshelves"]').click();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(SUB_SHELF).should('have.length', 3);
  });
  it('Applied the chosen color to the shelf', () => {
    cy.visit('/home');
    cy.get('[href="/myshelves"]').click();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COLOR_PICKER).select('white');
    cy.get(SUB_SHELF).should('have.css', 'border-color', 'rgb(211, 211, 211)');
  });
  it('Applied the correct number of compartments to the shelf', () => {
    cy.visit('/home');
    cy.get('[href="/myshelves"]').click();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COMPARTMENT_PICKER).first().select('3');
    cy.get(SUB_SHELF).first().get(COMPARTMENT).should('have.length', 3);
  });
});