import VeterinariansList from "../../components/veterinarians/list"
import { gql } from "@apollo/client";
import client from "../../apollo/apollo-client";

export default function Animals (props) {
    return (
        <>
            <VeterinariansList veterinarians={props.veterinarians}/>
        </>
    )
}

export async function getServerSideProps () {
    try {
        const { data } = await client.query({
            query: gql`
                query Veterinarians {
                    veterinarians {
                        id
                        first_name
                        last_name
                        address
                        city
                        zip_code
                        practice_name
                    }
                }
            `,
        });

        return {
            props: {
                veterinarians: data.veterinarians,
            }
        }
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            animals: null,
        }
    }
}
