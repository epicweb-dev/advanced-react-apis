import { useEffect, useRef, useState } from 'react'

type Position = {
	left: number
	top: number
	right: number
	bottom: number
}

export default function Tooltip({
	children,
	targetRect,
}: {
	children: React.ReactNode
	targetRect: Position | null
}) {
	const ref = useRef<HTMLDivElement>(null)
	const [tooltipHeight, setTooltipHeight] = useState(0)

	useEffect(() => {
		const rect = ref.current?.getBoundingClientRect()
		if (!rect) return
		const { height } = rect
		setTooltipHeight(height)
	}, [])

	let tooltipX = 0
	let tooltipY = 0
	if (targetRect !== null) {
		tooltipX = targetRect.left
		tooltipY = targetRect.top - tooltipHeight
		if (tooltipY < 0) {
			tooltipY = targetRect.bottom
		}

		tooltipX += window.scrollX
		tooltipY += window.scrollY
	}

	// 🐨 put this inside a createPortal call and append it to the document.body
	return (
		<TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
			{children}
		</TooltipContainer>
	)
}

function TooltipContainer({
	children,
	x,
	y,
	contentRef,
}: {
	children: React.ReactNode
	x: number
	y: number
	contentRef: React.RefObject<HTMLDivElement | null>
}) {
	return (
		<div
			className="tooltip-container"
			style={{ '--x': `${x}px`, '--y': `${y}px` }}
		>
			<div ref={contentRef} className="tooltip">
				{children}
			</div>
		</div>
	)
}

export function ButtonWithTooltip({
	tooltipContent,
	...rest
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & { tooltipContent: React.ReactNode }) {
	const [targetRect, setTargetRect] = useState<Position | null>(null)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	function displayTooltip() {
		const rect = buttonRef.current?.getBoundingClientRect()
		if (!rect) return
		setTargetRect({
			left: rect.left,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
		})
	}
	const hideTooltip = () => setTargetRect(null)
	return (
		<>
			<button
				{...rest}
				ref={buttonRef}
				onPointerEnter={displayTooltip}
				onPointerLeave={hideTooltip}
				onFocus={displayTooltip}
				onBlur={hideTooltip}
			/>
			{targetRect ? (
				<Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
			) : null}
		</>
	)
}
