import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import { NotificationContextProvider } from '../store/notification-context';

// that your page content to it, whenever you switch to page
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          {/* the second head win against the first head, in case the page don't have specific that, this will kick in */}
          <title>Next Events</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
};

export default MyApp;