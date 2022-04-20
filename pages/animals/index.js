import AnimalsList from "../../components/animals/list"
import { gql } from "@apollo/client";
import client from "../../apollo/apollo-client";
import { getSession } from "next-auth/react";

export default function Animals (props) {
    return (
        <>
            <AnimalsList animals={props.animals}/>
        </>
    )
}

export async function getServerSideProps (context) {
    try {
        let { access_token } = await getSession(context);

        const { data } = await client.query({
            query: gql`
                query Animals {
                    animals {
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
            `,
            context: {
                headers: {
                    authorization: access_token ? `Bearer ${access_token}` : "",
                }
            }
        });

        return {
            props: {
                animals: data.animals,
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
