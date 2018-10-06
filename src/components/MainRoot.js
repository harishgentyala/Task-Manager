import PropTypes from "prop-types";
import React from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import List from "./List";

class MainRoot extends React.Component {
  constructor(props){
    super(props);
    this.addList = this.addList.bind(this);
    this.listTitleRef = React.createRef();
    this.state = {List : [{Items : [{
      readonly: true,
      title:"Title",
      description: "Description",
      id: "1Title"
    }],title:"Todo", isItemAdded: false, itemId: 1, listId:1}], id: 1};

  }

  addItem = (listId) => {
    this.setState(prevState => ({
      List: prevState.List.map((list) => {
        if(list.listId == listId)
          list.isItemAdded = !list.isItemAdded;
        return list;
      } )
    }));

  };

  updateItemsList = (listId, updatedList) => {

    this.setState(prevState => ({
      List: prevState.List.map((list) => {
        if(list.listId == listId)
           return Object.assign({}, list, updatedList);
        else
        return list;
      } )
    }));
  };

  addList = (e) => {
    let items = this.state.List.filter((list) => {
      return (list.title == this.listTitleRef.current.value)
    });
    if(this.listTitleRef.current.value && items.length == 0) {
      let newList = {
        Items: [],
        title: this.listTitleRef.current.value,
        isItemAdded: false,
        itemId: 0,
        listId: this.state.id + 1
      };

      this.setState({List: [newList, ...this.state.List], id: this.state.id + 1});
    }
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceMain = Object.assign({}, source);
    const destinationMain = Object.assign({}, destination);
    const sourceClone = Array.from(sourceMain.Items);
    const destClone = Array.from(destinationMain.Items);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    sourceMain.Items = sourceClone;
    destinationMain.Items = destClone;
    const updatedState = Object.assign({},this.state);
    updatedState.List[parseInt(droppableDestination.droppableId)-1] = sourceMain;
    updatedState.List[parseInt(droppableSource.droppableId)-1] = destinationMain;
    this.setState(updatedState);
//    updatedState.List[]
//    const result = {};
//    result[droppableSource.droppableId] = sourceMain;
//    result[droppableDestination.droppableId] = destinationMain;
//
//    return result;
  };


  getList = id => {
    for(let count=0;count<this.state.List.length;count++){
      if(this.state.List[count].listId == id){
        return this.state.List[count];
      }
    }
  };

  onDragEnd = result => {

    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
     // TODO: handle same area as drop
    } else {

      this.move(
        this.getList(parseInt(source.droppableId)),
        this.getList(parseInt(destination.droppableId)),
        source,
        destination
      );
    }
  };

  render() {
    return (
          <div style={{width: "100%"}}>
            <h1 style={{textAlign: "center"}}>Task Manager</h1>
        <input ref = {this.listTitleRef} />
        <button onClick={this.addList}>Add List</button>
        <div style={{width: "100%"}}>
          <table cellSpacing="25"><tbody><tr>
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.List.map((item, index) =>
                    <td valign="top" key={index}>
                      <div style={{border: "1px solid black",width: "240px",padding: "0px 20px",boxSizing: "border-box", paddingTop: "6px"}}>
                          <List
                            addItem = {this.addItem}
                            updateItemsList = {this.updateItemsList}
                            key={index} {...item}  >
                            </List>
                      </div>
                    </td>
          )
        }
            </DragDropContext>
            </tr>
          </tbody>
            </table>
        </div>
      </div>

    )
  }
}

export default MainRoot;
