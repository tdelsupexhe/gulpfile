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
