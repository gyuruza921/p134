
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

        [0, 2, 3, -1, -1, -1], // 点0 2,3 
        [2, 0, 4, -1, -1, -1],
        [3, 3, 0, 4, -1, -1],
        [-1, -1, 4, 0, 5, 3],
        [-1, -1, -1, 5, 0, 2],
        [-1, -1, -1, 3, 2, 0],

    ]


// 
// 処理部
// 
// 入力部のデータを表示部で扱うために処理する


// 
// 表示部
// 

    // canvas0のコンテキストを取得
    const context0 = canvas0.getContext("2d");

    // 点を描画
        // サブパスのリセット
        context0.beginPath();    
        // 塗りつぶしのスタイル指定
        context0.fillStyle = "rgb(0, 200, 0)";

        // 塗りつぶしの四角を描画
        context0.fillRect(200, 200, 50, 50);

        // 塗りつぶしの円を描画
        context0.arc(100, 100, 15, 0 / 180 * Math.PI, 360 / 180 * Math.PI);

        // 塗りつぶしの実行
        context0.fill();


// 
// 操作部
// 


