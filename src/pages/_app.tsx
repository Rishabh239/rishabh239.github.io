import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rishabh Tripathi | Portfolio</title>
        <meta name="description" content="M.S. Bioinformatics at Northeastern University. Building production NGS pipelines, ML models for drug response, and spatial transcriptomics tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Rishabh Tripathi | Portfolio" />
        <meta property="og:description" content="Building production NGS pipelines and ML tools for translational research." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rishabh Tripathi | Portfolio" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
