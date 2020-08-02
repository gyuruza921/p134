
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


// 
// 処理部
// 


// 
// 表示部
// 

    // canvas0のコンテキストを取得
    const context0 = canvas0.getContext("2d");

    // 点を描画
        // 
        context0.fillStyle = "rgb(0, 250, 0)";
        // 
        context0.beginPath();
        context0.fillRect(200, 200, 50, 50);
        context0.fill();


// 
// 操作部
// 


