import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const includedFeatures = [
    'Full access to basic & advanced lessons',
    'Weekly live interactive sessions',
    '1-on-1 monthly progress review',
    'Access to global community forum',
    'Downloadable resources & worksheets',
    'Certificate upon course completion',
];

export default function Pricing() {
    const { isAuthenticated } = useAuth();
    return (
        <div className="bg-background py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Simple, Transparent Pricing
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Start learning Arabic today with our all-inclusive monthly membership. No hidden fees, cancel anytime.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none bg-white lg:items-center shadow-xl">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-3xl font-bold tracking-tight text-foreground">Pro Membership</h3>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Get comprehensive access to the Bismi Arabic Institute platform, perfect for students of all ages dedicated to mastering the language.
                        </p>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What's included</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            role="list"
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-3 items-center group">
                                    <span className="flex items-center justify-center p-1 rounded-full bg-primary/10 group-hover:bg-primary transition-colors">
                                        <Check className="h-5 w-5 text-primary group-hover:text-white transition-colors" aria-hidden="true" />
                                    </span>
                                    <span className="font-medium text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Pay monthly, pause anytime</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-foreground">₹500</span>
                                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">/month</span>
                                </p>
                                <Link
                                    to={isAuthenticated ? "/inquiry" : "/login"}
                                    className="mt-10 block w-full rounded-xl bg-primary hover:bg-primary/90 px-3 py-4 text-center text-lg font-bold text-white shadow-lg shadow-primary/25 hover:-translate-y-1 hover:shadow-primary/40 transition-all"
                                >
                                    Start Learning Today
                                </Link>
                                <p className="mt-6 text-xs leading-5 text-gray-500">
                                    7-day money-back guarantee. No questions asked.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
