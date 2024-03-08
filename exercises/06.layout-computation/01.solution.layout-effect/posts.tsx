import { useState } from 'react'
import {
	type BlogPost,
	generateGradient,
	getMatchingPosts,
} from '#shared/blog-posts'
import { getQueryParam, useSearchParams } from './params'
import { ButtonWithTooltip } from './tooltip'

export function MatchingPosts() {
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
				<ButtonWithTooltip
					tooltipContent="Remove favorite"
					onClick={() => setIsFavorited(false)}
				>
					❤️
				</ButtonWithTooltip>
			) : (
				<ButtonWithTooltip
					tooltipContent="Add favorite"
					onClick={() => setIsFavorited(true)}
				>
					🤍
				</ButtonWithTooltip>
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
