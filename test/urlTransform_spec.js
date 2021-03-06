"use strict";
/* global describe, it */

const expect = require("chai").expect;
const urlTransform = require("../src/urlTransform");

describe("urlTransform", function() {
  it("check null params", function() {
    expect(urlTransform()).to.eql("");
    expect(urlTransform(null)).to.eql("");
    expect(urlTransform("")).to.eql("");
    expect(urlTransform("/test")).to.eql("/test");
  });

  it("check replace path", function() {
    expect(urlTransform("/test/:id", {id: 1})).to.eql("/test/1");
    expect(urlTransform("/test/:id/hey/:id", {id: 1})).to.eql("/test/1/hey/1");
  });

  it("check replace path with hostname", function() {
    expect(urlTransform("http://localhost:1234/test/:id", {id: 1})).to.eql("http://localhost:1234/test/1");
    expect(urlTransform("http://localhost:1234/test/:id/hey/:id", {id: 1})).to.eql("http://localhost:1234/test/1/hey/1");
  });

  it("check optional params path", function() {
    expect(urlTransform("/test/:id", {id: 1})).to.eql("/test/1");
    expect(urlTransform("/test/(:id)", {id: 1})).to.eql("/test/1");
    expect(urlTransform("/test/(:id)")).to.eql("/test/");
  });

  it("check non-pretty params in path", function() {
    expect(urlTransform("/test/(:id)", {id1: 1})).to.eql("/test/?id1=1");
    expect(urlTransform("/test/?hello=1&(:id)", {id1: 1})).to.eql("/test/?hello=1&id1=1");
    expect(urlTransform("/test/?hello=2(:id)", {id1: 1})).to.eql("/test/?hello=2&id1=1");
  });

  it("check clean params", function() {
    expect(urlTransform("/test/:id")).to.eql("/test/");
    expect(urlTransform("/test/:id/")).to.eql("/test//");
    expect(urlTransform("/test/(:id)")).to.eql("/test/");
  });
});
