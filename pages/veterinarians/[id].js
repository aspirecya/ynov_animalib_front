import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import client from "../../apollo/apollo-client";
import { gql } from "@apollo/client";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";

const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Little baby arrived home',
        target: '',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Vaccinated at veterinarian',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Routine check-up with veterinarian',
        target: 'Bethany Blake',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.completed,
        content: 'Routine check-up with veterinarian',
        target: 'Bethany Blake',
        date: 'Oct 28',
        datetime: '2020-10-04',
    },
]
const animal = {};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Animal ({ animal }) {
    const router = useRouter();

    if(animal) {
        return (
            <main className="py-10">
                <div
                    className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center space-x-5">
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <img
                                    className="h-16 w-16 rounded-full"
                                    src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80"
                                    alt=""
                                />
                                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{animal.name}</h1>
                            <p className="text-sm font-medium text-gray-500">
                                Born on <time dateTime={animal.dob}>{animal.dob}</time>
                            </p>
                        </div>
                    </div>
                    <div
                        className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <button type="button"
                                onClick={() => { router.push('/animals') }}
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                            Return to list
                        </button>
                        <button type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                            Edit information
                        </button>
                        <button type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-red-500">
                            Delete animal
                        </button>
                    </div>
                </div>

                <div
                    className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h2 id="applicant-information-title"
                                        className="text-lg leading-6 font-medium text-gray-900">
                                        Animal information
                                    </h2>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and information
                                        about {animal.name}.</p>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{animal.name}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Type</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{animal.type}</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Sex</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{animal.sex} </dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Color/pelt</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{animal.color}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                Timeline
                            </h2>

                            <div className="mt-6 flow-root">
                                <ul role="list" className="-mb-8">
                                    {timeline.map((item, itemIdx) => (
                                        <li key={item.id}>
                                            <div className="relative pb-8">
                                                {itemIdx !== timeline.length - 1 ? (
                                                    <span
                                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                        aria-hidden="true"/>
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                      <span
                                                          className={classNames(item.type.bgColorClass, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white')}>
                                                        <item.type.icon className="w-5 h-5 text-white"
                                                                        aria-hidden="true"/>
                                                      </span>
                                                    </div>
                                                    <div
                                                        className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                {item.content}{' '}
                                                                <a href="#" className="font-medium text-gray-900">
                                                                    {item.target}
                                                                </a>
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="text-right text-sm whitespace-nowrap text-gray-500">
                                                            <time dateTime={item.datetime}>{item.date}</time>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        )
    }

    return (
        <>
            <h1>not logged in</h1>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        let { access_token } = await getSession(context);

        const ANIMAL_QUERY = gql`
            query Animal($id: ID!) {
                animal(id: $id) {
                    id,
                    name,
                    type,
                    sex,
                    weight,
                    dob,
                    color,
                    sterile,
                    tag_id,
                    created_at
                }
            }
        `

        const { data } = await client.query({
            query: ANIMAL_QUERY,
            variables: {
                id: id
            },
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            }
        });

        return {
            props: {
                animal: data.animal
            }
        }
    } catch (e) {

    }

    return {
        props: {
            animal: null
        }
    }
}