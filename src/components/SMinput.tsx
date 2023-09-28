type def={
    myval?:string,
    change?:any,
    label?:string,
    placeholder?:string,
    classname?:any
}
function MYInput(props:def){
    return(
        <div>
            <input type="text"  value={props.myval} onChange={props.change} placeholder={props.placeholder} className={`px-2 py-1 mb-3 ${props.classname}`}  ></input>
        </div>
    )
}

export default MYInput