module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 5000,
    }
    return config
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["s3.ap-northeast-1.amazonaws.com"]
  },
  swcMinify: false // 追記
}