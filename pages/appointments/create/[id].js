import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import {gql, useMutation} from "@apollo/client";
import client from "../../../apollo/apollo-client";
import Select from "../../../components/ui/select";
import { useState } from "react";
import moment from "moment";
import {toast} from "react-toastify";

const CREATE_APPOINTMENT_MUTATION = gql`
    mutation ($input: AppointmentCreationInput!) {
        createAppointment (input: $input) {
            timeslot,
            user_id {
                id,
                email
            }
            veterinarian_id {
                id,
                first_name
            }
            animal_id {
                id,
                name
            }
        }
    }
`

export default function AppointmentCreation ({ veterinarian, animals }) {
    const router = useRouter();
    const { id } = router.query;

    const [selectedAnimal, setSelectedAnimal] = useState();
    const [createAppointment, { data, loading, error }] = useMutation(CREATE_APPOINTMENT_MUTATION);

    const changeSelectedAnimal = (arg) => {
        setSelectedAnimal(arg);
    };

    const appointmentHandle = async (e) => {
        e.preventDefault();
        let { access_token } = await getSession();

        let appointmentInput = {
            "timeslot": moment(e.target.timeslot.value).format('YYYY-MM-DD hh:mm:ss'),
            "veterinarian_id": id,
            "animal_id": selectedAnimal.id,
        };

        createAppointment({
            variables: {
                input: {
                    ...appointmentInput
                }
            },
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            },
            onCompleted: () => {
                toast('Appointment has been created.');
            }
        });
    };

    return (
        <form method="post" onSubmit={(e) => { appointmentHandle(e).then(() => { router.push('/appointments') }); }}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Veterinarian Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the selected veterinarian.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Practice name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ veterinarian.practice_name }</dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{ veterinarian.first_name } { veterinarian.last_name }</dd>
                        </div>
                        <div className="bg-gray-50 bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                { veterinarian.address }
                                <br/>{ veterinarian.city }
                                <br/>{ veterinarian.zip_code }
                            </dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Animal</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Select the animal for this appointment.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <Select items={animals} setSelected={changeSelectedAnimal} label={"Selected animal"}/>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Date and time</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Select the date and time for this appointment.</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <input type="datetime-local"
                                   id="timeslot"
                                   name="timeslot"
                                   step="3600"
                                   required
                            />
                        </div>
                    </dl>
                </div>
            </div>

            <button type="submit"
                    className="mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                Confirm appointment
            </button>
        </form>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    try {
        let { access_token } = await getSession(context);

        const APPOINTMENT_CREATION_DATA_QUERY = gql`
            query AppointmentData($id: ID!) {
                veterinarian(id: $id) {
                    id,
                    first_name,
                    last_name,
                    address,
                    city,
                    zip_code,
                    practice_name
                }
                animals {
                    id,
                    name
                }
            }
        `

        const { data } = await client.query({
            query: APPOINTMENT_CREATION_DATA_QUERY,
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
                veterinarian: data.veterinarian,
                animals: data.animals
            }
        }
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            veterinarian: null
        }
    }
}