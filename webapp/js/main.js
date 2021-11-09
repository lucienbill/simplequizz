function drawStartPage() {
    page = document.getElementById("quizz");

    console.log("coucou")
    page.innerHTML = "<button type=\"button\" id=\"start\" onclick=\"startQuizz()\">Démarrer le quizz</button>"
}

function startQuizz() {
    console.log("coucou")
}

drawStartPage();