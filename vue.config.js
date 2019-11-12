module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                },
                javascriptEnabled: true
            }
        }
    },
    devServer : {
        proxy : {
            '/admin' : {
                target : 'http://debug.admin.00joy.com',
                changeOrigin : true
            }
        }
    }
};
