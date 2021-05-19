export function Loader ({size, thickness = '3px'}: { size: string, thickness?: string }) {
    return (
        <>
            <span style={{borderWidth: thickness, height: size, width: size}}></span>
            <style jsx>{`

                span {
                    animation: spin 0.625s linear infinite;
                    border: 3px solid var(--text-light);
                    border-right-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                }    

                @keyframes spin {

                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }

                }
                
            `}</style>
        </>
    );
}