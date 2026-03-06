# SActionBar

An action bar component, typically used to display a floating bottom bar with actions when one or more items (like checkboxes) are selected. It uses `<Teleport to="body">` internally to ensure it's positioned correctly regardless of where it's placed in the component tree.

## Import

```javascript
import { SActionBar } from 'startup-ui';
```

## Basic Example

The `SActionBar` accepts content through its default slot. It is usually rendered conditionally (e.g., using `v-if`) when an array of selected items is not empty.

```vue
<SCheckboxGroup v-model="selectedUsers" :options="userOptions" />

<SActionBar v-if="selectedUsers.length > 0">
    <SSelect v-model="massAction" :options="massActions" />
    <SButton @click="applyMassAction">Apply</SButton>
</SActionBar>
```

<details>
<summary>Composition API Example</summary>

```vue
<template>
    <div>
        <SCheckboxGroup v-model="selectedUsers" :options="userOptions" />
        
        <SActionBar v-if="selectedUsers.length > 0">
            <SSelect v-model="massAction" :options="massActions" style="width: 250px" />
            <SButton @click="applyMassAction">Apply Action</SButton>
        </SActionBar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SCheckboxGroup, SActionBar, SSelect, SButton, SAlert } from 'startup-ui';

const selectedUsers = ref([]);
const userOptions = {
    1: 'Ivanov',
    2: 'Petrov',
    3: 'Sidorov'
};

const massActions = { 
    sendBonus: 'Send Bonus', 
    greet: 'Greet', 
    delete: 'Delete' 
};
const massAction = ref('sendBonus');

function applyMassAction() {
    // Process the selected users
    console.log(`Action \${massAction.value} applied to users:`, selectedUsers.value);
    
    // Reset selection to hide the SActionBar
    selectedUsers.value = [];
    
    // Show confirmation
    SAlert.success('Action successfully applied');
}
<\/script>
```
</details>

## Slots

| Name | Description |
|------|-------------|
| default | The interactive elements, buttons, or form controls to display in the action bar. The content uses flexbox, so elements are arranged in a row. |
