# SimpleQuizz
Ceci est une webapp de quizz simple, gratuite et Open Source
Pour l'instant, elle est juste en français.

## Que peut faire cette webapp ?
Cette app peut afficher un quizz simple. Voici une [demo](https://simplequizz.pages.dev/).
Notes :
- Tout est dans le front-end. Autrement dit : les données sont dans le navigateur, n'importe qui peut tricher pour déterminer les bonnes réponses en utilisant les devtools
- Il n'y a pas de communication avec un serveur ou une base de données : les résultats ne sont visibles que pour la personne qui répond au quizz

## Comment l'utiliser ?
### Mettre vos questions dans le quizz
Pour que votre quizz affiche vos questions (plutôt que celles de la démo), il faut modifier le fichier `questions.js` : 
- soit manuellement
- soit à l'aide du builder
#### **Manuellement**
Modifiez le fichier `webapp\data\questions.js` : les questions sont dans un objet json.
#### **Avec le builder**
Pour utiliser le builder : 
1. Installez `ruby` sur votre machine (la dernière version stable, ou une plus récente)
2. Ecrivez vos questions dans `config\config.txt`
3. Exécutez le script `builder\build.rb` : il construira le fichier `webapp\data\questions.js`
### Utiliser le quizz
Tout le quizz est contenu dans le dossier `webapp` : 
- Pour utiliser le quizz sur votre machine, ouvrez `webapp\index.html`
- Pour permettre à n'importe-qui sur internet d'utiliser votre quizz, hébergez le contenu du dossier `webapp` sur un serveur web
  - Note : j'héberge la démo sur la version gratuite de Cloudflare Pages, avec la configuration suivante : 
```
Build command: exit 0
Build output directory: /webapp
Root directory: /
Environment variables: None
```
## Comment contribuer
Ouvrez une issue ou un pull request.
