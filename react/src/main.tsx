import ReactDOM from 'react-dom'
import './style/index.css'
import './style/animation.css'
import './style/grid.css'
import './style/config.css'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { I18nextProvider } from 'react-i18next'
import i18n from './configs/i18n'
import App from './routes/Routes'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux'

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
