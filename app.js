require("babel-register")
const express = require("express")
const config = require('./config')
const {success,error} = require("functions")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
app.use(morgan("dev"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

members = [{id:1,name:"daouda"},{id:2,name:"abou"},{id:3,name:"mamy"}]

let MemberRouter = express.Router()
MemberRouter.route(":/id")
.get((req,res)=>
{ var index = getIndex(req.params.id)
    if(typeof(index) == 'string')
    {
        res.json(error(index))
    }

    else res.json(success(members[(index)-1]))

})

.put((req,res)=>
{ let  index = getIndex(req.params.id)
    if(typeof(index) == 'string')
    {
        res.json(error(index))
    }
    else
    {

  let same = false
    for (let i=0;i<members.length;i++)
    {
        if(req.body.name == members[i].name && req.params.id != members[i].id)
         {
        same = true
         break
         }
    }
    if(same)
    {
        res.json(error("same name"))
    }else
    {
        members[index].name = req.body.name
        res.json(success("true"))
    }
}
   
})

.delete((req,res)=>
{ var index = getIndex(req.params.id)
    if(typeof(index) == 'string')
    {
        res.json(error(index))
    }

    else 
    {
        members.splice(index,1)
        res.json(success(members))
        
    }

})


MemberRouter.route("/")

.get((req,res)=>
{
    if(req.query.max != undefined && req.query.max>0)
    {
        res.json(success(members.splice(0,req.query.max)))

    }
    else if(req.query.max != undefined )
    {
        res.json(error("error de la") )

    }
    else
    {res.json(success(members))   }
})

.post((req,res) =>
{
    let samename = false;

    for (let i=1 ;i<members.length;i++)
        {
            if (req.body.name == members[i].name)
            {
                
                samename = true
                break
            }
        }
    if(samename)
    {
        res.json(error(" name already create")) 
    }
    else 
    {
        if(req.body.name)
        {
            
            let member = { id:createId(), name:req.body.name}
            members.push(member)
            res.json(success(member))
    
        }
        else
        {
            res.json(error("not create name"))
        }
    }

}
)

app.use(config.rootAPI+"members", MemberRouter)

app.listen(config.port,()=>
{
    console.log("le port d'écoute est"+config.port)
}
)


function getIndex(id)
{
    for(let i=0;i<members.length;i++)
    {
        if(members[i].id == id)
        return i
    }
    return "wrong id"
}
   

function createId()
{
   return lastmember = members[members.length-1].id +1
}