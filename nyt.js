var request = require('request');
var _ = require('underscore');

var API_SERVER = 'api.nytimes.com';
var API_KEY = process.env.NYTIMES_API_KEY || undefined;

exports.settings = {
  apiKey: function (key) {
    if (key) {
      API_KEY = key;
      return API_KEY;
    } else {
      return API_KEY;
    }
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

// helpers
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
