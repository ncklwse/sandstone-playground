import { Preview, Navbar } from '@components/elements';
import { Page } from '@components/layout';
import { Editor } from '@components/editor';
import { compile as compileDataPack, CustomHandlerFileObject } from '@utils/compiler';
import { useState } from 'react';
import { Loader } from '@components/elements/Loader';
import type { editor } from 'monaco-editor';

export default function IndexPage() {

    const [compiledDataPack, setCompiledDataPack] = useState<CustomHandlerFileObject[]>([]);
    const [editorErrors, setEditorErrors] = useState<editor.IMarker[]>([]);
    const [editorValue, setEditorValue] = useState(`import { MCFunction, say } from 'sandstone'; MCFunction('test', () => { say('Hello world!'); });`);
    const [loadingMessage, setLoadingMessage] = useState('Getting ready');

    const compile = (code: string) => {
        
        for (const error of editorErrors) {
            if (error.owner === 'typescript' && error.severity > 1) {
                setCompiledDataPack([editorErrors.reduce((reduced, error) => ({
                    ...reduced, 
                    ...(error.owner === 'typescript' ? {
                        content: `${reduced.content}[${error.startLineNumber}:${error.startColumn}] ${error.message}\n`
                    } : {})
                }), { type: 'errors', relativePath: 'Failed to Compile:', key: 0, content: ''})]);
                return Promise.resolve();
            }
        }
        
        return compileDataPack(code).then(setCompiledDataPack);

    }

    return (
        <Page>
            <Navbar onClick={() => compile(editorValue)} />
            <main>

                <section>
                    
                    <div>
                        <article>
                            <Loader size="3rem" thickness="0.375rem" />
                            <h1>Loading Playground...</h1>
                            <h2>({loadingMessage})</h2>
                        </article>
                    </div>
                    
                    <div>
                        <Editor onChange={setEditorValue} onError={setEditorErrors} whileLoading={setLoadingMessage} />
                    </div>

                </section>

                <aside>
                    <Preview dataPack={compiledDataPack} />
                </aside>

                <style jsx>{`

                    main {
                        display: flex;
                        flex: 1;
                        flex-direction: row;
                        justify-content: stretch;
                    }

                    section {
                        display: grid;
                        position: relative;
                        width: calc(100% - clamp(320px, calc(100vw / 3), 480px));
                    }

                    div {
                        align-items: center;
                        background-color: var(--background-primary);
                        display: flex;
                        justify-content: center;
                        grid-row-start: 1;
                        grid-column-start: 1;
                    }

                    article {
                        margin: 0;
                        padding: 2rem 2.5rem;
                        position: relative;
                        text-align: center;
                        z-index: 0;
                    }

                    h1 {
                        color: white;
                        font-size: 2.25rem;
                    }

                    h2 {
                        color: var(--background-accent);
                        font-size: 1rem;
                    }

                    aside {
                        background-color: var(--background-secondary);
                        box-shadow: var(--shadow-normal);
                        overflow-x: hidden;
                        max-height: calc(100vh - 3.5rem);
                        width: clamp(320px, calc(100vw / 3), 480px);
                        z-index: 9;
                    }

                `}</style>

            </main>
        </Page>
    );
}
