# Локализация

Все пользовательские строки компонентов берутся из единого словаря. Локаль и переопределения задаются один раз — централизованно.

## Выбор локали

Дефолтная локаль — **английская**. Русская (`ru`) встроена и включается при регистрации плагина:

```js
// app.js
import StartupUI from 'startup-ui';

app.use(StartupUI, { locale: 'ru' });
```

Если не используете глобальный плагин (импортируете компоненты по отдельности), настройте локализацию напрямую:

```js
import { configureStartupUi } from 'startup-ui';

configureStartupUi({ locale: 'ru' });
```

## Переопределение строк

`messages` сливаются (deep-merge) поверх встроенных словарей — переопределять можно точечно, по отдельным ключам:

```js
app.use(StartupUI, {
    locale: 'en',
    messages: {
        en: {
            confirm: { accept: 'Confirm', cancel: 'Dismiss' },
            pagination: { perPage: 'Show {n}' },
        },
    },
});
```

## Своя локаль

Можно добавить произвольную локаль целиком, передав полный словарь и выбрав её:

```js
import { configureStartupUi } from 'startup-ui';
import de from './locales/startup-ui.de';

configureStartupUi({ locale: 'de', messages: { de } });
```

## Смена локали в рантайме

```js
import { setLocale } from 'startup-ui';

setLocale('en'); // все компоненты реактивно перерисуются
```

## Региональные локали

Коды с региональным субтегом резолвятся с фолбэком по базовому языку: `en-US` → `en`, `ru-RU` → `ru` (и в конце — `en`). Поэтому можно безопасно передавать `navigator.language`.

Встроенная локаль `en-US` отличается от `en` только первым днём недели — **воскресенье** (в `en`/`ru` неделя начинается с понедельника):

```js
configureStartupUi({ locale: 'en-US' }); // SDatePicker: неделя с воскресенья
```

Первый день недели можно задать и точечно — пропом `first-day` у `SDatePicker` (`0` — вс, `1` — пн).

## Доступные ключи

| Группа | Ключи |
|--------|-------|
| `confirm` | `title`, `accept`, `cancel` |
| `pagination` | `shown`, `of`, `perPage` (плейсхолдер `{n}`) |
| `select` | `noData` |
| `table` | `noData` |
| `canvas` | `sidebarMobileTitle` |
| `upload` | `selectFile`, `selectFiles` |
| `copyText` | `copy` |
| `columnSettings` | `configure`, `reset`, `resetTo` (`{title}`), `resetChanges` |
| `dropdownMenu` | `placeholder` |
| `datePicker` | `weekDays[]`, `months[]`, `notSelected`, `firstDay` (0 — вс, 1 — пн) |
| `htmlEditor` | `language`, `blocks.*` |

Точечные пропы компонентов (например `sidebar-mobile-title` у `SCanvas`, `nodata` у `STable`) по-прежнему имеют приоритет над словарём.

## Связанные возможности

- **SConfirm**: цвет accept-кнопки управляется опцией `variant: 'primary' | 'danger'` (по умолчанию `danger`). Для неразрушающих подтверждений (move и т.п.) используйте `primary`.
- **SActionIcon**: пробрасывает в `SConfirm` опции через `confirm-options` (`acceptLabel`, `cancelLabel`, `variant`, …):

```vue
<SActionIcon
    icon="trash"
    confirm="Удалить запись?"
    :confirm-options="{ acceptLabel: 'Удалить', variant: 'danger' }"
    @click="remove"
/>
```
