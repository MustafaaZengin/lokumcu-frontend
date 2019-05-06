import React, { Component } from "react";

const UserContext = React.createContext();
//Provider,Consumer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
};

export class UserProvider extends Component {
  state = {
    users: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          {this.props.children}
        </UserContext.Provider>
      </div>
    );
  }
}
const UserConsumer = UserContext.Consumer;
export default UserConsumer;
