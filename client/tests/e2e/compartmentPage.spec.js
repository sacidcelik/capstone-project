/* eslint-disable no-undef */
/// <reference types='Cypress' />

const testId = (id) => `[data-test-id="${id}"]`;

const NAME_PICKER = testId('name-picker');
const COLOR_PICKER = testId('color-picker');
const COLUMN_PICKER = testId('column-picker');
const NEW_SAVE_SHELF_BUTTON = testId('save-add-button');
const BACK_TO_SHELVES = testId('back-to-shelves');
const SEARCH_BAR = testId('search-bar');
const ADD_REMOVE_BUTTON = testId('add-and-remove-button');
const BOOK_BOOKSHELF_PICKER = testId('book-to-bookshelf-picker');
const BOOK_COLUMN_PICKER = testId('book-to-column-picker');
const BOOK_COMPARTMENT_PICKER = testId('book-to-compartment-picker');
const COMPARTMENT_LINK = testId('compartment-link');
const LIBRARY_BOOK = testId('library-book');

function clickAddButton() {
  cy.get(SEARCH_BAR).type('Weisen');
  cy.get(ADD_REMOVE_BUTTON).first().contains('Add').click();
}

function navigateToShelfCreator() {
  cy.visit('/home');
  cy.get('[href="/myshelves"]').click();
  cy.get(NEW_SAVE_SHELF_BUTTON).click();
}

function checkForBook() {
  cy.get('[href="/myshelves"]').click({ timeout: 6000 });
  cy.get(COMPARTMENT_LINK).first().click();
  cy.get(LIBRARY_BOOK).should('contain', 'Weisen');
}

describe('Adding book to compartment stores it there', () => {
  it('Display added book on compartment page', () => {
    navigateToShelfCreator();
    cy.get(NAME_PICKER).type('TEST_SHELF');
    cy.get(COLUMN_PICKER).select('3');
    cy.get(COLOR_PICKER).select('white');
    cy.get(NEW_SAVE_SHELF_BUTTON).click();
    cy.get(BACK_TO_SHELVES).click();
    cy.get('[href="/home"]').first().click();
    clickAddButton();
    cy.get(BOOK_BOOKSHELF_PICKER).select('TEST_SHELF');
    cy.get(BOOK_COLUMN_PICKER).select('1');
    cy.get(BOOK_COMPARTMENT_PICKER).select('1');
    cy.get(NEW_SAVE_SHELF_BUTTON).click();
    checkForBook();
  });
});
