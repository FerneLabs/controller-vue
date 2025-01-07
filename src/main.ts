import { createApp } from 'vue'
import { errorHandler } from './errorHandler'
import App from './App.vue'
import { init } from './InitTelegram';
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue';
import './mockEnv';
import './main.css';

try {
    init(retrieveLaunchParams()?.startParam === 'debug' || import.meta.env.DEV);
} catch (e) {
    console.error('cannot init', e);
}

const app = createApp(App)
app.config.errorHandler = errorHandler
app.mount('#app')