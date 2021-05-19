import { MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Loader } from '../Loader';
import { NavbarItem } from './NavbarItem';

export function NavbarMenu({ onClick, state }: { onClick?: (() => Promise<any>), state: boolean }) {

    const [itemState, setItemState] = useState<MutableRefObject<any>>();
    const [compileCodeText, setCompileCodeText] = useState(<><i className="la la-tools"></i>&nbsp;&nbsp;Compile Code</>);

    const highlightRef = useRef<HTMLSpanElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const item1 = useRef<HTMLAnchorElement | null>(null);
    const item2 = useRef<HTMLAnchorElement | null>(null)

    const handleClick: MouseEventHandler<HTMLLIElement> = ({ currentTarget }) => {
        if (onClick) {
            currentTarget.style.width = highlightRef.current?.style.width as string;
            setCompileCodeText(<><Loader size="1rem" /></>);
            onClick().then(() => {
                currentTarget.style.width = '';
                setCompileCodeText(<><i className="la la-tools"></i>&nbsp;&nbsp;Compile Code</>);
            });
        }
    }

    useEffect(() => {
        if (highlightRef.current !== null) {

            if (typeof itemState !== 'undefined' && itemState.current !== null && listRef.current !== null) {

                highlightRef.current.style.marginLeft = ((itemState.current.offsetLeft - listRef.current.offsetLeft + (itemState.current.offsetWidth / 2) - (listRef.current.offsetWidth / 2)) * 2) + 'px';
                highlightRef.current.style.opacity = '1';
                highlightRef.current.style.width = itemState.current.offsetWidth.toString() + 'px';

                return;
                
            }

            highlightRef.current.style.opacity = '0';

        }
    }, [itemState]);

    return (
        <>
            <ul className={state ? 'active' : ''} ref={listRef}>
                <span ref={highlightRef}></span>
                <li onClick={handleClick}>
                    <NavbarItem link="" state={[item1, setItemState]}>
                        {compileCodeText}
                    </NavbarItem>
                </li>
                <li>
                    <NavbarItem link="https://github.com/ncklwse/sandstone-playground" state={[item2, setItemState]}>
                        <i className="lab la-github"></i>&nbsp;&nbsp;Github
                    </NavbarItem>
                </li>
            </ul>
            <style jsx>{`

                ul {
                    align-items: center;
                    background-color: transparent;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                span {
                    background-color: rgba(0, 0, 0, 0.25);
                    height: 3.625rem;
                    position: absolute;
                    transition: var(--transition-normal) ease;
                    width: 0px;
                    z-index: 0;
                }

                li {
                    z-index: 1;
                }

                @media only screen and (max-width: 768px) {
                    
                    ul:not(.active) li {
                        display: none;
                    }

                    ul.active {
                        display: block;
                        height: unset;
                    }

                    span {
                        display: none;
                    }

                }

            `}</style>
        </>
    );
}