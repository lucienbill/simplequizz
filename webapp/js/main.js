questions = [] // scope:global

function drawStartPage() {
    page = document.getElementById("quizz");

    page.innerHTML = "<button type=\"button\" id=\"start\" onclick=\"startQuizz()\">Démarrer le quizz</button>"
}

function startQuizz() {
    // Créer la navbav
    target = document.getElementById("quizz");
    target.insertAdjacentHTML('beforebegin', "<div id='nav'></div>");

    // 1 : initialiser la liste des questions
    questions = initializeQuestions();

    // Afficher les questions, en commençant par la 1ère
    handleQuestionsPrinting(0)
}

function initializeQuestions() {
    // TODO récupérer les questions depuis une BDD (là, j'ai fait un mock dégueu)
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

function handleQuestionsPrinting(position) {
    // reçoit une liste de questions, et imprime la question + boutons de nav

    // imprimer la 1ère question
    printNavButtons(position, questions.length)
    printAQuestion(questions[position], document.getElementById("quizz"))
}

function printNavButtons(position, limit) {
    str = "Question " + (position + 1) + " / " + limit + "<br>" 
    if (position > 0) {
        str += "<a onclick='handleQuestionsPrinting("+ (position - 1) + ")'>q? précédente</a>"
    }

    if (position > 0 && position < limit){
        str += " ; "
    }

    if (position < limit - 1) {
        str += "<a onclick='handleQuestionsPrinting("+ (position + 1) + ")'>q? suivante</a>"
    }

    document.getElementById("nav").innerHTML = str
}

function printAQuestion(question, domElement) {
    // Mélanger les réponses dans une seule liste
    answers = []
    i = 0
    question.goodAnswers.forEach(element => {
        answers.push({
            "id" : i, //FIXME : la réponse 0 est forcément bonne. C'est pas foufou -> hash
            "value" : element,
        })
        i ++
    });
    question.wrongAnswers.forEach(element => {
        answers.push({
            "id" : i,
            "value" : element,
        })
        i ++
    });
    // prendre la liste des réponses, la copier dans un ordre random, et afficher la copie
    randomizedAnswer=[...answers]
    randomizedAnswer.sort(() => Math.random() - 0.5) 

    str  = "<div class='question' id = " + question.id + ">"
    str += "<h2>" + question.question + "</h2>"
    str += "<p>Nombre de réponses attendues : " + question.goodAnswers.length + "<p>"
    str += "<ol>"

    // Afficher les questions
    randomizedAnswer.forEach(element => {
        // str += "<li>"
        str += "<li><input id='" + element.id + "' type='checkbox' ><label>"
        str += element.value
        str += "</label></li><br>"
        // str += "</li>"
    });

    // TODO : sauvegarder l'état des checkboxes, dans handleQuestionsPrinting


    str += "</ol>"
    str += "</div>"

    domElement.innerHTML = str
}

drawStartPage();