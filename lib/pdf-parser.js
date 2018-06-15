'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

const generateStatObj = (dataObj) => {
  const charObj = {}; //will store all data in JSON format
  const spellCasting = []; //array for multiclass folks
  //bind all relevant PDF data to obj for statblock

  const pdfInputs = dataObj.formImage.Pages[0].Fields;

  //test for spellcasting, loop to test for multi-classing characters
  for (let i = 2; i < dataObj.formImage.Pages.length -1; i++) {
    if (dataObj.formImage.Pages[i].Fields[0] != undefined) {
      let obj = dataObj.formImage.Pages[i].Fields;
      if (obj[0].id['Id'].indexOf('spellcasting_class') > -1) {
        //get those motherfucking spells, yo
        //I'm probably sacrificing performance for
        //readability here.
        let spellText = '';
        let spells = {
          "Cantrips" : [6,8,9,10,11,12,13,14],
          "Level 1" : [7,15,16,17,18,19,20,21,22,23,24,25],
          "Level 2" : [40,28,29,30,31,32,33,34,35,36,37,38,39],
          "Level 3" : [44,43,45,46,47,48,49,50,51,52,53,54,55],
          "Level 4" : [59,58,60,61,62,63,64,65,66,67,68,69,70],
          "Level 5" : [74,73,75,76,77,78,79,80,81],
          "Level 6" : [85,84,86,87,88,89,90,91,92],
          "Level 7" : [96,95,97,98,99,100,101,102,103],
          "Level 8" : [107,106,108,109,110,111,112],
          "Level 9" : [116,115,117,118,119,120,121]
        };

        for (let level in spells) {
          if (obj[spells[level][0]].V) {
            spellText += "<b>" + level + ":</b> ";
          } else {
            break;
          }
          for (let i = 0; i < spells[level].length; i++) {
            if (obj[spells[level][i]].V) {
              spellText += obj[spells[level][i]].V;
              if (obj[spells[level][i+1]].V) {
                spellText += ", ";
              } else {
                spellText += "<br/>";
              }
            }
          }
        }

        //create spellcasting stuff
        //class, ability, saveDC, attack bonus, spells
        spellCasting.push({
          "id" : obj[0].V,
          "ability" : obj[1].V,
          "save_dc" : obj[2].V,
          "attack_bonus" : obj[3].V,
          "spells" : spellText
        });
      } else {
        break;
      }
    }
  }

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
  charObj["class"] = pdfInputs[0].V;
  charObj["race"] = pdfInputs[4].V;
  charObj["alignment"] = pdfInputs[5].V;

  charObj["ac"] = pdfInputs[10].V;
  charObj["hp"] = pdfInputs[59].V + " (" + pdfInputs[21].V + pdfInputs[22].V + ")";
  charObj["speed"] = pdfInputs[12].V;

  //this tests for two inputs since some players put them in different spots
  //calculates modifier later
  //remove any non-int chars and parseInt to compare
  charObj["str"] = parseInt(pdfInputs[8].V.replace(/\D/g,'')) > parseInt(pdfInputs[14].V.replace(/\D/g,'')) ? pdfInputs[8].V : pdfInputs[14].V;
  charObj["dex"] = parseInt(pdfInputs[16].V.replace(/\D/g,'')) > parseInt(pdfInputs[18].V.replace(/\D/g,'')) ? pdfInputs[16].V : pdfInputs[18].V;
  charObj["con"] = parseInt(pdfInputs[20].V.replace(/\D/g,'')) > parseInt(pdfInputs[22].V.replace(/\D/g,'')) ? pdfInputs[20].V : pdfInputs[22].V;
  charObj["int"] = parseInt(pdfInputs[25].V.replace(/\D/g,'')) > parseInt(pdfInputs[46].V.replace(/\D/g,'')) ? pdfInputs[25].V : pdfInputs[46].V;
  charObj["wis"] = parseInt(pdfInputs[49].V.replace(/\D/g,'')) > parseInt(pdfInputs[52].V.replace(/\D/g,'')) ? pdfInputs[49].V : pdfInputs[52].V;
  charObj["cha"] = parseInt(pdfInputs[53].V.replace(/\D/g,'')) > parseInt(pdfInputs[64].V.replace(/\D/g,'')) ? pdfInputs[53].V : pdfInputs[64].V;

  console.log(pdfInputs[16].V.replace(/\D/g,''));
  console.log(pdfInputs[18].V.replace(/\D/g,''));
  console.log(pdfInputs[16].V.replace(/\D/g,'') > pdfInputs[18].V.replace(/\D/g,''));
  console.log(pdfInputs[16].V);
  console.log(pdfInputs[18].V);

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
  charObj["spells"] = spellCasting;

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
