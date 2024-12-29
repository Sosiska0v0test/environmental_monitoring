/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // customize colors and fonts
  theme: {
    extend: {
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        sx: '475px',
      },
      colors: {
        main: '#FFFBFE', // 0a0908
        subMain: '#D66BA0', //eb5e28  0F4C5C   1F7A8C  1D7159
        modal: '#141414',
        dry: '#271F30',
        star: '#FFB000',
        text: '#C0C0C0',
        mainText: '#271F30',
        borderSearch: '#141414',
        borderSearchText: '#FFFBFE',
        border: '#FDECEF',
        dryGray: '#FDECEF',
        placeholder: '#7A7D7D',
        delete: '#d90429',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

