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
    for(var i = 0; i < raw; i++){
        for(var j = 0;j < raw; j++){
            var field = "<button id='"+i+"a"+j+"'class='field' onclick='Turn(\""+i+"a"+j+"\");Results(\""+i+"a"+j+"\")'></button>";
            if(i != 0 && i != raw - 1){
                field = MiddleGridStyle(i,j,raw);
            }
            else if(raw - 1 == j){
                field = LastGridStyle(i,j);
            }
            html += field;
        }
        html += "<br/>";
    }
    document.getElementById('grid').innerHTML=html;
}
function LastGridStyle(i,j){
    return "<button id='"+i+"a"+j+"' class='field' onclick='Turn(\""+i+"a"+j+"\");Results(\""+i+"a"+j+"\")' style='border-right:none; border-left: 1px black solid;'></button>";
}
function MiddleGridStyle(i,j,raw){
    if(j == 0 || j == raw - 1){
        return "<button id='"+i+"a"+j+"' onclick='Turn(\""+i+"a"+j+"\");Results(\""+i+"a"+j+"\")' class='field' style='border-top: 2px black solid; border-bottom: 2px black solid; border-right:none;'></button>";
    }
    else{
        return "<button id='"+i+"a"+j+"' onclick='Turn(\""+i+"a"+j+"\");Results(\""+i+"a"+j+"\")' class='field' style='border:2px black solid;'></button>";
    }
}
function Turn(sender){
    var validation = 1
    if(turn > symbol.length - 1){
        turn = 0;
    }
    if(document.getElementById(sender).textContent == ""){
       validation = 2;
    }
    if(validation == 2){
    document.getElementById(sender).textContent = symbol[turn];
    turn += 1;
    }
}

//#region Check win functions

function CheckRaw(checkedString,arrScore){
    var checkRaw = "";
    for(var i = 0; i < raw; i++){
        for(var j = 0;j < raw; j++){
            if(arrScore[i][j] != undefined){
                checkRaw += arrScore[i][j];
            }
            else{
                checkRaw += " ";
            }
            if(checkRaw.slice(0 + raw * i, raw + raw * i).includes(checkedString)){
                return true;
            }
        }
    }
}

function CheckColumn(win,arrScore){
    var checkCol= "";
    for(var i = 0;i < raw; i++){
        for(var j = 0 ;j < raw; j++){
            if(arrScore[j][i] != undefined){
                checkCol += arrScore[0+j][i];
            }
            else{
                checkCol += " ";
            }
            if(checkCol.includes(win)){
                return true;
            }
        }
          checkCol +=  " "; 
    }
}

function CheckRightDiagonal(checkDiag){
    for(var i = 0; i < checkDiag.length; i++){
        if(checkDiag[i + 1 + raw * 1] == undefined || checkDiag[2 * raw + 2 + i] == undefined || checkDiag[i] == "_" ){
            continue;
        }
        else if(checkDiag[i] == checkDiag[1 * raw + 1 + i] && checkDiag[i] == checkDiag[2 * raw + 2 + i]){
            return true;
        }
    }
}

function CheckLeftDiagonal(checkDiag){
    for(var i = 0; i < checkDiag.length; i++){
        if(checkDiag[i + 1 * raw - 1] == undefined || checkDiag[i + 2 * raw - 2] == undefined || checkDiag[i] == "_"){
            continue;
        }
        if(checkDiag[i] == checkDiag[i + 1 * raw - 1] && checkDiag[i] == checkDiag[i + 2 * raw - 2]){
            return true;
        }
    }
}

function CheckDiagonals(win,arrScore){
    var checkDiag= "";
    for(var i = 0;i < raw; i++){
        for(var j = 0 ;j < raw; j++){
            if(arrScore[i][j] != undefined){
                checkDiag += arrScore[i][j];
            }
            else{
                checkDiag += "_";
            }
        }
    }
    if(CheckRightDiagonal(checkDiag) || CheckLeftDiagonal(checkDiag)){
        return true;
    }
}

function CheckWin(sender){
    var winString = document.getElementById(sender).textContent + document.getElementById(sender).textContent + document.getElementById(sender).textContent + "";
    arrScore[sender[0]][sender[2]] = document.getElementById(sender).textContent;
    if(CheckColumn(winString,arrScore) || CheckRaw(winString,arrScore) || CheckDiagonals(winString,arrScore)){
        return true;
    }
    else{
        return false;
    }
}

function CheckTie(){
    for(var i = 0;i < raw; i++){
        for(var j = 0 ;j < raw; j++){
            if(arrScore[i][j] == undefined){
                return false;
            }
            else{
                continue;
            }
        }
    }
    return true;
}
//#endregion

//#region result methods

function Tie(){
    alert("Remis!");
}

function Win(sender){
    alert("Wygrał " + document.getElementById(sender).textContent);
}

function Results(sender){
    if(CheckWin(sender)){
        Win(sender);
        GenerateGame();
    }
    else if(CheckTie()){
        Tie();
        GenerateGame();
    }
}
//#endregion