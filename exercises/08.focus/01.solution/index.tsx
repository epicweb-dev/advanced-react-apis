import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import * as ReactDOM from 'react-dom/client'

function EditableText({
	id,
	initialValue = '',
	fieldName,
	inputLabel,
	buttonLabel,
}: {
	id?: string
	initialValue?: string
	fieldName: string
	inputLabel: string
	buttonLabel: string
}) {
	const [edit, setEdit] = useState(false)
	const [value, setValue] = useState(initialValue)
	const inputRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	return edit ? (
		<form
			method="post"
			onSubmit={event => {
				event.preventDefault()
				// here's where you'd send the updated value to the server
				flushSync(() => {
					setValue(inputRef.current?.value ?? '')
					setEdit(false)
				})
				buttonRef.current?.focus()
			}}
		>
			<input
				required
				ref={inputRef}
				type="text"
				id={id}
				aria-label={inputLabel}
				name={fieldName}
				defaultValue={value}
				onKeyDown={event => {
					if (event.key === 'Escape') {
						flushSync(() => {
							setEdit(false)
						})
						buttonRef.current?.focus()
					}
				}}
				onBlur={event => {
					setValue(event.currentTarget.value)
					setEdit(false)
				}}
			/>
		</form>
	) : (
		<button
			aria-label={buttonLabel}
			type="button"
			ref={buttonRef}
			onClick={() => {
				flushSync(() => {
					setEdit(true)
				})
				inputRef.current?.select()
			}}
		>
			{value || 'Edit'}
		</button>
	)
}

function App() {
	return (
		<main>
			<button>Focus before</button>
			<div className="editable-text">
				<EditableText
					initialValue="Unnamed"
					fieldName="name"
					inputLabel="Edit project name"
					buttonLabel="Edit project name"
				/>
			</div>
			<button>Focus after</button>
		</main>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
