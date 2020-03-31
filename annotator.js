const getSystemFonts = require('get-system-fonts');

const boxWidth = 60;

class Annotator {

  constructor(pdfWriter, pageModifier) {
    this.pdfWriter = pdfWriter;
    this.pageModifier = pageModifier;
    this.context = this.pageModifier.startContext().getContext();
  }

  async init() {
    this.fontFiles = await getSystemFonts();
    const arialFile = this.fontFiles.find((fontFile) => fontFile.match('Arial Unicode'));
    this.arial = this.pdfWriter.getFontForFile(arialFile)
  }

  drawBackground(x, y, width, height) {
    this.context.q()
    			.k(0,0,100,0)
    			.re(x, y, width, height)
    			.f()
    			.Q();
  }

  drawRectangle(x, y, width, height) {
    this.context.drawRectangle(x, y, width, height);
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

  addSkillText(x, y, text) {
    this.context.writeText(
      `• ${text}`,
    	x + 5, y,
    	{ font: this.arial, size: 10 , color: 0x000000 }
    );
  }
}

module.exports = Annotator;
