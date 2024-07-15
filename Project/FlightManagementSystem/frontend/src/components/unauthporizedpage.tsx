function UnauthorizedPage(){


    return (

        <>
        <p>Unauthorized page</p> 
        <a onClick={()=>window.location.href="/login"}>login</a>
        </>
    )
}

export default UnauthorizedPage