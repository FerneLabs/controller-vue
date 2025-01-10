import { createApp } from 'vue'
import { errorHandler } from './errorHandler'
import App from './App.vue'
import { init } from './tg_config/InitTelegram';
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue';
import VueIframe from 'vue-iframes'

import './tg_config/mockEnv';
import './middleware/WebGLMessage';
import './middleware/VueMessage';
import './assets/main.css';

try {
    init(retrieveLaunchParams()?.startParam === 'debug' || import.meta.env.DEV);
} catch (e) {
    console.error('cannot init', e);
}

const app = createApp(App)
app.config.errorHandler = errorHandler
app.use(VueIframe)
app.mount('#app')