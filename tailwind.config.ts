import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        paper: 'var(--paper)',
        'paper-soft': 'var(--paper-soft)',
        'paper-warm': 'var(--paper-warm)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
        muted: 'var(--muted)',
        'muted-soft': 'var(--muted-soft)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', '"Times New Roman"', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wordmark: '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
