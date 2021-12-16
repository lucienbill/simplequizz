function initializeQuestions() {
    // TODO récupérer les questions depuis une BDD (là, j'ai fait un mock dégueu)
    const questions = [
        {
            "id": "0001",
            "question": "combien font 2 et 2",
            "goodAnswers" : [
                "4"
            ],
            "wrongAnswers" : [
                "2",
                "22",
                "8",
            ]
        },
        {
            "id": "0002",
            "question": "Le chat est ...",
            "goodAnswers" : [
                "Un animal",
                "vivant ou mort tant qu'on n'a pas ouvert la boite"
            ],
            "wrongAnswers" : [
                "un végétal",
                "capable d'apprendre à parler",
            ]
        },
        {
            "id": "0003",
            "question": "JQuery, c'est :",
            "goodAnswers" : [
                "un vieux truc en js",
                "un outil de développement web"
            ],
            "wrongAnswers" : [
                "le futur",
                "un truc à utiliser absolument pour tout nouveau projet"
            ]
        },
    ]

    /* TODO : faire un outil standalone (genre page HTML qui n'a pas besoin 
    de serveur) avec un formulaire qu'une vraie personne peut remplir,
    et à la fin ça génère le contenu de ce fichier là.
    Un truc façon tableur.
    Bonus : pourra être rempli à partir d'un tableur
    */

    const alternativeStorageMethod = [
        {
            "id": "Un vrai hash calculé à l'étape de build",
            "question" : "le libellé de la question",
            "answers" : [
                "réponse 1",
                "réponse 2",
                "réponse 3",
                "réponse 4",
            ],
            "solution":"hash des bonnes réponses (array.order.join('').hash)"
        }
    ]
    
    return questions
}