// src/pages/PaymentCancelledPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';
import MainLayout from '../components/layout/MainLayout';

const PaymentCancelledPage = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
                    <FaTimesCircle className="text-5xl text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
                    <p className="text-gray-400 mt-2">
                        Your payment process was cancelled. You have not been charged.
                    </p>
                    <Link to="/home" className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentCancelledPage;
