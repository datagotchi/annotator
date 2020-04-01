const getSystemFonts = require('get-system-fonts');
const hummus = require('hummus');

const boxWidth = 60;

class Annotator {

  constructor(inputPath, outputPath, log) {
    // TODO: change to using streams and/or dynamic PDFs, and then save it after multiple modifications
    
    if (inputPath === outputPath) {
      this.pdfWriter = hummus.createWriterToModify(inputPath, {
        log: log
      });
    } else {
      this.pdfWriter = hummus.createWriterToModify(inputPath, {
        modifiedFilePath: outputPath,
        log: log
      });
    }

    this.pageModifier = new hummus.PDFPageModifier(this.pdfWriter, 0, true);
    this.context = this.pageModifier.startContext().getContext();
  }

  async init() {
    this.fontFiles = await getSystemFonts();
    const arialFile = this.fontFiles.find((fontFile) => fontFile.match('Arial Unicode'));
    this.arial = this.pdfWriter.getFontForFile(arialFile)
  }

  drawBackground(x, y, width, height) {
    return this.context.q()
    			.k(0,0,100,0)
    			.re(x, y, width, height)
    			.f()
    			.Q();
  }

  drawRectangle(x, y, width, height) {
    return this.context.drawRectangle(x, y, width, height);
  }

  addSkills(x, y, skills) {
    // draw box
    const boxHeight = 12*skills.length;
    this.drawBackground(x, y, boxWidth, boxHeight);
    this.drawRectangle(x, y, boxWidth, boxHeight);

    // draw text
    let textY = y + boxHeight - 10;
    skills.forEach((skill) => {
      this.addSkillText(x, textY, skill);
      textY -= 10;
    });
  }

  addSkillText(x, y, text, size = 10) {
    return this.context.writeText(
      text,
    	x, y,
    	{ font: this.arial, size: size , color: 0x000000 }
    );
  }

  end() {
    this.pageModifier.endContext().writePage();
    return this.pdfWriter.end();
  }
}

module.exports = Annotator;
