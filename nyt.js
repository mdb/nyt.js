var request = require('request');
var _ = require('underscore');

function NYT(opts) {
  this.defaultSettings = {
    articlesAPIKey: undefined,
    campaignFinanceAPIKey: undefined,
    bestSellersAPIKey: undefined
  };

  this.settings = opts ? _.defaults(opts, this.defaultSettings) : this.defaultSettings;
}

NYT.prototype.articles = function (params, callback) {
  var defaultParams = {
    'api-key': this.settings.articlesAPIKey,
    'format': 'json'
  };
  var paramsObj = _.defaults(params, defaultParams);

  if (!paramsObj['api-key']) {
    throw new Error('No API Key specified');
  } else {
    invoke('/svc/search/v1/article', paramsObj, callback);
  }
};

NYT.prototype.campaignFinance = function (params, callback) {
  var defaultParams = {
    'api-key': this.settings.campaignFinanceAPIKey
  };
  var paramsObj = _.defaults(params, defaultParams);
  var year = params.cycle ? params.cycle : '2012';

  // clean cycle from the params
  if (paramsObj.cycle) {
    delete paramsObj.cycle;
  }

  if (!paramsObj['api-key']) {
    throw new Error('No API Key specified');
  } else {
    invoke('/svc/elections/us/v3/finances/' + year + '/candidates/search.json', paramsObj, callback);
  }
};

NYT.prototype.bestSellers = function (params, callback) {
  var defaultParams = {
    'offset': '',
    'sortby': '',
    'sortorder': '',
    'date': '',
    'api-key': this.settings.bestSellersAPIKey
  };
  var paramsObj = _.defaults(params, defaultParams);
  var author = params.author ? getFormattedAuthorName(params.author) : undefined;
  var date = params.date ? params.date : '';

  // clean author from the params
  if (paramsObj.author) {
    delete paramsObj.author;
  }
  
  // clean date from the params
  if (paramsObj.date || paramsObj.date === '') {
    delete paramsObj.date;
  }

  if (!paramsObj['api-key']) {
    throw new Error('No API Key specified');
  } else if (!author) {
    throw new Error('No author specified');
  } else {
    invoke('/svc/books/v2/lists/' + date + '/' + author + '.json', paramsObj, callback);
  }
};

module.exports = function(opts) {
  return new NYT(opts);
}

// helpers
function getFormattedAuthorName(name) {
  return name.replace(" ", "+");
}

function buildRequestURL(path) {
  return 'http://api.nytimes.com' + path;
}

function invoke(path, params, callback) {
  var url = buildRequestURL(path);

  request(url, {qs: params}, function (error, response, body) {
    callback(JSON.parse(body));
  });
}
