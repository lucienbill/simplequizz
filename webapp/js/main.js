let questions = [] // scope:global
let savedAnswers = [] // scope:global
let victoryThreshold = 0.5 //scope:global

function drawStartPage() {
    const startBtn = document.createElement("button")
    startBtn.id = "start"
    startBtn.type = "button"
    startBtn.onclick = () => {startQuizz()}
    startBtn.textContent = "Démarrer le quizz"
    document.getElementById("quizz").appendChild(startBtn)
}

function startQuizz() {
    // create navbar
    drawNavbar()

    // 1 : initialize the list of questions
    questions = initializeQuestions();
    victoryThreshold = 0.5 //FIXME : chercher cette valeur en paramétrage/BDD

    // print the questions, start by the first one
    handleAQuestion(0)
}

function drawNavbar() {
    let target = document.getElementById("header");
    const navbar = document.createElement("div")
    navbar.id = "nav"
    target.appendChild(navbar)
}

function initializeQuestions() {
    // TODO récupérer les questions depuis une BDD (là, j'ai fait un mock dégueu)
    let questions = [
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
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function handleAQuestion(position) { 
    // imprime une question et les boutons de nav
    // gère aussi l'état (save/load) des cases cochées/décochées

    //première action = sauvegarder l'état des checkboxes (si on est sur une question)
    if (document.getElementsByClassName("question").length > 0) {
        saveAnwsers()
    }

    // print the new question
    printNavButtons(position, questions.length)
    printAQuestion(questions[position])
    loadSavedAnwsers(questions[position].id)
    printSubmitButton()
}

function printSubmitButton() {
    const myButton = document.createElement("button")
    myButton.type = "submit"
    myButton.id = myButton.type
    myButton.onclick = () => {saveAnwsers();submitAnswer()}
    myButton.title = "Valider mes réponses"
    myButton.innerText = myButton.title

    let footer = document.getElementById("footer")

    if (!document.getElementById("submit")){ // just print ONE submit button
        footer.insertBefore(myButton, footer.firstChild);
    }
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
    let navDiv = document.createElement("div")

    // progress bar
    const progbar = document.createElement("progress")
    progbar.max = limit
    progbar.value = position + 1
    progbar.textContent = Math.floor((position + 1)*10000/limit)/100 +"%"
    navDiv.appendChild(progbar)
    navDiv.appendChild(document.createElement("br"))
    
    // Question x/n
    navDiv.id = "nav"
    const str = "Question " + (position + 1) + " / " + limit + " | "
    navDiv.appendChild(document.createTextNode(str))
    
    // question suivante / précédente
    const prev = " ⬅ "
    const next = " ➡ "
    if (position > 0) {
        let link = document.createElement("a")
        link.textContent = prev
        link.onclick = () => { handleAQuestion(position - 1)}
        link.title = "Revenir à la question précédente"
        navDiv.appendChild(link)
    } else {
        navDiv.appendChild(document.createTextNode(prev))
    }
    
    navDiv.appendChild(document.createTextNode(" | ")) //spacer
        
    if (position < limit - 1) {
        let link = document.createElement("a")
        link.textContent = next
        link.onclick = () => { handleAQuestion(position + 1)}
        link.title = "Passer à la question suivante"
        navDiv.appendChild(link)
    } else {
        navDiv.appendChild(document.createTextNode(next))
    }

    document.getElementById("nav").replaceWith(navDiv)
}

function submitAnswer() {
    document.getElementById("submit").remove()

    // Print confirmation message
    let msg = "Confirmez-vous la validation de toutes les réponses à ce quizz ? Vous ne pourrez pas revenir en arrière !"

    let newDiv = document.createElement("div")
    newDiv.class = "confirm-submit"
    newDiv.id = "quizz"

    let msgElem = document.createTextNode(msg)
    newDiv.appendChild(msgElem)
    newDiv.appendChild(document.createElement("br"))

    // Yes/No buttons
    let yesBtn = document.createElement("button")
    yesBtn.id = "yes"
    yesBtn.textContent = "✅ confirmer"
    yesBtn.onclick = () => { checkAnswers(savedAnswers)}
    newDiv.appendChild(yesBtn)
    newDiv.appendChild(document.createElement("br"))
    
    let noBtn = document.createElement("button")
    noBtn.id = "no"
    noBtn.textContent = "⏪ revenir aux questions"
    noBtn.onclick = () => { reprintQuizz() }
    newDiv.appendChild(noBtn)

    // erase quizz and replace
    document.getElementById("nav").remove()
    document.getElementById("quizz").replaceWith(newDiv)
}

function reprintQuizz() {
    drawNavbar()
    handleAQuestion(0)
}

function checkAnswers(answers) {
    nb_good_answers = 0
    // parcourir toutes les questions
    for (q of questions) {
        // vérifier s'il existe une réponse
        let isFound = false
        let index = -1
        for (ans of answers) {
            index ++
            if (ans.id == q.id){
                isFound = true
                break
            }
        }

        if (isFound){
            // si la réponse est correcte : 1 pt
            // 1 : ordonner l'array des ID des cases cochées : alpha 
            checkedAnswers = []
            answers[index].answers.forEach(
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
     
            // compare arrays (this is slow, but fast enough)
            if (JSON.stringify(checkedAnswers.sort())==JSON.stringify(correctAnswers.sort())){
                nb_good_answers ++
            }
        }


    }

    printResults(nb_good_answers, questions.length, victoryThreshold)
}

function printResults(nb_good_answers, nb_questions, victoryThreshold=0.5) {
    let msg = "bonnes réponses : " + nb_good_answers + "/" + nb_questions
    let newDiv = document.createElement("div")
    newDiv.class = "results"
    newDiv.id = "quizz"

    txt = document.createTextNode(msg)
    newDiv.appendChild(txt)

    const progbar = document.createElement("progress")
    progbar.max = nb_questions
    progbar.value = nb_good_answers
    const txok = Math.floor(nb_good_answers*10000/nb_questions)/100
    progbar.textContent = txok + "%"
    newDiv.appendChild(document.createElement("br"))
    newDiv.appendChild(progbar)
    newDiv.appendChild(document.createElement("br"))

    // "gagné !" ou "perdu !"
    let str = ""
    if (txok/100 >= victoryThreshold) {
        str = "✅ Bravo ! vous avez gagné ( " + txok + "% de bonnes réponses) !"
    } else {
        str = "❌ Perdu ( " + txok + "% de bonnes réponses) ! Vous ferez mieux la prochaine fois."
    }
    newDiv.appendChild(document.createTextNode(str))

    document.getElementById("quizz").replaceWith(newDiv)
}

function printAQuestion(question) {
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

    const qst = document.createElement("div")
    qst.id = question.id
    qst.className = "question"
    
    const title = document.createElement("h2")
    title.textContent = question.question
    qst.appendChild(title)
    
    const hint = document.createElement("p")
    hint.textContent = "Nombre de réponses attendues : " + question.goodAnswers.length
    qst.appendChild(hint)

    const ans = document.createElement("ol")

    // Afficher les réponses
    randomizedAnswer.forEach(element => {
        let str = "<input id='" + element.id + "' type='checkbox' ><label>"
        str += element.value
        str += "</label><br>"

        let li = document.createElement("li")
        li.innerHTML = str
        ans.appendChild(li)
    });

    qst.appendChild(ans)
    const quizzDiv = document.createElement("div")
    quizzDiv.id = "quizz"
    quizzDiv.appendChild(qst)

    document.getElementById("quizz").replaceWith(quizzDiv)
}

drawStartPage();