import React, { Component } from "react";

import "./App.css";

import Display from "./components/Display";
import ResultDisplay from "./components/ResultDisplay";
import Button from "./components/Button";

class App extends Component {
  constructor() {
    super();
    this.operatorList = ["+", "-", "x", "/", "%", "."];

    this.state = {
      currentNumber: [],
      result: "",
      operations: []
    };
  }

  calculations = () => {
    let result = this.state.operations
      .join("")
      .replace(/%/g, "*0.01")
      .replace(/x/g, "*");

    if (result) {
      try {
        result = Math.round(10000 * eval(result)) / 10000;
        this.setState({ result: result });
      } catch (error) {
        this.setState({ result: "Math error" });
      }
    }
  };

  endsWithOperator = operator => {
    return this.operatorList.indexOf(operator) > -1;
  };

  endsWithDecimal = operator => {
    return this.operatorList.indexOf(operator) > -1;
  };

  handleOnClick = e => {
    const value = e.target.getAttribute("value");
    const { operations, currentNumber } = this.state;

    switch (value) {
      case "clear":
        this.setState({ result: "", operations: [], currentNumber: [] });
        break;
      case "equal":
        this.calculations();
        break;
      case "x":
      case "/":
      case "%":
      case "+":
      case "-":
        //check first item
        if (operations.length <= 0) break;

        //check double operator
        if (this.endsWithOperator(operations[operations.length - 1])) {
          operations.splice(operations.length - 1, 1, value);
        } else {
          operations.push(value);
        }

        this.setState({ operation: operations, currentNumber: [] });
        break;
      default:
        let decimalClickedFirstTime =
          currentNumber.length <= 0 && value === ".";
        let decimalClickedTwoTimes =
          value === "." && currentNumber.includes(".");
        if (decimalClickedTwoTimes) break;
        if (decimalClickedFirstTime) {
          currentNumber.push("0");
          operations.push("0");
        }

        currentNumber.push(value);
        operations.push(value);

        this.setState(
          { operations: operations, currentNumber: currentNumber },
          () => this.calculations()
        );
    }
  };
  render() {
    return (
      <div className="App">
        <Display data={this.state.operations} />
        <ResultDisplay result={this.state.result} />
        <div className="buttons">
          <Button onClick={this.handleOnClick} label="AC" value="clear" />
          <Button label="+-" value="negative" />
          <Button onClick={this.handleOnClick} label="%" value="%" />
          <Button onClick={this.handleOnClick} label="+" value="+" />

          <Button onClick={this.handleOnClick} label="1" value="1" />
          <Button onClick={this.handleOnClick} label="2" value="2" />
          <Button onClick={this.handleOnClick} label="3" value="3" />
          <Button onClick={this.handleOnClick} label="-" value="-" />

          <Button onClick={this.handleOnClick} label="4" value="4" />
          <Button onClick={this.handleOnClick} label="5" value="5" />
          <Button onClick={this.handleOnClick} label="6" value="6" />
          <Button onClick={this.handleOnClick} label="x" value="x" />

          <Button onClick={this.handleOnClick} label="7" value="7" />
          <Button onClick={this.handleOnClick} label="8" value="8" />
          <Button onClick={this.handleOnClick} label="9" value="9" />
          <Button onClick={this.handleOnClick} label="/" value="/" />

          <Button onClick={this.handleOnClick} label="0" value="0" />
          <Button onClick={this.handleOnClick} label="." value="." />
          <Button onClick={this.handleOnClick} label="=" value="equal" />
        </div>
      </div>
    );
  }
}

export default App;
