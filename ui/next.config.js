module.exports = {
    webpack: (config) => {
      config.resolve.extensions.push('.ts', '.tsx');
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
        },
      });
      return config;
    },
  };