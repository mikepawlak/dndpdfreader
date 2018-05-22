'use strict';

const fs = require('fs');
const expect = require('chai').expect;

const parsePDF = require("../lib/pdf-parser.js");

const testPDFpath = 'test/test_char.pdf';

describe('parsePDF', () => {
  it('should be a function', () => {
    expect(parsePDF).to.be.a('function');
  });
  it('should take a pdf path and return a Javascript Object', async () => {
    const pdfObj = await parsePDF(testPDFpath);
    expect(pdfObj).to.be.an('object');
  });
  it('should create an object with Statblock data', async () => {
    const statObj = await parsePDF(testPDFpath);
    //statblock box[0]
    expect(statObj).to.have.a.property("name", "Pavel Brightwood");
    expect(statObj).to.have.a.property("alignment", "Chaotic Good");
    //statblock box[1]
    expect(statObj).to.have.a.property("ac", "12");
    expect(statObj).to.have.a.property("hp", "7 (1d6+1)");
    expect(statObj).to.have.a.property("speed");
    //statblock box[2]
    expect(statObj).to.have.a.property("str");
    expect(statObj).to.have.a.property("dex");
    expect(statObj).to.have.a.property("con");
    expect(statObj).to.have.a.property("int");
    expect(statObj).to.have.a.property("wis");
    expect(statObj).to.have.a.property("cha");
    //statblock box[3]
    expect(statObj).to.have.a.property("saving_throws");
    expect(statObj).to.have.a.property("skills");
    expect(statObj).to.have.a.property("senses");
    expect(statObj).to.have.a.property("languages");
    expect(statObj).to.have.a.property("challange_rating");
    //statblock box[4]
    expect(statObj).to.have.a.property("special_abilites");
    //statblock box[5]
    expect(statObj).to.have.a.property("attacks");
  });
});
