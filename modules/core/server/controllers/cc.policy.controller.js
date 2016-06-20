'use strict';
// =========================================================================
//
// a very much simplified policy implementation.
// user can be either public, authenticated, or admin. thats all
// all the reset of security is handled through object level permissions
//
// =========================================================================
var _ = require ('lodash');

var returnOk = function (ok, res, next) {
	return ok ? next () : res.status(403).json ({ message: 'User is not authorized' });
};
// -------------------------------------------------------------------------
//
// definition is like this:
// {
// 	get:'guest'|'user'|'admin'
// 	post:'guest'|'user'|'admin'
// 	all:'guest'|'user'|'admin'
// }
// check for match of method, get type of user
// if no match, get all
// if no all, then assume admin only
//
// or, it is a simple string covering all methods
//
// -------------------------------------------------------------------------
module.exports = function (def) {
	return function (req, res, next) {
		var method = req.method.toLowerCase ();
		var type;
		if (_.isObject (def)) {
			type = def[method] || def.all || 'admin';
		} else {
			type = def;
		}
		console.log (type);
		//
		// if guest is ok, then everyone is welcome
		//
		if (type === 'guest') {
			return returnOk (true, res, next);
		}
		//
		// if type is user then all is well so long as we are logged in
		//
		else if (type === 'user') {
			return returnOk (!!req.user, res, next);
		}
		//
		// otherwise this is admin only
		//
		else if (type === 'admin') {
			return returnOk ((!!req.user && _.indexOf (req.user.roles, 'admin')), res, next);
		}
		else {
			return returnOk (false, res, next);
		}
	};
};

