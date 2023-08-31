// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

//suite de testes
describe('Central de Atendimento ao Cliente TAT', function() {
    const TRES_SEG_EM_MS = 3000;

    beforeEach(() =>{
        cy.visit('./src/index.html');
    })
    //caso de teste
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.clock();
        //const longText = 'Aprender cypress do basico para poder aplicar no meu trabalho e adquirir conhecimento na area de automação de testes. Teste'
        const textoLongo = Cypress._.repeat('Aprender cypress do basico para poder aplicar no meu trabalho e adquirir conhecimento na area de automação de testes. Teste', 5);

        cy.get('#firstName').type('Usuario 1 TAT');
        cy.get('#lastName').type('Sobrenome 1 TAT');
        cy.get('#email').type('teste@TAT.com.br');
        cy.get('#phone').type('62999999999');
        cy.get('#open-text-area').type(textoLongo, {delay:0});
        cy.contains('.button', 'Enviar').click();
        //cy.get('.button').should('have.text', 'Enviar').click();
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');

        cy.tick(TRES_SEG_EM_MS)
        cy.get('.success').should('not.be.visible', 'Mensagem enviada com sucesso.');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock();
        cy.get('#firstName').type('Usuario 1 TAT');
        cy.get('#lastName').type('Sobrenome 1 TAT');
        cy.get('#email').type('teste!TAT.com.br');
        cy.get('#phone').type('62999999999');
        cy.get('#open-text-area').type('Curso cypress', {delay:0});
        cy.contains('.button', 'Enviar').click();
        //cy.get('.button').should('have.text', 'Enviar').click();
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');

        cy.tick(TRES_SEG_EM_MS)
        cy.get('.error').should('not.be.visible', 'Valide os campos obrigatórios!');
    })

    it('valida campo de telefone com valor não numérico deve permanecer vazio', function() {
        cy.get('#phone').type('teste')
        .should('have.value', '');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock();
        cy.get('#firstName').type('Usuario 1 TAT');
        cy.get('#lastName').type('Sobrenome 1 TAT');
        cy.get('#email').type('teste@TAT.com.br');
        //cy.get('#phone-checkbox').click();
        cy.get('input[value="phone"]').check()
        .should('be.checked');
        
        cy.get('#open-text-area').type('Curso cypress', {delay:0});
        cy.contains('.button', 'Enviar').click();
        //cy.get('.button').should('have.text', 'Enviar').click();
        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');

        cy.tick(TRES_SEG_EM_MS);
        cy.get('.error').should('not.be.visible', 'Valide os campos obrigatórios!');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Usuario 1 TAT')
        .should('have.value', 'Usuario 1 TAT')
        .clear()
        .should('have.value', '');

        cy.get('#lastName')
        .type('Sobrenome 1 TAT')
        .should('have.value', 'Sobrenome 1 TAT')
        .clear()
        .should('have.value', '');

        cy.get('#email')
        .type('teste@TAT.com.br')
        .should('have.value', 'teste@TAT.com.br')
        .clear()
        .should('have.value', '');

        cy.get('#phone')
        .type('62999999999')
        .should('have.value', '62999999999')
        .clear()
        .should('have.value', '');
       
    })

    Cypress._.times(5, () =>{
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
            cy.clock();
            //cy.get('.button').should('have.text', 'Enviar').click();
            cy.contains('.button', 'Enviar').click();
            cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');

            cy.tick(TRES_SEG_EM_MS);
            cy.get('.error').should('not.be.visible', 'Valide os campos obrigatórios!');
        })  
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');

        cy.tick(TRES_SEG_EM_MS);
        cy.get('.success').should('not.be.visible', 'Mensagem enviada com sucesso.');
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube');
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria');
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1)
        .should('have.value', 'blog');
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback');
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json')
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .then(input =>{
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('fixtureExample')
        cy.get('input[type="file"]')
        .selectFile('@fixtureExample')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click();
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
        cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')

        cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
        cy.get('#open-text-area')
        .invoke('val', 'Usando o invoke para digitar')
        .should('have.value', 'Usando o invoke para digitar');
    })

    it('faz uma requisição HTTP', function(){

        cy.request('GET', 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const {status, statusText, body} = response;
                expect(status).to.equal(200);
                expect(statusText).to.equal('OK');
                expect(body).to.include('CAC TAT')
        })
    })

    it.only('desfio - procure o gato', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')

        cy.get('#title')
        .invoke('text', 'CAT TAT')

        cy.get('#subtitle')
        .invoke('text', 'Eu ❤️ gatos')
    })
  })
