var nock = require('nock');
var expect = require('expect.js');

describe("NYT", function() {
  var nyt;

  describe("#settings", function () {

    it("exists as a public object on an NYT instance", function () {
      nyt = require('../nyt')();
      expect(typeof nyt.settings).to.eql('object');
    });
    
    it("is set to the value of the prototype's defaultSettings if no settings have been passed", function () {
      nyt = require('../nyt')();;
      expect(nyt.settings.articlesAPIKey).to.eql(undefined);
      expect(nyt.settings.campaignFinanceAPIKey).to.eql(undefined);
      expect(nyt.settings.bestSellersAPIKey).to.eql(undefined);
    });
    
    it("is set to the value of the options it's passed on instantiation merged with the default settings", function () {
      nyt = require('../nyt')({articlesAPIKey: 'blah'});
      expect(nyt.settings.articlesAPIKey).to.eql('blah');
      expect(nyt.settings.campaignFinanceAPIKey).to.eql(undefined);
      expect(nyt.settings.bestSellersAPIKey).to.eql(undefined);
    });
  });

  describe("#defaultSettings", function () {
    it("exits as a public object on an NYT instances", function () {
      nyt = require('../nyt')();
      expect(nyt.defaultSettings.articlesAPIKey).to.eql(undefined);
      expect(nyt.defaultSettings.campaignFinanceAPIKey).to.eql(undefined);
      expect(nyt.defaultSettings.bestSellersAPIKey).to.eql(undefined);
    });
  });

  describe("#articles", function () {
    context("NYT is instantiated with an options object", function () {
      beforeEach(function (done) {
        nyt = require('../nyt')({articlesAPIKey: 'articlesAPIKey'});
        done();
      });

      it("exists as method of the NYT prototype", function () {
        expect(typeof nyt.articles).to.eql('function');
      });

      it("calls the correct URL and gets the response body", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/search/v1/article?query=some_search&api-key=articlesAPIKey&format=json')
          .reply(200, {'some_key':'some_value'});

        nyt.articles({'query': 'some_search'}, function(r) {
          expect(r).to.eql({'some_key':'some_value'});
          done();
        });
      });

      it("passes along all query params to the request URL", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/search/v1/article?query=some_search&foo=bar&api-key=articlesAPIKey&format=json')
          .reply(200, {'foo':'bar'});

        nyt.articles({'query': 'some_search', 'foo': 'bar'}, function(r) {
          expect(r).to.eql({'foo':'bar'});
          done();
        });
      });
    });

    context("NYT is instantiated with an options object", function () {
      beforeEach(function (done) {
        nyt = require('../nyt')({articlesAPIKey: 'articlesAPIKey'});
        done();
      });

      it("exists as method of the NYT prototype", function () {
        expect(typeof nyt.articles).to.eql('function');
      });

      it("calls the correct URL and gets the response body", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/search/v1/article?query=some_search&api-key=articlesAPIKey&format=json')
          .reply(200, {'some_key':'some_value'});

        nyt.articles({'query': 'some_search'}, function(r) {
          expect(r).to.eql({'some_key':'some_value'});
          done();
        });
      });

      it("passes along all query params to the request URL", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/search/v1/article?query=some_search&foo=bar&api-key=articlesAPIKey&format=json')
          .reply(200, {'foo':'bar'});

        nyt.articles({'query': 'some_search', 'foo': 'bar'}, function(r) {
          expect(r).to.eql({'foo':'bar'});
          done();
        });
      });
    });

    context("NYT is not instantiated with an options object", function () {
      beforeEach(function (done) {
        nyt = require('../nyt')();
        done();
      });

      it("exists as method of the NYT prototype", function () {
        expect(typeof nyt.articles).to.eql('function');
      });

      it("throws an an error specifying that an API key has not been set", function (done) {
        expect(function() {
          nyt.articles({'query': 'some_search'}, function(r) {});
        }).to.throwError();
        done();
      });
    });
  });

  describe("#campaignFinance", function () {
    beforeEach(function (done) {
      nyt = require('../nyt')({campaignFinanceAPIKey: 'campaignFinanceKey'});
      done();
    });

    it("exists as a method of nyt", function () {
      expect(typeof nyt.campaignFinance).to.eql('function');
    });

    context("NYT is instantiated with a campaign finance API key", function () {
      it("calls the correct URL, defaulting to the 2012 election cycle, and gets the response body", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/elections/us/v3/finances/2012/candidates/search.json?query=some_search&api-key=campaignFinanceKey')
          .reply(200, {'finance_key':'finance_value'});

        nyt.campaignFinance({'query': 'some_search'}, function(r) {
          expect(r).to.eql({'finance_key':'finance_value'});
          done();
        });
      });
      
      it("allows a developer to override the default '2012' election cycle", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/elections/us/v3/finances/2000/candidates/search.json?query=some_search&api-key=campaignFinanceKey')
          .reply(200, {'finance_key':'finance_value'});

        nyt.campaignFinance({'query': 'some_search', 'cycle': '2000'}, function(r) {
          expect(r).to.eql({'finance_key':'finance_value'});
          done();
        });
      });
      
      it("passes along all query params to the request URL", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/elections/us/v3/finances/2012/candidates/search.json?query=some_search&some_other_query=some_other_value&api-key=campaignFinanceKey')
          .reply(200, {'finance_key':'finance_value'});

        nyt.campaignFinance({'query': 'some_search', 'some_other_query': 'some_other_value'}, function(r) {
          expect(r).to.eql({'finance_key':'finance_value'});
          done();
        });
      });
    });
  });

  describe("#bestSellers", function () {
    it("exists as a method of nyt", function () {
      expect(typeof nyt.bestSellers).to.eql('function');
    });

    context("NYT is instantiated with a bestSellersAPIKey", function () {
      beforeEach(function (done) {
        nyt = require('../nyt')({bestSellersAPIKey: 'bestSellersKey'});
        done();
      });

      it("calls the correct URL and gets the response body", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/books/v2/lists//vonnegut.json?offset=&sortby=&sortorder=&api-key=bestSellersKey')
          .reply(200, {'body':'response_body'});

        nyt.bestSellers({'author': 'vonnegut'}, function(r) {
          expect(r).to.eql({'body':'response_body'});
          done();
        });
      });

      it("replaces spaces with '+' in an author's name before making the API call", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/books/v2/lists//kurt+vonnegut.json?offset=&sortby=&sortorder=&api-key=bestSellersKey')
          .reply(200, {'body':'response_body'});

        nyt.bestSellers({'author': 'kurt vonnegut'}, function(r) {
          expect(r).to.eql({'body':'response_body'});
          done();
        });
      });      
      
      it("injects a date string into the URL if one is specified in the params", function (done) {
        nock('http://api.nytimes.com')
          .get('/svc/books/v2/lists/2012-01-01/kurt+vonnegut.json?offset=&sortby=&sortorder=&api-key=bestSellersKey')
          .reply(200, {'body':'response_body'});

        nyt.bestSellers({'author': 'kurt vonnegut', 'date': '2012-01-01'}, function(r) {
          expect(r).to.eql({'body':'response_body'});
          done();
        });
      });      

      context("it is not passed an author", function () {
        it("throws an an error specifying that an author has not been specified", function (done) {
          nyt = require('../nyt')({bestSellersAPIKey: 'bestSellersKey'});
          expect(function() {
            nyt.bestSellers({'foo': 'bar'}, function(r) {});
          }).to.throwError();
          done();
        });
      });

      context("NYT is not instantiated with a bestSellersAPIKey", function () {
        it("throws an an error specifying that an API key has not been specified", function (done) {
          nyt = require('../nyt')();
          expect(function() {
            nyt.bestSellers({'author': 'king'}, function(r) {});
          }).to.throwError();
          done();
        });        
      });
    });
  });
});
