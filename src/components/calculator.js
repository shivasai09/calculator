import React  from 'react';
import {connect} from 'react-redux';
import {add ,deleteHistory} from '../actions/history';
import {addHistoryCountValue,subtractHistoryCountValue}from '../actions/historycount';
import  '../css/calculator.scss';
class Calculator extends React.Component{
    constructor(props) {
        super(props);
        this.handleclick=this.handleclick.bind(this);
        this.handleresult=this.handleresult.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        this.deleteChar=this.deleteChar.bind(this);
        this.doUndo=this.doUndo.bind(this);
        this.doRedo=this.doRedo.bind(this);
        this.handleAC=this.handleAC.bind(this);
        this.state={
             expression:"",
             value:0,
             localcount:-1
        }
    }

    componentWillReceiveProps(newProps)  {
        this.setState(()=>{
            return{
                
                localcount:newProps.historyCount
            }
        })
    }
    
    doUndo(){
        let localcount=this.state.localcount-1;
        this.setState({localcount});
        let expression=this.props.history[localcount].expression;
        this.setState({expression,value:this.props.history[localcount].expression});
    }
    doRedo() {
        let localcount=this.state.localcount+1;
        this.setState({localcount});
        let expression=this.props.history[localcount].expression;
        this.setState({expression,value:this.props.history[localcount].expression});
        
    }
    handleDelete(index){
       
           let newState=[...this.props.history];
           newState[index]. selected=true;
           let filterData=newState.filter((item)=>{
               return item.selected==false
           });
           this.props.dispatch(deleteHistory(filterData));
           this.props.dispatch(subtractHistoryCountValue());
    }
 
    handleclick(e){
      
        let {expression}=this.state;
        expression=expression+e.target.value;
        this.setState({expression,value:expression});
    }
    deleteChar() {
        let {expression}=this.state;
        expression=expression.slice(0,-1);
        this.setState({expression,value:expression});
    }
    handleresult(){
        let {expression}=this.state
        let value=eval(expression);
        if(expression!=''&&expression!=0)
        {
            let history={
                expression:expression,
                value:value
            }
            
            this.props.dispatch(add(history));
            this.props.dispatch(addHistoryCountValue());
          
            
        }
        this.setState({value});
    }
    handleAC(){
        let localcount=this.state.localcount+1;
        this.setState({expression:'', value:0,localcount});
    }
    render(){
        return(<div>
            <button value="1" onClick={this.handleclick} className="Button">1</button>
            <button value="2" onClick={this.handleclick}className="Button">2</button>
            <button value="3" onClick={this.handleclick}className="Button">3</button><br/>
            <button value="4" onClick={this.handleclick}className="Button">4</button>
            <button value="5" onClick={this.handleclick}className="Button">5</button>
            <button value="6" onClick={this.handleclick}className="Button">6</button><br/>
            <button value="7" onClick={this.handleclick}className="Button">7</button>
            <button value="8" onClick={this.handleclick}className="Button">8</button>
            <button value="9" onClick={this.handleclick}className="Button">9</button><br/>
            <button value="0" onClick={this.handleclick}className="Button">0</button>
            <button value="(" onClick={this.handleclick}className="Button">(</button>
            <button value=")" onClick={this.handleclick}className="Button">)</button><br/>
            <button value="+" onClick={this.handleclick}className="Button">+</button>
            <button value="-" onClick={this.handleclick}className="Button">-</button>
            <button value="*" onClick={this.handleclick}className="Button">*</button><br/>
            <button onClick={this.handleAC}className="Button">AC</button>
            <button value="/" onClick={this.handleclick}className="Button">/</button>
            <button value="=" onClick={this.handleresult}className="Button">=</button>
            <input type="text" value={this.state.value}/><button onClick={this.deleteChar}className="Button">X</button>
            <button onClick={this.doUndo} disabled={this.state.localcount>-1?false:true}className="Button">Undo</button>
            <button onClick={this.doRedo} disabled={this.state.localcount>=this.props.historyCount?true:false}className="Button">Redo</button>
            {this.props.history.map((item ,index)=><div  id={index}>expressinon:{item.expression} value:{item.value} index:{index}<button onClick={()=>this.handleDelete(index)} >delelte</button></div>)}
      
        </div>)
    }
}
const mapStateToProp=(state)=>{
    return{
        history:state.formReducer,
        historyCount:state.historyCounterReducer
    }
}
export default  connect(mapStateToProp)(Calculator);