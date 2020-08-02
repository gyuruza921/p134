
"use strict"

// 
// DOM構成部
//

    // body要素の取得
    const BODY = document.getElementById("body");

    // canvas要素の作成
    const canvas0 = document.createElement("canvas");
    canvas0.id = "canvas0";
    canvas0.height = 500;
    canvas0.width = 500;

    // 要素のドキュメントへの追加
    BODY.appendChild(canvas0);

// 
// 入力部
// 

    // グラフのデータ
    const graph = [

        [0, 2, 3, -1, -1, -1], // 点0 点1,2と接する
        [2, 0, 3, -1, -1, -1], // 点1　点0,2と接する
        [-1, 3, 0, 4, -1, -1], // 点2　点3,4と接する
        [-1, -1, 4, 0, 5, 3], // 点3　点2,4,5と接する
        [-1, -1, -1, 5, 0, 2], // 点4　点3,4,5と接する
        [-1, -1, -1, 3, 2, 0], // 点5　再右端　点3,4と接する

    ]


// 
// 処理部
// 
// 入力部のデータを処理し、表示部で扱える状態にする。


// 
// 表示部
// 

    // canvas0のコンテキストを取得
    const context0 = canvas0.getContext("2d");
    
    // 点を描画する関数
    function drawNode(x, y){

        // サブパスのリセット
        context0.beginPath();    
        // 塗りつぶしのスタイル指定
        context0.fillStyle = "rgb(0, 200, 0)";

        // 塗りつぶしの円を描画
        context0.arc(x, y, 5, 0 / 180 * Math.PI, 360 / 180 * Math.PI);

        // 塗りつぶしの実行
        context0.fill();

    }



// 
// 操作部
// 
// ドキュメント部のスイッチ等を操作した時に対応した処理を実行する


