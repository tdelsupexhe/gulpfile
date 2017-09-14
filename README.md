# Gulpfile

Dans le fichier Gulp, vous trouverez différentes tâches tels que LESS, JS, SASS, etc...

1. Pour installer tout les packages qui sont écrit dans package.json

```
npm install
```

2. Pour installer un package en particulier et l'ajouter au package.json dans les dépendances. Le but est que lorsque vous ferez npm install, le nouveau package sera installé automatiquement.

```
npm install bootstrap@4.0.0-alpha.6 --save
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
npm installgulp-rename --save
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
