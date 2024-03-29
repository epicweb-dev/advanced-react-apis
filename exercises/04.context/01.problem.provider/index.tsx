import { useCallback, useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
	type BlogPost,
	generateGradient,
	getMatchingPosts,
} from '#shared/blog-posts'
import { setGlobalSearchParams } from '#shared/utils'

// 🦺 create a SearchParamsTuple type here that's a readonly array of two elements:
// - the first element is a URLSearchParams instance
// - the second element is typeof setGlobalSearchParams
// 🐨 create a QueryParamsContext that is of this type
// 💰 let's start with this as the default value (we'll improve it next):
// [new URLSearchParams(window.location.search), setGlobalSearchParams]

// 🐨 change this to QueryParamsProvider and accept children
function useSearchParams() {
	const [searchParams, setSearchParamsState] = useState(
		() => new URLSearchParams(window.location.search),
	)

	useEffect(() => {
		function updateSearchParams() {
			setSearchParamsState(prevParams => {
				const newParams = new URLSearchParams(window.location.search)
				return prevParams.toString() === newParams.toString()
					? prevParams
					: newParams
			})
		}
		window.addEventListener('popstate', updateSearchParams)
		return () => window.removeEventListener('popstate', updateSearchParams)
	}, [])

	const setSearchParams = useCallback(
		(...args: Parameters<typeof setGlobalSearchParams>) => {
			const searchParams = setGlobalSearchParams(...args)
			setSearchParamsState(prevParams => {
				return prevParams.toString() === searchParams.toString()
					? prevParams
					: searchParams
			})
			return searchParams
		},
		[],
	)

	// 🐨 instead of returning this, render the QueryParamsContext.Provider and
	// provide this tuple as the value
	// 💰 make sure to render the children as well!
	return [searchParams, setSearchParams] as const
}

// 🐨 create a useSearchParams hook here that returns use(QueryParamsContext)

const getQueryParam = (params: URLSearchParams) => params.get('query') ?? ''

function App() {
	return (
		// 🐨 wrap this in the QueryParamsProvider
		<div className="app">
			<Form />
			<MatchingPosts />
		</div>
	)
}

function Form() {
	const [searchParams, setSearchParams] = useSearchParams()
	const query = getQueryParam(searchParams)
	const words = query.split(' ').map(w => w.trim())

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter(w => w !== tag)
		setSearchParams(
			{ query: newWords.filter(Boolean).join(' ').trim() },
			{ replace: true },
		)
	}

	return (
		<form onSubmit={e => e.preventDefault()}>
			<div>
				<label htmlFor="searchInput">Search:</label>
				<input
					id="searchInput"
					name="query"
					type="search"
					value={query}
					onChange={e =>
						setSearchParams({ query: e.currentTarget.value }, { replace: true })
					}
				/>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={dogChecked}
						onChange={e => handleCheck('dog', e.currentTarget.checked)}
					/>{' '}
					🐶 dog
				</label>
				<label>
					<input
						type="checkbox"
						checked={catChecked}
						onChange={e => handleCheck('cat', e.currentTarget.checked)}
					/>{' '}
					🐱 cat
				</label>
				<label>
					<input
						type="checkbox"
						checked={caterpillarChecked}
						onChange={e => handleCheck('caterpillar', e.currentTarget.checked)}
					/>{' '}
					🐛 caterpillar
				</label>
			</div>
		</form>
	)
}

function MatchingPosts() {
	const [searchParams] = useSearchParams()
	const query = getQueryParam(searchParams)
	const matchingPosts = getMatchingPosts(query)

	return (
		<ul className="post-list">
			{matchingPosts.map(post => (
				<Card key={post.id} post={post} />
			))}
		</ul>
	)
}

function Card({ post }: { post: BlogPost }) {
	const [isFavorited, setIsFavorited] = useState(false)
	return (
		<li>
			{isFavorited ? (
				<button
					aria-label="Remove favorite"
					onClick={() => setIsFavorited(false)}
				>
					❤️
				</button>
			) : (
				<button aria-label="Add favorite" onClick={() => setIsFavorited(true)}>
					🤍
				</button>
			)}
			<div
				className="post-image"
				style={{ background: generateGradient(post.id) }}
			/>
			<a
				href={post.id}
				onClick={event => {
					event.preventDefault()
					alert(`Great! Let's go to ${post.id}!`)
				}}
			>
				<h2>{post.title}</h2>
				<p>{post.description}</p>
			</a>
		</li>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
