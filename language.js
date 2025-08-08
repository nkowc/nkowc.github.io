// 语言资源文件
const translations = {
    zh: {
        aboutTitle: "About 常馳?",
        aboutDesc: "他是由<b>Wuxin</b>製作的一個UTAU音源聲庫。<br>雖然沒有明確的正式發佈，你也可以通過以下內容下載。",
        currentPlans: "目前計劃",
        plan1: "1.英語音源聲庫正在製作中。",
        plan2: "2.中文音源聲庫計劃考慮中。",
        plan3: "3.白話音源聲庫計劃考慮中。",
        japanese: "日語",
        voice1Desc: "音質很差的基礎音，適合強勁的音樂",
        voice1Link: "基礎的聲音",
        voice2Desc: "像是鼻炎犯了的聲音，適合於柔和的音樂",
        voice2Link: "柔和的聲音",
        languageName: "中文",
        languageSuggestion: "我們檢測到您的瀏覽器語言是{0}，是否切換到該語言？"
    },
    en: {
        aboutTitle: "About Changchw?",
        aboutDesc: "It is a UTAU voicebank created by <b>Wuxin</b>.<br>Although not officially released, you can download it from the following content.",
        currentPlans: "Current Plans",
        plan1: "1.English voicebank is in production.",
        plan2: "2.Chinese voicebank is under consideration.",
        plan3: "3.Cantonese voicebank is under consideration.",
        japanese: "Japanese",
        voice1Desc: "Basic voice with poor quality, suitable for strong music",
        voice1Link: "Basic Voice",
        voice2Desc: "Sounds like having a stuffy nose, suitable for soft music",
        voice2Link: "Soft Voice",
        languageName: "English",
        languageSuggestion: "We detected your browser language is {0}. Would you like to switch to this language?"
    },
    ja: {
        aboutTitle: "常馳について",
        aboutDesc: "<b>Wuxin</b>によって作成されたUTAU音源ボイスバンクです。<br>正式リリースはされていませんが、以下の内容からダウンロードできます。",
        currentPlans: "現在の計画",
        plan1: "1.英語音源ボイスバンク制作中。",
        plan2: "2.中国語音源ボイスバンク検討中。",
        plan3: "3.広東語音源ボイスバンク検討中。",
        japanese: "日本語",
        voice1Desc: "音質が悪い基本音、力強い音楽に適しています",
        voice1Link: "基本音声",
        voice2Desc: "鼻が詰まったような音声、柔らかい音楽に適しています",
        voice2Link: "柔らかい音声",
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