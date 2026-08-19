import codecs
import re

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(
    r'showApp\(\)\s*\{\s*document\.getElementById\(\'login-screen\'\)\.classList\.add\(\'hidden\'\);\s*document\.getElementById\(\'app-screen\'\)\.classList\.remove\(\'hidden\'\);\s*const user = window\.AuthService\.getCurrentUser\(\);',
    r'''async showApp() {
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

            const user = window.AuthService.getCurrentUser();''',
    content
)

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(content)
