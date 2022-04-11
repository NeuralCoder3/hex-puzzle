import { request } from "https";
import * as React from "react";
import Moveable from "react-moveable";
import useId from 'react-use-uuid';

export default function Rotate(props: { children: React.ReactNode, top: string, left: string }) {
  const [target, setTarget] = React.useState<HTMLElement>();
  const [frame, setFrame] = React.useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: "50% 50%"
  });
  const id=useId();
  let moveable;
  React.useEffect(() => {
    setTarget(document.getElementById(id)! as HTMLElement);
  }, []);
  return (
    <div className="container">
      <div className="target" id={id} style={{"left":props.left,"top":props.top}}>{props.children}</div>
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
        onRotateEnd={(e) => {
            let angle=frame.rotate;
            angle=60*Math.round(angle/60);
            frame.rotate = angle;

            const { translate, rotate, transformOrigin } = frame;
            e.target.style.transformOrigin = transformOrigin;
            e.target.style.transform =
                `translate(${translate[0]}px, ${translate[1]}px)` +
                ` rotate(${rotate}deg)`;
        }}
        onRotateStart={(e) => {
          e.set(frame.rotate);
        }}
        onRotate={(e) => {
          frame.rotate = e.beforeRotate;
        }}
        onRender={(e) => {
          const { translate, rotate, transformOrigin } = frame;
          e.target.style.transformOrigin = transformOrigin;
          e.target.style.transform =
            `translate(${translate[0]}px, ${translate[1]}px)` +
            ` rotate(${rotate}deg)`;
        }}
      />
    </div>
  );
}
