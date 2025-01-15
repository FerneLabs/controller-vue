import { createApp } from 'vue'
import { errorHandler } from './errorHandler'
import App from './App.vue'
import { init } from './tg_config/InitTelegram';
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue';

import './tg_config/mockEnv';
import './middleware/WebGLMessage';
import './middleware/VueMessage';
import './assets/main.css';

try {
    init(retrieveLaunchParams()?.startParam === 'debug' || import.meta.env.DEV);
} catch (e) {
    console.error('cannot init', e);
}

if (import.meta.env.VITE_DEV) {
    import('eruda').then(eruda => eruda.default.init());
}

const app = createApp(App)
app.config.errorHandler = errorHandler
app.mount('#app')