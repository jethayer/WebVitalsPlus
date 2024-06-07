import {defineConfig} from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
    srcDir: 'src',
    // manifestVersion: 2,
    vite: () => ({
        plugins: [react()],
    }),
    runner: {
        startUrls: ['https://google.com', 'https://duckduckgo.com'],
    },
    manifest: {
        "action": {},
        "permissions": [
            "storage"
        ]
    }
});
