import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/Filament/**/*.php",
        "./resources/views/filament/**/*.blade.php",
        "./vendor/filament/**/*.blade.php",
        "./resources/views/**/*.blade.php",
        "./resources/**/*.tsx"
    ],
    theme: {
        extend: {
            container: {
                center: true
            },
            colors: {
                primary: "#0972bd"
            },
            objectPosition: {
                "85-15": "85% 15%"
            }
        }
    },
    corePlugins: {
        aspectRatio: false
    },
    plugins: [
        aspectRatio,
        typography
    ]
};
