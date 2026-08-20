import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace document.getElementById('current-user-role').textContent = user.role.name;
# with safe check
js = js.replace("document.getElementById('current-user-role').textContent = user.role.name;", 
                "document.getElementById('current-user-role').textContent = typeof user.role === 'object' ? user.role.name : String(user.role);")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
