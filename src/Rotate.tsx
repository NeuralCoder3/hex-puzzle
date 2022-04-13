import { request } from "https";
import * as React from "react";
import Moveable from "react-moveable";
import useId from 'react-use-uuid';

let guid = 0;

function getObjectFromLocalstorage(key, default_value){
  var value = localStorage.getItem(key);
  if (value === null){
    return default_value;
  }
  // console.log("Loaded value:", value, "for key:", key);
  return JSON.parse(value);
}

export default function Rotate(props: { children: React.ReactNode, top: string, left: string }) {
  const id="rotateTarget"+(guid++);
  const storageId="state_"+id;
  const [target, setTarget] = React.useState<HTMLElement>();
  const [frame, setFrame] = React.useState(
    {
    translate: [0,0],
    rotate: 0,
    transformOrigin: "50% 50%"
  });
  let moveable;
  React.useEffect(() => {
    setTarget(document.getElementById(id)! as HTMLElement);
  }, []);
  let refresh=function(e) {
    const { translate, rotate, transformOrigin } = frame;
    e.target.style.transformOrigin = transformOrigin;
    e.target.style.transform =
        `translate(${translate[0]}px, ${translate[1]}px)` +
        ` rotate(${rotate}deg)`;
    window.localStorage.setItem(storageId,JSON.stringify(frame));
    // console.log("Stored: "+JSON.stringify(frame));
  };
  let snap=function(v, s) {
    return Math.round(v / s) * s;
  }
  const frameAlt=getObjectFromLocalstorage(storageId,frame);
  frame.translate=frameAlt.translate;
  frame.rotate=frameAlt.rotate;
  frame.transformOrigin=frameAlt.transformOrigin;
  // console.log("translate: "+frame.translate);
  return (
    <div className="container">
      <div className="target" id={id} style={{
        "left":props.left,
        "top":props.top,
        "transform":`translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`,
    }}>{props.children}</div>
      <Moveable
        ref={ref => moveable=ref}
        target={target}
        originDraggable={false}
        originRelative={false}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={"top"}
        onDragOriginStart={(e) => {
          e.dragStart && e.dragStart.set(frame.translate);
        }}
        onDragOrigin={(e) => {
          frame.translate = e.drag.beforeTranslate;
          frame.transformOrigin = e.transformOrigin;
        }}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          frame.translate = e.beforeTranslate;
        }}
        onDragEnd={(e) => {
          // frame.translate[0]=snap(frame.translate[0],5);
          // frame.translate[1]=snap(frame.translate[1],5);
          refresh(e);
        }}
        onRotateEnd={(e) => {
          frame.rotate=snap(frame.rotate,60);
          refresh(e);
        }}
        onRotateStart={(e) => {
          e.set(frame.rotate);
        }}
        onRotate={(e) => {
          frame.rotate = e.beforeRotate;
        }}
        onRender={(e) => {
          refresh(e);
        }}
      />
    </div>
  );
}
