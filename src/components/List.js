import PropTypes from "prop-types";
import React from "react";
import ItemContainer from "./ItemContainer";
import Item from "./Item";
import ItemAdd from "./ItemAdd";
import {Droppable} from "react-beautiful-dnd";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faPlusSquare);

class List extends React.Component {
  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.cancelItem = this.cancelItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    //this.state = {Items : [{
    //  readonly: true,
    //  title:"Title",
    //  description: "Description",
    //  id: 1
    //}], isItemAdded: false, itemId: 1, listId:1};
  }

  addItem(){
    this.props.addItem(this.props.listId);
//    this.setState({isItemAdded: !this.state.isItemAdded});
  }

  saveItem(data){
    let items = this.props.Items;
    data.id = this.props.itemId + 1 + this.props.title;
    items.push(data);
    this.props.updateItemsList(this.props.listId, {Items: items, isItemAdded: false,itemId: this.props.itemId+1});
    //Object.assign({}, this.props, {Items: items, isItemAdded: false,itemId: this.props.itemId+1});
    //this.setState({Items: items, isItemAdded: false,itemId: this.state.itemId+1});
  }

  cancelItem(){
    this.props.addItem(this.props.listId);
//    this.setState({isItemAdded: !this.state.isItemAdded});
  }

  deleteItem = (id) => {
    let Items = this.props.Items.filter((el) => {
      return el.id != id;
    } );
//    this.props.updateItemsList(this.props.listId, Items);
    this.props.updateItemsList(this.props.listId, {Items: Items, isItemAdded: false});

    //this.setState(prevState => ({
    //  Items: prevState.Items.filter((el) => {
    //    return el.id != id;
    //  } )
    //}));
  };

  updateMode = (title, desc, id) => {
    let updatedItems = this.props.Items.map((item, index) => {
      if(item.id == id){
        item.readonly = !item.readonly;
        item.title = title;
        item.description = desc;
      }
      return item;
    } );

    this.props.updateItemsList(this.props.listId, {Items: updatedItems, itemId: this.props.itemId+1});

  };

  render() {
    return (
      <Droppable droppableId={this.props.listId + ""}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={{minHeight: "50px"}}>
            <div style={{width: "200px", fontWeight: "bold"}}>
            {this.props.title}
            {this.props.isItemAdded ?
              <ItemAdd saveItem={this.saveItem} cancelItem={this.cancelItem}/> :
            <span onClick={this.addItem} style={{cursor:"pointer", float: "right"}}><FontAwesomeIcon icon="plus-square" /></span>
            }
              </div>
            {this.props.Items.map((item, index) =>
              <Item
                index={index}
                data={item}
                key={index}
                updateMode={this.updateMode}
                deleteItem={this.deleteItem}
                updateTitle={this.updateTitle}
                updateDescription={this.updateDescription}
              />)
            }
            {provided.placeholder}
          </div>

        )}
      </Droppable>
    )
  }
}

export default List;
