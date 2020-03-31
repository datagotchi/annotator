const hummus = require('hummus'),
  pdfPath = 'resume.pdf',
  pdfWriter = hummus.createWriterToModify(pdfPath, {
    modifiedFilePath: 'resume-modified.pdf',
    log: 'log.txt'
  }),
  pageModifier = new hummus.PDFPageModifier(pdfWriter, 0, true),
  Annotator = require('./annotator'),
  annotator = new Annotator(pdfWriter, pageModifier);

const boxX = 545;

annotator.addSkills(boxX, 600, ['Angular', 'Node', 'Express']);

annotator.addSkills(boxX, 465, ['Angular', 'Typescript', 'Node', 'Express']);

pageModifier.endContext().writePage();
pdfWriter.end();
