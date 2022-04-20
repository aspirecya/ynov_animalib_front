import {useRouter} from "next/router";
import Link from 'next/link';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavLink ({item}) {
    const router = useRouter();

    return (
        <Link href={item.href}>
            <a key={item.name} className={
                classNames(router.pathname.includes(item.href.replace('/', ''), 1)
                   ? 'bg-gray-100 text-gray-900'
                   : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                   'group flex items-center px-2 py-2 text-base font-medium rounded-md'
               )}>
                <item.icon className={
                    classNames(
                router.pathname.includes(item.href.replace('/', ''), 1)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                        'mr-4 flex-shrink-0 h-6 w-6'
                    )} aria-hidden="true"/>
                {item.name}
            </a>
        </Link>
    )
}