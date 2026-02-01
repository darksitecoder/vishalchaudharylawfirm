// Local static server that serves extensionless URLs by trying .html when needed
// Usage:
// 1. npm install
// 2. npm start

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname);

app.use(express.static(PUBLIC));

app.get('*', (req, res) => {
  const reqPath = decodeURIComponent(req.path);
  // No special-case mappings — try serving .html files for extensionless URLs
  // If request points to a file that exists, let static middleware have handled it
  const absPath = path.join(PUBLIC, reqPath);

  // If path has extension (assets), let express.static serve; if not, try .html
  if (!path.extname(absPath)) {
    const htmlPath = absPath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      return res.sendFile(htmlPath);
    }
    // also try index.html in directory
    const indexPath = path.join(absPath, 'index.html');
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
      return res.sendFile(indexPath);
    }
  }

  // Fallback to default static handling (which will 404)
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Dev server listening on http://localhost:${PORT}`);
});
