# SCanvas + SFooter

Общий шаблон страницы.

## Базовый пример

``` js
<SCanvas>
    <template #header>
        Шапка
    </template>
    <template #subheader>
        Второй блок шапки
    </template>
    <template #sidebar>
        Боковой блок страницы
    </template>
    <template #content>
        <slot />
    </template>
</SCanvas>
<SFooter>
    <div>&copy; suhar.ru, 2025. Все права защищены</div>
</SFooter>
<script setup>
import { SCanvas, SFooter } from 'startup-ui';
</script>
```