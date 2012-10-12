var request = require('request');
var _ = require('underscore');

var API_SERVER = 'api.nytimes.com';
var API_KEY = process.env.NYTIMES_API_KEY || undefined;
var ARTICLES_API_KEY;
var CAMPAIGN_FINANCE_API_KEY;
var BEST_SELLERS_API_KEY;

exports.settings = {
  apiKey: function (key) {
    if (key) {
      API_KEY = key;
      return API_KEY;
    } else {
      return API_KEY;
    }
  },

  getAPIKey: function(key) {
    if (!key) {
      return exports.settings.APIKeys;
    } else {
      return exports.settings.APIKeys[key];
    }
  },

  setAPIKey: function(keyValObj) {
    _.extend(exports.settings.APIKeys, keyValObj);  
  },

  APIKeys: {
    articles: ARTICLES_API_KEY || undefined,
    campaignFinance: CAMPAIGN_FINANCE_API_KEY || undefined,
    bestSellers: BEST_SELLERS_API_KEY || undefined
  },

  apiServer: function (server) {
    if (server) {
      API_SERVER = server;
    } else {
      return API_SERVER;
    }
  }
};

exports.articles = function(params, callback) {
  var paramsObj = setArticlesParams(params);

  invoke('/svc/search/v1/article', paramsObj, callback);
};

//EX: http://api.nytimes.com/svc/elections/us/v3/finances/2012/candidates/search.json?query=bush&api-key=####
exports.campaignFinance = function(params, callback) {
  var year = params.cycle ? params.cycle : '2012';
  var paramsObj = setFinanceParams(params);

  invoke('/svc/elections/us/v3/finances/' + year + '/candidates/search.json', paramsObj, callback);
};

exports.bestSellers = function(params, callback) {
  var author = params.author ? params.author : '';

  invoke('/svc/books/v2/lists/' + author + '.json', params, callback);
};

// helpers
function getAuthorName(name) {
  var nameArr = name.split(" ");
  return nameArr.pop();
}

function setArticlesParams(params) {
  var newObj = _.extend(params, {'format':'json'});

  return newObj;
}

function setFinanceParams(params) {
  var paramsObj = params;

  if (paramsObj.cycle) {
    delete paramsObj.cycle;
  }

  return paramsObj;
}

function buildRequestURL(path) {
  return 'http://' + API_SERVER + path;
}

function invoke(path, params, callback) {
  var url = buildRequestURL(path);
  var paramsObj = {
    'api-key': API_KEY
  };

  _.extend(paramsObj, params);
  request(url, {qs: paramsObj}, function (error, response, body) {
    callback(JSON.parse(body));
  });
}
