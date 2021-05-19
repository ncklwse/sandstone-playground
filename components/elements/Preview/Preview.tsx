import { CustomHandlerFileObject } from '@utils/compiler';
import { useState } from 'react';
import { Window } from './Window';

export function Preview({ dataPack }: { dataPack: CustomHandlerFileObject[] }) {

    const [state, setState] = useState<number>(-1)

    return (
        <>
            {dataPack.map((file, i) => (<Window active={state === i} file={file} key={file.key} onClick={() => { setState(state === i ? -1 : i) }} />))}
            
            {dataPack.length === 0 ? (
                <article>
                    <h1>No output to show</h1>
                </article>
            ) : <></>}

            <style jsx>{`

                article {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    height: calc(100vh - 5.5rem);
                    justify-content: center;
                    padding: 1rem 1.25rem;
                    text-align: center;
                }

                h1 {
                    color: var(--background-accent);
                    font-size: 1.5rem;
                }
                
            `}</style>
        </>
    );
}