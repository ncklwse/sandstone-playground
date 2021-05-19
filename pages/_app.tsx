import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App ({ Component, pageProps }: AppProps) {

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js');
            });
        }
    }, []);

    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{`

                @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap');
                @import url('http://fonts.cdnfonts.com/css/cascadia-code');

                :root {

                    --background-primary: #1e1e1e;
                    --background-secondary: #252526;
                    --background-tertiary: #2d2d30;
                    --background-accent: #3e3e42;

                    --font-display: 'Raleway', 'Helvetica Neue', 'Helvetica', 'Arial', system-ui, sans-serif;
                    --font-code: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;

                    --interactive-primary: #25c2a0;

                    --rounded-normal: 6px;

                    --shadow-normal: 3px 3px 9px rgba(0, 0, 0, 0.5);

                    --transition-normal: 0.25s;

                    --text-light: white;

                }

                html, body {
                    color: var(--text-light);
                    font-family: var(--font-display);
                    margin: 0;
                    padding: 0;
                }

            `}</style>
        </>
    );
}