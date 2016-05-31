/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function index(req,res){
		var searchCriteria={};
		sails.models.user.find(searchCriteria,function foundAllRecords(err,foundRecords){
			console.log(foundRecords);
		return res.view({users:foundRecords});
	});
	},

    //for creating a new account
	create: function create(req,res){
        var name=req.param('username');
        console.log(name);
        var pass=req.param('password');
        console.log(pass);
        var mail=req.param('mail');
        console.log(mail);


        var record={
        	name:name,
        	mail:mail,
        	pwd:pass
        };
        sails.models.user.create(record,function userRecordCreated(err,createdRecord){
              return res.redirect('/log1');
          });
	},
	
	log1: function log1(req,res){
		console.log(req.ip);
		console.log(req.headers);
		return res.send(200,'Succesfullyy Created Your Account');
	},
	//for login
	signin2: function signin2(req,res){
		var username=req.param('username');
        var password=req.param('password');
        console.log(username);
        var searchCriteria={
        	name:username,
        	pwd:password
        };
        sails.models.user.findOne(searchCriteria,function findARecord(err,foundRecord){
        	if(err){
        		return res.send(500,"Error while logging in");
        	}else{
        		if(!foundRecord){
        			//No records found
        			return res.send(401,'Incorrect username or password');

        		}else{
        			//Found a record
        			req.session.isAuthenticated=true;
        			req.session.username=username;
        			req.session.userID=foundRecord.id;
                    score=0;
                    return res.redirect('/question/anspage');
        		}
        	}
        });
	}
	

};

