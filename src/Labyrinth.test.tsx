import React from "react";
import { render, fireEvent } from "@testing-library/react";


import { Labyrinth } from "./solution/Labyrinth";
import { Props } from "./solution/Labyrinth/types";
import { KEYS } from "./solution/Labyrinth/constants";

describe("Labyrinth", () => {
  let props: Props;
  beforeEach(() => {
    props = {
      targetPosition: [4, 4],
      availableCells: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1],
      ],
      startingPosition: [0, 0],
      moveLimit: 10,
      cellSize: 30,
    };
  });


  it("should board exist", () => {
    const { getByTestId } = render(
      <Labyrinth {...props} />
    );    
  
    let board = getByTestId("board");
    expect(board).toBeTruthy();
  });

  it("should ball exist", () => {
    const { getByTestId } = render(
      <Labyrinth {...props} />
    );    
  
    let ball = getByTestId("ball");
    expect(ball).toBeTruthy();
  });


  it("should have focus", () => {
    const { getByTestId } = render(
      <Labyrinth {...props} />
    );    
  
    let wrapper = getByTestId("wrapper");
    expect(wrapper).toHaveFocus();
  });

  it("should win", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );    
  
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT  });
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT  });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 2");
    expect(queryByTestId("win-message")).toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should lose", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} moveLimit={2} />
    );
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowRight", keyCode: KEYS.RIGHT });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 0");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).toBeTruthy();
  });

  it("test left corner", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowLeft", keyCode: KEYS.LEFT });
    fireEvent.keyDown(wrapper, { key: "ArrowLeft", keyCode: KEYS.LEFT });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 10");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("test top corner", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.UP });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.UP });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 10");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should move to board corner right until collision", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    fireEvent.keyDown(wrapper, { key: "ArrowUp", keyCode: KEYS.RIGHT });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 6");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should not be able to move to not available slot", () => {
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} />
    );
    let wrapper = getByTestId("wrapper");
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    fireEvent.keyDown(wrapper, { key: "ArrowDown", keyCode: KEYS.DOWN });
    expect(getByTestId("moves-message").textContent).toEqual("moves left 10");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).not.toBeTruthy();
  });

  it("should loose at start", () => {
    const availableCells = [
      [0, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ];
    const { getByTestId, queryByTestId } = render(
      <Labyrinth {...props} availableCells={availableCells}/>
    );
    expect(getByTestId("moves-message").textContent).toEqual("moves left 10");
    expect(queryByTestId("win-message")).not.toBeTruthy();
    expect(queryByTestId("lose-message")).toBeTruthy();
  });
});
