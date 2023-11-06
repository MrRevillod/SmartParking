import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({

    plugins: [
        react(),
        VitePWA({
            mode: 'development',
            base: '/',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            devOptions: {
                enabled: true,
                type: 'module',
                navigateFallback: '/index.html',

            },
            manifest: {
                    name: 'Smart Parking',
                    short_name: 'SP',
                    description: 'Gestor de estacionamiento',
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: 'icon192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'icon512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
               
        }
            
        })
    ],

    server: {
        host: true,
        port: 8000,
    },

    preview: {
        host: true,
        port: 8000,
    }
})
