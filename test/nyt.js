var nyt = require('../nyt.js');
var nock = require('nock');
var expect = require('expect.js');

describe("nyt", function() {
  describe("#settings", function () {
    it("exists as a public object on nyt", function () {
      expect(typeof nyt.settings).to.eql('object');
    });

    describe("#getAPIKey", function () {
      it("sets the corresponding object property in settings.APIKeys to the value is passed", function () {
        nyt.settings.setAPIKey({'articles': 'bar'});
        expect(nyt.settings.getAPIKey('articles')).to.eql('bar');
        nyt.settings.setAPIKey({'articles': 'foo'});
        expect(nyt.settings.getAPIKey('articles')).to.eql('foo');
      });
      
      it("does not fail if the property does not already exist", function () {
        nyt.settings.setAPIKey({fakeProp: 'fakeVal'});
        expect(nyt.settings.getAPIKey('fakeProp')).to.eql('fakeVal');
      });
    });

    describe("#getAPIKey", function () {
      it("returns undefined if the string it is passed has not been set as an API key property in settings", function () {
        expect(nyt.settings.getAPIKey('nonExistant')).to.eql(undefined);
      });      
      
      it("returns undefined if the string it is passed has not been set as an API key property in settings", function () {
        expect(nyt.settings.setAPIKey({articles:'articlesKey'}));
        expect(nyt.settings.getAPIKey('articles')).to.eql('articlesKey');
      });

      it("returns all the API keys if it is not passed any arguments", function () {
        nyt.settings.APIKeys = {};
        var keys = {
          articles: 'a',
          cammpaignFinance: 'b',
          bestSellers: 'c'
        };
        nyt.settings.setAPIKey(keys);
        expect(nyt.settings.getAPIKey()).to.eql(keys);
      });
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
    
    describe("#APIServer", function () {
      it("exists as a property on the settings object", function () {
        expect(typeof nyt.settings.APIServer).to.eql('string');
      });

      it("returns 'api.nytimes.com' by default", function () {
        expect(nyt.settings.APIServer).to.eql('api.nytimes.com');
      });
    });
  });

  describe("#articles", function () {
    beforeEach(function (done) {
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

  describe("#bestSellers", function () {
    beforeEach(function (done) {
      nyt.settings.apiKey('some_key');
      done();
    });

    it("exists as a method of nyt", function () {
      expect(typeof nyt.bestSellers).to.eql('function');
    });
  });
});
