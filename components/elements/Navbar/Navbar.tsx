import { NavbarMenu } from './NavbarMenu';

export function Navbar({onClick}: { onClick?: (() => Promise<any>) }) {
    return (
        <>
            <header>

                {/* Display */}
                <h1>
                    Sandstone Playground
                </h1>

                {/* Menu */}
                <nav>
                    <NavbarMenu onClick={onClick} state={true} />
                </nav>

            </header>

            <style jsx>{`
                
                header {
                    align-items: stretch;
                    background-color: var(--interactive-primary);
                    box-shadow: var(--shadow-normal);
                    display: flex;
                    flex: 0;
                    flex-direction: row;
                    justify-content: stretch;
                    width: 100%;
                    z-index: 10;
                }

                h1 {
                    font-size: 1.75rem;
                    font-weight: bold;
                    margin: 0;
                    padding: 0.75rem 1.5rem;
                    text-align: center;
                }

                nav {
                    align-items: center;
                    display: flex;
                    flex: 1;
                    justify-content: right;
                    padding: 0 1rem;
                }

            `}</style>
        </>
    );
}