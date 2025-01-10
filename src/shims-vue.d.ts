declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue-iframes' {
    const VueIframe: any;
    export default VueIframe;
}