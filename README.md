# Gulpfile

Dans le fichier Gulp, vous trouverez différentes tâches tels que LESS, JS, SASS, etc...

Pour installer tout les packages qui sont écrit dans package.json

```
npm install
```

Pour installer un package en particulier et l'ajouter au package.json dans les dépendances. Le but est que lorsque vous ferez npm install, le nouveau package sera installé automatiquement.

```
npm install bootstrap@4.0.0-alpha.6 --save
```


Très important, afin d'utiliser les lignes de commande gulp, vous devez activer gulp et gulp-cli en global.

```
npm install --global gulp 
npm install --global gulp-cli
```

# Exemeples de structure

```
-- nom du projet 
        -
         |
         |
         -src-
         |   |
         |   --- js
         |   |
         |   --- scss
         |
         |
         - index.html
         - gulpfile.js
         - package.json
 ```
   
# Packages de base pour SASS

```
npm install gulp --save
```
```
npm install gulp-autoprefixer --save
```
```
npm install gulp-concat --save
```
```
npm install gulp-minify-css --save
```
```
npm install gulp-sass --save
```
```
npm install gulp-util --save
```
```
npm install gulp-rename --save
```
```
npm install gulp-uglify --save
```
  
# Exemeples de tâches


## Si c'est du SASS

```
gulp sass
```

## Si c'est du LESS

```
gulp less
```

## Si c'est du CSS

```
gulp css
```

## Liens utiles

- [Gulp git](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)
