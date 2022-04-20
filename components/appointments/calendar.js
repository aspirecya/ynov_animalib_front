import moment from "moment";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getSession} from "next-auth/react";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import client from "../../apollo/apollo-client";

const APPOINTMENTS_QUERY = gql`
    query appointmentsByMonth($month: Int!, $zeroIndexed: Boolean!) {
        appointmentsByMonth(month: $month, zeroIndexed: $zeroIndexed) {
            id
            timeslot
            animal_id {
                id
                name
            },
            veterinarian_id {
                id,
                first_name
                last_name
            }
        }
    }
`

export default function Calendar () {
    const router = useRouter();
    const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const [fetchAppointment, { loading, error, data }] = useLazyQuery(APPOINTMENTS_QUERY);

    const [appointments, setAppointments] = useState([]);
    const [dayAppointment, setDayAppointments] = useState([]);
    const [today, setToday] = useState(moment());
    const [month, setMonth] = useState(today.month());
    const [year, setYear] = useState(today.year());
    const [noOfDays, setNoOfDays] = useState([]);
    const [blankdays, setBlankdays] = useState([]);

    const fetchAppointments = async () => {
        let { access_token } = await getSession();

        const { loading, error, data } = await client.query({
            query: APPOINTMENTS_QUERY,
            variables: {
                "month": month,
                "zeroIndexed": true
            },
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            }
        });

        setAppointments(data.appointmentsByMonth);
    }
    const isToday = (date) => {
        const todayDay = today.format('DD-MM-YYYY');
        const dayToCompare = moment({ days: date, months: month, years: year }).format('DD-MM-YYYY');
        return todayDay === dayToCompare;
    }
    const init = async () => {
        let { access_token } = await getSession();

        await fetchAppointment({
            variables: {
                "month": month,
                "zeroIndexed": true
            },
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            },
            onCompleted: (data) => {
                setAppointments(data.appointmentsByMonth);

                let daysInMonth = today.daysInMonth();

                // find where to start calendar day of week
                let dayOfWeek = today.day();
                let blankdaysArray = [];
                for (let i = 1; i <= dayOfWeek-1; i++) {
                    blankdaysArray.push(i);
                }

                let daysArray = [];
                for (let i = 1; i <= daysInMonth; i++) {
                    let day = []
                    day['date'] = i;
                    day['appointments'] = [];

                    daysArray.push(day);
                }

                daysArray.forEach((day, dayIndex) => {
                    data.appointmentsByMonth.forEach((appointment, appointmentIndex) => {
                        console.log(day, appointment, "hi");
                        let appointmentDate = moment(appointment.timeslot).format('DD-MM-YYYY');
                        let dayDate = moment({ days: day.date, months: month, years: year }).format('DD-MM-YYYY');

                        if(appointmentDate === dayDate) {
                            day['appointments'].push(appointment);
                        }
                    });
                })

                setBlankdays(blankdaysArray);
                setNoOfDays(daysArray);
            }
        });
    }
    const previousMonth = () => {
        setToday(today.subtract(1, 'month'));
        setMonth(today.month());
        init();
    }
    const nextMonth = () => {
        setToday(today.add(1, 'month'));
        setMonth(today.month());
        init();
    }

    useEffect(() => {
        init();
    }, [today, month])

    return (
        <>
            { appointments &&
                <div className="lg:flex lg:h-full lg:flex-col">
                    <header
                        className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
                        <h1 className="text-lg font-semibold text-gray-900">
                            <time dateTime="2022-01">{today.format('MMMM YYYY')}</time>
                        </h1>
                        <div className="flex items-center">
                            <div className="flex items-center rounded-md shadow-sm md:items-stretch a">
                                <button
                                    type="button"
                                    className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                                    onClick={() => {
                                        previousMonth()
                                    }}
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                                </button>
                                <button
                                    type="button"
                                    className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                                >
                                    {today.format('MMMM')}
                                </button>
                                <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"/>
                                <button
                                    type="button"
                                    className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                                    onClick={() => {
                                        nextMonth()
                                    }}
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                                </button>
                            </div>
                            <div className="ml-6 h-6 w-px bg-gray-300"/>
                            <button
                                type="button"
                                className="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => {
                                    router.push('/veterinarians')
                                }}
                            >
                                Make appointment
                            </button>
                        </div>
                    </header>
                    <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                        <div
                            className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                            {DAYS.map((day) => (
                                <div className="bg-white py-2" key={day}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="flex bg-gray-100 text-xs leading-6 text-gray-700 lg:flex-auto">
                            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
                                {blankdays.map((day, index) => (
                                    <div key={day} className="min-h-[100px] relative py-2 px-3 bg-gray-50"/>
                                ))}

                                {noOfDays.map((day, index) => (
                                    <div
                                        key={day.date}
                                        className="min-h-[100px] relative py-2 px-3 bg-white"
                                    >
                                        <time
                                            dateTime={day.date}
                                            className={
                                                isToday(day.date)
                                                    ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                                    : undefined
                                            }
                                        >
                                            {day.date}
                                        </time>
                                        { day.appointments.length > 0 && (
                                            <ol className="mt-2">
                                                {day.appointments.slice(0, 2).map((appointment) => (
                                                    <li key={appointment.id}>
                                                        <a href={appointment.href} className="group flex">
                                                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                                {appointment.animal_id.name}
                                                            </p>
                                                            <time
                                                                dateTime={appointment.timeslot}
                                                                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                            >
                                                                {moment(appointment.timeslot).format('LT')}
                                                            </time>
                                                        </a>
                                                    </li>
                                                ))}
                                                {day.appointments.length > 2 &&
                                                    <li className="text-gray-500">+ {day.appointments.length - 2} more</li>}
                                            </ol>
                                        )}
                                    </div>
                                ))}
                            </div>


                            <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
                                {blankdays.map((day, index) => (
                                    <div key={day} className="relative py-2 px-3 bg-gray-50"/>
                                ))}

                                {noOfDays.map((day) => (
                                    <button
                                        key={day.date}
                                        type="button"
                                        className="relative py-2 px-3 bg-white"
                                    >
                                        <time
                                            dateTime={day.date}
                                            className={
                                                isToday(day.date)
                                                    ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                                    : undefined
                                            }
                                        >
                                            {day.date}
                                        </time>
                                        <p className="sr-only">{day.appointments.length} appointments</p>
                                        {day.appointments.length > 0 && (
                                            <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                                {day.appointments.map((appointment) => (
                                                    <div key={appointment.id}
                                                         className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"/>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export async function getServerSideProps ({ context }) {
    let {access_token} = await getSession(context);
}
