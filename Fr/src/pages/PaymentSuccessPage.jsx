// src/pages/PaymentSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { verifyPaymentSession } from '../api/payments';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import MainLayout from '../components/layout/MainLayout';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Verifying your payment, please wait...');
    const [songUrl, setSongUrl] = useState(null); // State to hold the song URL

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (!sessionId) {
            setStatus('error');
            setMessage('No session ID found. Cannot verify payment.');
            return;
        }

        const verify = async () => {
            try {
                const response = await verifyPaymentSession(sessionId);
                setStatus('success');
                setMessage(response.message || 'Your payment was successful and the song has been added to your library!');
                setSongUrl(response.songUrl); // Save the song URL from the API response
            } catch (error) {
                setStatus('error');
                setMessage(error.message || 'There was an error verifying your payment. Please contact support.');
            }
        };

        verify();
    }, [location]);

    const renderStatus = () => {
        switch (status) {
            case 'loading':
                return (
                    <div className="text-center">
                        <FaSpinner className="animate-spin text-5xl text-blue-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold">Processing Payment</h1>
                        <p className="text-gray-400">{message}</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center">
                        <FaCheckCircle className="text-5xl text-green-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
                        <p className="text-gray-400">{message}</p>
                        <div className="flex justify-center gap-4 mt-6">
                            {songUrl && (
                                <a
                                    href={songUrl}
                                    download
                                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Download Song
                                a>
                            )}
                            <Link to="/home" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                Go to Home
                            </Link>
                        </div>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center">
                        <FaExclamationCircle className="text-5xl text-red-400 mx-auto mb-4" />
                        <h1 className="text-2xl font-semibold">Payment Error</h1>
                        <p className="text-gray-400">{message}</p>
                         <Link to="/home" className="mt-6 inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Go to Homepage
                        </Link>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
       <MainLayout>
            <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg max-w-lg w-full">
                    {renderStatus()}
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentSuccessPage;
