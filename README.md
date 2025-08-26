# Chat Slack
[![Actions Status](https://github.com/AnastasiaVAV/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/AnastasiaVAV/frontend-project-12/actions)

Упрощенная версия Slack для общения. Реализует основные функции мессенджера: каналы, личные сообщения, уведомления и интеграции

Cсылка на проект – https://frontend-project-12-bqe1.onrender.com

## Особенности проекта
- Создание и управление каналами (изменение имени, удаление)
- Сообщения в реальном времени
- Система всплывающих уведомлений
- Адаптивный интерфейс (Bootstrap 5)
- Авторизация, аутентификация, регистрация пользователей

## Технологии
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Render](https://img.shields.io/badge/Render-%23323330.svg?style=for-the-badge&logo=Render&logoColor=white)
![Rollbar](https://img.shields.io/badge/Rollbar-323330?style=for-the-badge&logo=rollbar&logoColor=white)

**Библиотеки:**
- `axios` – HTTP-запросы
- `formik`, `yup` – формы и валидация
- `react-i18next` – интернационализация
- `leo-profanity` – цензурирование сообщений и названий каналов
- `react-toastify` – всплывающие уведомления

## Демонстрация работы
![Демонстрация работы RSS-aggregator](./src/assets/RSS_aggregator.gif)

## Установка и запуск
Все команды выполняются в корне проекта.

1. Установите зависимости:
    ```bash
    npm install
	  cd frontend && npm install
    ```
2. Запустите  сервер:
    ```bash
    npx start-server -s ./frontend/dist
    ```
3. Запустите приложение в режиме разработки:
    ```bash
    cd frontend && npm run dev
    ```
4. Откройте http://localhost:5173 в браузере.

Production сборка:
```bash
cd frontend && npm run build
```