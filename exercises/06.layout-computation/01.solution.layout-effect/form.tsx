import { getQueryParam, useSearchParams } from './params'

export function Form() {
	const [searchParams, setSearchParams] = useSearchParams()
	const query = getQueryParam(searchParams)

	const words = query.split(' ').map((w) => w.trim())

	const dogChecked = words.includes('dog')
	const catChecked = words.includes('cat')
	const caterpillarChecked = words.includes('caterpillar')

	function handleCheck(tag: string, checked: boolean) {
		const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag)
		setSearchParams(
			{ query: newWords.filter(Boolean).join(' ').trim() },
			{ replace: true },
		)
	}

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<div>
				<label htmlFor="searchInput">Search:</label>
				<input
					id="searchInput"
					name="query"
					type="search"
					value={query}
					onChange={(e) =>
						setSearchParams({ query: e.currentTarget.value }, { replace: true })
					}
				/>
			</div>
			<div>
				<label>
					<input
						type="checkbox"
						checked={dogChecked}
						onChange={(e) => handleCheck('dog', e.currentTarget.checked)}
					/>{' '}
					🐶 dog
				</label>
				<label>
					<input
						type="checkbox"
						checked={catChecked}
						onChange={(e) => handleCheck('cat', e.currentTarget.checked)}
					/>{' '}
					🐱 cat
				</label>
				<label>
					<input
						type="checkbox"
						checked={caterpillarChecked}
						onChange={(e) =>
							handleCheck('caterpillar', e.currentTarget.checked)
						}
					/>{' '}
					🐛 caterpillar
				</label>
			</div>
		</form>
	)
}
