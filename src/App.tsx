import Providers from 'src/providers/Providers.tsx';
import ApplicationRouter from 'src/routing/ApplicationRouter.tsx';
import './i18n/config';


const App = () =>
    <Providers>
        <ApplicationRouter/>
    </Providers>;

export default App;
