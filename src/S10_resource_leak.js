const fs = require('fs');

class CsvImporter {
  async readLines(path) {
    const handle = await fs.promises.open(path, 'r');
    const content = await handle.readFile({ encoding: 'utf8' });
    return content.split('\n').filter((line) => line.length > 0);
  }
}

module.exports = CsvImporter;
