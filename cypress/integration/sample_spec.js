describe('Mon premier test', () => {
    it ('ne fait rien, en fait.', () => {
        expect(true).to.equal(true)
    })

    it ("visite la homepage", () => {
        cy.visit('')
    })
}) 