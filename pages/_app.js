import '../styles/App.scss';
import '../styles/Tailwind.scss';
import 'swiper/swiper-bundle.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import registerIcons from '../lib/registerIcons';
import { Provider } from 'next-auth/client';

registerIcons();
global.__localeId__ = 'en';

export default function App ({ Component, pageProps }) {
  return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
  )
}
