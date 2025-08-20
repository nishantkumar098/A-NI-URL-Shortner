import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AnimatedBackground = () => {
	const dotsRef = useRef([])

	useEffect(() => {
		// Simple floating dots background
		const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
		dotsRef.current.forEach((dot, index) => {
			const duration = 6 + (index % 5)
			tl.to(dot, { y: -15, duration }).to(dot, { y: 0, duration })
		})
		return () => tl.kill()
	}, [])

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-white dark:from-gray-950 dark:to-gray-900" />
			<div className="absolute -z-10 opacity-40 left-1/2 top-10 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-violet-200 dark:bg-violet-900 blur-3xl" />
			<div className="absolute -z-10 opacity-30 left-10 bottom-10 h-[200px] w-[200px] rounded-full bg-fuchsia-200 dark:bg-fuchsia-900 blur-2xl" />
			<div className="absolute -z-10 opacity-30 right-10 top-24 h-[220px] w-[220px] rounded-full bg-purple-200 dark:bg-purple-900 blur-2xl" />
			<div className="absolute inset-0">
				{Array.from({ length: 10 }).map((_, i) => (
					<span
						key={i}
						ref={(el) => (dotsRef.current[i] = el)}
						className="absolute h-2 w-2 rounded-full bg-violet-500 dark:bg-violet-400"
						style={{
							left: `${10 + (i * 8) % 80}%`,
							top: `${20 + (i * 6) % 60}%`,
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default AnimatedBackground


