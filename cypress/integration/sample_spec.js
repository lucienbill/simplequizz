describe('Checking the homepage', () => {
    it ("The start button must be present", () => {
        cy.visit('')
        cy.get('#start').should('have.text', 'Démarrer le quizz', 'Vérifier la présence du bouton')
    })

    it ("The footer must not contain navigation buttons", () => {
        cy.get('[title="⏪ Question précédente"]').should('not.exist') //FIXME : repérer l'élément avec une classe (but : indep de la langue)
        cy.get('[title="⏩ Valider (question suivante)"]').should('not.exist') //FIXME : repérer l'élément avec une classe (but : indep de la langue)
        cy.get('[title="✅ Valider le quizz"]').should('not.exist') //FIXME : repérer l'élément avec une classe (but : indep de la langue)
    })

    it ("The header must not contain navigation buttons or informations about the questions", ()=>{
        cy.get('#nav').should('not.exist')
        cy.get('progress').should('not.exist')
        cy.get('[title="Passer à la question suivante"]').should('not.exist')
        cy.get('[title="Revenir à la question précédente"]').should('not.exist')
    })
})

describe('Checking the first question', () => {
    it ("There must be a question", () => {
        cy.get('#start').click()
        cy.get('h2').should('have.text', 'Exemple de question')
    })
    it ("There must be 4 possible answers", () => {
        cy.get(':nth-child(4) > label').should('exist')
    })
    it ("All answers can be checked", () => {
        cy.get('input[type="checkbox"]').each((item) => {
            item.click()
            expect(item).to.be.checked
        })
    })
    it ("All answers can be unchecked", () => {
        cy.get('input[type="checkbox"]').each((item) => {
            item.click()
            expect(item).to.not.be.checked
        })
    })
    it ("Header : nav : progress bar and link to next question should be present (no 'previous' link)", () => {
        cy.get('#nav').should('exist')
        cy.get('progress').should('exist') 
        cy.get('[title="Passer à la question suivante"]').should('exist') // NOTE ça marche mais j'ai l'impression de répéter du code
        cy.get('[title="Revenir à la question précédente"]').should('not.exist')
    })
    it ("Footer : nav : link to next question and to end the quiz should be present (no 'previous' link)", () =>{
        cy.get('[title="⏪ Question précédente"]').should('be.disabled')
        cy.get('[title="⏩ Valider (question suivante)"]').should('not.be.disabled')
        cy.get('[title="✅ Valider le quizz"]').should('exist')
    })
})

describe('Navigate beetween questions with header buttons', () => {
    it ('We can move on to the next question', () => {
        cy.get('[title="Passer à la question suivante"]').click()
        cy.get('h2').should('have.text', "Combien font 2 et 2 ?")
    })    
    it ('We can go back to the previous question')
    it ('When we check a box and go to another question, the state of the box should be saved')
})

describe('Navigate beetween questions with footer buttons', () => {
    it ('We can move on to the next question')
    it ('We can go back to the previous question')
    it ('When we check a box and go to another question, the state of the box should be saved')
})

describe('Checking the last question', () => {
    it ("There must be a question")
    it ("There must be 4 answers")
    it ("All answers can be checked")
    it ("All answers can be unchecked")
    it ("Header : nav : progress bar and link to previous question should be present (no 'next' link)")
    it ("Footer : nav : link to previous question and to end the quiz should be present (no 'next' link)")
})

describe('Validate quizz and abort', () => {
    it ('Validate the quizz')
    it ('Abort')
    it ('The quizz should remember our answers')
})

describe('Validate an empty quizz', () => {
    it ('Start a new session, leave all boxes unchecked, and validate')
    it ('Confirm validation')
    it ('Expected result = defeat')
})

describe('Validate quizz with wrong answers only', () => {
    it ('Start a new session, check only wrong answers, and validate')
    it ('Confirm validation')
    it ('Expected result = defeat')
})

describe('Validate a perfect quizz', () => {
    it ('Start a new session, check only good answers, and validate')
    it ('Confirm validation')
    it ('Expected result = victory')
})

describe('Validate a good enough quizz', () => {
    it ('Start a new session, check mostly good answers, and validate')
    it ('Confirm validation')
    it ('Expected result = victory')
})

describe('Validate a not-good enough quizz', () => {
    it ('Start a new session, check mostly wrong answers, and validate')
    it ('Confirm validation')
    it ('Expected result = defeat')
})