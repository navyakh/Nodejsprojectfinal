/**
 * Answer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      question:{
      	model:'Question',
      	required:true
      },
      value:{
      	type:'string',
      	required:true
      },
      isRightAnswer:{
      	type:'boolean',
      	required:true,
      	defaultsTo:false
      }
  }
  
};

