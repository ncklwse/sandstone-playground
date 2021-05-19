export function Code ({children}: { children: string }) {
    return (
        <>
            <pre>
                {children.split(/[\r\n]/g).filter(line => line !== '').map((line, i) => (<code key={i}>{line}</code>))}
            </pre>
            <style jsx>{`
                
                pre {
                    margin: 0;
                    padding: 1rem 1.25rem;
                }
                
                code {
                    display: block;
                    padding: 0.25rem 0;
                    font-family: var(--font-code);
                    font-size: 0.825rem;
                }

            `}</style>
        </>
    )
}