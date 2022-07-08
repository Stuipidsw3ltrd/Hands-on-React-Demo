import React from "react";

interface Props {
  name: string;
  enthusiasmLevel?: number;
}

interface State {
  currentEnthusiasm: number;
}

class Hello extends React.Component<Props, State> {
  state = { currentEnthusiasm: this.props.enthusiasmLevel || 1 };
  
  onIncrement = () => {
    console.log("Increment-This" + this);
    this.updateCurrentEnthusiasm(1);
  }

  onDecrement = () => {
    this.updateCurrentEnthusiasm(-1);
    console.log("Decrement-This" + this);
  };

  render() {
    const { name } = this.props;
    return (
      <div className="Hello">
        <div className="greeting">
          Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
        </div>
        <div>
          <button onClick={this.onIncrement}>+</button>
          <button onClick={this.onDecrement}>-</button>
        </div>
      </div>
    );
  }
  updateCurrentEnthusiasm(change: number) {
    this.setState((currentState) => {
      return { currentEnthusiasm: currentState.currentEnthusiasm + change };
    });
  }
}

export default Hello;

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join("!");
}
