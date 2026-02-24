import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, GraduationCap, CreditCard, TrendingUp, Presentation } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/auth/admin/dashboard-stats/');
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading dashboard data...</div>;
    }

    const statCards = [
        { name: 'Total Students', value: stats?.total_students || 0, icon: GraduationCap, color: 'bg-blue-500' },
        { name: 'Total Teachers', value: stats?.total_teachers || 0, icon: Presentation, color: 'bg-emerald-500' },
        { name: 'Active Subscriptions', value: stats?.active_subscriptions || 0, icon: Users, color: 'bg-indigo-500' },
        { name: 'Platform Profit (MTD)', value: `₹${stats?.platform_profit_mtd || 0}`, icon: TrendingUp, color: 'bg-gold-500' },
        { name: 'Teacher Payouts (MTD)', value: `₹${stats?.teacher_payouts_mtd || 0}`, icon: CreditCard, color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`p-3 rounded-md ${item.color} text-white shadow-lg`}>
                                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Advanced Revenue Overview (Placeholder for chart) */}
            <div className="mt-8 bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Revenue Overview</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 flex items-center gap-2">
                        <TrendingUp size={20} /> Revenue charts will render here
                    </p>
                </div>
            </div>
        </div>
    );
}
