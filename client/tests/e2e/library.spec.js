/* eslint-disable no-undef */

/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SEARCH_BAR = testId('search-bar');
const ADD_REMOVE_BUTTON = testId('add-and-remove-button');
const LIBRARY_BOOK = testId('library-book');
const BOOK_DETAILS = testId('book-details');

function clickAddButton() {
  cy.visit('/home');
  cy.get(SEARCH_BAR).type('Die Furcht des Weisen / Band 1');
  cy.get(ADD_REMOVE_BUTTON).first().contains('Add').click();
}

function checkForBook() {
  cy.get('[href="/mybooks"]').click();
  cy.get(LIBRARY_BOOK).should('contain', 'Weisen');
}

describe('Display added Books', () => {
  it('shows added books on /mybooks page', () => {
    clickAddButton();
    checkForBook();
  });
});

describe('Remove Books From Library', () => {
  it('removes book from /mybooks when clicking remove', () => {
    clickAddButton();
    checkForBook();
    cy.get('[href="/home"]').first().click();
    cy.get(SEARCH_BAR).type('Die Furcht des Weisen / Band 1');
    cy.get(ADD_REMOVE_BUTTON).contains('Remove').click();
    cy.get('[href="/mybooks"]').click();
    cy.get(LIBRARY_BOOK).should('not.exist');
  });
});

describe('Open Detail Page for Book', () => {
  it('opens the detail modal for the selected book on the library page', () => {
    clickAddButton();
    cy.get('[href="/mybooks"]').click();
    cy.get(LIBRARY_BOOK).click();
    cy.get(BOOK_DETAILS)
      .should('exist')
      .should('contain', 'Die Furcht des Weisen');
  });
});
