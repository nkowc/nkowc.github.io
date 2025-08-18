document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面进入动画
    document.body.classList.add('page-enter-active');
    
    // 为所有内部链接添加点击事件
    document.querySelectorAll('a[href^="/"], a[href^="."], a[href^=""]').forEach(link => {
        if(link.hostname === window.location.hostname || !link.hostname) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 添加页面离开动画
                document.body.classList.remove('page-enter-active');
                document.body.classList.add('page-exit', 'page-exit-active');
                
                // 延迟导航以允许动画完成
                setTimeout(() => {
                    window.location.href = link.href;
                }, 400);
            });
        }
    });
});
// 处理浏览器后退/前进按钮
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.classList.remove('page-exit', 'page-exit-active');
        document.body.classList.add('page-enter', 'page-enter-active');
        setTimeout(() => {
            document.body.classList.add('page-enter-active');
        }, 20);
    }
});