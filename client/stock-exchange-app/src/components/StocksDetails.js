import React from 'react'
import ReactDom from 'react-dom'

const summary = document.getElementById('summary')

function StockDetails(props){
    console.log("MODEL CALLED")
    console.log(props)
    return ReactDom.createPortal(
        <div style={{
                position:'absolute',
                top:'15%',
                left:'15%',
                display:'grid',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'lightgray',
                width:'400px',
                height:'300px',
                scrollBehavior:'auto'
             }} onClick={props.onClose}>
            <h1>
               "Conclusion"
            </h1>
            <p>Testing 123</p>
        </div>
        ,summary
    )
}

export default  StockDetails;