//タイトル文字
const answer = document.querySelector('#answer');
//タイトルカラーコード
let answerColorCode = '#';
//解答エリア
const colorArea = document.querySelector('#colorArea');
//カラーコードランダム用
const colorCodeNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
//ランダムカラーコード
let randomColorCode = '#';
//難易度
let dificulty = Number(window.location.search.slice(1));
//ハート
const hearts = document.querySelectorAll('.fa-heart');
//解答回数
let count = hearts.length;
//正解
const win = document.querySelector('#win');
//失敗
const lose = document.querySelector('#lose');
let url =window.location.href.substr(0, window.location.href.indexOf('?'))



window.addEventListener('load' , () => {
    //リンクのクエリが10以下か存在しない場合クエリ作成
    if(dificulty < 10 || dificulty == null){
        dificulty = 10 ;
        url += '?11';
    }
    //正解の問題数
    const random = Math.floor(Math.random() * dificulty);
    //クエリの数分問題作成
    for(let i = 0 ; i < dificulty ; i++){
        randomColorCode = '#';
        //一つづつカラーコード作成
        for(let i = 0 ; i < 6 ; i++){
            randomColorCode += colorCodeNum[Math.floor(Math.random() * 16)];
        }
        //正解の問題の時タイトルのテキスト変更
        if(i == random){
            answer.innerText = randomColorCode;
            answerColorCode = randomColorCode;
        }
        //問題作成
        const color = document.createElement("span");
        color.className = "color";
        color.style.backgroundColor =randomColorCode;
        colorArea.appendChild(color);
    }



    //解答時
    const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click' , () => {
            //リザルト画面が無いかつ存在する物を選択時
            if(win.style.display == lose.style.display && color.style.opacity != "0"){
                //選んだ色(rgba)
                let selectColor = color.style.backgroundColor;
                //HEX変換
                selectColor = '#' + toHexColor(selectColor);
                //正解の場合
                if(selectColor == answerColorCode){
                    selectColor = toHexColor(color.style.backgroundColor);
                    resultanimate(win);
                    opacityAnimation(colors);
                //不正解の場合
                }else{
                    selectColor = toHexColor(color.style.backgroundColor);
                    count--;
                    color.style.opacity = '0';
                    if(count < 0){
                        resultanimate(lose);
                        opacityAnimation(colors);
                    }else{
                        hearts[count].style.color ='#707070';
                    }
                }
            }
        })
    })
})



//HEX変換
function toHexColor(c){
    c = c.replace(/[rgb(|)]/g,"");
    c = c.split(", ");
    hex = toHex(c[0]) + toHex(c[1]) + toHex(c[2]);
    hex = hex.toUpperCase();
    return hex;
  }
//16進変換
function toHex(n) {
    var x = Number(n).toString(16);
    return n.length == 1 ? "0" + x : x;
}



//リザルト画面アニメーション
function resultanimate(resurt) {
    resurt.style.display = 'block';
    resurt.animate(
        {opacity: ['1']},
        {duration: 1000,easing: 'ease',fill: 'forwards'}
    )
}



//不要問題消去
function opacityAnimation(colors){
    colors.forEach(color => {
        if(selectColor != answerColorCode){
            color.style.opacity = '0';
        }
    })
}



//勝利ボタン押下時
win.addEventListener('click' , (e) => {
    e.preventDefault();
    var TransitionDelay = function(){
        if(dificulty < 10 || dificulty == null){
            window.location.href = url + '?11';
        }
        window.location.href = window.location.href.substr(0, window.location.href.indexOf('?')) + '?' + (dificulty+1);
    }
    setTimeout ( TransitionDelay, 0 );
})



//敗北ボタン押下時
lose.addEventListener('click' , (e) => {
    e.preventDefault();
    var TransitionDelay = function(){
        window.location.href = window.location.href.substr(0, window.location.href.indexOf('?')) + '?10';
    }
    setTimeout ( TransitionDelay, 0 );
})
