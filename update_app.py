import codecs

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    content = f.read()

old_showApp = '''        showApp() {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');
            
            const user = window.AuthService.getCurrentUser();'''

new_showApp = '''        async showApp() {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');
            
            // Show loading state
            document.querySelector('.top-bar-right').insertAdjacentHTML('beforeend', '<div id="gs-loading" style="color:red; font-weight:bold; margin-left:15px;">⏳ Đang đồng bộ Google Sheets...</div>');
            
            // Fetch from Google Sheets
            if (window.GoogleSheetsService) {
                await window.GoogleSheetsService.loadAllData();
            }
            
            // Remove loading
            const loadingEl = document.getElementById('gs-loading');
            if(loadingEl) loadingEl.remove();

            const user = window.AuthService.getCurrentUser();'''

content = content.replace(old_showApp, new_showApp)

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(content)
