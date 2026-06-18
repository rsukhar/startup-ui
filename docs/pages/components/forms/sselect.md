# SSelect

Выпадающий список с вариантами выбора.

<SToggleGroup>
    <SToggle title="В чем отличие от аналогов?">
        <p>В отличие от популярных библиотек компонентов для Vue3:</p>
        <ol>
            <li>Исключает опции, которые, как правило, не используются в стартапах (флоат лейблы, размеры), но из-за которых разные программисты реализовывают компонент по-разному. Без лишних опций унифицируется код и внешний вид компонентов, упрощается поддержка и взаимозаменяемость.</li>
            <li>Поддерживает два формата передачи опций, удобных для выгрузки из контроллеров Laravel:
            <ol>
                <li><code>{value1: title1, value2: title2}</code> — что удобно для быстрого получения из key-value конфигов, а также из моделей — <code>User::pluck('name', 'id')</code>;</li>
                <li><code>[[value1, title1], [value2, title2]]</code> — что удобно для выгрузки там, где важен порядок. Это минимизирует код в контроллерах, помогая сохранять принцип «тонкого контроллера», которого мы придерживаемся.</li>
            </ol>
            </li>
            <li>Взаимозаменяемость формата опций с другими выбиралками из вариантов. Это позволяет легко заменять SSelect на <a href="/pages/components/forms/scheckbox.html">SCheckboxGroup</a> или <a href="/pages/components/forms/sradio.html">SRadioGroup</a>, не трогая бэкенд код.</li>
        </ol>
    </SToggle>
</SToggleGroup>

## Классический вариант
:::demo
```vue
<template>
    <SSelect v-model="value" :options="options" placeholder="Выберите" />
</template>
<script setup>
import { ref } from 'vue'
const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' }
const value = ref(null)
</script>
```
```vue
<SSelect v-model="value" :options="options" placeholder="Выберите" />
```
:::

Где options — это объект вариантов выбора в формате <code>{value1: title1, value2: title2}</code> или массив в формате <code>[[value1, title1], [value2, title2]]</code>

## Фильтрация при вводе

:::demo
```vue
<template>
    <SSelect v-model="value" :options="options" filterable placeholder="Выберите" />
</template>
<script setup>
import { ref } from 'vue'
const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' }
const value = ref(null)
</script>
```
```vue
<SSelect v-model="value" :options="options" filterable placeholder="Выберите" />
```
:::

## Получение значений по API

Список значений можно подгружать по API — в том числе на каждый ввод. Ниже живой пример: варианты приходят с публичного тестового API [DummyJSON](https://dummyjson.com), запрос уходит в обработчике события `@filter`. Начните вводить имя (например, «jo»):

:::demo
```vue
<template>
    <SSelect v-model="value" :options="options" filterable @filter="onFilter" placeholder="Начните вводить имя" />
</template>
<script setup>
import { ref, onMounted } from 'vue'

const value = ref(null)
const options = ref([])

// Подгружаем варианты с публичного тестового API (DummyJSON):
// при пустом запросе — первые 10, иначе — поиск по введённой строке
async function load(query = '') {
    const url = query
        ? `https://dummyjson.com/users/search?q=${encodeURIComponent(query)}&select=firstName,lastName`
        : 'https://dummyjson.com/users?limit=10&select=firstName,lastName'
    const { users } = await (await fetch(url)).json()
    options.value = users.map(u => [u.id, `${u.firstName} ${u.lastName}`])
}

// Запрашиваем только непустую строку: при выборе значения фильтр сбрасывается в '',
// и перезагружать список не нужно — иначе выбранный вариант пропал бы из опций
const onFilter = (query) => { if (query) load(query) }

onMounted(() => load())
</script>
```
```vue
<SSelect v-model="value" :options="options" filterable @filter="onFilter" placeholder="Начните вводить имя" />
```
:::

Обработчик `@filter` получает введённую строку; ответ API мы приводим к формату опций (`[[value, title]]` или `{value: title}`) и кладём в `:options`. В реальном проекте запрос обычно стоит дебаунсить.

## Возможность сброса значения

Иногда бывает нужно сделать возможность сбрасывать значение в невыбранное (null). Для этого используется атрибут `clearable`:

:::demo
```vue
<template>
    <SSelect v-model="user" :options="options" clearable placeholder="Не выбрано" />
</template>
<script setup>
import { ref } from 'vue'
const options = { 1: 'Иванов', 2: 'Петров', 3: 'Сидоров' }
const user = ref(null)
</script>
```
```vue
<SSelect v-model="user" :options="options" clearable placeholder="Не выбрано" />
```
:::

## Виртуальный скролл

Когда доступно очень много вариантов выбора, можно применить виртуальный скролл для более быстрой загрузки, добавив атрибут `virtual`:

:::demo
```vue
<template>
    <SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
</template>
<script setup>
import { ref } from 'vue'
// 1000 options — virtual scroll keeps it fast by rendering only the visible window
const regions = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [i + 1, `Регион ${i + 1}`])
)
const region = ref(null)
</script>
```
```vue
<SSelect v-model="region" :options="regions" virtual placeholder="Выберите регион" />
```
:::

## Интерфейс компонента

### Свойства (Props)

| Название | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| v-model | any | - | Текущее выбранное значение. |
| options | Record \| Array | - | Список вариантов (объект или массив пар). |
| placeholder | string | - | Текст заглушки. |
| filterable | boolean | `false` | Включает текстовый поиск. |
| clearable | boolean | `false` | Показывает кнопку сброса значения. |
| disabled | boolean | `false` | Отключает компонент. |
| inline | boolean | `false` | Убирает границы и делает селект компактным. |
| virtual | boolean | `false` | Включает виртуальный скролл. |
| virtualScrollSize | number | `10` | Количество одновременно отображаемых элементов при виртуальном скролле. |

### Слоты (Slots)

| Название | Параметры | Описание |
|----------|-----------|----------|
| value | `{ value: any }` | Кастомное отображение выбранного значения. |
| option | `{ option: { label: string, value: any } }` | Кастомное отображение элемента в выпадающем списке. |

### События (Events)

| Название | Параметры | Описание |
|----------|-----------|----------|
| change | `(value: any)` | Вызывается при изменении значения. |
| filter | `(query: string)` | Вызывается при вводе текста в режиме поиска. |

<style lang="scss">
.s-select {
    min-width: 200px;
}
</style>
