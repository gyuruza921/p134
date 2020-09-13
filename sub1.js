"use strict"

// 
// 表示部
// 

    // canvas0のコンテキストを取得
    const context0 = canvas0.getContext("2d");
    
    // 点を描画する関数
    function drawNode(x, y, color){

        // サブパスのリセット
        context0.beginPath();    
        // 塗りつぶしのスタイル指定
        context0.fillStyle = color;
        // 塗りつぶしの円を描画
        context0.arc(x, y, 10, 0 / 180 * Math.PI, 2 * Math.PI);
        // 塗りつぶしの実行
        context0.fill();

    }

    // 数字を描画する関数
    function drawNumber(x, y, num, color){

        // サブパスのリセット
        context0.beginPath();
        // スタイル指定
        context0.fillStyle = color;
        // 塗りつぶしの数字を描画
        context0.fillText(num, x, y, 5);
        // 塗りつぶしの実行
        context0.fill();        

    }

    // 2点間に線を引く関数
    function drawLineBetweenPoints(point1, point2, color) {

        // サブパスのリセット
        context0.beginPath();
        // スタイル指定
        context0.strokeStyle = color;
        // 始点の設定
        context0.moveTo(point1.x, point1.y);
        // 次の点の設定
        context0.lineTo(point2.x, point2.y);
        // 線を引く
        context0.stroke();

    }

    // グラフを描画する処理
    function drawGraph(graph) {

        // 
        // 前準備
        // 

        // 隣接行列からツリーを作る
        const tree1 = addNodeTree(graph);

        // 各頂点の座標
        const cordinateList = cordinateListFromTree(tree1, 20, 250);
        // 各頂点間の辺
        const edges = serchEdges(tree1);

        // 頂点を描画
        for(let node of cordinateList){
            drawNode(node.x, node.y, "rgb(0, 0, 250)");
        }

        // 辺を描画
        for(let edge of edges){
            const start = edge.start;
            const end = edge.end;
            drawLineBetweenPoints(cordinateList[start], cordinateList[end], "rgb(0, 0, 250)");
            // 辺の距離を描画
            // 距離を表示する座標を算出
            const xs = cordinateList[start].x;
            const xe = cordinateList[end].x;
            const ys = cordinateList[start].y;
            const ye = cordinateList[end].y;
            const cost = graph[start][end];
            // 
            drawNumber(xs - 5 + ((xe - xs) / 2), ys - 9 + ((ye - ys) / 2), cost, "rgb( 0, 0, 0)")
        }

        // 番号を記入
        let number = 0;
        for(let node of cordinateList){
            drawNumber(node.x - 2, node.y + 3, number, "rgb(250, 250, 250)");
            number++;
        }

    }

    // 木構造から路線図を描画する
    function drawGraphFromTree(tree) {

        // 
        // 前準備
        // 

        // 
        const graph = tree.graph;

        // 隣接行列からツリーを作る
        const tree1 = tree;
        // 各頂点の座標
        const cordinateList = tree.cordinateList;
        // 各頂点間の辺
        const edges = serchEdges(tree1);

        // 
        // 描画処理
        // 

        // 頂点を描画
        for(let node of cordinateList){
            drawNode(node.x, node.y, "rgb(0, 0, 250)");
        }

        // 辺を描画
        for(let edge of edges){
            const start = edge.start;
            const end = edge.end;
            drawLineBetweenPoints(cordinateList[start], cordinateList[end], "rgb(0, 0, 250)");
            // 辺の距離を描画
                // 距離を表示する座標を算出
                const xs = cordinateList[start].x;
                const xe = cordinateList[end].x;
                const ys = cordinateList[start].y;
                const ye = cordinateList[end].y;
                const cost = graph[start][end];
                // 
                drawNumber(xs - 5 + ((xe - xs) / 2), ys - 9 + ((ye - ys) / 2), cost, "rgb( 0, 0, 0)");
        }

        // 番号を記入
        let number = 0;
        for(let node of cordinateList){
            drawNumber(node.x - 2, node.y + 3, number, "rgb(250, 250, 250)");
            number++;
        }

    }

    // 最短経路を描画
    function drawShortestPath(nodeTree) {


        const graph = nodeTree.graph;
        // ツリーから座標リスト作成
        // const cordinateList = cordinateListFromTree(nodeTree, 20, 250);
        const cordinateList = nodeTree.cordinateList;

        // 最短経路を計算
        let path1 = dijkstra(graph, selectStart.value, selectGoal.value);

        // 経由地モードがonの場合
        if(radioOn.checked){

            const pathsv = dijkstra(graph, selectStart.value, selectVia.value);

            const pathvg = dijkstra(graph, selectVia.value, selectGoal.value);

            path1 = pathsv.concat(pathvg);

        }

        // 辺を描画
        for(let i = 1; i <= path1.length - 1; i ++) {
            const start = cordinateList[ path1[i - 1] ];
            const end = cordinateList[ path1[i] ];
            drawLineBetweenPoints(start, end, "rgb(0, 150, 0)");
        }

        // 経路の頂点を緑で表示
        for(const node of path1){
            drawNode(cordinateList[node].x, cordinateList[node].y, "rgb(0, 150, 0)");
            drawNumber(cordinateList[node].x - 3, cordinateList[node].y + 2, node, "rgb(250, 250, 250)");
        }

    }

