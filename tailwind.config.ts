import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      textwhite: "#F0FDF4",
      grey: "#D5DAE1",
      dark: "#333F51",
      darkl: "#2A3342",
      btn: "#334155",
      purple: "#B6A1D3",
      green: "#00A018",
      red: "#FF0707"
    },
  },
  plugins: [],
}
export default config
