<template>
    <component v-if="comp" :is="comp" v-bind="$attrs" />
</template>
<script setup>
import { shallowRef, onMounted } from 'vue';

defineOptions({ inheritAttrs: false });

const comp = shallowRef(null);

onMounted(async () => {
    comp.value = (await import('../../../packages/startup-ui/src/components/SHtmlEditor.vue')).default;
});
</script>
