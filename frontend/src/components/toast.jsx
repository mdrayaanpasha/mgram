import { useState, useEffect } from "react";

export default function Toast({ message }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Hide the toast after 3 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer); // Clean up timeout on unmount
    }, []);

    return (
        <>
            {visible && (
                <div className="fixed top-5 right-5 rounded-md text-white px-6 py-3 bg-black shadow-lg transition-opacity duration-300 opacity-100">
                    <p className="font-medium">{message}</p>
                </div>
            )}
        </>
    );
}
