export const LoadingBar = {
    // 路由跳转之前
    start() {
        let loadingBar = document.getElementById('loading-bar');
        //当拦截路由时dom还没加载完， 所有有了之后才走下面的
        if (loadingBar) {
            loadingBar.style.display = 'block';
            loadingBar.style.width = '100%';
        }
    },
    //  跳转结束之后
    finish() {
        let loadingBar = document.getElementById('loading-bar');
        if (loadingBar) {
            setTimeout(()=>{
                loadingBar.style.display = 'none';
                loadingBar.style.width = '0';
            },500)
        }
    }
};