import "@/styles/globals.css";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Footer from "../../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>ChainCloud</title>
        <meta
          name="description"
          content="Fully Decentralized Storage for storing your Data!"
        />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}
