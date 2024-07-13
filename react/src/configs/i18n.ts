import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import authTranslationVI from '../modules/auth/i18n/vn.json'
import accountTranslationVI from '../modules/user-system/modules/account/i18n/vn.json'
import cartTranslationVI from '../modules/cart/i18n/vn.json'
import orderTranslationVI from '../modules/order/i18n/vn.json'
import categoryTranslationVI from '../modules/home/category/i18n/vn.json'
import shopTranslationVI from '../modules/shop/i18n/vn.json'
import headerCartTranslationVI from '../modules/shared/header/cart/i18n/vn.json'
import headerNavbarTranslationVI from '../modules/shared/header/navbar/i18n/vn.json'
import headerNotiFyTranslationVI from '../modules/shared/header/notify/i18n/vn.json'
import headerHistoryTranslationVI from '../modules/shared/header/searchHistory/i18n/vn.json'
import userSystemTranslationVI from '../modules/user-system/i18n/vn.json'

// the translations
const resources = {
	en: {
		translation: {}
	},
	vi: {
		translation: {
			AUTH: authTranslationVI,
			HEADER: {
				CART: headerCartTranslationVI,
				NAVBAR: headerNavbarTranslationVI,
				NOTIFY: headerNotiFyTranslationVI,
				HISTORY: headerHistoryTranslationVI
			},
			USER_SYSTEM: {
				...userSystemTranslationVI,
				ACCOUNT: accountTranslationVI
			},
			CART: cartTranslationVI,
			ORDER: orderTranslationVI,
			CATEGORY: categoryTranslationVI,
			SHOP: shopTranslationVI
		}
	}
}

i18n.use(Backend)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'vi',
		debug: true,
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		}
	})

export default i18n
