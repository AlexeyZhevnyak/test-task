import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider} from '@mui/material';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import {ReactNode, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Provider} from 'react-redux';
import {store} from 'src/store';
import {createAppTheme} from 'src/theme.ts';
import {prefixer} from 'stylis';

const Providers = ({children}: { children: ReactNode }) => {
    const {i18n} = useTranslation();
    const rtlCache = createCache({
        key: 'muirtl',
        stylisPlugins: i18n.language === 'ar' ? [prefixer, rtlPlugin] : [],
    });
    const theme = useMemo(
        () => {
            return createAppTheme(i18n.language === 'ar' ? 'rtl' : 'ltr')
        },
        [i18n.language]
    );

    useEffect(() => {
        document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return <Provider store={store}>
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </CacheProvider>
    </Provider>
}

export default Providers;