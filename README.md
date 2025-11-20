# startup-ui

## Запуск документации

### Установка зависимостей vite-press
cd docs
npm install

## Далее запускаем локальный dev-сервер из папки docs
npm run docs:dev

## Сборка
npm run docs:build

## Публикация изменений в npm

### Делаем новый билд в папке packages/startup-ui: 
npm run build

### Логинимся в npm
npm login

### Повышаем версию

- патч:
npm version patch

- новая функциональность, без нарушения API:
npm version minor

- изменения API:
npm version major

### Публикуем 
npm publish --access public