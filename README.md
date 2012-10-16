[![Build Status](https://secure.travis-ci.org/mdb/node-nyt.png)](http://travis-ci.org/mdb/node-nyt)

# nyt.js

A simple Node.js module for working with the [New York Times Developer API](http://developer.nytimes.com).

...still a work in progress. A bit rough around the edges.

## Getting Started

Secure a [NY Times Developer API Key](http://developer.nytimes.com/apps/register)

Require and instantiate node-nyt:
  
    var nyt = require('nyt')();

Set your API keys via nyt:

    nyt.settings.articlesAPIKey = 'YOUR KEY';
    nyt.settings.campaignFinanceAPIKey = 'YOUR KEY';
    nyt.settings.bestSellersAPIKey = 'YOUR KEY';

Alternatively, you can set API keys on instantiation:

    var nyt = require('nyt')({
      articlesAPIKey: 'YOUR KEY',
      campaignFinanceAPIKey: 'YOUR KEY',
      bestSellersAPIKey: 'YOUR KEY'
    });

## Example Usage

Note that node-nyt currently only supports the NY Times' articles search, campaign finance, and best sellers APIs.

Stay posted for more features.

### Articles

Browse the NY Times' articles API for the term "obama":

    nyt.articles({'query' : 'obama'}, function (resp) {
      console.log(resp);
    });

### Campaign Finance

Note that the campaign finance calls default to the 2012 cycle if no 'cycle': 'SOME YEAR' is specified.

Get the NY Times' campaign finance API for the term "obama" in 2012:

    nyt.campaignFinance({'query' : 'obama'}, function (resp) {
      console.log(resp);
    });

Get the NY Times' campaign finance API for the term "obama" in 2000:

    nyt.campaignFinance({'query' : 'obama', 'cycle' : '2000'}, function (resp) {
      console.log(resp);
    });

Get 2000 "obama" campaign finance candidate details:

    // Note that you can get a candidate's ID from the API call documented above
    nyt.campaignFinance({'request' : 'candidateDetails', 'cycle' : '2000', 'candidateID' : 'P80003338'}, function (resp) {
      console.log(resp);
    });

Get 2000 state candidate campaign finance details in VA:

    nyt.campaignFinance({'request' : 'stateCandidates', 'cycle' : '2000', 'state' : 'va'}, function (resp) {
      console.log(resp);
    });

Filter the above by chamber:

    nyt.campaignFinance({'request' : 'stateCandidates', 'cycle' : '2000', 'state' : 'va', 'chamber': 'house'}, function (resp) {
      console.log(resp);
    });

Get campaign finance data related to new candidates:

    nyt.campaignFinance({'request' : 'newCandidates'}, function (resp) {
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
