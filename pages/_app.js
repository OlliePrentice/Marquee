import '../styles/App.css'
import 'swiper/swiper-bundle.min.css'
import { Provider } from 'next-auth/client'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false;
library.add(fab, faArrowAltCircleRight);

global.__localeId__ = 'en';

export default function App ({ Component, pageProps }) {
  return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
  )
}
