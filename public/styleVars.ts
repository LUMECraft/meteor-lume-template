const styleVars = {
	// Example: this results in 0.8 when used in JS, and 80% when used in CSS.
	logoWidth: '5%' as any as number,

	// Soft blue in light mode, and dark blue in dark mode.
	appBackground: '#f0f4ff',
	appBackgroundDark: '#1a1a2e',

	// TODO improve type defs for this, to avoid error-prone manual type casting.
}

interface Window {
	styleVars: typeof styleVars
}

window.styleVars = styleVars

const css = String.raw // for syntax/formatting

const style = document.createElement('style')

style.textContent = css`
	:root {
		${Object.entries(styleVars)
			.map(([k, v]) => `--${k}: ${typeof v === 'number' ? v + 'px' : v};`)
			.join('\n')}
	}
`

document.head.append(style)

for (const [key, val] of Object.entries(styleVars)) {
	// @ts-ignore
	styleVars[key] = typeof val === 'string' && val.endsWith('%') ? Number(val.replace('%', '')) / 100 : val
}
