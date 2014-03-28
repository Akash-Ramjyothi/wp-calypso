
/**
 * Module dependencies.
 */

var Site = require('./lib/site');
var req = require('./lib/req');
var debug = require('debug')('wp-connect');

/**
 * Wordpress connect class
 *
 * @param {String} token
 * @api public
 */

function WPCONN(token){
  if (!(this instanceof WPCONN)) return new WPCONN(token);

  this.tkn = token;

  // request instance
  this.req = new req(this);

  // site stuff
  this.site = new Site(this);
}

/**
 * User profile
 *
 * @param {Function} fn
 * @api private
 */

WPCONN.prototype.me = function (fn){
  this.req.exec('me', null, fn);
};

/**
 * Expose `WPCONN` module
 */

module.exports = WPCONN;
