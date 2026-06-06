import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SoilSense AI - Analyze soil with AI and get crop recommendations" />
        <meta name="theme-color" content="#8b7355" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
