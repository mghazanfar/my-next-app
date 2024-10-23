// components/Alert.jsx
const Alert = ({ message, type, onClose }) => {
    const alertStyles = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-yellow-400 text-yellow-700',
    };

    return (
        <div className={`flex items-center p-4 mb-4 border-l-4 ${alertStyles[type]} rounded`} role="alert">
            <div className="flex-1">{message}</div>
            {onClose && <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
                &times;
            </button>}
        </div>
    );
};

export default Alert;
