import { gql, useMutation } from "@apollo/client";
import { getSession } from "next-auth/react";
import {useRouter} from "next/router";
import Link from 'next/link';
import {toast} from "react-toastify";

const CREATE_ANIMAL_MUTATION = gql`
    mutation ($input: AnimalCreationInput!) {
        createAnimal (input: $input) {
            id,
            name
        }
    }
`

export default function CreateAnimal () {
    const router = useRouter();
    const [createAnimal, { data, loading, error }] = useMutation(CREATE_ANIMAL_MUTATION);

    const handleCreation = async (e) => {
        e.preventDefault();
        let { access_token } = await getSession();

        let creationInput = {
            "name": e.target.name.value,
            "type": e.target.type.value,
            "sex": e.target.sex.value,
            "weight": parseFloat(e.target.weight.value),
            "dob": e.target.dob.value,
            "color": e.target.color.value,
            "sterile": e.target.sterile.value === "on" ? true : false,
            "tag_id": e.target.tag_id.value
        };

        createAnimal({
            variables: {
                input: {
                    ...creationInput
                }
            },
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            },
            onCompleted: () => {
                toast('Animal has been created.');
            }
        });
    }

    return (
        <>
            <div className="mt-10 sm:mt-0">
                <div className="px-4 sm:px-0 py-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Animal information</h3>
                </div>
                <div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form method="post" onSubmit={(e) => { handleCreation(e).then(() => router.push('/animals')) }}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Name <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                Type <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="type"
                                                id="type"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                                                Sex <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                required
                                                name="sex"
                                                id="sex"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option name="male">Male</option>
                                                <option name="female">Female</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                                Weight
                                            </label>
                                            <input
                                                id="weight"
                                                name="weight"
                                                type="number"
                                                step="0.01"
                                                min="1"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                                Date of birth <span className="text-red-600">*</span>
                                            </label>
                                            <input
                                                required
                                                type="date"
                                                name="dob"
                                                id="dob"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                                Color
                                            </label>
                                            <input
                                                type="text"
                                                name="color"
                                                id="color"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                Tag/collar ID
                                            </label>
                                            <input
                                                type="text"
                                                name="tag_id"
                                                id="tag_id"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="relative flex items-start col-span-6">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="sterile"
                                                    name="sterile"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="sterile" className="font-medium text-gray-700">
                                                    Sterile
                                                </label>
                                                <p id="sterile-description" className="text-gray-500">
                                                    Check the checkbox if your animal is sterilized
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center mr-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create
                                    </button>
                                    <button type="button"
                                            onClick={() => { router.push('/animals') }}
                                            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
