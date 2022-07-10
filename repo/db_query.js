var getUserDetail = "select userid from projects where username=$1 AND password=$2"
var adduser = "insert into projects(username,password,loginstatus,projectid,projectname,taskid,task) values($1,$2,$3,$4,$5,$6,$7) RETURNING *"
var check = "select userid from projects where username=$1"
var addProject = "insert into projects(userid,username,loginstatus,projectname,projectid) values($1, $2, $3,$4,$5) RETURNING*"
var updateProject ="update projects set projectname=$2, projectid=$3 where userid=$1 RETURNING *"
var checkProject  = "select userid from projects where userid=$1 AND projectname=$2 AND projectid=$3"
var checktask  = "select userid from projects where userid=$1 AND projectname=$2 AND projectid=$3 AND task=$4 AND taskid=$5"
var getProject = "select * from projects where userid=$1"
var addtask = "insert into projects(userid,username,loginstatus,projectname,projectid,task,taskid) values($1, $2, $3,$4,$5,$6,$7) RETURNING*"
var updatetask ="update projects set task=$4,taskid=$5  where userid=$1 AND projectname=$2 AND projectid=$3 RETURNING *"
var gettask = "select * from projects where userid=$1"
var getlogout =" update projects set loginstatus=$1 RETURNING *"

module.exports={
    getlogout,
    getUserDetail,
    adduser,
    check,
    addProject,
    checkProject,
    updateProject,
    getProject,
    checktask,
    addtask,
    updatetask,
    gettask
}