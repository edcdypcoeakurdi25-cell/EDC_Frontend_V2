import { cn } from "../../lib/utils.js";
import { Link } from 'react-router-dom';

export const NavigationItem = ({ name, icon, href, isActive }) => {
    const Icon = icon;

    return (
        <Link
            to={href}
            className={cn(
                'flex items-center gap-x-2 rounded-lg px-3 py-1.5 w-full',
                isActive
                    ? 'border border-zinc-50/10 bg-white/5 text-white'
                    : 'border-0 text-zinc-400 hover:text-white transition-colors duration-200',
            )}
        >
            <Icon className="size-4" />
            <span className="text-sm font-medium">{name}</span>
        </Link>
    );
};
