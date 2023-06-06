var arrScore = new Array();
var symbol;
var turn = 0;
var raw = 0;
function GenerateGame(){
    GenerateField();
    GeneratePlayers();
    arrScore = Array.from((Array(parseInt(document.getElementById('rowNumb').value))), () => new Array(parseInt(document.getElementById('rowNumb').value)));
}

function GeneratePlayers(){
    const symbols = document.getElementById('players').value;
    symbol = symbols.split(',');
}
function GenerateField(){
    raw = document.getElementById('rowNumb').value;
    var html = "";
    for(var i = 0;i<raw;i++){
        for(var j=0;j<raw;j++){
            var field = "<button id='"+i+"a"+j+"'class='field' onclick='Turn(\""+i+"a"+j+"\");Win(\""+i+"a"+j+"\")'></button>";
            if(i!=0 && i!=raw-1){
                field = MiddleGridStyle(i,j,raw);
            }
            else if(raw-1==j){
                field = LastGridStyle(i,j);
            }
            html+= field;
        }
        html +="<br/>";
    }
    document.getElementById('grid').innerHTML=html;
}
function LastGridStyle(i,j){
    return "<button id='"+i+"a"+j+"' class='field' onclick='Turn(\""+i+"a"+j+"\");Win(\""+i+"a"+j+"\")' style='border-right:none; border-left: 1px black solid;'></button>";
}
function MiddleGridStyle(i,j,raw){
    if(j==0||j==raw-1){
        return "<button id='"+i+"a"+j+"' onclick='Turn(\""+i+"a"+j+"\");Win(\""+i+"a"+j+"\")' class='field' style='border-top: 2px black solid; border-bottom: 2px black solid; border-right:none;'></button>";
    }
    else{
        return "<button id='"+i+"a"+j+"' onclick='Turn(\""+i+"a"+j+"\");Win(\""+i+"a"+j+"\")' class='field' style='border:2px black solid;'></button>";
    }
}
function Turn(sender){
    var validation = 1
    if(turn >symbol.length-1){
        turn = 0;
    }
    if(document.getElementById(sender).textContent == ""){
       validation = 2;
    }
    if(validation == 2){
    document.getElementById(sender).textContent = symbol[turn];
    turn+=1;
    }
}
function Win(sender){
    var win = document.getElementById(sender).textContent+document.getElementById(sender).textContent+document.getElementById(sender).textContent+"";
    var checkString = "";
    var checkCol= "";
    arrScore[sender[0]][sender[2]] = document.getElementById(sender).textContent;
    for(var i = 0;i<raw;i++){
        for(var j = 0 ;j<raw;j++){
            if(arrScore[i][j]!=undefined){
                checkString+=arrScore[i][j];
            }
            else{
                checkString+= " ";
            }
            if(arrScore[j][i]!=undefined){
                checkCol += arrScore[0+j][i];
            }
            else{
                checkCol+=" ";
            }
            if(checkString.slice(0+raw*i,raw+raw*i).includes(win)){
                alert("wygrał "+document.getElementById(sender).textContent);
                GenerateGame();
                return 0;
            }
            else if(checkCol.includes(win)){
                alert("wygrał "+document.getElementById(sender).textContent);
                GenerateGame();
                return 0;
            }
            else{

            }
        }
    }
}