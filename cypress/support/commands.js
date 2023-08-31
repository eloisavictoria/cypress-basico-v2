// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Usuario 1 TAT');
    cy.get('#lastName').type('Sobrenome 1 TAT');
    cy.get('#email').type('teste@TAT.com.br');
    cy.get('#phone').type('62999999999');
    cy.get('#open-text-area').type('Uso do command');
    cy.contains('.button', 'Enviar').click();
    //cy.get('.button').should('have.text', 'Enviar').click();
})