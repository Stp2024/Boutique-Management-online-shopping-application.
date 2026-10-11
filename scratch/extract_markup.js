const fs = require('fs');
const cp = require('child_process');

try {
  const content = cp.execSync('git show 097ca0eff92167dc181ac539e9205d63d8244627:Index.html', { maxBuffer: 20 * 1024 * 1024 }).toString('utf8');
  const lines = content.split('\n');
  let adminStart = -1, tailorStart = -1;
  lines.forEach((l, i) => {
    if (l.includes('id="adminDashboardView"')) adminStart = i;
    if (l.includes('id="tailorDashboardView"')) tailorStart = i;
  });
  console.log('adminStart line:', adminStart, 'tailorStart line:', tailorStart);

  if (adminStart !== -1) {
    fs.writeFileSync('scratch/admin_markup.html', lines.slice(adminStart - 5, tailorStart !== -1 ? tailorStart - 5 : adminStart + 150).join('\n'));
    console.log('Saved admin markup');
  }

  if (tailorStart !== -1) {
    fs.writeFileSync('scratch/tailor_markup.html', lines.slice(tailorStart - 5, tailorStart + 120).join('\n'));
    console.log('Saved tailor markup');
  }
} catch (e) {
  console.error(e);
}
