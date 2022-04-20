/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

export default function Header ({ title, buttons }) {
    return (
        <div className="mb-8">
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{ title }</h2>
                </div>
                <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
                    {buttons.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            className={item.theme}
                            onClick={item.action}
                        >
                            <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                            { item.name }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
