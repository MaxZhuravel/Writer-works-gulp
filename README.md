## Підготовка до роботи

1. `npm i`

## Структура проекту

````
gulp-template
├── src
│ ├── css
│ ├── fonts
│ ├── img
│ ├── svg
│ ├── js
│ ├── sass
│ ├── public
│ ├── templates
│ └── pages
├── package.json
├── README.md
├── gulpfile.js
├── .babelrc
├── .browserslistrc
├── .prettierrc
├── .prettierignore
└── .gitignore
````

* Корінь проекту:
  * ```.babelrc``` - налаштування Babel
  * ```.prettierrc``` - налаштування Prettier
  * ```.prettierignore``` - заборона зміни файлів Prettier
  * ```.gitignore``` – заборона відстеження файлів Git'ом
  * ```package.json``` - список залежностей
  * ```README.md``` - опис проекту
  * ```gulpfile.js``` - файл конфігурації Gulp
  * ```.browserslistrc``` - файл конфігурації підтримуваних версій браузерів

* Папка ```src``` - використовується під час розробки:
  * ```css``` - директорія для файлів css бібліотек, спочатку тут лежить файл скидання стилів
  * ```fonts``` – директорія для шрифтів
  * ```img``` - директорія для зображень
  * ```svg``` - папка для SVG файлів, для подальшої генерації SVG спрайту які автоматично згенерується в папці img
  * ```js``` - директорія для js бібліотек. Тут лежить:
    - `app.js` для кастомного коду;
    - `ofi.min.js` - поліфіл для CSS-властивості `object-fit`;
    - `lazysizes.min.js` - [бібліотека для lazy-load зображень](https://github.com/aFarkas/lazysizes);
    - `imask.min.js` - [бібліотека маски](https://imask.js.org/guide.html).
  * ```sass``` - директорія для sass файлів
  * ```public``` - директорія для файлів користувача, всі файли з неї будуть скопійовані в корінь зібраного проекту
  * ```templates``` - директорія для html файлів які додаються в проекті
  * ```pages``` - директорія для html сторінок

## Міксини та інше
Спочатку є пара корисних речей:
- У складання встановлено автоматичну генерацію SVG спрайту, для цього необхідно додати файли в папку src/svg, після чого в папці dist/img згенерується спрайт з ім'ям sprite.svg. У ньому кожен SVG файл матиме айдишник, що дорівнює назві самого файлу.
- `@include font-face("FuturaPT", "/fonts/FuturaPT-Book", 300);` - дозволяє підключати шрифти в 1 рядок.
- `@include object-fit(cover)` - використовується для поліфілу CSS-властивості object-fit
- На тег `html` автоматично вішається клас `is-mac` або `is-ios` для визначення пристрою

## Верстка
Команди для збирання:
- `npm run dev` запускає складання та локальний сервер з Hot Reloading
- `npm run prod` запускає складання і на виході отримуємо зібрані, мініфіковані файли стилів та скриптів

## PostHTML

Для розміщення правильних переносів використовується плагін [PostHTML Richtypo] (https://github.com/Grawl/posthtml-richtypo). Для блоку, в якому ви хочете відформатувати текст, необхідно вказати атрибут `data-typo`:
````
<p data-typo>Тут текст</p>
````

Для шаблонизації в проекті використовується [Gulp PostHTML](https://github.com/posthtml/gulp-posthtml) з плагінами [PostHTML Include](https://github.com/posthtml/posthtml-include) та [PostHTML Expressions](https://github.com/posthtml/posthtml-expressions)

### Додавання файлів
Щоб просто вставити один файл в інший використовується конструкція `<include>`, приклад коду:
````
<include src="src/templates/header.html"></include>
````

### Компоненти
Для того щоб ззовні передати в файл, що вставляється, якісь дані необхідно використовувати директиву `locals`, і передати туди дані у вигляді JSON об'єкта, приклад коду:
````
<include src="src/templates/head.html" locals='{"title": "Головна сторінка"}'></include>
````

### Умови
Всередині будь-якого файлу можна використовувати різні умови, приклад коду:
````
<if condition="foo === 'bar'">
   <p>Foo really is bar! Revolutionary!</p>
</if>

<elseif condition="foo === 'wow'">
   <p>Foo is wow, oh man.</p>
</elseif>

<else>
   <p>Foo is probably just foo in the end.</p>
</else>
````

Також можна використовувати конструкцію `switch/case`, приклад коду:
````
<switch expression="foo">
   <case n="'bar'">
     <p>Foo really is bar! Revolutionary!</p>
   </case>
   <case n="'wow'">
     <p>Foo is wow, oh man.</p>
   </case>
   <default>
     <p>Foo is probably just foo in the end.</p>
   </default>
</switch>
````

### Цикли
У будь-якому файлі також можна перебирати дані (масиви або об'єкти) за допомогою циклу, приклад коду:
#### Масив
````
<each loop="item, index in array">
   <p>{{ index }}: {{ item }}</p>
</each>
````

#### Об'єкт
````
<each loop="value, key in anObject">
   <p>{{ key }}: {{ value }}</p>
</each>
````

Також не обов'язково передавати дані через змінну, їх можна написати в цикл, приклад коду:
````
<each loop="item in [1,2,3]">
   <p>{{ item }}</p>
</each>
````

У циклі можна використовувати вже готові змінні для вибірки певних елементів:
* `loop.index` - поточний індекс елемента, що починається з 0
* `loop.remaining` - кількість ітерацій, що залишилися до кінця
* `loop.first` - булевий покажчик, що елемент перший
* `loop.last` - булевий покажчик, що елемент останній
* `loop.length` - кількість елементів
