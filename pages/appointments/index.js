import Calendar from '../../components/appointments/calendar';
import {getSession} from "next-auth/react";
import {gql} from "@apollo/client";
import client from "../../apollo/apollo-client";

export default function Appointments () {
    return (
        <Calendar/>
    )
}