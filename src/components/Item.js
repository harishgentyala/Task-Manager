import PropTypes from "prop-types";
import React from "react";
import {Draggable} from "react-beautiful-dnd";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEdit, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faTrashAlt, faEdit, faSave);

class Item extends React.Component {

  constructor(props){
    super(props);
    this.updateMode = this.updateMode.bind(this);
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  deleteItem = () => {
    this.props.deleteItem(this.props.data.id);
  };

  updateMode(){
    if(!this.titleRef.current)
       this.props.updateMode(this.props.data.title, this.props.data.description, this.props.data.id);
    else
       this.props.updateMode(this.titleRef.current.value, this.descriptionRef.current.value, this.props.data.id);
  }

  render() {
    return (
      <Draggable
        key={this.props.data.id}
        draggableId={this.props.data.id}
        index={this.props.index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{width: "200px", margin: "4px 0px", border: "2px solid #6f6b6b",boxShadow: "2px 2px #6f6b6b",padding: "8px",boxSizing: "border-box"}}>
        <span
          style={{textDecoration: "underline", display: "block", borderBottom: "1px solid black", marginBottom:"2px"}}>
          { this.props.data.readonly ?
            <h4 style={{width: "136px", float: "left", margin: "0px"}}>{this.props.data.title}</h4> :
            <input ref={this.titleRef} style={{width: "136px",border: "none"}} defaultValue={this.props.data.title}/>
          }
          <span onClick={this.deleteItem} style={{cursor:"pointer",margin:"0px 5px"}}><FontAwesomeIcon icon="trash-alt" /></span>
          <span onClick={this.updateMode} style={{cursor:"pointer"}}><FontAwesomeIcon icon={this.props.data.readonly ? "edit" : "save"} /></span>
        </span>
            <div style={{width: '200px',minHeight: "50px", clear: "both"}}>
              {
                this.props.data.readonly ?
                  <div
                    style={{width: "175px",height: "100%",overflow: "hidden",margin: "5px 0px"}}>{this.props.data.description}
                  </div> :
                  <textarea ref={this.descriptionRef}
                            style={{width: "175px",height: "140px",overflow: "hidden", margin: "5px 0px"}}
                            defaultValue={this.props.data.description}>
            </textarea>
              }
            </div>
          </div>
        )}
        </Draggable>

    );
  }
}

export default Item;
