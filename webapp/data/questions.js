function initializeQuestions() {
   // TODO récupérer les questions depuis une BDD (là, j'ai fait un mock dégueu)
   const questions = [
       {
       'id':'2',
           'question':'Exemple de question',
           'goodAnswers':[
               'Bonne réponse N°1',
               'Bonne réponse N°2',
           ],
           'wrongAnswers':[
               'Mauvaise réponse N°1',
               'Mauvaise réponse N°2',
           ]
       },
       {
       'id':'7',
           'question':'Combien font 2 et 2 ?',
           'goodAnswers':[
               '4',
           ],
           'wrongAnswers':[
               '2',
               '22',
               '8',
           ]
       },
       {
       'id':'12',
           'question':'Le chat est ...',
           'goodAnswers':[
               'Un animal',
               'Vivant ou mort tant qu\'on n\'a pas ouvert la boite',
           ],
           'wrongAnswers':[
               'Un végétal',
               'Capable d\'apprendre à parler',
           ]
       },
       {
       'id':'17',
           'question':'JQuery, c\'est :',
           'goodAnswers':[
               'Un vieux truc en js',
               'Un outil de développement web',
           ],
           'wrongAnswers':[
               'Le futur',
               'Un truc à utiliser absolument pour tout nouveau projet',
           ]
       },
    ]

    return questions
}