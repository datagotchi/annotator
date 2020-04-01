let inputPath = 'resume.pdf',
  outputPath = 'resume-modified.pdf',
  logFile = 'hummus-log.txt',
  Annotator = require('./annotator');

const boxX = 545;

async function runTest(x, y, text) {
  let annotator = new Annotator(inputPath, outputPath, logFile);
  return annotator.init().then(() => {
    annotator.addSkillText(x, y, text, 50);

    return annotator.end();
  });
}

console.log("Write test #1...");
runTest(174, 600, 'Huzzah1').then(() => {
  inputPath = outputPath;
}).then(() => {
  console.log("Write test #2...");
  return runTest(200, 621, 'Huzzah2');
}).then(() => {
  console.log("Tests complete");
});
// FIXME: still segfaults...
