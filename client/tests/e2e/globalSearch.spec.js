/* eslint-disable no-undef */

/// <reference types='Cypress' />

const testId = (id) => `[data-testid="${id}"]`;
const SEARCH_RESULT = testId('searchresult');
const SEARCH_BAR = testId('searchbar');

describe('Search for books', () => {
  it('Returns no search results for terms with two or fewer characters', () => {
    cy.visit('/home');
    cy.get(SEARCH_BAR).type('We');
    cy.get(SEARCH_RESULT).should('have.length', 0);
  });
  it('Returns Search Results', () => {
    cy.visit('/home');
    cy.get(SEARCH_BAR).type('Weisen');
    cy.get(SEARCH_RESULT).should('have.length', 25).should('contain', 'Weisen');
  });
});
