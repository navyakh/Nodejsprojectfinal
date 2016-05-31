/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addQuestion:function addQuestion(req,res){
		return res.view();
	},
   //To add new question to the database
	processAddQuestion:function processAddQuestion(req,res){
         var question=req.param('question');
         var choices=[];
         choices[0]=req.param('ch1');
         choices[1]=req.param('ch2');
         choices[2]=req.param('ch3');
         choices[3]=req.param('ch4');


         var rightAnswer=parseInt(req.param('answer'));
         var questionRecord={
         	Challenge:question
         }
         sails.models.question.create(questionRecord,function createRecord(err, createdRecord){
         if(err){
         	return res.serverError(err);
         }else{
         	var answers=[];
         	for(var i=0;i<4;i++){
         		var tmpAnswer={
         			question:createdRecord.id,
         			value:choices[i],
         			isRightAnswer:(rightAnswer===i+1) ? true:false
         		};
         		answers.push(tmpAnswer);
         	}
            	sails.models.answer.create(answers,function(err,createdAnswers)
            	{if(err)
            		{return res.serverError(err);
            		}else{
            			return res.redirect('/question/add');
            		}

            	});
         }
     });
	},

   anspage:function anspage(req,res){     
      var id = req.param('id',1);


      console.log(req.param('id'));
            var searchCriteria={
        id:id
        };
        sails.models.question.findOne(searchCriteria,function findARecord(err,foundRecord){
         if(err){
            return res.send(500,'Error');
                  }
         else{
            if(!foundRecord){
               //No records found
               return res.redirect('/question/score/'+req.session.score);
               

                           }
            else{
               //Found a record
               console.log(foundRecord);



               sails.models.answer.find({question:id},function(err,answers){
                  if(err){
                     return res.send(500,'Error');
                  }

                  console.log(answers);
                  return res.view('question/anspage',{
                  rcrd:foundRecord,
                  answers:answers
               });

               });
           }
         }

        });
   },

   score:function score(req,res)
   { 
      console.log("uijik,ok");
      var score = req.param('score');
    return res.view();

   },

   check:function check(req,res){

      console.log(req.body.questionId);
      var id=req.body.questionId;
      console.log(req.body.avalue);
      sails.models.answer.findOne({
      questionid:id,
      value:req.body.avalue,
      isRightAnswer:true
   },function(err,answer){
      if(err){
         return res.send(500,'Error');
      }

      if(!answer){
         console.log('Not success');

      } else {
         console.log('Success');
      }
      if(id<=10)
      {
      id++;
      req.session.score++;
      console.log('score is ',req.session.score);
      return res.redirect('/question/anspage/'+id);
   }
      else
         return res.redirect('/user/final/'+req.session.score);
     
   });


   }

};

