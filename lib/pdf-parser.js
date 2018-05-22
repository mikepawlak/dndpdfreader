'use strict';
const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser();

const generateStatObj = (dataObj) => {
  const charObj = {};
  //bind all relevant PDF data to obj for statblock


  const pdfInputs = dataObj.formImage.Pages[0].Fields;


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
  charObj["dex"] = pdfInputs[14].V;
  charObj["con"] = pdfInputs[20].V;
  charObj["int"] = pdfInputs[25].V;
  charObj["wis"] = pdfInputs[49].V;
  charObj["cha"] = pdfInputs[53].V;

  charObj["saving_throws"] = `Str: ${pdfInputs[15].V}, Dex: ${pdfInputs[26].V}, Con: ${pdfInputs[27].V}, Int: ${pdfInputs[28].V}, Wis: ${pdfInputs[29].V}, Cha: ${pdfInputs[30].V}`;
  //stat mod check - if val is higher than raw ability mod then char is proficient
  charObj["skills"] = [];
  for (var i = 0; i < skillArray.length; i++) {
    if (pdfInputs[skillArray[i].stat_modifier].V !== pdfInputs[skillArray[i].value].V) {
      charObj["skills"].push(`${skillArray[i].name} ${pdfInputs[skillArray[i].value].V}`);
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
