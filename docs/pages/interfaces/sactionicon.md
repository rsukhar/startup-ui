# SActionIcon

Иконка действия (чаще всего используется в таблицах).

## Стандартный пример

Используются стандартые иконки FontAwesome. Типовой пример с click-событием:

<div class="docs-container">
<SActionIcon icon="pen-to-square" title="Редактировать" @click="greet('Hello!')" />
</div>

::: details Показать код
``` js
<SActionIcon icon="pen-to-square" title="Редактировать" @click="alert('Hello!')" />

```
:::

## Ссылка в иконке

Если указать href-атрибут, то по умолчанию иконка станет анкором:
<div class="docs-container">
<SActionIcon icon="pen-to-square" title="Редактировать" href="https://suhar.ru" />
</div>


``` js
<SActionIcon icon="pen-to-square" title="Редактировать" href="https://suhar.ru" />
```

Но при необходимости также через атрибут is можно также передать Link-компонент InertiaJs:

``` js
<SActionIcon icon="pen-to-square" title="Редактировать" :is="Link" href="https://suhar.ru" />
```

## Подтверждение действия

Для небезопасных действий выделяем иконку цветом (атрибут danger) и запрашиваем подтверждение перед выполнением (атрибут confirm):
<div class="docs-container">
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="`Вы действительно хотите удалить пользователя?`" />
</div>

``` js
<SActionIcon title="Удалить" @click="deleteUser(user.username)" icon="trash" danger confirm="`Вы действительно хотите удалить пользователя?`" />
```

<script setup>
import SActionIcon from '../../../packages/startup-ui/src/components/SActionIcon.vue';

function greet(msg) {
  alert(msg)
}

const user = {
    username: 'User'
};

function deleteUser() {

}
</script>