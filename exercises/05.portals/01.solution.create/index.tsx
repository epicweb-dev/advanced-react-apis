import * as ReactDOM from 'react-dom/client'
import { Form } from './form'
import { SearchParamsProvider } from './params'
import { MatchingPosts } from './posts'

export function App() {
	return (
		<SearchParamsProvider>
			<div className="app">
				<Form />
				<MatchingPosts />
			</div>
		</SearchParamsProvider>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
