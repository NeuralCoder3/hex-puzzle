import React from "react";
import "./board.css";

const r = 100;

const Hex = props => {
  const { A, B, text = "", side = "", ...divProps } = props;

  return (
    <div
      {...divProps}
      className={`hex ${side}`}
      style={{
        boxSizing: "border-box",
        height: "100px",
        width: "100px",
        ...props.style,
        position: "relative",
        borderRadius: "100%"
      }}
    >
      <div style={{
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "100px",
        background: "transparent",
          width: "100%",
          height: "100%",
          margin: "0 auto",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
      }}>
        {text}
      </div>
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: "rotate(90deg)"
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(150deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(210deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
    </div>
  );
};

export function TextBoard(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    board: props.rows
  });

  return (
    <div className="Board" style={{ marginTop: "35px" }}>
      <div>
        {state.board.map((row, rowIndex) => {
          return (
            <div
              style={{
                marginTop: "-14px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {row.map((content, cellIndex) => (
                <Hex
                  side={props.color}
                  text={content}
                  style={{ height: `${r}px`, width: `${r}px` }}
                  onClick={() =>
                    dispatch({
                      type: "put",
                      payload: { rowIndex, cellIndex }
                    })
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}






function createBoard(rows,color="white") {
  return rows.map(length => {
    if(length instanceof Array) {
      let arr=[];
      for (const l of length) {
        if(l instanceof Array) {
          arr=arr.concat(new Array(l[1]).fill(l[0].replace("-","invis")));
        } else {
          arr=arr.concat(new Array(l).fill(color));
        }
      }
      return arr;
    }else {
      return new Array(length).fill(color);
    }
  }
  );
}

function reducer(state, action) {
  return state;
}

export function Board(props) {
  const [state, dispatch] = React.useReducer(reducer, {
    board: createBoard(props.rows,props.color)
  });

  return (
    <div className="Board" style={{ marginTop: "35px" }}>
      <div>
        {state.board.map((row, rowIndex) => {
          return (
            <div
              style={{
                marginTop: "-14px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {row.map((side, cellIndex) => (
                <Hex
                  side={side}
                  style={{ height: `${r}px`, width: `${r}px` }}
                  onClick={() =>
                    dispatch({
                      type: "put",
                      payload: { rowIndex, cellIndex }
                    })
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
