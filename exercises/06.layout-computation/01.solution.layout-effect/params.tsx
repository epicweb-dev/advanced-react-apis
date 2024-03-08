import { createContext, useCallback, use, useEffect, useState } from 'react'
import { setGlobalSearchParams } from '#shared/utils'

type SearchParamsTuple = readonly [
	URLSearchParams,
	typeof setGlobalSearchParams,
]
const QueryParamsContext = createContext<SearchParamsTuple | null>(null)

export function QueryParamsProvider({
	children,
}: {
	children: React.ReactNode
}) {
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

	const searchParamsTuple = [searchParams, setSearchParams] as const

	return (
		<QueryParamsContext.Provider value={searchParamsTuple}>
			{children}
		</QueryParamsContext.Provider>
	)
}

export function useSearchParams() {
	const context = use(QueryParamsContext)
	if (!context) {
		throw new Error('useSearchParams must be used within a QueryParamsProvider')
	}
	return context
}

export const getQueryParam = (params: URLSearchParams) =>
	params.get('query') ?? ''
