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
        await loadFull(engine) // you can load the full tsParticles library from "tsparticles" if you need it
        // loadSlim 轻量级的
        // await loadSlim(engine) // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
    }
})

app.use(router);

app.mount('#app')
