import { createVNode, render, ComponentPublicInstance } from 'vue';
import SAlertVue from './SAlert.vue';

type SAlertInstance = ComponentPublicInstance<{
    success: (message: string, options?: Record<string, any>) => Promise<any>;
    error: (message: string, options?: Record<string, any>) => Promise<any>;
    info: (message: string, options?: Record<string, any>) => Promise<any>;
}>;

let instance: SAlertInstance | null = null;

function getInstance(): SAlertInstance {
    if (instance) return instance;

    const container = document.createElement('div');
    const vnode = createVNode(SAlertVue);
    render(vnode, container);

    // vnode.component может быть null сразу после render()
    const component = vnode.component?.exposed as SAlertInstance | undefined;

    if (!component) {
        throw new Error('SAlertInstance component failed to mount');
    }

    document.body.appendChild(container.firstChild!);
    instance = component;
    return instance;
}

export const SAlert = {
    success(message: string, options: Record<string, any> = {}) {
        const instance = getInstance();
        return instance.success(message, options);
    },
    error(message: string, options = {}) {
        const instance = getInstance();
        return instance.error(message, options);
    },
    info(message: string, options = {}) {
        const instance = getInstance();
        return instance.info(message, options);
    },
};

export default SAlert;