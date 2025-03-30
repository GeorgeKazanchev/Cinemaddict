# &laquo;Киноман&raquo;
![Логотип сервиса &laquo;Киноман&raquo;](https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/github/cinemaddict-logo.png)

&nbsp;&laquo;Киноман&raquo; &dash; сервис для всех любителей кино. &laquo;Киноман&raquo; позволит вам узнать о горячих новинках кино и о признанной классике. Сервис даст вам возможность выбрать понравившийся фильм на вечер, сформировать список картин к просмотру, рассказать друзьям о любимых фильмах и многое другое.

<section style="display: flex; flex-direction: row;" align="center">
    <img width="45%" src="https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/github/screenshot-films.png" alt="Скриншот экрана &laquo;Фильмы&raquo;">
    <img width="45%" src="https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/github/screenshot-statistics.png" alt="Скриншот экрана &laquo;Статистика&raquo;">
</section>

## :movie_camera: О проекте
Проект разработан по найденным в сети материалам профессионального курса [&laquo;JavaScript. Архитектура клиентских приложений&raquo;](https://htmlacademy.ru/intensive/ecmascript) онлайн-школы HTML Academy. [Техническое задание](https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/Specification.md).

Проект представляет собой одностраничное приложение (Single Page Application - SPA), написанное на языке TypeScript без использования фреймворков.
Разработка велась по собственному GitFlow.

- Язык программирования: `TypeScript`.
- Архитектура: паттерн `Model-View-Presenter (MVP)`.
- Взаимодействие с сервером: `Fetch API`.
- Вёрстка: `БЭМ`, адаптивная (`mobile`+`tablet`+`desktop`), кроссбраузерная, доступная (`a11y`).
- CSS-препроцессоры: `SCSS`, `PostCSS` + `Autoprefixer`.
- Сборка: `Webpack`.
- Юнит-тесты: `Jest` (~90 % покрытия).
- Линтеры: `ESLint`, `Stylelint`.
- Бэкенд: `Node.js` + `Express`.
- Веб-сервер (для раздачи статики): `Nginx`.
- Оптимизация: `Lighthouse`, `Squoosh`.

## :clapper: Запуск
Для запуска приложения достаточно перейти по [ссылке](http://cinemmadict.ru/).

## :loudspeaker: Основные команды
- `npm install` &dash; установка зависимостей проекта через NPM.
- `npm run start` &dash; запуск приложения на локальном сервере.
- `npm run build:prod` &dash; сборка проекта в production-версии.
- `npm run build:dev` &dash; сборка проекта в версии для разработки.
- `npm run eslint` &dash; статический анализ TypeScript-кода с помощью `ESLint`.
- `npm run stylelint` &dash; статический анализ стилей с помощью `Stylelint`.
- `npm run jest` &dash; запуск модульных тестов через `Jest`.
- `npm test` &dash; полное тестирование проекта (`ESLint` + `Stylelint` + `Jest`).
