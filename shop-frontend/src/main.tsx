import ReactDOM from 'react-dom'
import './styles/index.css'
import './styles/animation.css'
import './styles/grid.css'
import './styles/config.css'
import 'reflect-metadata'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import i18n from '@configs/i18n'
import App from '@routes/Routes'
import { store } from '@redux/app'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<Provider store={store}>
		<I18nextProvider i18n={i18n}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</I18nextProvider>
	</Provider>,
	rootElement
)
