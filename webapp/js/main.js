function drawStartPage() {
    page = document.getElementById("quizz");

    page.innerHTML = "<button type=\"button\" id=\"start\" onclick=\"startQuizz()\">Démarrer le quizz</button>"
}

function startQuizz() {
    // 1 : initialiser la liste des questions
    questions = initializeQuestions();

    // Afficher la première question
    printAQuestion(questions[0], document.getElementById("quizz"))
}

function initializeQuestions() {
    // TODO (là, j'ai fait un mock dégueu)
    var questions = [
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
                "une sauce qui se mange",
                "un truc à utiliser absolument pour tout nouveau projet"
            ]
        },
    ]

    return questions
}

function handleQuestionsPrinting(questions) {
    // reçoit une liste de questions, et imprime la question + boutons de nav
}

function printAQuestion(question, domElement) {
    // Mélanger les réponses dans une seule liste
    answers = []
    question.goodAnswers.forEach(element => {
        answers.push({
            "value" : element,
            "isGood" : true
        })
    });
    question.wrongAnswers.forEach(element => {
        answers.push({
            "value" : element,
            "isGood" : false
        })
    });
    answers.sort(() => Math.random() - 0.5) // TODO : vérifier si ça fait bien le taff

    str  = "<div class='question' id = " + question.id + ">"
    str += "<h2>" + question.question + "</h2>"
    str += "<ol>"

    answers.forEach(element => {
        str += "<li>"
        str += element.value
        str += "</li>"
    });

    str += "</ol>"
    str += "</div>"

    // TODO : ajouter les bouttons vers questions précédente/suivant ?

    domElement.innerHTML = str
}

drawStartPage();