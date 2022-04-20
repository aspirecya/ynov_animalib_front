import {MailIcon, PhoneIcon} from "@heroicons/react/solid";
import {CalendarIcon} from "@heroicons/react/outline";
import Link from 'next/link';

export default function VeterinariansList ({ veterinarian }) {
    return (
        <li
            key={veterinarian.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
        >
            <div className="flex-1 flex flex-col p-8">
                <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src="/veterinarian.png" alt=""/>
                <h3 className="mt-6 text-gray-900 text-sm font-medium">{veterinarian.first_name} {veterinarian.last_name}</h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm mb-3">{veterinarian.practice_name}</dd>
                    <dd className="text-gray-500 text-sm">{veterinarian.address}</dd>
                    <dd className="text-gray-500 text-sm">{veterinarian.city}</dd>
                    <dd className="text-gray-500 text-sm">{veterinarian.zip_code}</dd>
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                        <Link href={`/appointments/create/${veterinarian.id}`}>
                            <a
                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                            >
                                <CalendarIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                <span className="ml-3">Meet</span>
                            </a>
                        </Link>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                        <a
                            href="#"
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                            <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                            <span className="ml-3">Call</span>
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}