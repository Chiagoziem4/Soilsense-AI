import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SoilSense AI - Soil Analysis & Crop Intelligence</title>
        <meta name="description" content="Upload a soil image and get instant analysis with AI-powered crop recommendations." />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
