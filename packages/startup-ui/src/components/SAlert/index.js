import { createVNode, render } from 'vue';
import SAlertVue from './SAlert.vue';

let instance;

function getInstance() {
    if (instance) return instance;

    const container = document.createElement('div');
    const vnode = createVNode(SAlertVue);
    render(vnode, container);
    document.body.appendChild(container.firstChild);
    instance = vnode.component.exposed;
    return instance;
}

export const SAlert = {
    success(message, options = {}) {
        const instance = getInstance();
        return instance.success(message, options);
    },
    error(message, options = {}) {
        const instance = getInstance();
        return instance.error(message, options);
    },
    info(message, options = {}) {
        const instance = getInstance();
        return instance.info(message, options);
    },
}