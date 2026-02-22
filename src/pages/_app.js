import Head from 'next/head'
import '../styles/globals.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/logo2.png" />
        <link rel="apple-touch-icon" href="/logo2.png" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <main id="main-content" tabIndex={-1} className='font-sans'>
            <Component {...pageProps} />
          </main>
        </PersistGate>
      </Provider>
    </>
  )
}
