/* eslint-disable no-undef */
/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SUB_SHELF = testId('sub-shelf');
const COMPARTMENT = testId('compartment');
const NAME_PICKER = testId('name-picker');
const COLOR_PICKER = testId('color-picker');
const COLUMN_PICKER = testId('column-picker');
const COMPARTMENT_PICKER = testId('compartment-picker');
const NEW_SAVE_SHELF_BUTTON = testId('save-add-button');
const BACK_TO_SHELVES = testId('back-to-shelves');
const SHELVES_NAV = testId('shelves-nav');

function navigateToShelfCreator() {
  cy.visit('/home');
  cy.get('[href="/myshelves"]').click();
  cy.get(NEW_SAVE_SHELF_BUTTON).click();
}

describe('Create Shelves', () => {
  it('Draws the number of shelves that the user selects', () => {
    navigateToShelfCreator();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(SUB_SHELF).should('have.length', 3);
  });
  it('Applied the chosen color to the shelf', () => {
    navigateToShelfCreator();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COLOR_PICKER).select('white');
    cy.get(SUB_SHELF).should('have.css', 'border-color', 'rgb(211, 211, 211)');
  });
  it('Applied the correct number of compartments to the shelf', () => {
    navigateToShelfCreator();
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COMPARTMENT_PICKER).first().select('3');
    cy.get(SUB_SHELF).first().get(COMPARTMENT).should('have.length', 3);
  });
});

describe('Save Shelves', () => {
  it('Saves the created shelf', () => {
    navigateToShelfCreator();
    cy.get(NAME_PICKER).type('TEST_SHELF');
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COLOR_PICKER).select('white');
    cy.get(NEW_SAVE_SHELF_BUTTON).click();
    cy.get(BACK_TO_SHELVES).click();
    cy.get(SUB_SHELF).should('have.length', 3);
    cy.get(SUB_SHELF).should('have.css', 'border-color', 'rgb(211, 211, 211)');
    cy.get(SHELVES_NAV).should('contain', 'TEST_SHELF');
  });
});
