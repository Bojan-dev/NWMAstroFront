/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'Montserrat', 'Arial', 'sans-serif'],
      },
      fontSize: {
        sm: ['1rem', '22px'],
        base: ['1.15rem', '27px'],
        lg: ['1.25rem', '26px'],
        h4: ['1.325rem', '26px'],
        h3: ['1.5rem', '24px'],
        h3_md: ['1.625rem', '36px'],
        h2_sm: ['1.75rem', '28px'],
        h2_md: ['2rem', '22px'],
        xl: ['2.25rem', '36px'],
        xl_height: ['2.25rem', '50px'],
        xxl: ['2.5rem', '32px'],
        h1_md: ['3rem', '38px'],
        h1_lg: ['3.5rem', '42px'],
        h1: ['3.75rem', '44px'],
      },
      colors: {
        'clr-green': 'hsl(100, 97%, 37%)',
        'clr-green--dark': 'hsl(100, 97%, 32%)',
        'clr-green--light': 'hsl(105, 25%, 97%)',
        'clr-green--disabled': 'hsl(100, 66%, 95%)',
        'clr-blue': 'hsl(210,86%,42%)',
        'clr-blue--light': 'hsl(200, 99%, 45%)',
        'clr-blue--dark': 'hsl(214, 100%, 29%)',
        'clr-blue--disabled': 'hsl(224, 100%, 87%)',
        'clr-text': 'hsl(0, 0%, 13%)',
        'clr-error': 'hsl(0, 90%,55%)',
        'clr-error--light': 'hsl(0, 90%,80%)',
        'clr-italic': 'hsl(0, 0%, 89%)',
        'clr-italic--dark': 'hsl(0, 0%, 60%)',
      },
      spacing: {
        'container-padding': '7.5vw',
      },
      backgroundImage: {
        'hero-not-found':
          "linear-gradient(to right bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('../src/imgs/not-found.jpg')",
        'hero-home':
          "linear-gradient(to right bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('../src/imgs/home/hero.jpg')",
        testimonials:
          "linear-gradient(to right bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('../src/imgs/home/testimonials-bkg.jpg')",
        services: "url('../src/imgs/services/services-bkg.svg')",
      },
      boxShadow: {
        'card-shadow': '0px 0px 3px 1px rgb(0 0 0 / 18%)',
        'process-shadow': ' 0px 3px 4px 0px rgba(0 0 0 / 12%)',
        'numbers-shadow': '0px 0px 3px 1px rgb(0 0 0 / 7%)',
      },
      dropShadow: {
        'phone-shadow': '1px 1px 0px hsl(214, 100%, 29%)',
        'section-shadow': '1px 1px 0px rgba(0, 0, 0, 0.6)',
      },
      translate: {
        'negative-50vw': '-50vw',
        screen: '100vh',
        125: '125%',
        150: '150%',
      },
      maxWidth: {
        'rem-100': '100rem',
        'rem-27': '27.5rem',
      },
      maxHeight: {
        'rem-80': '80rem',
      },
      minHeight: {
        'rem-55': '55rem',
      },
    },
  },
  plugins: [],
};
