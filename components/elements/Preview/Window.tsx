import { CustomHandlerFileObject } from '@utils/compiler';
import React, { useEffect, useRef } from 'react';
import { Code } from './Code';

export function Window({ active, file, onClick }: { active: boolean, file: CustomHandlerFileObject, onClick?: (() => void) }) {

    const collapsible = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (!active) {
            requestAnimationFrame(() => {
                if (collapsible !== null && collapsible.current !== null) {
                    collapsible.current.style.height = '0px';
                }
            });
            return;
        }

        requestAnimationFrame(() => {
            
            let height: number; 

            if (collapsible !== null && collapsible.current !== null) {
                collapsible.current.style.transition = 'none';
                collapsible.current.style.height = 'auto';
                height = collapsible.current?.clientHeight;
                collapsible.current.style.height = '0px';
                collapsible.current.style.transition = '';
            }

            requestAnimationFrame(() => {
                if (collapsible !== null && collapsible.current !== null) {
                    collapsible.current.style.height = (height ?? 0) + 'px';
                }
            });

        });

    }, [active]);

    return (
        <>
            <button className={active ? 'active' : ''} onClick={onClick}>
                <span>
                    <h2>{file.type.slice(0, -1)}</h2>
                    <h1>{file.relativePath}</h1>
                </span>
                <span>
                    <i className="las la-angle-down"></i>
                </span>
            </button>
            <article ref={collapsible}>
                <Code>{file.content}</Code>
            </article>
            <style jsx>{`

                button {
                    background-color: var(--background-tertiary);
                    border: none;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    flex-direction: row;
                    font-family: var(--font-display);
                    align-items: center;
                    outline: none;
                    text-align: left;
                    transition: background-color var(--transition-normal) ease;
                    padding: 1.25rem 1rem;
                    width: 100%;
                }

                button.active {
                    box-shadow: var(--shadow-normal);
                }

                button.active, button:hover {
                    background-color: var(--background-accent);
                }

                button > span:first-child {
                    flex: 1;
                }

                button > span:last-child {
                    font-size: 1.25rem;
                    padding-left: 1rem;
                }

                button > span:last-child > i {
                    transform: rotate(0deg);
                    transition: transform var(--transition-normal) ease;
                }

                button.active > span:last-child > i {
                    transform: rotate(180deg);
                }

                h1, h2 {
                    margin: 0;
                    padding: 0;
                }

                h2 {
                    font-size: 0.825rem;
                    font-weight: bold;
                    letter-spacing: 0.06125rem;
                    text-transform: uppercase;
                }

                h1 {
                    padding-top: 0.25rem;
                    font-size: 1.125rem;
                }

                article {
                    background-color: var(--background-primary);
                    overflow: hidden;
                    transition: height var(--transition-normal) ease;
                }
                
            `}</style>
        </>
    );

}