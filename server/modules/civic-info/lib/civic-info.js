var request = require('request');
var _ = require('underscore');

function CivicInfo(opts) {
  var defaultSettings = {
    apiKey: process.env.GOOGLE_API_KEY
  };

  this.settings = opts ? _.defaults(opts, defaultSettings) : defaultSettings;
}

CivicInfo.prototype.elections = function (callback) {
  var options = {
    key: this.settings.apiKey
  };

  request(buildRequestURL('elections'), {qs: options}, function (error, response, body) {
    if (error) return callback(error);
    callback(null, JSON.parse(body));
  });
};

CivicInfo.prototype.voterInfo = function (opts, callback) {
  var options = _.defaults(opts, {
    electionID: '2000'
  });

  // console.log('civicinfo.voterinfo: ', opts.address);
  if (!options.address) {
    throw new Error("You must specify an address");
  } else {
    // electionID=' + options.electionID
    var url = 'https://www.googleapis.com/civicinfo/v2/representatives' +
    '?key='+ this.settings.apiKey +
    '&includeOffices=false&alt=json'+
    // '&returnAllAvailableData=true' +
    // '&electionId=2000' +
    '&address=' + encodeURI(opts.address);

    console.log('url: ', url);
    request.get(
      {
        url: url,
        headers: {'Content-Type': 'application/json'}
      },
      function (error, response, body) {

        if (error) return callback(error);
        callback(null, JSON.parse(body));
      }
    );
  }
};

module.exports = function(opts) {
  return new CivicInfo(opts);
};

function buildRequestURL(path) {
  var url = 'https://www.googleapis.com/civicinfo/v2/';
  url += path;
  console.log('url: ', url);
  return url;
}
