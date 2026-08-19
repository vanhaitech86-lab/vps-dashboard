import codecs

with codecs.open('js/data.js', 'r', 'utf-8') as f:
    content = f.read()

# I will just write a simple script to add ke_hoach: { may: 0, kh: 0 } to all dau, tang, giam occurrences if not present
# Actually, since google_sheets.js overrides window.mockData, and google_sheets.js sets ke_hoach to parsed values, the live data will have it.
# We don't really need to update data.js because the Google Sheets fetcher will just inject it, and the null chaining operator (?.) in customers.js owData.ke_hoach?.may || 0 will prevent crashes!
print('Checked')
