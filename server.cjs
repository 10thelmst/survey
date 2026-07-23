const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3001;
const csvDir = path.join(__dirname, 'server-data');

if (!fs.existsSync(csvDir)) {
  fs.mkdirSync(csvDir, { recursive: true });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/counter/export') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const dateValue = payload.date || 'unknown';
        const officeValue = payload.office || '00';
        const counterValue = payload.counter ?? 0;
        const prefixValue = payload.prefix || 'NSO';
        const fileName = `counter-${dateValue}-${officeValue}.csv`;
        const filePath = path.join(csvDir, fileName);
        const csvLine = `${dateValue},${officeValue},${counterValue},${prefixValue}\n`;

        fs.appendFileSync(filePath, csvLine, 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, file: fileName }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Unable to save CSV.' }));
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ success: false, error: 'Not found' }));
});

server.listen(port, () => {
  console.log(`CSV server listening on http://localhost:${port}`);
});
