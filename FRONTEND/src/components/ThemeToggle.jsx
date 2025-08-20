import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('theme')
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		const useDark = saved ? saved === 'dark' : prefersDark
		setIsDark(useDark)
		document.documentElement.classList.toggle('dark', useDark)
	}, [])

	const toggleTheme = () => {
		const next = !isDark
		setIsDark(next)
		document.documentElement.classList.toggle('dark', next)
		localStorage.setItem('theme', next ? 'dark' : 'light')
	}

	return (
		<button
			onClick={toggleTheme}
			className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-900 shadow-sm"
			aria-label="Toggle theme"
		>
			<span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} mode</span>
			<span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
		</button>
	)
}

export default ThemeToggle


