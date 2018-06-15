'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

const generateStatObj = (dataObj) => {
  const charObj = {}; //will store all data in JSON format
  const spellCasting = []; //array for multiclass folks
  //bind all relevant PDF data to obj for statblock

  const pdfInputs = dataObj.formImage.Pages[0].Fields;

  for (let j = 0; j < dataObj.formImage.Pages[2].Fields.length; j++) {
    console.log(j);
    console.log(dataObj.formImage.Pages[2].Fields[j]);
  }

  for (let i = 2; i < dataObj.formImage.Pages.length -1; i++) {
    if (dataObj.formImage.Pages[i].Fields[0] != undefined) {
      let obj = dataObj.formImage.Pages[i].Fields;
      if (obj[0].id['Id'].indexOf('spellcasting_class') > -1) {
        //get those motherfucking spells, yo
        //cantrips
        obj[6].V;
        obj[8].V;
        obj[9].V;
        obj[10].V;
        obj[11].V;
        obj[12].V;
        obj[13].V;
        obj[14].V;
        //lvl 1
        obj[7].V;
        obj[15].V;
        obj[16].V;
        obj[17].V;
        obj[18].V;
        obj[19].V;
        obj[20].V;
        obj[21].V;
        obj[22].V;
        obj[23].V;
        obj[24].V;
        //lvl 2
        obj[40].V;
        obj[28].V;
        obj[29].V;
        obj[30].V;
        obj[31].V;
        obj[32].V;
        obj[33].V;
        obj[34].V;
        obj[35].V;
        obj[36].V;
        obj[37].V;
        obj[38].V;
        obj[39].V;
        //lvl 3
        obj[44].V;
        obj[43].V;
        obj[45].V;
        obj[46].V;
        obj[47].V;
        obj[48].V;
        obj[49].V;
        obj[50].V;
        obj[52].V;
        obj[53].V;
        obj[54].V;
        obj[55].V;
        //lvl 4
        obj[59].V;
        obj[58].V;
        obj[60].V;
        obj[61].V;
        obj[62].V;
        obj[63].V;
        obj[64].V;
        obj[65].V;
        obj[66].V;
        obj[67].V;
        obj[68].V;
        obj[69].V;
        obj[70].V;
        //lvl 5
        obj[74].V;
        obj[73].V;
        obj[75].V;
        obj[76].V;
        obj[77].V;
        obj[78].V;
        obj[79].V;
        obj[80].V;
        obj[81].V;
        //lvl 6
        obj[85].V;
        obj[84].V;
        obj[86].V;
        obj[87].V;
        obj[88].V;
        obj[89].V;
        obj[90].V;
        obj[91].V;
        obj[92].V;
        //lvl 7
        obj[96].V;
        obj[95].V;
        obj[97].V;
        obj[98].V;
        obj[99].V;
        obj[100].V;
        obj[101].V;
        obj[102].V;
        obj[103].V;
        //lvl 8
        obj[107].V;
        obj[106].V;
        obj[108].V;
        obj[109].V;
        obj[110].V;
        obj[111].V;
        obj[112].V;
        //lvl 9
        obj[116].V;
        obj[1115].V;
        obj[117].V;
        obj[118].V;
        obj[119].V;
        obj[120].V;
        obj[121].V;

        //create spellcasting stuff
        //class, ability, saveDC, attack bonus, spells
        spellCasting.push({
          "id" : obj[0].V,
          "ability" : obj[1].V,
          "Save DC" : obj[2].V,
          "Attack Bonus" : obj[3].V,
        });
      }
    }
  }
  console.log(spellCasting);

  /*For finding skills
  theres a "boxsets" value for the radio buttons but this is faster
    skillObj = {
      name : string, (name of skill)
      stat_modifier : int, (index of modifier in PDF obj)
      value: int (index of skill modifier value in PDF obj)
    }
  */
  const skillArray = [
    {
      name: "Acrobatics",
      stat_modifier: 18,
      value: 31
    },
    {
      name: "Animal Handling",
      stat_modifier: 52,
      value: 32
    },
    {
      name: "Arcana",
      stat_modifier: 46,
      value: 50
    },
    {
      name: "Athletics",
      stat_modifier: 14,
      value: 33
    },
    {
      name: "Deception",
      stat_modifier: 64,
      value: 34
    },
    {
      name: "History",
      stat_modifier: 46,
      value: 35
    },
    {
      name: "Insight",
      stat_modifier: 52,
      value: 40
    },
    {
      name: "Intimidation",
      stat_modifier: 64,
      value: 41
    },
    {
      name: "Investigation",
      stat_modifier: 46,
      value: 48
    },
    {
      name: "Medicine",
      stat_modifier: 52,
      value: 36
    },
    {
      name: "Nature",
      stat_modifier: 46,
      value: 54
    },
    {
      name: "Perception",
      stat_modifier: 52,
      value: 51
    },
    {
      name: "Performance",
      stat_modifier: 64,
      value: 55
    },
    {
      name: "Persuasion",
      stat_modifier: 64,
      value: 58
    },
    {
      name: "Religion",
      stat_modifier: 46,
      value: 56
    },
    {
      name: "Sleight of Hand",
      stat_modifier: 18,
      value: 63
    },
    {
      name: "Stealth",
      stat_modifier: 18,
      value: 57
    },
    {
      name: "Survival",
      stat_modifier: 52,
      value: 65
    }
  ];


  charObj["name"] = pdfInputs[3].V;
  charObj["race"] = pdfInputs[4].V;
  charObj["alignment"] = pdfInputs[5].V;

  charObj["ac"] = pdfInputs[10].V;
  charObj["hp"] = pdfInputs[59].V + " (" + pdfInputs[21].V + pdfInputs[22].V + ")";
  charObj["speed"] = pdfInputs[12].V;

  charObj["str"] = pdfInputs[8].V;
  charObj["dex"] = pdfInputs[16].V;
  charObj["con"] = pdfInputs[20].V;
  charObj["int"] = pdfInputs[25].V;
  charObj["wis"] = pdfInputs[49].V;
  charObj["cha"] = pdfInputs[53].V;

  charObj["saving_throws"] = `Str: ${pdfInputs[15].V}, Dex: ${pdfInputs[26].V}, Con: ${pdfInputs[27].V}, Int: ${pdfInputs[28].V}, Wis: ${pdfInputs[29].V}, Cha: ${pdfInputs[30].V}`;
  //stat mod check - if val is higher than raw ability mod then char is proficient
  charObj["skills"] = [];
  for (var i = 0; i < skillArray.length; i++) {
    if (pdfInputs[skillArray[i].stat_modifier].V !== pdfInputs[skillArray[i].value].V) {
      charObj["skills"].push(` ${skillArray[i].name} ${pdfInputs[skillArray[i].value].V}`);
    }
  }
  charObj["senses"] = `Passive perception: ${pdfInputs[67].V}`;
  charObj["languages"] = pdfInputs[69].V.split('Language Proficiencies: ')[1];

  charObj["challange_rating"] =
  (() => {
    //this can probably be made simpler
    const charLvlArray = pdfInputs[0].V.split(" ");
    let totalNumber = 0;
    for (var i = 0; i < charLvlArray.length; i++) {
      if (charLvlArray[i].startsWith("(")) {
        totalNumber += parseInt(charLvlArray[i].slice(1, -1));
      }
    }
    //fuzzy CR math - upper limit assuming a party of 4
    //this still seems pretty off but that might just be how CR is set up
    return totalNumber/4;
  })();
  charObj["special_abilites"] = pdfInputs[75].V;

  charObj["attacks"] = (() => {
    let attacks = [];
    //support for three different types of attacks on sheet.
    //test for each one and display if name is not undefined.
    if (pdfInputs[37].V !== undefined) attacks.push(`${pdfInputs[37].V} attack: ${pdfInputs[38].V} to hit. ${pdfInputs[39].V} damage.`);
    if (pdfInputs[42].V !== undefined) attacks.push(`${pdfInputs[42].V} attack: ${pdfInputs[43].V} to hit. ${pdfInputs[47].V} damage.`);
    if (pdfInputs[44].V !== undefined) attacks.push(`${pdfInputs[44].V} attack: ${pdfInputs[45].V} to hit. ${pdfInputs[62].V} damage.`);

    return  attacks;
  })();
  return charObj
};

//uses PDFParser to consume 5e PDF and generate stat block object for rendering
//kinda weird syntax but that's what pdfParser wants
module.exports = (path) => {
  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", errData => reject(errData) );
    pdfParser.on("pdfParser_dataReady", pdfData => {

      resolve(generateStatObj(pdfData))
    });
    pdfParser.loadPDF(path);
  });
};;
