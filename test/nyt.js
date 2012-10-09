var nyt = require('../nyt.js');
var nock = require('nock');
var expect = require('expect.js');

describe("nyt", function() {
  describe("#settings", function () {
    it("exists as a public object on nyt", function () {
      expect(typeof nyt.settings).to.eql('object');
    });

    describe("#apiKey", function () {
      it("exists as a function on the settings object", function () {
        expect(typeof nyt.settings.apiKey).to.eql('function');
      });

      it("returns the developer's API key if it is passed no arguments and the API key has been set", function () {
        nyt.settings.apiKey('foo');
        expect(nyt.settings.apiKey()).to.eql('foo');
      });
      
      it("sets the developer's API key to the value of the string it is passed", function () {
        nyt.settings.apiKey('some_key');
        expect(nyt.settings.apiKey()).to.eql('some_key');
      });
    });
    
    describe("#apiServer", function () {
      it("exists as a function on the settings object", function () {
        expect(typeof nyt.settings.apiServer).to.eql('function');
      });

      it("returns the developer's API key if it is passed no arguments and the API key has been set", function () {
        nyt.settings.apiServer('some_site.com');
        expect(nyt.settings.apiServer()).to.eql('some_site.com');
      });
      
      it("sets the developer's API key to the value of the string it is passed", function () {
        nyt.settings.apiServer('another_site.com');
        expect(nyt.settings.apiServer()).to.eql('another_site.com');
      });
    });
  });

  describe("#articles", function () {
    beforeEach(function (done) {
      nyt.settings.apiServer('api.nytimes.com');
      nyt.settings.apiKey('some_key');
      done();
    });

    it("exists as method of nyt", function () {
      expect(typeof nyt.articles).to.eql('function');
    });

    it("calls the correct URL and gets the response body", function (done) {
      nock('http://api.nytimes.com')
        .get('/svc/search/v1/article?api-key=some_key&query=some_search&format=json')
        .reply(200, {'some_key':'some_value'});

      nyt.articles({'query': 'some_search'}, function(r) {
        expect(r).to.eql({'some_key':'some_value'});
        done();
      });
    });

    it("passes along all query params to the request URL", function (done) {
      nock('http://api.nytimes.com')
        .get('/svc/search/v1/article?api-key=some_key&query=some_search&foo=bar&format=json')
        .reply(200, {'foo':'bar'});

      nyt.articles({'query': 'some_search', 'foo': 'bar'}, function(r) {
        expect(r).to.eql({'foo':'bar'});
        done();
      });
    });
  });

  describe("#campaignFinance", function () {
    beforeEach(function (done) {
      nyt.settings.apiServer('api.nytimes.com');
      nyt.settings.apiKey('some_key');
      done();
    });

    it("exists as a method of nyt", function () {
      expect(typeof nyt.campaignFinance).to.eql('function');
    });

    it("calls the correct URL, defaulting to the 2012 election cycle, and gets the response body", function (done) {
      nock('http://api.nytimes.com')
        .get('/svc/elections/us/v3/finances/2012/candidates/search.json?api-key=some_key&query=some_search')
        .reply(200, {'finance_key':'finance_value'});

      nyt.campaignFinance({'query': 'some_search'}, function(r) {
        expect(r).to.eql({'finance_key':'finance_value'});
        done();
      });
    });
    
    it("allows a developer to override the default '2012' election cycle", function (done) {
      nock('http://api.nytimes.com')
        .get('/svc/elections/us/v3/finances/2000/candidates/search.json?api-key=some_key&query=some_search')
        .reply(200, {'finance_key':'finance_value'});

      nyt.campaignFinance({'query': 'some_search', 'cycle': '2000'}, function(r) {
        expect(r).to.eql({'finance_key':'finance_value'});
        done();
      });
    });
    
    it("passes along all query params to the request URL", function (done) {
      nock('http://api.nytimes.com')
        .get('/svc/elections/us/v3/finances/2012/candidates/search.json?api-key=some_key&query=some_search&some_other_query=some_other_value')
        .reply(200, {'finance_key':'finance_value'});

      nyt.campaignFinance({'query': 'some_search', 'some_other_query': 'some_other_value'}, function(r) {
        expect(r).to.eql({'finance_key':'finance_value'});
        done();
      });
    });
  });
});
