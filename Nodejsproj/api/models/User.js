/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
name:{
	type: 'string',
		required: true
},
pwd:{
	type:'string',
	required:true
},
mail:{
	type:'string',
	required:true
},
score:{
		type:'integer',
		required:true
}
}
};


