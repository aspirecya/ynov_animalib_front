import '../styles/globals.css';
import {SessionProvider} from "next-auth/react"
import {ApolloProvider} from '@apollo/client';
import client from '../apollo/apollo-client';
import Layout from "../components/layout";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <>
            <Head>
                <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
                <title>Animalib</title>
            </Head>

            <ApolloProvider client={client}>
                <SessionProvider session={session}>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </Layout>
                </SessionProvider>
            </ApolloProvider>
        </>
    );
}

export default MyApp;
