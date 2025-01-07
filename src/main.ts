import { createApp } from 'vue'
import { errorHandler } from './errorHandler'
import App from './App.vue'
import { init } from './InitTelegram';
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue';
import './mockEnv';

const app = createApp(App)
app.config.errorHandler = errorHandler
app.mount('#app')
let lp = undefined;
let debug = false;

try {
    lp = retrieveLaunchParams();
} catch (e) {
    console.error('cannot load retrieveLaunchParams', e);
}

try {
    debug = import.meta.env.DEV;
} catch (e) {
    console.error('cannot set debug var', e);
}

try {
    init(lp?.startParam === 'debug' || debug);
} catch (e) {
    console.error('cannot init', e);
}