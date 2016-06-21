'use strict';
// =========================================================================
//
// Controller for milestone bases
//
// =========================================================================
var path     = require('path');
var DBModel  = require (path.resolve('./modules/core/server/controllers/cc.dbmodel.controller'));


module.exports = DBModel.extend ({
	name     : 'MilestoneBase',
	plural   : 'milestonebases',
});


