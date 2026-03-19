#  Гайдлайн разработки

## Локальная установка для разработки

1. Устанавливаем зависимости startup-ui

```sh
npm install --prefix ./packages/startup-ui
```

2. Устанавливаем зависимости vite-press

```sh
cd docs
npm install
```

## Публикация обновлений

1. Делаем новый билд

```sh
cd packages/startup-ui
npm run build
```

2. Если не залогинены в npm, логинимся

```sh
npm login
```

3. Повышаем версию

```sh
# Если патч, то:
npm version patch

# Если новая функциональность без изменения API, то:
npm version minor

# Если изменение API, то:
npm version major
```

4. Публикуем изменения

```sh
npm publish --access public
```

5. <a href="/pages/welcome/extras/docs-update.html">Обновляем документацию</a>
