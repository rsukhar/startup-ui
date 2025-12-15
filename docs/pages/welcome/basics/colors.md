# Цвета и настройки

## Общая идея

Для часто настраиваемых значений предусмотрены CSS-переменные, чтобы стандартизировать однотипные цвета и стили (и разработчик мог всегда использовать переменные, не подбирая и не добавляя новые цвета), а также чтобы была возможность легко перегружать переменные на уровне отдельных компонентов или модификаторов.

Все переменные Startup UI начинаются с вендорного префикса `--s-`

## Цвета

### Черный, белый и серый

* `--s-white` (напр. <span class="color-example" style="background-color: #fff"></span> `#fff`) — белый цвет
* `--s-black` (напр. <span class="color-example" style="background-color: #000"></span> `#000`) — черный цвет
* `--s-gray` (напр. <span class="color-example" style="background-color: #f2f2f2"></span> `#f2f2f2`) — серый цвет

### Фоновые цвета

* `--s-bg-header` (напр. <span class="color-example" style="background-color: #081935"></span> `#081935`) — цвет шапки
* `--s-bg-subheader` (напр. <span class="color-example" style="background-color: #1A3158"></span> `#1A3158`) — цвет полоски под шапкой 
* `--s-bg` (напр. <span class="color-example" style="background-color: #f2f3f4"></span> `#f2f3f4`) — дополнительный фоновый цвет (напр.для чередующихся блоков)

### Цвета бордюров

* `--s-border` (напр. <span class="color-example" style="background-color: #d1d1d1"></span> `#d1d1d1`) — стандартный бордюр
* `--s-border-light` (напр. <span class="color-example" style="background-color: #666"></span> `#666`) — осветленный бордюр

### Цвета текста

* `--s-text` (напр. <span class="color-example" style="background-color: #000"></span> `#000`) — базовый цвет текста
* `--s-text-light` (напр. <span class="color-example" style="background-color: #999"></span> `#999`) — осветленный цвет текста
* `--s-text-lightest` (напр. <span class="color-example" style="background-color: #ccc"></span> `#ccc`) — ещё более осветленный цвет текста

### Брендовый цвет и его оттенки

* `--s-primary` (напр. <span class="color-example" style="background-color: #f04f0a"></span> `#f04f0a`) — базовый брендовый цвет (цвет акцентов)
* `--s-primary-dark` (напр. <span class="color-example" style="background-color: #c63a06"></span> `#c63a06`) — затемненный брендовый цвет
* `--s-primary-darkest` (напр. <span class="color-example" style="background-color: #802703"></span> `#802703`) — ещё более затемненный брендовый цвет
* `--s-primary-light` (напр. <span class="color-example" style="background-color: #f1905f"></span> `#f1905f`) — осветленный брендовый цвет
* `--s-primary-lightest` (напр. <span class="color-example" style="background-color: #f8eeea"></span> `#f8eeea`) — ещё более осветленный брендовый цвет

### Красный цвет и его оттенки

* `--s-red` (напр. <span class="color-example" style="background-color: #ea524a"></span> `#ea524a`) — базовый красный цвет
* `--s-red-dark` (напр. <span class="color-example" style="background-color: #d33229"></span> `#d33229`) — затемненный красный цвет
* `--s-red-light` (напр. <span class="color-example" style="background-color: #ffbfbf"></span> `#ffbfbf`) — осветленный красный цвет
* `--s-red-lightest` (напр. <span class="color-example" style="background-color: #ffece8"></span> `#ffece8`) — ещё более осветленный красный цвет

### Желтый цвет и его оттенки

* `--s-yellow` (напр. <span class="color-example" style="background-color: #e6a23c"></span> `#e6a23c`) — базовый желтый цвет
* `--s-yellow-dark` (напр. <span class="color-example" style="background-color: #b88230"></span> `#b88230`) — затемненный желтый цвет
* `--s-yellow-light` (напр. <span class="color-example" style="background-color: #eebe77"></span> `#eebe77`) — осветленный желтый цвет
* `--s-yellow-lightest` (напр. <span class="color-example" style="background-color: #faecd8"></span> `#faecd8`) — ещё более осветленный желтый цвет

### Зеленый цвет и его оттенки

* `--s-green` (напр. <span class="color-example" style="background-color: #53b753"></span> `#53b753`) — базовый зеленый цвет
* `--s-green-dark` (напр. <span class="color-example" style="background-color: #3f983f"></span> `#3f983f`) — затемненный зеленый цвет
* `--s-green-light` (напр. <span class="color-example" style="background-color: #65bf65"></span> `#65bf65`) — осветленный зеленый цвет
* `--s-green-lightest` (напр. <span class="color-example" style="background-color: #b8e5b8"></span> `#b8e5b8`) — ещё более осветленный зеленый цвет

## Размеры

### Разметка

* `--s-base-width` (напр. `1200px`) — базовая ширина основной области страницы
* `--s-base-margin` (напр. `20px`) — базовые отступы между элементами
* `--s-base-padding` (напр. `20px`) — базовые отступы внутри контентных элементов

### Размеры интерфейсов

* `--s-field-height` (напр. `32px`) — высота полей ввода

## Типографика

* `--s-font-family` (напр. `'Open Sans', sans-serif`) — основной шрифт
* `--s-font-size` (напр. `14px`) — базовый размер шрифта
* `--s-h1-font-size` (напр. `2.2rem`) — размер заголовка 1
* `--s-h2-font-size` (напр. `1.7rem`) — размер заголовка 2
* `--s-h3-font-size` (напр. `1.4rem`) — размер заголовка 3
* `--s-h4-font-size` (напр. `1.2rem`) — размер заголовка 4

## Дополнительная стилизация

### Тени

* `--s-shadow` (напр. `0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1)`) — базовые тени

### Скругления

* `--s-border-radius` (напр. `6px`) — базовые скругления

<style lang="scss">
.color-example {
    display: inline-block;
    width: 20px;
    height: 20px;
    box-shadow: var(--s-shadow);
    border-radius: var(--s-border-radius);
    line-height: 1em;
    vertical-align:middle;
}
</style>