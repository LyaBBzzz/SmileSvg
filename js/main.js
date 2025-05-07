//элты управления
const animationCheckBox=document.getElementById('animationCheckBox')
const moveCheckBos=document.getElementById('moveCheckBox')
let chekBoxFlag=false
let checkBoxFlagSecond=false

document.addEventListener('DOMContentLoaded', ()=>{
  const width=600;
  const height=600;
  const svg=d3.select('svg')
    .attr("width", width)
    .attr("height", height);
})

//рисование смайлмка
let draw = (dataForm) =>{
  const svg=d3.select('svg')
  let pict = drawSmile(svg)
  pict.attr('transform', `translate(${dataForm.cx.value},
 ${dataForm.cy.value})
 scale(${dataForm.scaleX.value}, ${dataForm.scaleY.value}) rotate(${dataForm.angle.value})`);
}

//очистка свг
let clearImg = ()=>{
  const svg=d3.select('svg')
  svg.selectAll('*').remove()
}

//запуск анимации
let runAnimation=(dataForm) =>{
  const svg= d3.select('svg');
  let pict=drawSmile(svg);
  if(!checkBoxFlagSecond){
    //анимация с изменением параметров
  pict.attr('transform',
            `translate(${dataForm.cx.value}, ${dataForm.cy.value})
            rotate(${dataForm.angle.value})
            scale(${dataForm.scaleX.value}, ${dataForm.scaleY.value})`)
    .transition(svg)
    .duration(6000)
    .ease(eval('d3.ease'+dataForm.selectTypeAnimation.value))
    .attr('transform',
      `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value})
      rotate(${dataForm.angleTo.value})
      scale(${dataForm.scaleXTo.value}, ${dataForm.scaleYTo.value})`)
  } else {
    //перемещение по пути
    let path=drawPath(dataForm.selectTypeMove.value);
    pict.transition()
      .ease(eval('d3.ease'+dataForm.selectTypeAnimation.value))
      .duration(6000)
      .attrTween('transform', translateAlong(path.node()));
  }
}

//обработчик изменения чекбокса анимации
animationCheckBox.addEventListener('change', ()=>{
  chekBoxFlag = !chekBoxFlag
  if(chekBoxFlag){
    //кнопка анимации вкл
    document.getElementById('cordInputs').innerHTML=`
    Координаты рисунка<br>
    <label for="cx">x:</label>
    <input type="number" id="cx" value="300" max=600 min=0>до
    <input type="number" id="cx_finish" value="300" max=600 min=0><br>
    <label for="cy">y:</label>
    <input type="number" id="cy" value="300" max=600 min=0>до
    <input type="number" id="cy_finish" value="300" max=600 min=0>
    `
    document.getElementById('scaleInputs').innerHTML=`
    Масштаб<br>
    <label for="scaleX">по x:</label>
    <input type="number" id="scaleX" value="1" max=10 min=0.1>до
    <input type="number" id="scaleXTo" value="1" max=10 min=0.1><br>
    <label for="scaleY">по y:</label>
    <input type="number" id="scaleY" value="1" max=10 min=0.1>до
    <input type="number" id="scaleYTo" value="1" max=10 min=0.1><br>
    `
    document.getElementById('turnInputs').innerHTML=`
    Поворот<br>
    <label for="angle">угол:</label>
    <input type="number" id="angle" value="0" max=360 min=0>до<input type="number" id="angleTo" value="0" max=360 min=0>
    `
    document.getElementById('moveCheckBox').removeAttribute('disabled')
    document.getElementById('btnDraw').setAttribute('disabled', true)
    document.getElementById('btnAnimation').removeAttribute('disabled')
    document.getElementById('selectTypeAnimation').removeAttribute('disabled')

  } else{
    //кнопка анимаций выкл
    document.getElementById('cordInputs').innerHTML=`
    Координаты рисунка<br>
    <label for="cx">x:</label>
    <input type="number" id="cx" value="300" max=600 min=0><br>
    <label for="cy">y:</label>
    <input type="number" id="cy" value="300" max=600 min=0>
    `
    document.getElementById('scaleInputs').innerHTML=`
    Масштаб<br>
    <label for="scaleX">по x:</label>
    <input type="number" id="scaleX" value="1" max=10 min=0.1><br>
    <label for="scaleY">по y:</label>
    <input type="number" id="scaleY" value="1" max=10 min=0.1>
    `
    document.getElementById('turnInputs').innerHTML=`
    Поворот<br>
    <label for="angle">угол:</label>
    <input type="number" id="angle" value="0" max=360 min=0><br>
    `
    document.getElementById('moveCheckBox').setAttribute('disabled', true)
    document.getElementById('btnDraw').removeAttribute('disabled')
    document.getElementById('selectTypeAnimation').setAttribute('disabled', true)
    document.getElementById('btnAnimation').setAttribute('disabled', true)

  }
})

//обработчик изм чекбокса перемещения по пути
moveCheckBos.addEventListener('change', ()=>{
  checkBoxFlagSecond=!checkBoxFlagSecond
  if(checkBoxFlagSecond){
    //Кнопка анимации вкл

    document.getElementById('scaleInputs').innerHTML=``
    document.getElementById('turnInputs').innerHTML=``

  document.getElementById('cordInputs').innerHTML=`
    Пути перемещения<br>
    <select id="selectTypeMove">
        <option value=0>Буквой "Г"</option>
        <option value=1>По кругу</option>
    </select>
  `
  } else {
    //Кнопка анимаций выкл
    document.getElementById('cordInputs').innerHTML=`
    Координаты рисунка<br>
    <label for="cx">x:</label>
    <input type="number" id="cx" value="300" max=600 min=0>до
    <input type="number" id="cx_finish" value="300" max=600 min=0><br>
    <label for="cy">y:</label>
    <input type="number" id="cy" value="300" max=600 min=0>до
    <input type="number" id="cy_finish" value="300" max=600 min=0>
    `
    document.getElementById('scaleInputs').innerHTML=`
    Масштаб<br>
    <label for="scaleX">по x:</label>
    <input type="number" id="scaleX" value="1" max=10 min=0.1>до
    <input type="number" id="scaleXTo" value="1" max=10 min=0.1><br>
    <label for="scaleY">по y:</label>
    <input type="number" id="scaleY" value="1" max=10 min=0.1>до
    <input type="number" id="scaleYTo" value="1" max=10 min=0.1><br>
    `
    document.getElementById('turnInputs').innerHTML=`
    Поворот<br>
    <label for="angle">угол:</label>
    <input type="number" id="angle" value="0" max=360 min=0>до<input type="number" id="angleTo" value="0" max=360 min=0>
    `

  }
})



