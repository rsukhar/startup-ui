import { createVNode, render, ComponentPublicInstance } from 'vue';
import SConfirmVue from './SConfirm.vue';

type SConfirmInstance = ComponentPublicInstance<{
    open: (message: string, options?: Record<string, any>) => Promise<any>;
}>;

let instance: SConfirmInstance | null = null;

function getInstance(): SConfirmInstance {
    if (instance) return instance;

    const container = document.createElement('div');
    const vnode = createVNode(SConfirmVue);
    render(vnode, container);

    // vnode.component может быть null сразу после render()
    const component = vnode.component?.exposed as SConfirmInstance | undefined;

    if (!component) {
        throw new Error('SConfirm component failed to mount');
    }

    document.body.appendChild(container.firstChild!);
    instance = component;
    return instance;
}

export const SConfirm = {
    open(message: string, options: Record<string, any> = {}) {
        const inst = getInstance();
        return inst.open(message, options);
    }
};

export default SConfirm;
