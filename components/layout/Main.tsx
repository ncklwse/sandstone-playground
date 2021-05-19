import { ReactNode } from 'react';

export function Main ({children}: { children: ReactNode }) {
    return (
        <>
            <main>
                {children}
            </main>
            <style jsx>{`

                main {
                    display: flex;
                }    
                
            `}</style>
        </>
    );
}