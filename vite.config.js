import viteReact from "@vitejs/plugin-react";
import laravel, { refreshPaths } from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.tsx", "resources/css/theme.scss"],
            refresh: [
                ...refreshPaths,
                "app/Livewire/**"
            ]
        }),
        viteReact()
    ]
});
