exports.success = function  success(result) 
{
    return{
        status:"success",
        result:result

    }
}

exports.error  = function error(message)
{
    return{
        status:"success",
        message:message

    }
}
