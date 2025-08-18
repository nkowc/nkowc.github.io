// 语言资源文件
const translations = {
    zh: {
        aboutTitle: "About 常馳?",
        aboutDesc: "他是由<b>Wuxin</b>製作的一個UTAU音源聲庫。<br>雖然沒有明確的正式發佈，你也可以通過以下內容下載。",
        japanese: "日語",
        voice1Desc: "音質很差的基礎音，適合強勁的音樂",
        voice1Link: "基礎的聲音",
        voice2Desc: "像是鼻炎犯了的聲音，適合於柔和的音樂",
        voice2Link: "柔和的聲音",
        Chinese:"中文",
        voice3Desc:"單音階CVVC，適合柔和的音樂",
        voice4Desc:"英語樣本：8 mins<br>中文樣本：15 mins<br>日語樣本：7 mins",
        voice5Desc:"<b>由UTAU輸出訓練</b>",
        voice6Desc:"中文樣本：19 mins<br>日語樣本：15 mins",
        languageName: "中文",
        languageSuggestion: "我們檢測到您的瀏覽器語言是{0}，是否切換到該語言？"
    },
    en: {
        aboutTitle: "About Changchw?",
        aboutDesc: "It is a UTAU voicebank created by <b>Wuxin</b>.<br>Although not officially released, you can download it from the following content.",
        japanese: "Japanese",
        voice1Desc: "Basic voice with poor quality, suitable for strong music",
        voice1Link: "Basic Voice",
        voice2Desc: "Sounds like having a stuffy nose, suitable for soft music",
        voice2Link: "Soft Voice",
        Chinese:"Chinese",
        voice3Desc:"Single scale CVVC, suitable for soft music",
        voice4Desc:"English sample: 8 mins <br>Chinese sample: 15 mins <br>Japanese sample: 7 mins",
        voice5Desc:"<b>Trained by UTAU output</b>",
        voice6Desc:"Chinese sample:19 mins<br>Japanese sample:15 mins",
        languageName: "English",
        languageSuggestion: "We detected your browser language is {0}. Would you like to switch to this language?"
    },
    ja: {
        aboutTitle: "常馳について",
        aboutDesc: "<b>Wuxin</b>によって作成されたUTAU音源ボイスバンクです。<br>正式リリースはされていませんが、以下の内容からダウンロードできます。",
        japanese: "日本語",
        voice1Desc: "音質が悪い基本音、力強い音楽に適しています",
        voice1Link: "基本音声",
        voice2Desc: "鼻が詰まったような音声、柔らかい音楽に適しています",
        voice2Link: "柔らかい音声",
        Chinese:"中国語",
        voice3Desc:"単音階CVVC、柔らかい音楽に適している",
        voice4Desc:"英語サンプル：8 mins<br>中国語サンプル：15 mins<br>日本語サンプル：7 mins",
        voice5Desc:"<b>UTAU出力によるトレーニング</b>",
        voice6Desc:"中国語サンプル：19 mins<br>日本語サンプル：15 mins",
        languageName: "日本語",
        languageSuggestion: "ブラウザの言語が{0}であることを検出しました。この言語に切り替えますか？"
    }
};

// 获取浏览器首选语言
function getBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage || 'zh').toLowerCase();
    const supportedLangs = Object.keys(translations);
    
    // 尝试完整匹配 (如 zh-cn)
    if (supportedLangs.includes(browserLang)) {
        return browserLang;
    }
    
    // 尝试基础语言代码匹配 (如 zh)
    const langCode = browserLang.split('-')[0];
    if (supportedLangs.includes(langCode)) {
        return langCode;
    }
    
    // 尝试匹配相似语言 (如 zh-tw 使用 zh)
    if (langCode === 'zh') {
        return 'zh';
    }
    
    return 'zh'; // 默认中文
}

// 切换语言函数
function switchLanguage(lang) {
    if (!translations[lang]) return; // 确保语言存在
    
    // 显示加载指示器和过渡效果
    document.body.style.cursor = 'wait';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.classList.add('language-changing');
    });
    
    // 更新按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // 更新页面内容
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];
        
        if (translation !== undefined) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translation;
            } else {
                element.innerHTML = translation;
            }
        }
    });
    
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
    
    // 恢复状态
    setTimeout(() => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.classList.remove('language-changing');
        });
        document.body.style.cursor = '';
    }, 300);
}

// 显示语言切换建议
function showLanguageSuggestion(browserLang, chosenLang) {
    if (browserLang !== chosenLang && 
        !localStorage.getItem('langPromptShown') && 
        translations[browserLang] && 
        translations[chosenLang]?.languageSuggestion) {
        
        const message = translations[chosenLang].languageSuggestion
            .replace('{0}', translations[browserLang].languageName);
        
        if (confirm(message)) {
            switchLanguage(browserLang);
        }
        localStorage.setItem('langPromptShown', 'true');
    }
}

// 初始化语言
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = getBrowserLanguage();
    const defaultLang = 'zh';
    
    // 确定要使用的语言
    const lang = savedLang || browserLang || defaultLang;
    
    // 应用语言
    switchLanguage(lang);
    
    // 如果是首次访问且浏览器语言与默认不同，显示提示
    if (!savedLang && browserLang !== defaultLang) {
        // 延迟显示提示，让页面先加载完成
        setTimeout(() => {
            showLanguageSuggestion(browserLang, defaultLang);
        }, 500);
    }
    
    // 添加按钮事件监听
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initLanguage);

// 添加到language.js
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-circle-prog');
  
  // 更新进度和显示/隐藏按钮
  window.addEventListener('scroll', function() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / scrollTotal) * 138;
    
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
      progressCircle.style.strokeDashoffset = 138 - scrollProgress;
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // 平滑滚动到顶部
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // 添加点击动画
    this.classList.add('clicked');
    setTimeout(() => this.classList.remove('clicked'), 300);
  });
});
// 使用防抖技術優化滾動事件
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // 滾動處理代碼
    }, 100);
});