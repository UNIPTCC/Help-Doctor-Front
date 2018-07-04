import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import Cache from 'i18next-localstorage-cache'
import { reactI18nextModule } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .use(Cache)
  .init({
    lng: 'pt-BR',  
    fallbackLng: 'en-US',
    preload: ['en-US', 'pt-BR'],
    debug: false,
    ns: @translationNamespaces,
    defaultNS: 'default',
    interpolation: {
      escapeValue: false // Não é necessário para o React
    },
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      hashTransKey: function (defaultValue) {
        console.log(`Hash Translation Key ${defaultValue}`)
      },
      defaultTransParent: 'div'
    },
    cache: {
      enabled: (process.env.NODE_ENV === 'production'),
      // Prefixo para o localstorage
      prefix: 'squidhub_i18n_lngCache_',
      // Expiração do cache de linguagem
      expirationTime: 1 * 24 * 60 * 60 * 1000 // Um dia
    }
  })

export default i18n
