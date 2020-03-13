require("babel-register")
const express = require("express")
const config = require('./assert/config/config')
const {success,error} = require("./assert/config/functions")
const mysql = require("promise-mysql")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
app.use(morgan("dev"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
 mysql.createConnection({
    host     : config.connection.localhost,
    user     : config.connection.user,
    password : "",
    database : config.connection.database
  }).then((connection)=>
  {
    let Members  =  require("./assert/config/member-class")(connection,config)


    console.log("connecte")



let MemberRouter = express.Router()
MemberRouter.route("/:id")
.get(async(req,res)=>
{ 
    let member = await(Members.getid(re.params.id))
    if(member instanceof Error)
        res.json(error(err.message))
    else
        res.json(success(member))
  
})

.put((req,res)=>
{ 
    if(req.body.name)
    {
        connexion.query("SELECT * FROM members where id = ? ", [req.params.id] , (err,result) =>
        {
            if(err)
            {
                res.json(error(err.message))
    
            }else{
                if(result[0] =! undefined)
                {
                connection.query("SELECT  * FROM members where name = ? ans id != ?", [req.body.name, req.params.id], (err,result) =>
                {
                    if(err)
                    {
                        res.json(error("same name"))
                    }
                    else
                    {
                        if(result[0] =! undefined)
                        {
                            connection.query("UPDATE * FROM members SET name =? WHERE id =? ", [req.body.name,req.params.id],(err,result) =>
                            {if(err)
                                {
                                    res.json(error(err.message))
                                }
                                else
                                {
                                    res.json(success(true))
                                }

                    
                            })            
                        }
                        else
                        {
                            res.json(error(err.message))
                        }



                    }

                })

                }else
                {
                    res.json(error("wrong id"))
                }
    
            }})
    }
    else
    {
        res.json(error("wrong id"))
    }
    
   
})

.delete((req,res)=>
{ 
    connection.query("SELECT * FROM members where  id = ? " , [req.params.id], (err,result)=>
    {
        if(err)
        {
            res.json(error(err.message))
            
        }
        else
        {
            if( result[0] != undefined)
            {
                connection.query("DELETE * FROM members whee id= ?" , [req.params.id], (err, result)=>
            {
                
                if(err)
                {res.json(error(err.message))}
                else{
                    res.json(success(true))
                }

            }
            )

            }
            else { res.json(error("wrong id"))}

            

        }
    })

})


MemberRouter.route("/")

.get((req,res)=>
{
    if(req.query.max != undefined && req.query.max>0)
    {
        connection.query('SELECT * FROM members  LIMIT 0,? ', [req.query.max ], (err,result)=>
        {
            if(err)
               {res.json(error(err.message))}
            else {res.json(success(result))}
            
           
        }

        )

    }
    else if(req.query.max != undefined )
    {
        res.json(error("error de la requet") )

    }
    else
    {
        connection.query('SELECT * FROM members' , (err,result)=>
        {
            if(err)
               {res.json(error(err.message))}
            else {res.json(success(result))}
            
           
        }

        )}
})

.post((req,res) =>
{
    if(req.body.name)
    {
        connection.query("SELECT * FROM members where  name= ?",[req.body.name],(err,result) =>
        {if(err)
            {
                res.json(error("wrong id"))
            }
            else{
                if (result[0] != undefined)
                {
                res.json(error("name is already take"))
                }
                else{
                    connection.query("INSERT INTO members(name) VALUES(?) " , [req.body.name], (err,result) =>
                    {
                        if(err)
                          {
                              res.json(error(err.message))
                          }
                          else
                          {
                              
                            connection.query("SELECT * FROM members where name =? ",[req.body.name], (err,result)=>
                              {
                                  if(err)
                                  { res.json(error(err.message))}
                                  else{
                                      res.json(success({
                                          id: result[0].id,
                                          name: result[0].name
                                      }))
                                  }

                              })
                          }

                    })
                }
            }

        })

    }
    else
    {
    
        res.json(error("no name in the request"))

    }
})

app.use(config.rootAPI+"members", MemberRouter)

app.listen(config.port,()=>
{
    console.log("le port d'écoute est"+config.port)
}
)

   

  }).catch((err)=>{
      console.log("Problem de connexion database")
      console.log(err.message)

  })


