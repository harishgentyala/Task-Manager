import PropTypes from "prop-types";
import React from "react";


class Item extends React.Component {
  constructor(props){
    super(props);
    this.updateValue = this.updateValue.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.cancelItem = this.cancelItem.bind(this);
    this.state = {
      readonly: true,
      title:"Title",
      description: "Description"
    };
  }

  updateValue(){
    this.setState({readonly: !this.state.readonly});
  }

  updateDescription(e){
    this.setState({description: e.target.value});
  }

  updateTitle(e){
    this.setState({title: e.target.value});
  }

  saveItem(){
    this.props.saveItem(this.state);
  }

  cancelItem(){
    this.props.cancelItem();
  }

  render() {
    return (
      <div style={{width: "200px",border: "2px solid #6f6b6b",boxShadow: "2px 2px #6f6b6b",padding: "8px",boxSizing: "border-box", marginTop:"10px"}}>
        <span style={{textDecoration: "underline", display: "block"}}>
            <input style={{width: "176px", border: "none", borderBottom: "1px solid black"}} value={this.state.title}  onChange={this.updateTitle}/>
        </span>
        <div style={{width: '200px',height: "150px", clear: "both"}}>
              <textarea style={{width: "175px",height: "140px",overflow: "hidden", margin: "5px 0px"}} value={this.state.description} onChange={this.updateDescription}>
            </textarea>
        </div>
        <div style={{marginTop: "5px"}}>
        <button onClick = {this.saveItem} style={{margin: "0px 2px"}}>Save</button>
        <button onClick = {this.cancelItem} style={{margin: "0px 2px"}}>Cancel</button>
          </div>
      </div>
    );
  }
}

export default Item;
