import { MutableRefObject, useEffect, useRef } from 'react';
import loader from '@monaco-editor/loader';
import type { editor } from 'monaco-editor';

export function Editor ({onChange, onError, onReady, whileLoading}: { onChange?: ((newValue: string) => void), onError?: ((markers: editor.IMarker[]) => void), onReady?: (() => void), whileLoading?: ((eventMessage: string) => void)}) {

    const wrapper: MutableRefObject<HTMLDivElement | null> = useRef(null);

    useEffect(() => {
        loader.init().then(async monaco => {
            if (wrapper.current !== null) {

                if (whileLoading) {
                    whileLoading('Configuring typescript compiler options');
                }

                // Set Compiler Options
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ES2016,
                    allowNonTsExtensions: true,
                    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                    module: monaco.languages.typescript.ModuleKind.CommonJS,
                    noEmit: true,
                    typeRoots: ['node_modules/@types']
                });

                if (whileLoading) {
                    whileLoading('Fetching sandstone build info');
                }

                // Load Sandstone
                const buildInfoRequest = await fetch('https://unpkg.com/sandstone@latest/tsconfig.tsbuildinfo');
                const buildInfo = await buildInfoRequest.json();

                for await (const file of Object.keys(buildInfo.program.fileInfos)) {

                    const sourceFilePath = file.match(/^\.\.\/src\/([^]+)\.ts$/);

                    if (whileLoading) {
                        whileLoading(`Downloading sandstone/${sourceFilePath?.[1]} types`);
                    }

                    if (sourceFilePath && sourceFilePath[1]) {
                        monaco.languages.typescript.typescriptDefaults.addExtraLib(
                            await (await fetch(`https://unpkg.com/${buildInfoRequest.url.match(/(sandstone@(\d{1,2}\.?)+)/)?.[0]}/${sourceFilePath[1]}.d.ts`)).text(),
                            `node_modules/@types/sandstone/${sourceFilePath[1]}.d.ts`
                        );
                    }
                
                }

                if (whileLoading) {
                    whileLoading('Configuring diagnostic settings')
                }

                // Diagnostic Options
                monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: false,
                    noSyntaxValidation: false
                });

                if (whileLoading) {
                    whileLoading('Creating editor model')
                }

                const sampleCode = `import { MCFunction, say } from 'sandstone';\n\nMCFunction('test', () => {\n\tsay('Hello world!');\n});`

                const editor = monaco.editor.create(wrapper.current, {
                    folding: true,
                    fontFamily: 'var(--font-code)',
                    fontLigatures: true,
                    model: monaco.editor.createModel(sampleCode, 'typescript', new (monaco.Uri as any)('main.ts')),
                    theme: 'vs-dark',
                    tabCompletion: 'on'
                });

                if (whileLoading) {
                    whileLoading('Ready!');
                }

                if (typeof onReady !== 'undefined') {
                    onReady();
                }

                if (typeof onChange !== 'undefined') {
                    editor.onDidChangeModelContent(() => {
                        onChange(editor.getValue());
                    });
                }

                if (typeof onError !== 'undefined') {
                    monaco.editor.onDidChangeMarkers(() => {
                        onError(monaco.editor.getModelMarkers({ resource: new (monaco.Uri as any)('main.ts') }));
                    });
                }

            }
        });
    }, []);

    return (
        <>
            <article ref={wrapper}></article>
            <style jsx>{`

                article {
                    position: absolute;
                    width: 100%;
                    height: calc(100vh - 3.5rem);
                } 
            
            `}</style>
        </>
    );
}
