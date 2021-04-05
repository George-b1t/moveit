import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { UserProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
