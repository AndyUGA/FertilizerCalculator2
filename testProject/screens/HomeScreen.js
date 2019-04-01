/**
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";
import { Container, Header, Content, Button, Text, Form, Item, Input, ListItem, CheckBox, Body, Icon, Picker } from "native-base";

import { rpd, calculateIndividualScore, supplied } from "./Helper.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    let allowUserInput = false;

    this.state = {
      checkBoxOptions: (
        <ListItem>
          <CheckBox onPress={() => this.setState(this.sortArray(), this.calcuateAcreValue(1000))} />
          <Body>
            <Text> 10 - 10 - 10</Text>
          </Body>
          <CheckBox onPress={() => this.setState(this.sortArray())} />
          <Body>
            <Text> 5 - 5 - 5</Text>
          </Body>
        </ListItem>
      ),
      checkBoxOptions2: (
        <ListItem>
          <CheckBox onPress={() => this.setState(this.sortArray())} />
          <Body>
            <Text> 0 - 10 - 10</Text>
          </Body>
          <CheckBox onPress={() => this.setState(this.sortArray())} />
          <Body>
            <Text> 15 - 0 - 15</Text>
          </Body>
        </ListItem>
      ),
      NPKLabel: [["N", "P", "K"]],
      inputData: [
        [
          <Item>
            <TextInput
              defaultValue="60"
              placeholder="Enter N value"
              onChangeText={inputtedValue => {
                this.changeDefaultValue(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              defaultValue="80"
              placeholder="Enter P value"
              onChangeText={inputtedValue => {
                //this.displayInputtedP(inputtedValue);
              }}
            />
          </Item>,
          <Item>
            <TextInput
              defaultValue="100"
              placeholder="Enter K value"
              onChangeText={inputtedValue => {
                //this.displayInputtedK(inputtedValue);
              }}
              onEndEditing={inputtedValue => {
                //this.calculateSD();
                //this.parseValue(this.state.defaultGrade);
                //this.calculatePerAcre(this.state.defaultAcre);
              }}
            />
          </Item>
        ]
      ],
      currentNValue: 60,
      currentPValue: 80,
      currentKValue: 100,
      foo: [
        [
          <TextInput
            defaultValue="0"
            placeholder="Enter value per acre"
            onChangeText={inputtedValue => {
              this.changeDefaultValue(inputtedValue);
            }}
          />
        ]
      ],
      caclulatedValue: [[0, 0, 0]],
      nutrientsSuppliedLabel: [["Nutrients supplied", "Nutrients surplus or deficit"]],
      gradeData: [["N", "P", "K", "N", "P", "K", "Score"], [1.38, 1.38, 1.38, 0.0, 0.46, 0.92, 87], [1.84, 1.84, 1.84, 0.46, 0.0, 0.46, 93]],
      widthArr: [160, 160],
      basicArray: [["A", 95, 3], ["B", 100, 1], ["C", 75, 2]],
      nValue: 0,
      pValue: 0,
      kValue: 0,
      defaultUnits: "Pounds - Square Feet"
    };
  }

  loadLoop() {
    let objs = [];

    for (let i = 0; i < 4; i++) {
      objs.push(i);
    }
    return objs;
  }

  sortArray() {
    let tempArray = this.state.gradeData.sort(function(a, b) {
      return b[6] - a[6];
    });
    this.setState({
      gradeData: tempArray
    });
  }

  switch() {
    this.setState({
      gradeData: this.state.testData
    });
  }

  changeDefaultValue(inputtedValue) {
    this.setState({
      defaultNValue: inputtedValue
    });
  }

  calcuateAcreValue(value) {
    let num1 = 43560 / +value;
    let nValue = (this.state.currentNValue / num1).toFixed(2);
    let pValue = (this.state.currentPValue / num1).toFixed(2);
    let kValue = (this.state.currentKValue / num1).toFixed(2);

    this.setState({
      nValue: nValue,
      pValue: pValue,
      kValue: kValue,
      caclulatedValue: [[nValue, pValue, kValue]]
    });
  }

  getUserInput() {}

  render() {
    const state = this.state;

    //const sd1 = [[state.basicArray[0][1]], [state.basicArray[1][1]], [state.basicArray[2][1]]];

    return (
      <Container>
        <Content>
          {state.checkBoxOptions}
          {state.checkBoxOptions2}

          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Rows data={state.NPKLabel} textStyle={styles.text} />
            <Rows data={state.inputData} textStyle={styles.text} />
            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={state.defaultUnits}
                placeholder={state.defaultUnits}
                onValueChange={value => {
                  this.setState({ defaultUnits: value }, () => {});
                }}
              >
                <Picker.Item label="Pounds - Square Feet" value="Pounds - Square Feet" />
                <Picker.Item label="Pounds - Acre" value="Pounds - Acre" />
                <Picker.Item label="Ounces - Square Feet" value="Ounces - Square Feet" />
                <Picker.Item label="Ounces - Acre" value="Ounces - Acre" />
              </Picker>
            </Form>
            <Rows data={state.foo} textStyle={styles.text} />
            <Rows data={state.caclulatedValue} textStyle={styles.text} />
            <Rows data={state.nutrientsSuppliedLabel} widthArr={state.widthArr} textStyle={styles.text} />
            <Rows data={state.gradeData} textStyle={styles.text} />
          </Table>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center" },
  red: { color: "red" },
  blue: { color: "blue" },
  green: { color: "green" }
});
