import React ,{Component} from 'react'
import ReactDOM from 'react-dom'

const summary = document.getElementById('root')

class NewsTrends extends Component{
    constructor(props){
        super(props)
            this.state={
                isLoaded:false,
                isOpen:true,
                newsItems:[]
            }            
        }
    
    componentDidMount(props){
            if(this.props.data!==null && this.props.data!==undefined){
                    let items = this.props.data;
                    for(let i=0;i<2;i++){
                        this.state.newsItems.push(items[i]["content"])

                }
                this.setState({isLoaded:true})
            }

    }
    onClose=()=>{
        this.setState({isLoaded:false})
    }
        render(props){
            console.log("MODEL CALLED")
            if(this.state.isLoaded===true){
                return ReactDOM.createPortal(
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
                            scrollBehavior:'true'
                         }} onClick={this.onClose}>
                            {Object.values(this.state.newsItems).map((item,index)=>{
                                return(
                                    <h3>
                                        {item}
                                    </h3>
                                )
                            })}
                        <p>Testing 123</p>
                    </div>
                    ,summary
                )
    
                }
                else{
                    return(
                        <div>isLoading</div>

                    )
                    
                }
        }
   
    }
export default NewsTrends;