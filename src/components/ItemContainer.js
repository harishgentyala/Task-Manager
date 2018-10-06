import PropTypes from "prop-types";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

class ItemContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Draggable draggableId={this.props.data.id} index={this.props.index}>
        {(provided) => (
      <div>
        {this.props.children}
      </div>
        )}
      </Draggable>
    );
  }
}

export default ItemContainer;
