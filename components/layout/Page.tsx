import Head from 'next/head';
import { ReactNode } from 'react';

export function Page ({children}: { children: ReactNode }) {
    return (
        <>
            <Head>
                <title>Sandstone Playground</title>
                <link href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" rel="stylesheet" />
            </Head>
            <div>
                {children}
            </div>
            <style jsx>{`

                div {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    overflow: hidden;
                }    
                
            `}</style>
        </>
    );
}