import { UserProfile } from './UserProfile';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';
import { BriefcaseBusiness, Home } from 'lucide-react';

const navigationItems = [
    {
        name: 'Home',
        icon: Home,
        href: '/',
    },
    {
        name: 'Release Opening',
        icon: BriefcaseBusiness,
        href: '/release_openings',
    },
];

export const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <aside className="w-58 sticky top-0 bg-zinc-950/90 text-white h-screen pt-8 pl-6 px-4 border-r border-gray-50/10">
            <UserProfile />

            <div className='mt-8 flex flex-col items-start gap-y-2'>
                {navigationItems.map((item) => (
                    <NavigationItem
                        key={item.href}
                        name={item.name}
                        icon={item.icon}
                        href={item.href}
                        isActive={isActive(item.href)}
                    />
                ))}
            </div>
        </aside>
    );
};
