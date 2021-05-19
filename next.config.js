module.exports = {
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        config.resolve.fallback = {
            fs: false,
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            constants: require.resolve('constants-browserify'),
            'stream': require.resolve('stream-browserify'),
        }
        return config
    },

    future: {
        webpack5: true,
    }
}