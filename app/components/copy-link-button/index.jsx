import { useEffect, useState } from 'react';
import Alert from '../alert';

export const CopyLinkButton = ({ link }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
        setShowAlert(true)
    };


    useEffect(() => {
        // Set a timer to dismiss the alert after 3 seconds
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);

        // Cleanup the timer if the component unmounts or the alert is closed
        return () => clearTimeout(timer);
    }, [showAlert]); // Only run this effect when showAlert changes

    return (<>{showAlert && (
        <div className='absolute left-4 top-7'>
            <Alert
                message={"Link coppied!"}
                type="info"
                onClose={() => setShowAlert(false)}
            />
        </div>
    )}
        <div className="relative inline-block">
            <button
                onClick={handleCopyLink}
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
                aria-label="Copy link"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
                onBlur={() => setTooltipVisible(false)}
            >
                {/* Add your icon here, e.g., using a font icon or SVG */}
                <svg className='w-5 h-5' focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LinkIcon" aria-label="fontSize large"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"></path></svg>
            </button>
            {tooltipVisible && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm rounded shadow">
                    Copy shareable link!
                </div>
            )}
        </div></>
    );
};

