import Link from 'next/link';
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';

interface props {
    children: ReactNode
    link?: string
    state: [MutableRefObject<any>, Dispatch<SetStateAction<MutableRefObject<any> | undefined>>]
}

export function NavbarItem ({children, link, state: [itemRef, setCurrentRef]}: props) {

    const handleMouseEnter = () => {
        setCurrentRef(itemRef);
    }

    const handleMouseLeave = () => {
        setCurrentRef(undefined);
    }

    return (
        <>
            {typeof link === 'string' && (/^(?:\/|[a-z]+:\/\/)/.test(link) || link[0] === '#') ? (
                <a href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={itemRef} target="_blank">
                    {children}
                </a>
            ) : (
                <Link href={link ?? ''}>
                    <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={itemRef}>{children}</a>
                </Link>
            )}

            <style jsx>{`

                a {
                    color: var(--text-light);
                    cursor: pointer;
                    display: block;
                    font-family: var(--font-primary);
                    font-size: 1rem;
                    font-weight: bold;
                    padding: 1rem 1.25rem;
                    text-align: center;
                    text-decoration: none;
                    z-index: 1;
                }

            `}</style>
        </>
    );
}