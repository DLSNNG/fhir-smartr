module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FhirSmartr',
      externals: {
        react: 'React'
      }
    }
  }
}
