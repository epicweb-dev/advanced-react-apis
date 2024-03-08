import * as ReactDOM from 'react-dom/client'
import { Form } from './form'
import { QueryParamsProvider } from './params'
import { MatchingPosts } from './posts'

export function App() {
	return (
		<QueryParamsProvider>
			<div className="app">
				<Form />
				<MatchingPosts />
			</div>
		</QueryParamsProvider>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
