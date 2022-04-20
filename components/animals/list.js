import AnimalCard from "./card";
import {useRouter} from "next/router";
import {IdentificationIcon, MailIcon, PlusCircleIcon} from "@heroicons/react/outline";

export default function AnimalsList ({animals}) {
    const router = useRouter();

    return (
        <>
            <button onClick={() => { router.push('/animals/create') }} type="button" className="flex items-center mb-3 px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusCircleIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                Create animal
            </button>
            { animals && animals.length > 0 &&
                <div className="bg-white shadow overflow-hidden sm:rounded-md my-5">
                        <ul role="list" className="divide-y divide-gray-200">
                            {animals.map((animal) => (
                                <li key={animal.id}>
                                    <AnimalCard key={animal.id} animal={animal}/>
                                </li>
                            ))}
                        </ul>
                </div>
            }
            { !animals || !animals.length &&
                <div className="text-center my-auto">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No animals</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new animal.</p>
                    <div className="mt-6">
                        <button onClick={() => { router.push('/animals/create') }} type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            New animal
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
