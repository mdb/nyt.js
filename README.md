[![Build Status](https://secure.travis-ci.org/mdb/node-nyt.png)](http://travis-ci.org/mdb/node-nyt)

# node-nyt 

A simple Node.js module for working with the [New York Times Developer API](http://developer.nytimes.com).

...still a work in progress. A bit rough around the edges.

## Getting Started

Secure a [NY Times Developer API Key](http://developer.nytimes.com/apps/register)

Require and instantiate node-nyt:
  
    var nyt = require('nyt')();

Set your API keys via nyt:

    nyt.settings.articlesAPIKey = 'YOUR KEY';
    nyt.settings.campaignFinanceKey = 'YOUR KEY';
    nyt.settings.bestSellersKey = 'YOUR KEY';

Alternatively, you can set API keys on instantiation:

    var nyt = require('nyt')({
      articlesAPIKey: 'YOUR KEY',
      campaignFinanceAPIKey: 'YOUR KEY',
      bestSellersAPIKey: 'YOUR KEY'
    });

## Example Usage

Note that node-nyt currently only supports the NY Times' articles search and campaign finance APIs.

Stay posted for more features.

### Articles

Browse the NY Times' articles API for the term "obama":

    nyt.articles({'query' : 'obama'}, function (resp) {
      console.log(resp);
    });

### Campaign Finance

Browse the NY Times' campaign finance API for the term "obama" in 2012:

    nyt.campaignFinance({'query' : 'obama'}, function (resp) {
      console.log(resp);
    });

Browse the NY Times' campaign finance API for the term "obama" in 2000:

    nyt.campaignFinance({'query' : 'obama', 'cycle' : '2000'}, function (resp) {
      console.log(resp);
    });

### Best Sellers

Browse the NY Times' best sellers lists for "vonnegut":

    nyt.bestSellers({'author' : 'vonnegut'}, function (resp) {
      console.log(resp);
    });

Browse the NY Times' best sellers API for the "vonnegut" at a given date:

    nyt.bestSellers({'author' : 'vonnegut', 'date' : '2012-01-01'}, function (resp) {
      console.log(resp);
    });
