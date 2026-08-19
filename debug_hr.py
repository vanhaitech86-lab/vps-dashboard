import codecs
import re

with codecs.open('js/hr.js', 'r', 'utf-8') as f:
    content = f.read()

# I want to inject console.log to debug hr.js if needed, or maybe just look at it carefully
print(content[:500])
