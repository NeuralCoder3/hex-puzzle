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
    const x=Math.sin(i*1.5*Math.PI/num+1.4*Math.PI);
    const y=Math.cos(i*1.5*Math.PI/num+1.4*Math.PI);
    const xPercent=Math.round((x+1)/2*60+20);
    const yPercent=Math.round((y+1)/2*70);
    xPos.push(xPercent+"%");
    yPos.push(yPercent+"%");
    console.log(xPercent+"%",yPercent+"%");
  }

  return (
    <div className="App">
      <TextBoard rows={[["Dec"], ["Nov","1","2","Jan"], ["Oct","3","4","5","6","7","Feb"], ["8","9","10","11","12","13"], ["Sep","14","15","16","17","18","Mar"], ["19","20","21","22","23","24"], ["Aug","25","26","27","28","29","Apr"], ["Jul","30","31","May"], ["Jun"]] } />
      <Rotate top={yPos[0]} left={xPos[0]}><Board rows={[offset(1,"right"),1,2]}                     color="red"/></Rotate>
      <Rotate top={yPos[1]} left={xPos[1]}><Board rows={[offset(1,"right"),1,2]}                     color="blue"/></Rotate>
      <Rotate top={yPos[2]} left={xPos[2]}><Board rows={[4]}                                         color="green"/></Rotate>
      <Rotate top={yPos[3]} left={xPos[3]}><Board rows={[4]}                                         color="blue2"/></Rotate>
      <Rotate top={yPos[4]} left={xPos[4]}><Board rows={[1,2,1]}                                     color="purple"/></Rotate>
      <Rotate top={yPos[5]} left={xPos[5]}><Board rows={[3,2]}                                       color="magenta"/></Rotate>
      <Rotate top={yPos[6]} left={xPos[6]}><Board rows={[offset(1,"left",3),3]}                      color="orange"/></Rotate>
      <Rotate top={yPos[7]} left={xPos[7]}><Board rows={[offset(1,"right",2),2,offset(1,"right",2)]} color="yellow"/></Rotate>
      <Rotate top={yPos[8]} left={xPos[8]}><Board rows={[[1,["-",1],1],2]}                           color="lime"/></Rotate>
      <Rotate top={yPos[9]} left={xPos[9]}><Board rows={[offset(1,"left",2),2,offset(1,"right",2)]}  color="cyan"/></Rotate>
    </div>
  );
}

export default App;
