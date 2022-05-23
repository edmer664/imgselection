var selections = [];


function showCoords(c) {
  alert("x=" + c.x + " y=" + c.y + " x2=" + c.x2 + " y2=" + c.y2);
}

let jcrop = Jcrop.attach("target");

let selection = [];

jcrop.listen("crop.change", (widget, e) => {
  selection =[ widget.pos.x, widget.pos.y, widget.pos.x2, widget.pos.y2 ];
  console.log(selection);
});

// clear jcrop selection
function clearSelection(){
  selection
  jcrop.destroy();
  jcrop = Jcrop.attach("target");
  jcrop.listen("crop.change", (widget, e) => {
    selection =[ widget.pos.x, widget.pos.y, widget.pos.x2, widget.pos.y2 ];
    console.log(selection);
  });
};

function addSelection(){
  // variable Initialization
  const link_input = document.getElementById("link_input");

  // validation
  if(selection.length == 0){
    alert("Please select an area first");
    return;
  }
  if(link_input.value == ""){
    alert("Please enter a link");
    return;
  }


  let coords = {
    x: selection[0],
    y: selection[1],
    x2: selection[2],
    y2: selection[3],
    link: link_input.value,
  }
  link_input.value = "";

  selections.push(coords);

  // clear jcrop selection
  clearSelection();

  // update links
  displaySelections();
}

function displaySelections(){
  const div = document.getElementById("temp_links");
  div.innerHTML = "";
  for(let i = 0; i < selections.length; i++){
    const link = document.createElement("a");
    link.setAttribute("href", selections[i].link);
    link.innerHTML = selections[i].link;
    div.appendChild(link);
    div.appendChild(document.createElement("br"));
  }
}


function generate(){

  const div = document.getElementById("output");
  div.innerHTML = `
  <image src="./assets/magazine.jpg" class="img-fluid"  usemap="#links">
    `;
  
  const map = document.getElementById("linkmap");
  for(let i = 0; i < selections.length; i++){
    const link = document.createElement("area");
    link.setAttribute("shape", "rect");
    link.setAttribute("coords", `${selections[i].x},${selections[i].y},${selections[i].x2},${selections[i].y2}`);
    link.setAttribute("href", selections[i].link);
    map.appendChild(link);
  }


}