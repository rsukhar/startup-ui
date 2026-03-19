#  Обновление документации

## Локальный запуск документации для разработки

```sh
cd docs
npm run docs:dev
```

## Обновляем документацию

```sh
cd docs
npm run docs:build
```

По FTP копируем docs/.vitepress/dist/* в ftp://priceclub.beget.tech/

Коммитим и пушим изменения
