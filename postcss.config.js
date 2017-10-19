module.exports = function({file, options, env}){
	return {
		plugins: {
			'precss': {},
			'postcss-functions': {
				functions: {
			        px2rem: function (int) {
			        	return parseFloat(parseInt(int) / 32) + 'rem';
			        },
			        px2em: function (int, base) {
			        	return parseFloat(parseInt(int) / (base || 18)) + 'em';
			        }
			    }
			},
			'autoprefixer': env === 'production' ? options.autoprefixer : false,
			'cssnano': env === "production" ? {} : false
		}
	}
}