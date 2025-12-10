# startup-ui

## Локальная установка для разработки

1. Устанавливаем зависимости startup-ui

```
npm install --prefix ./packages/startup-ui
```

2. Устанавливаем зависимости vite-press

```
cd docs
npm install
```

## Локальный запуск документации для разработки

```
cd docs
npm run docs:dev
```

## Публикация обновлений

1. Делаем новый билд

```
cd packages/startup-ui
npm run build
```

2. Если не залогинены в npm, логинимся

```
npm login
```

3. Повышаем версию

```
# Если патч, то:
npm version patch

# Если новая функциональность без изменения API, то:
npm version minor

# Если изменение API, то:
npm version major
```

4. Публикуем изменения

```
npm publish --access public
```

5. Обновляем документацию

```
cd docs
npm run docs:build
```

По FTP копируем docs/.vitepress/dist/* в ftp://priceclub.beget.tech/

6. Коммитим и пушим изменения

