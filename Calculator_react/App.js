import Style from './src/Style';
import InputButton from './src/InputButton';

const inputButtons = [
  ["CE", "C"],
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

import React, {
  Component
 } from 'react';
 import {
 View,
 Text,
 AppRegistry
 } from 'react-native';
 class ReactCalculator extends Component {
   render() {
       return (
        
        <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
 );
 }

 constructor(props) {
  super(props);
  
  this.state = {
    previousInputValue: 0,
    inputValue: 0,
    selectedSymbol: null,
    point: false,
    previousPoint : 0
  }
}
 
  _renderInputButtons() {
        let views = [];

        for (var r = 0; r < inputButtons.length; r ++) {
            let row = inputButtons[r];

            let inputRow = [];
            for (var i = 0; i < row.length; i ++) {
                let input = row[i];

                inputRow.push(
                  <InputButton
                      value={input}
                      onPress={this._onInputButtonPressed.bind(this, input)}
                      key={r + "-" + i}/>
              );
            }

            views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
        }

        return views;
    }

    _onInputButtonPressed(input) {
      switch (typeof input) {
          case 'number':
              return this._handleNumberInput(input)
          case 'string':
            if(input != "."){
              return this._handleStringInput(input)
            }else{
                return this._handlePointInput()
            }    
      }
  }

  _handleNumberInput(num) {
    if(typeof this.state.inputValue == 'string' ){
      this.state.inputValue = 0;
      inputValue = (this.state.inputValue * 10) + num;
    }
    if(this.state.point == true) {
      let x = this.state.previousPoint + 1 ;
      let dividande = Math.pow(10, x);
      var inputValue = (num/dividande) + this.state.inputValue ;
      this.state.previousPoint += 1;
    }else{
      inputValue = (this.state.inputValue * 10) + num;
    }
    this.setState({
        inputValue: inputValue
    })
}
_handlePointInput(){
  this.state.point = true;
}
_handleStringInput(str) {
  this.state.point = false;
  this.state.previousPoint = 0;
  switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
          this.setState({
              selectedSymbol: str,
              previousInputValue: this.state.inputValue,
              inputValue: 0
          });
          break;

          case '=':
            let symbol = this.state.selectedSymbol,
                inputValue = this.state.inputValue,
                previousInputValue = this.state.previousInputValue;

            if (!symbol) {
                return;
            }else if(symbol == '/' && inputValue == 0){
              this.setState({
                previousInputValue: 0,
                inputValue: "Alexandre ?",
                selectedSymbol: null
            });
            break;
            }else{
              this.setState({
                previousInputValue: 0,
                inputValue: eval(previousInputValue + symbol + inputValue),
                selectedSymbol: null
            });
            }
          
            break;

            case 'CE': 
                        inputValue = 0;
                        this.state.previousInputValue = 0;
                        this.setState({
                          inputValue: inputValue
                        }) 
                  case 'C':
                    inputValue = 0;
                    this.setState({
                      inputValue: inputValue
                    })
    }
  }
}

 
 export default ReactCalculator