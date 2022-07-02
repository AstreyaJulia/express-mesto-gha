[![Tests](https://github.com/AstreyaJulia/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/AstreyaJulia/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

## Директории

`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/errors` — папка с файлами классов ошибок
`/middlewares` — папка с модулями проверки аутентификации и валидатора
`/models` — папка с файлами описания схем пользователя и карточки
`/routes` — папка с файлами роутера  
`/utils` — папка с вспомогательными утилитами и константами

### Установка:

1. Склонируйте проект по HTTPS `https://github.com/AstreyaJulia/express-mesto-gha.git` или через
   SSH: `git@github.com:AstreyaJulia/express-mesto-gha.git`;
2. Перейдите в папку проекта `cd express-mesto-gha`;
3. Установите зависимости `npm install`;


### Запуск:

1. В корне проекта создайте файл `.env` с содержимым:

```dotenv
NODE_ENV=production
JWT_SECRET_KEY=some-secret-key
BD_CONNECT_URL=mongodb://localhost:27017/bd
```

JWT_SECRET_KEY - секретный ключ для генерации токена JWT
BD_CONNECT_URL - строка подключения к БД MongoDB

2. Выполните `npm run dev` для запуска сервера разработки с hot-reload или `npm run start`
   для запуска сервера;
3. Проект будет запущен на локальном сервере по адресу `http://localhost:3000`;
