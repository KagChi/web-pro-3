import { PropsWithChildren, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function BaseLayout({ children }: PropsWithChildren) {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <main>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            
            {children}
        </main>
    );
}
