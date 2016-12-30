var gulp = require('gulp');

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    runtimeCaching: [
    	{
	    	urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
	    	handler: 'cacheFirst'
    	},
    	{
    		urlPattern: /^https:\/\/www\.google-analytics\.com\//,
	    	handler: 'cacheFirst'
    	},
    	{
    		urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
    		handler: 'cacheFirst'
    	}
    ],
    stripPrefix: rootDir
  }, callback);
});