module.exports = {
    stripPrefix: 'build/',
    staticFileGlobs: [
        'build/*.html',
        'build/manifest.json',
        'build/img/*_minres.png',
        'build/img/icons/*.svg',
        'build/static/css/!(*map*)',
        'build/static/js/!(*map*)',
        'build/static/media/*_minres.png',
        'build/static/media/*.svg',
    ],
    runtimeCaching: [
        {
            urlPattern: /\.png/,
            handler: 'cacheFirst'
        }
    ],
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    swFilePath: 'build/service-worker.js'
};
