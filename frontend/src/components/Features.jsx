import { BookOpenCheck, Globe2, Clock, Users, Trophy, PlayCircle } from 'lucide-react';

const features = [
    {
        name: 'Interactive Curriculum',
        description: 'Engaging lessons designed specifically for modern learners with practical exercises.',
        icon: BookOpenCheck,
    },
    {
        name: 'Expert Instructors',
        description: 'Learn from qualified native and bilingual Arabic speakers with years of experience.',
        icon: Users,
    },
    {
        name: 'Flexible Schedule',
        description: 'Study at your own pace with 24/7 access to recorded materials and live sessions.',
        icon: Clock,
    },
    {
        name: 'Global Community',
        description: 'Join thousands of students globally learning together in a supportive environment.',
        icon: Globe2,
    },
    {
        name: 'Progress Tracking',
        description: 'Monitor your improvement daily with our built-in student analytics and reports.',
        icon: Trophy,
    },
    {
        name: 'Video Resources',
        description: 'Extensive library of high-quality video tutorials and supplementary materials.',
        icon: PlayCircle,
    },
];

export default function Features() {
    return (
        <div className="py-24 bg-white sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Why Choose Us</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Everything you need to master Arabic
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Bismi Arabic Institute provides a complete ecosystem for language learning, combining traditional excellence with modern technology.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col bg-background p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
                                <dt className="flex items-center gap-x-4 text-xl font-bold leading-7 text-foreground">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary transition-colors">
                                        <feature.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-6 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
