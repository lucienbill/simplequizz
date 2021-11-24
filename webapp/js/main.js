questions = [] // scope:global
savedAnswers = [] // scope:global

function drawStartPage() {
    page = document.getElementById("quizz");

    page.innerHTML = "<button type=\"button\" id=\"start\" onclick=\"startQuizz()\">Démarrer le quizz</button>"
}

function startQuizz() {
    // create navbar
    target = document.getElementById("quizz");
    target.insertAdjacentHTML('beforebegin', "<div id='nav'></div>");

    // 1 : initialize the list of questions
    questions = initializeQuestions();

    // print the questions, start by the first one
    handleQuestionsPrinting(0, true)
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

String.prototype.hashCode = function() {
    // source : https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function handleQuestionsPrinting(position, isFirstCall=false) { 
    //FIXME : le nom est pas top, parce qu'on fait plus qu'imprimer
    // reçoit une liste de questions, et imprime la question + boutons de nav
    // gère aussi l'état (save/load) des cases cochées/décochées

    //première action = sauvegarder l'état des checkboxes (si on est sur une question)
    if (!isFirstCall) {
        saveAnwsers()
    }

    printNavButtons(position, questions.length)
    printAQuestion(questions[position], document.getElementById("quizz"))

    loadSavedAnwsers(questions[position].id)
    printSubmitButton()
}

function printSubmitButton() {
    let myButton = document.createElement("button")
    myButton.type = "submit"
    myButton.id = myButton.type
    myButton.onclick = () => {saveAnwsers();submitAnswer()}
    myButton.title = "Valider mes réponses"
    myButton.innerText = myButton.title
    document.getElementById("quizz").appendChild(myButton)
}

function saveAnwsers() {
    // Récupérer l'ID de la question
    q_id = document.getElementsByClassName("question")[0].id
    // Récupérer la liste des réponses : id, état de la checkbox
    answsers = document.getElementsByClassName("question")[0].getElementsByTagName("input")
    savedAns = []
    for (el of answsers) {
        savedAns.push(
            {
                "id" : el.id,
                "checked" : el.checked
            }
        )
    }
    objQ = {
        "id" : q_id,
        "answers" : savedAns.sort()
    }

    // Sauvegarder (erase/replace)
    index = -1
    doReplace = false
    for (el of savedAnswers) {
        index ++
        if (el.id == q_id){
            // Erase
            doReplace = true
            break
        }
    }
    if(doReplace){
        savedAnswers.splice(index, 1, objQ)
    } else {
        savedAnswers.push(objQ) 
    }
}

function loadSavedAnwsers(q_id) {
    index = -1
    isFound = false
    for (el of savedAnswers) {
        index ++
        if (el.id == q_id){
            isFound = true
            break
        }
    }

    if (isFound){
        // pour chaque réponse sauvegardée
        // charger l'état de la checkbox

        savedAnswers[index].answers.forEach(
            ans => document.getElementById(ans.id).checked = ans.checked
        );

    }
}

function printNavButtons(position, limit) {
    str = "Question " + (position + 1) + " / " + limit + "<br>" 
    if (position > 0) {
        str += "<a onclick='handleQuestionsPrinting("+ (position - 1) + ")'>q? précédente</a>"
        // FIXME : remplacer tout ces str par des vrais nodes à ajouter au DOM
    }

    if (position > 0 && position < limit){
        str += " | "
    }

    if (position < limit - 1) {
        str += "<a onclick='handleQuestionsPrinting("+ (position + 1) + ")'>q? suivante</a>"
    }

    document.getElementById("nav").innerHTML = str
}

function submitAnswer() {
    // Print confirmation message
    let msg = "Confirmez-vous la validation de toutes les réponses à ce quizz ? Vous ne pourrez pas revenir en arrière !"

    let fragment = document.createDocumentFragment()
    let newDiv = document.createElement("div")
    newDiv.class = "confirm-submit"
    newDiv.id = "quizz"

    let msgElem = document.createTextNode(msg)
    newDiv.appendChild(msgElem)

    // Yes/No buttons
    let yesBtn = document.createElement("button")
    yesBtn.id = "yes"
    yesBtn.textContent = "confirmer"
    yesBtn.onclick = () => { checkAnswers(savedAnswers)}
    newDiv.appendChild(yesBtn)
    
    let noBtn = document.createElement("button")
    noBtn.id = "no"
    noBtn.textContent = "revenir aux questions"
    noBtn.onclick = () => { reprintQuizz() }
    newDiv.appendChild(noBtn)

    // erase quizz and replace
    document.getElementById("nav").hidden = true
    document.getElementById("quizz").replaceWith(newDiv)
}

function reprintQuizz() {
    handleQuestionsPrinting(0, true)
    document.getElementById("nav").hidden = false
}

function checkAnswers(answers) {
    nb_good_answers = 0
    // parcourir toutes les questions
    for (q of questions) {
        // vérifier s'il existe une réponse
        let isFound = false
        let index = -1
        for (ans of savedAnswers) {
            index ++
            if (ans.id == q.id){
                isFound = true
                break
            }
        }

        // "ans_" + element.hashCode()
        if (isFound){
            // si la réponse est correcte : 1 pt
            // 1 : ordonner l'array des ID des cases cochées : alpha 
            checkedAnswers = []
            savedAnswers[index].answers.forEach(
                element => {
                    if (element.checked){
                        checkedAnswers.push(element.id)
                    }
                }
            )
            // 2 : ordonner l'array des réponses correctes (hash) : alpha
            correctAnswers = []
            q.goodAnswers.forEach(element => {
                correctAnswers.push("ans_" + element.hashCode())
            });
    
            correctAnswers.sort()
 
            // compare arrays (this is slow, but fast enough)
            if (JSON.stringify(checkedAnswers)==JSON.stringify(correctAnswers)){
                nb_good_answers ++
            }
        }


    }

    printResults(nb_good_answers, questions.length)
}

function printResults(nb_good_answers, nb_questions) {
    let msg = "bonnes réponses : " + nb_good_answers + "/" + nb_questions
    let newDiv = document.createElement("div")
    newDiv.class = "results"
    newDiv.id = "quizz"

    txt = document.createTextNode(msg)
    newDiv.appendChild(txt)
    document.getElementById("quizz").replaceWith(newDiv)
    // FIXME : ajouter un "gagné !" ou "perdu !"
}

function printAQuestion(question, domElement) {
    // Mélanger les réponses dans une seule liste
    answers = []
    i = 0
    question.goodAnswers.forEach(element => {
        answers.push({
            "id" : "ans_" + element.hashCode(),
            "value" : element,
        })
        i ++
    });
    question.wrongAnswers.forEach(element => {
        answers.push({
            "id" : "ans_" + element.hashCode(),
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

    str += "</ol>"
    str += "</div>"

    domElement.innerHTML = str
}

drawStartPage();