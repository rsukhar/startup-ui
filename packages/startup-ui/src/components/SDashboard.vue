<template>
    <div class="s-dashboard">
        <slot />
    </div>
</template>

<script setup>
</script>

<style lang="scss">
// Острова дешборда
.s-dashboard {
    column-gap: 30px;
    margin-top: 0.5rem;
    margin-bottom: 30px;

    // Может иметь от 1 до 5 колонок в зависимости от ширины экрана
    $minColumnWidth: 380px;
    $gap: 30px;
    @for $n from 1 through 5 {
        @if $n == 1 {
            column-count: $n;
        } @else {
            @media (min-width: calc($minColumnWidth * $n + $gap * ($n + 1))) {
                column-count: $n;
            }
        }
    }
}
</style>