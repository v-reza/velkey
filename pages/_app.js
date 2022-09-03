import "../styles/globals.css";
import Theme from "../src/theme/Theme";
import Layout from "../src/theme/Layout";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AuthContextProvider as AuthGuard } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import LoadingBackdrop from "@/uiComponents/Loading/LoadingBackdrop";
import Notification from "@/uiComponents/Notification";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>WeavLink</title>
        <meta name="google" content="notranslate" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/weavlink-logo.png" />
      </Head>
      <Theme>
        <Layout>
          <AuthGuard>
            <LoadingBackdrop />
            <Notification />
            <Navbar />
            <Component {...pageProps} />
          </AuthGuard>
        </Layout>
      </Theme>
    </Provider>
  );
}

export default MyApp;
