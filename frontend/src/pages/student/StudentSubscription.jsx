import { useState, useEffect } from 'react';
import api from '../../services/api';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function StudentSubscription() {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSub = async () => {
            try {
                const { data } = await api.get('/payments/my-subscription/');
                setSubscription(data);
            } catch (err) {
                console.error('Failed to fetch subscription details', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSub();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="text-primary-600" /> Subscription & Billing
                </h1>
            </div>

            <div className="bg-white shadow rounded-lg border border-gray-100 p-6 md:p-8">
                {loading ? (
                    <p className="text-gray-500 text-center animate-pulse">Loading subscription details...</p>
                ) : subscription ? (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Current Plan</h3>
                                <p className="text-2xl font-bold text-gray-900 mt-1">Monthly Access</p>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-emerald-600 font-medium">
                                <CheckCircle size={20} />
                                <span>Your subscription is {subscription.status}.</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <span className="block text-xs text-gray-500 font-medium">Next Billing Date</span>
                                    <span className="block text-sm font-bold text-gray-900">{subscription.end_date}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 font-medium">Amount Due</span>
                                    <span className="block text-sm font-bold text-gray-900">₹{subscription.amount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:border-l md:border-gray-200 md:pl-8 flex flex-col md:items-end gap-3 flex-shrink-0">
                            <button className="btn-primary w-full md:w-auto">Update Payment Method</button>
                            <button className="btn-outline w-full md:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-300">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No Active Subscription</h3>
                        <p className="mt-2 text-sm text-gray-500 mb-6">You are not currently subscribed to any plan.</p>
                        <button className="btn-primary">Subscribe Now</button>
                    </div>
                )}
            </div>

            <div className="mt-8 bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Payment History</h3>
                </div>
                <div className="px-6 py-8 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500 text-sm">No past payment records found.</p>
                </div>
            </div>
        </div>
    );
}
