module.exports = {
  presets: [
    '@babel/preset-env',
    {
      targets: 'ie 11',
      // {
      //   targets: {
      //     // chrome: '60',
      //     // firefox: '60',
      //     ie: '11',
      //     // safari: '10',
      //     // edge: '17',
      //   },
      // },
    },
  ], //一定要配置target可以加快速度,减小体积
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
}
