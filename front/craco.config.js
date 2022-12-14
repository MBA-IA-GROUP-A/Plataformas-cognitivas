const path = require('path')

module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
}
