import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {gql} from "@apollo/client";
import client from "../../../apollo/apollo-client";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const LOGIN_MUTATION = gql`
                    mutation login($username: String!, $password: String!) {
                        login(input: { username: $username, password: $password }) {
                            access_token
                            user {
                                id
                                email
                                name
                            }
                        }
                    }
                `

                const { data } = await client.mutate({
                    mutation: LOGIN_MUTATION,
                    variables: credentials
                });

                // ----------------------------------

                if (data.login) {
                    let userInfo = data.login;
                    userInfo.user['access_token'] = data.login.access_token;

                    return userInfo.user;
                }
                return null
            },
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if(user) {
                token['access_token'] = user.access_token;
            }

            return token;
        },
        async session({ session, token, user }) {
            session['access_token'] = token.access_token;
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
    debug: true,

})