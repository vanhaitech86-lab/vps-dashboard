
import codecs

with codecs.open("js/google_sheets.js", "r", "utf-8") as f:
    content = f.read()

# Replace all occurrences of broken URL
content = content.replace("const url = https://docs.google.com/spreadsheets/d//gviz/tq?tqx=out:csv&sheet=;", "const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;")

with codecs.open("js/google_sheets.js", "w", "utf-8") as f:
    f.write(content)

