import { PropsWithChildren } from "react";

export function BaseLayout({ children }: PropsWithChildren) {
    return (
        <main>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            
            {children}
        </main>
    );
}
