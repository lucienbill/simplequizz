# File where the questions are stored
filePath = File.dirname(__FILE__) + '\..\config\config.txt'
file = File.open(filePath)
file_lines = file.readlines.map(&:chomp)

regex_nbre = /(\d+).?(\d+)/
# In main.js, it is victoryThreshold * 100 (because it's a % in config.txt)
taux_victoire = file_lines[0].scan(regex_nbre)[0].join(".")

# Récupérer les questions, et leurs réponses (bonnes + mauvaises)
questions = []
file_lines.each_with_index{|line, numline|
    next if numline < 2 #Ignorer les premières lignes
    # Si ça commence pas par des espace, c'est une question
    regexQ = /^[^ ]/
    # Si ça commence par "    ", c'est une bonne réponse
    # regexGoodAns = /^( ){3}[^ ]/
    beginGoodAns = ["   ", "	"] # 4 space or 1 tab
    # Si ça commence par "        ", c'est une mauvaise réponse
    beginWrongAns = ["      ", "		"] # 8 space or 2 tab
    # Commentaire de correction
    beginCommentary = ["          ", "			"] # 12 space or 3 tab
    if line.start_with?(regexQ)
        questions.push(
            {
                "id" => numline, #FIXME : remplacer par un hash
                "question" => line,
                "goodAnswers" => [],
                "wrongAnswers" => []
            }
        )
        next
    end
    if line.start_with?(beginCommentary[0]) || line.start_with?(beginCommentary[1])
        # TODO - feature for the future
        next
    end
    if line.start_with?(beginWrongAns[0]) || line.start_with?(beginWrongAns[1])
        questions[-1]["wrongAnswers"].push(line.strip())
        next
    end
    if line.start_with?(beginGoodAns[0]) || line.start_with?(beginGoodAns[1])
        questions[-1]["goodAnswers"].push(line.strip())
        next
    end

}

# Préparer le fichier à générer (js)
strjs = "function initializeQuestions() {\n"\
    "   const questions = ["

questions.map{|q|
    questionstr = "\n       {\n"\
    "       'id':'#{q["id"]}',\n"\
    "           'question':'#{q["question"].to_s.gsub("'"){"\\'"}}',\n"\
    "           'goodAnswers':["

    questionstr += q["goodAnswers"].map{ |a|
        "\n               '#{a.to_s.gsub("'"){"\\'"}}',"
    }.join("")

    questionstr += "\n           ],\n"\
    "           'wrongAnswers':["

    questionstr += q["wrongAnswers"].map{ |a|
        "\n               '#{a.to_s.to_s.gsub("'"){"\\'"}}',"
    }.join("")
    questionstr += "\n           ]\n"\
    "       },"

    strjs += questionstr
}

strjs += "\n    ]\n\n"\
"    return questions\n"\
"}"

# Transformer tout ça en questions.js
questionsDOTjsPath = File.dirname(__FILE__) + '\..\webapp\data\questions.js'
File.delete(questionsDOTjsPath) if File.exist?(questionsDOTjsPath)

File.write(questionsDOTjsPath, strjs)

# TODO : nettoyer le code