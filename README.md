[![Build Status](https://secure.travis-ci.org/mdb/node-nyt.png)](http://travis-ci.org/mdb/node-nyt)

# node-nyt 

A simple Node.js module for working with the [New York Times Developer API](http://developer.nytimes.com).

...still a work in progress. A bit rough around the edges.

## Getting Started

Secure a [NY Times Developer API Key](http://developer.nytimes.com/apps/register)

Require node-nyt:
  
    var nyt = require('nyt');

Set your API key via nyt:

    nyt.settings.apiKey('YOUR KEY');

Or set your API key via an environment variable:

    NYTIMES_API_KEY="YOUR KEY"

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
