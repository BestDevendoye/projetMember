let  connection , config

module.exports = (_db,_config) =>
{
    connection = _db
    config = _config
    return Members

    
}


let Members = class 
{

static getid(id){

return new Promise((next) =>{

    connection.query('SELECT * FROM members where id = ?', [id])
    .then(result)
    if(result[0] != undefined)
    next (result[0])
    else next(new Error("Wrong id"))
    .cath(err)
    next(err.message)

})
}
}     
       
