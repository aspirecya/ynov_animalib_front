import {BriefcaseIcon, ClipboardListIcon, CalendarIcon, XIcon} from "@heroicons/react/outline";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {useRouter} from "next/router";
import NavLink from "./link";
import UserInformation from "./userinfo";

export default function Sidebar () {
    const navigation = [
        { name: 'Animals', href: '/animals', icon: ClipboardListIcon },
        { name: 'Veterinarians', href: '/veterinarians', icon: BriefcaseIcon },
        { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
    ]

    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img className="h-8 w-auto" src="/veterinarian.png" alt="Workflow"/>
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    {navigation.map((item) => (
                                        <NavLink key={item.href} item={item}/>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                                <a href="#" className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div>
                                            <img className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                                            <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14"/>
                </Dialog>
            </Transition.Root>

            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img className="h-14 w-auto" src="/veterinarian.png" alt="Workflow"/>
                            <span className="tracking-widest font-extrabold text-gray-900 text-2xl">Animalib</span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                            {navigation.map((item) => (
                                <NavLink key={item.href} item={item}/>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                        <UserInformation/>
                    </div>
                </div>
            </div>
        </>
    )
}