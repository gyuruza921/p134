
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
        [3, 3, 0, 4, -1, -1], // 点2　点0,3,4と接する
        [-1, -1, 4, 0, 5, 3], // 点3　点2,4,5と接する
        [-1, -1, -1, 5, 0, 2], // 点4　点3,5と接する
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

    // 数字を描画する関数
    function drawNumber(x, y, num){

        // サブパスのリセット
        context0.beginPath();

        // スタイル指定
        context0.fillStyle = "rgb(0, 200, 0)";

        // 塗りつぶしの数字を描画


        // 塗りつぶしの実行
        context0.fill();        

    }

    // 路線図を描画する処理
    // 最も番号の若い点を左端に描画する
    function drawStartAndEndNode(graph){

        // 点のリスト
        const nodeList = [];
        // 
        for(let i = 0; i <= graph.length - 1; i ++){
            nodeList.push(i);
        }

        console.log(nodeList);


        // 基準の座標
        const point0 = {x: 20, y: 250};

        // 各点の座標のリスト
        const cordinateList = new Array(graph.length);
        cordinateList.fill(null);


        // グラフ内の各店の接点を探す
        for(let i = 0 ; i <= nodeList.length -1; i ++){

            const node = graph[i];

            console.log(node);

            // 各点とつながっている点を探し、隣接する点のリストを作成
            let neighberNodelist = [];
            for(let i = 0; i <= node.length - 1; i ++){
                if(node[i] > 0){
                    neighberNodelist.push(i)
                }

            }

            console.log("neighberNoderist",i, neighberNodelist);

            // 始点(i=0)の時
            if(i == 0){

                // 座標リストに登録
                cordinateList[0] = {x: point0.x, y: point0.y} 
                console.log("point0", point0.x, point0.y);

                // 次の接点の間隔を決める
                const spaceN = point0.y * 2 / (neighberNodelist.length + 2);
                console.log(spaceN);        

                // 始点に隣接する点を登録
                for(let i = 0; i <= neighberNodelist.length - 1; i ++){

                    // 描画する点の座標を決める(最初の点は150、次の点が300)
                    const pointN = {x: point0.x + 50 , y: spaceN / 2 + (i + 1) * spaceN}

                    console.log(`point${neighberNodelist[i]}`, pointN);

                    // 座標リストに登録
                    cordinateList[ neighberNodelist[i] ] = pointN;

                }

            }
            // 
            else {

                const point1 = cordinateList[i];

                console.log(`point${i}`, point1);

                if(point1 != null){

                    // 次の接点の間隔を決める
                    const spaceN = point1.y * 2 / (neighberNodelist.length + 2);
                    console.log(spaceN);        

                    // 始点に隣接する点を描画
                    for(let i = 0; i <= neighberNodelist.length - 1; i ++){

                        if(neighberNodelist[i] == null){
                            // 描画する点の座標を決める
                            const pointN = {x: point1.x + 50 , y: (i + 1) * spaceN}

                            console.log(`point${neighberNodelist[i]}`, pointN);

                            // 座標リストに登録
                            cordinateList[ neighberNodelist[i] ] = pointN;                        
                        }

                    }

                }

            }

        }

        console.log(cordinateList);
        // 
        for(let point of cordinateList){

            if(point != null){
                console.log(point);
                drawNode(point.x, point.y);                
            }

        }

    }

    // 動作確認
    drawStartAndEndNode(graph);



// 
// 操作部
// 
// ドキュメント部のスイッチ等を操作した時に対応した処理を実行する


