import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rotate from './Rotate';
import { Board, TextBoard } from './board';

function offset(k:number,dir="left",amount=1) {
  if(dir==="left"){
    return [["-",amount],k];
  }else {
    return [k,["-",amount]];
  }
}

function App() {
  let xPos:Array<string>=[];
  let yPos:Array<string>=[];
  const num=10;
  for(let i=0;i<num;i++){
    const x=Math.sin(i*2*Math.PI/num);
    const y=Math.cos(i*2*Math.PI/num);
    const xPercent=Math.round((x+1)/2*60+20);
    const yPercent=Math.round((y+1)/2*60+20);
    xPos.push(xPercent+"%");
    yPos.push(yPercent+"%");
    console.log(xPercent+"%",yPercent+"%");
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <TextBoard rows={[["Dec"], ["Nov","1","2","Jan"], ["Oct","3","4","5","6","7","Feb"], ["8","9","10","11","12","13"], ["Sep","14","15","16","17","18","Mar"], ["19","20","21","22","23","24"], ["Aug","25","26","27","28","29","Apr"], ["Jul","30","31","May"], ["Jun"]] } />
      {/* <Board rows={[1,1,2]}/> */}
      <Rotate top={xPos[0]} left={yPos[0]}><Board rows={[offset(1,"right"),1,2]}                    color="red"/></Rotate>
      <Rotate top={xPos[1]} left={yPos[1]}><Board rows={[offset(1,"right"),1,2]}                    color="blue"/></Rotate>
      <Rotate top={xPos[2]} left={yPos[2]}><Board rows={[4]}                                        color="green"/></Rotate>
      <Rotate top={xPos[3]} left={yPos[3]}><Board rows={[4]}                                        color="blue2"/></Rotate>
      <Rotate top={xPos[4]} left={yPos[4]}><Board rows={[1,2,1]}                                    color="purple"/></Rotate>
      <Rotate top={xPos[5]} left={yPos[5]}><Board rows={[3,2]}                                      color="magenta"/></Rotate>
      <Rotate top={xPos[6]} left={yPos[6]}><Board rows={[offset(1,"left",3),3]}                     color="orange"/></Rotate>
      <Rotate top={xPos[7]} left={yPos[7]}><Board rows={[1,offset(2,"left",2),1]}                   color="yellow"/></Rotate>
      <Rotate top={xPos[8]} left={yPos[8]}><Board rows={[[1,["-",1],1],2]}                          color="lime"/></Rotate>
      <Rotate top={xPos[9]} left={yPos[9]}><Board rows={[offset(1,"left",2),2,offset(1,"right",2)]} color="cyan"/></Rotate>
    </div>
  );
}

export default App;
