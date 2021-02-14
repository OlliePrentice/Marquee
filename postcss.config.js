module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss': {},
        'postcss-variables': {
            globals: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                xxl: '1536px'
            }
        },
        'postcss-nested': {},
        'autoprefixer': {},
    }
}
