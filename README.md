# &laquo;Киноман&raquo;
![Логотип сервиса &laquo;Киноман&raquo;](https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/markup/img/cinemaddict-logo.png)

&nbsp;&laquo;Киноман&raquo; &dash; это сервис для всех любителей кино. &laquo;Киноман&raquo; позволит вам узнать как о горячих новинках кино, так и о признанной классике. Сервис даст вам возможность выбрать понравившийся фильм на вечер, сформировать список картин для просмотра, рассказать другим пользователям о своих любимых фильмах и многое другое.

<section style="display: flex; flex-direction: row;" align="center">
    <img width="45%" src="https://raw.githubusercontent.com/GeorgeKazanchev/Cinemaddict/main/markup/img/screenshot-films.png" alt="Скриншот экрана &laquo;Фильмы&raquo;">
    <img width="45%" src="https://raw.githubusercontent.com/GeorgeKazanchev/Cinemaddict/main/markup/img/screenshot-statistics.png" alt="Скриншот экрана &laquo;Статистика&raquo;">
</section>

## :movie_camera: О проекте
Разработка проекта ведётся самостоятельно на основе материалов профессионального курса [&laquo;JavaScript. Архитектура клиентских приложений&raquo;](https://htmlacademy.ru/intensive/ecmascript) онлайн-школы HTML Academy и служит для закрепления знаний, полученных при изучении теории, а также для получения практических навыков проектирования фронтенд-приложений (ООП, паттерны проектирования, MV*-паттерны), работы с языком TypeScript, методологией БЭМ, препроцессорами CSS и другими инструментами современной фронтенд-разработки.

В качестве исходных данных к проекту выступают:
- [Техническое задание](https://github.com/GeorgeKazanchev/Cinemaddict/blob/main/Specification.md)
- [Готовая вёрстка](https://github.com/GeorgeKazanchev/Cinemaddict/tree/main/markup) (содержит преднамеренно сделанные ошибки)
- [Графика](https://github.com/GeorgeKazanchev/Cinemaddict/tree/main/markup/img)
- [Шрифты](https://github.com/GeorgeKazanchev/Cinemaddict/tree/main/markup/fonts)

## :clapper: Запуск
Для запуска приложения на локальном компьютере следует загрузить содержимое проекта на Ваше устройство. Это возможно сделать либо путём клонирования данного репозитория, либо простым скачиванием его содержимого в виде архива ZIP (кнопка `<> Code` &#8594; пункт меню `Download ZIP`).

:warning: В настоящий момент серверная часть приложения не развёрнута в сети Интернет. Для просмотра контента в приложении следует перейти в Debug-режим. Для этого:  
1. Откройте в текстовом редакторе файл `settings.ts` из папки `src`.
2. Найдите в нём строку `export const IS_DEBUG: boolean = false;`. Замените в ней слово `false` на `true`.
3. Сохраните и закройте файл. 

После загрузки следует открыть папку с проектом в текстовом редакторе (например, в VS Code) или перейти к этой папке посредством командной строки. Далее следует: 
1. Установить зависимости проекта вызовом команды `npm install`.
2. Выполнить сборку проекта командой `npm run build:prod`.
3. Запустить приложение на локальном сервере с помощью команды `npm run start`.

После выполнения последней команды должен появиться браузер, в котором открыта вкладка с запущенным приложением. В случае, если браузер не появится автоматически, следует выполнить ручной запуск приложения, введя в адресной строке браузера `localhost:3000`.

Для завершения работы локального сервера следует ввести в редакторе/командной строке комбинацию клавиш `Ctrl` + `C`, после чего в ответ на вопрос `Terminate batch job (Y/N)?` ввести `Y` и нажать клавишу `Enter` на клавиатуре.

## :loudspeaker: Основные команды
`npm install` &dash; установка зависимостей проекта с помощью NPM.

`npm run build:prod` &dash; сборка проекта с помощью Webpack в production-версии.

`npm run build:dev` &dash; сборка проекта с помощью Webpack в версии для разработки.

`npm run start` &dash; запуск приложения на локальном сервере.

`npm run gulp` &dash; сборка проекта с помощью Gulp (компиляция содержимого SCSS-файлов в CSS-код).

`npm run tsc` &dash; компиляция файлов с TypeScript-кодом в код JavaScript.

`npm run eslint` &dash; статический анализ кода с помощью ESLint.

`npm test` &dash; тестирование проекта.
