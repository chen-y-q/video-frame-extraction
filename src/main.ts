import { createApp } from 'vue'
import './style.css'
import router from './router/index';
import App from './App.vue'

// main.js
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

import ParticlesBox from './components/particlesBox.vue'


const app = createApp(App)

app.component('particlesBox', ParticlesBox)

app.use(Particles, {
    init: async (engine) => {
        await loadFull(engine)
    }
})

app.use(router);

app.mount('#app')
