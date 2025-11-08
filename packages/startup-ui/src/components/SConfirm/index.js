import { createVNode, render } from 'vue';
import SConfirmVue from './SConfirm.vue';

let instance;

function getInstance() {
    if (instance) return instance;

    const container = document.createElement('div');
    const vnode = createVNode(SConfirmVue);
    render(vnode, container);
    document.body.appendChild(container.firstChild);
    instance = vnode.component.exposed;
    return instance;
}

export const SConfirm = {
    open(message, options = {}) {
        const instance = getInstance();
        return instance.open(message, options);
    }
}