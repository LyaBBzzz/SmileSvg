//путб буквой г 
function createPathG(){
  const svg=d3.select('svg')
  const width=svg.attr('width')
  const height=svg.attr('height')
  let data=[]
  const padding=100;
  let posX=padding;
  let posY=height-padding;
  const h=5;
  while (posY>padding){
    data.push({x:posX, y:posY});
    posY -=5;
  }
  while (posX <width-padding){
    data.push({x:posX, y:posY})
    posX+=h;
  }
  return data;
}

//круговой путь
function createPathCircle(){
  const svg=d3.select('svg');
  const width=svg.attr('width');
  const height=svg.attr('height')
  let data=[];
  for(let t=Math.PI; t<=Math.PI*3; t+=0.1){
    data.push({
      x:width/2+width/3*Math.sin(t),
      y:height/2+height/3*Math.cos(t)
    })
  }
  return data
}

//исует путь в зависимости от типа
let drawPath =(typePath) => {
  const svg=d3.select('svg');
  const dataPoints = (typePath == 0)? createPathG() : createPathCircle(); //0 - г 1 - круг

  //генератор линии
  const line = d3.line()
    .x((d) => d.x)
    .y((d) => d.y);

    //элт путь
  const path = svg.append('path')
    .attr('d', line(dataPoints))
    //.attr('stroke', 'black')
    .attr('fill', 'none');

  return path;
}

//анимация
function translateAlong(path){
  const length = path.getTotalLength();
  return function (){
    return function (t){
      const  {x, y} = path.getPointAtLength(t*length);
      return `translate(${x},${y})`;
    }
  }
}
