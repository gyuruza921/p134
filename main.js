
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

    // button
    const button = document.createElement("button");
    button.id = "button";
    button.innerHTML = "click here";

    // reset button
    const button1 = document.createElement("button");
    button1.id = "button1";
    button1.innerHTML = "reset";

    // 要素のドキュメントへの追加
    BODY.appendChild(canvas0);
    BODY.appendChild(button);
    BODY.appendChild(button1);

// 
// 入力部
// 

    // グラフのデータ
    const graph = [

        [0, 2, 3, -1, -1, -1], // 点0 点1,2と接する
        [2, 0, -1, 6, -1, -1], // 点1　点0,2,3と接する
        [3, -1, 0, 4, -1, -1], // 点2　点0,3と接する
        [-1, 6, 4, 0, 5, 3], // 点3　点1,2,4,5と接する
        [-1, -1, -1, 5, 0, 2], // 点4　点3,5と接する
        [-1, -1, -1, 3, 2, 0], // 点5　再右端　点3,4と接する

    ]


// 
// 処理部
// 
// 入力部のデータを処理し、表示部で扱える状態にする。


    // ダイクストラ法で最短経路を算出する
    // graphは隣接行列、startIndexとgoalIndexは頂点番号
    function dijkstra(graph, startIndex, goalIndex) {
        // 
        // 前準備
        // 
        const nodeNum = graph.length;           // 配列に入ってる配列の数が頂点数
        const distance = new Array(nodeNum);    // スタート地点からの距離表を作成する
        distance.fill(Infinity);                // 距離を無限大で埋める
        distance[startIndex] = 0;               // ただしスタート地点からスタート地点への距離のみゼロ

        const nodeIndexList = []; // 頂点番号リスト
        for(let i = 0; i < nodeNum; i++){
            nodeIndexList.push(i); // 頂点番号をリストに入れる
        }

        const previousNode = new Array(nodeNum); // 前の頂点
        previousNode.fill(-1); // -1(無効)で埋める

        // 
        // 計算
        // 

        // 頂点番号リストが空でないあいだ
        while(nodeIndexList.length > 0) {
            // 頂点番号リストから、スタート地点からの距離が最小の頂点を選ぶ
            // スタート地点からの総距離はdistance[nodeIndex[i]]で取得できる
            // distance[i]がdistance[minDistanceIndex]より小さい番号iを
            // どんどんminDistanceIndexに入れていけば、最終的に最小のiが得られる
            let minDistanceIndex = 0;
            for(let i = 0; i < nodeIndexList.length; i++) {
                // 
                // 課題：ここを埋める
                // 
                // 頂点iからスタート地点への総距離
                const distanceToStart = distance[nodeIndexList[i]];

                    if(distanceToStart < distance[minDistanceIndex]) {

                    minDistanceIndex = i;

                    }

            }

            const nodeIndex = nodeIndexList[minDistanceIndex];
            nodeIndexList.splice(minDistanceIndex, 1); // 選んだノードを削除

            // 選んだ頂点（nodeIndex）から繋がっているノードの一覧を作る
            // 頂点fromから頂点toへの距離はgraph[from][to]で取得できる
            // 距離が0より大きければ繋がっている
            // 繋がっていたら番号iをneighbourIndexListに入れる
            const neighbourIndexList = [];
            for(let i = 0; i < nodeNum; i++) {
                // 
                // 課題：ここを埋める
                // 

                const from = nodeIndex;
                const to = nodeIndexList[i];
          
                if(graph[from][to] > 0) {
                  neighbourIndexList.push(to);
                }

            }

            // スタート地点からnIndexまでの現在の総距離（これをAとする）と、
            // 「スタート地点からnodeIndexまでの総距離」と「nodeIndexからnIndexまでの距離」
            // を足したもの（これをBとする）を比較して、
            // Bが小さい場合はdistance[nIndex]をBで更新し、
            // previousNode[nIndex]にnodeIndexを入れる
            for(const nIndex of neighbourIndexList) {
                // 
                // 課題：ここを埋める
                // 

                // Aを求める
                let A;
                // スタート地点からnIndexまでの距離を入力する
                A = distance[nIndex];

                // Bを求める
                let B;

                const B1 = distance[nodeIndex];
                const B2 = graph[nodeIndex][nIndex];
                B = B1 + B2;

                if(B <= A) {
                    distance[nIndex] = B;
                    previousNode[nIndex] = nodeIndex;
                }

            }

        }
 
        // 答えは出たが人間が読みやすい形式ではないので
        // ゴールから逆順に辿って最短経路として出す
        const shortestPath = [goalIndex];
        for(let prev = previousNode[goalIndex]; prev >= 0; prev = previousNode[prev]) {
            shortestPath.unshift(prev);
        }

        return shortestPath;

    }

    // 動作確認
    const path = dijkstra(graph, 0, 5);


    // 隣接行列から各頂点の座標のリストを作る
    function nodeCordinateList(graph, x, y){
        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // リストに頂点番号を加えていく
        for(let i = 0; i <= graph.length - 1; i ++) {
            nodeList.push(i);
        }

        // 基準の座標
        const standardPoint = {x:x, y:y};

        // 各点の座標のリスト
        const cordinateList = new Array(graph.length);
        // リストをnullで埋める
        cordinateList.fill(null);

        // 各頂点に隣接する頂点を探す
        for(let i = 0; i <= nodeList.length - 1; i++) {

            const node = graph[i];

            // 各頂点に隣接する頂点のリストを作成
            let neighbourIndexList = [];
            for(let i = 0; i <= node.length - 1; i++) {
                if(node[i] > 0) {
                    neighbourIndexList.push(i);
                }
            }

            // 分岐の先にある頂点のリスト
            let next = [];

            // 座標リストに登録済みの接点のリストアップ
            let prev = [];
            for(let i = 0; i <= neighbourIndexList.length - 1; i ++){
                // 
                if(cordinateList[ neighbourIndexList[i] ] != null){
                    prev.push(neighbourIndexList[i]);
                }
                else {
                    next.push( neighbourIndexList[i] )
                }

            }

            console.log("neighbourIndexList", neighbourIndexList);
            console.log("prev", prev);
            console.log("next", next);


            // 基準となる点の座標をリストに登録(ここではリストの最初の点とする)
            if(i == 0){
                cordinateList[0] = standardPoint; 
            }

            // 分岐の数
            const junctions = neighbourIndexList.length - prev.length;

            // 分岐元の頂点の座標
            const point1 = cordinateList[i];

            // 次の接点の分岐の上下間隔を決める
            // 分岐元の頂点のy座標を2倍してそれを次の分岐の数+1の数で割る
            const spaceN = Math.floor( (point1.y * 2) / (junctions + 1) );
            console.log("spaceN", spaceN);

            // 隣接する頂点のリストを基に各頂点を分岐させ座標を登録していく
            for(let i = 0; i <= next.length - 1; i ++){

                // 描画する点の座標を決める
                const pointN = {x:0, y:0};

                // 分岐が１つならまっすぐ進む
                if(junctions == 1){
                    pointN.x = point1.x + 80;
                    pointN.y = point1.y;
                }
                // 分岐が複数なら枝分かれさせ、上から順に割り振る
                else if(junctions >= 2){
                    pointN.x = point1.x + 80;
                    // point1.yを基準に、まずspaceN*junctionsの分だけ上に移動しそこから1個ずつ降りる
                    // 0番目のy座標
                    const height0 = point1.y - (spaceN / 2);
                    console.log("height0", height0);
                    // 
                    pointN.y = height0 + ( (i) * spaceN);
                }
                // 分岐が0ならもう1つ進む
                else if(junctions == 0 && i != 0){
                    pointN.x = point1.x + 160;
                    pointN.y = standardPoint.y;
                }


                // まだ未登録なら座標リストに登録
                if(cordinateList[ next[i] ] == null ){
                    cordinateList[ next[i] ] = pointN; 
                }                

            }

        }

        console.log("cordinateList", cordinateList)
        return cordinateList;
    }


    // 辺を探す処理
    function serchEdges(graph){

        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // リストに頂点番号を加えていく
        for(let i = 0; i <= graph.length - 1; i ++) {
            nodeList.push(i);
        }

        // 各辺のリスト
        const edges = [];

            // 各頂点に隣接する頂点を探す
            for(let i = 0; i <= nodeList.length - 1; i++) {

                const node = graph[i];

                const n1 = i;

                // 各頂点に隣接する頂点のリストを作成
                let neighbourIndexList = [];
                for(let i = 0; i <= node.length - 1; i++) {
                    if(node[i] > 0) {
                        neighbourIndexList.push(i);
                    }
                }


                // 隣接する頂点のリストを基に各頂点を分岐させ座標を登録していく
                for(let i = 0; i <= neighbourIndexList.length - 1; i ++){
                
                    // 登録済みの接点との間に線を引く
                    if(cordinateList[neighbourIndexList[i]] != null){
                        edges.push({start: n1, end: neighbourIndexList[i]});
                    }

                }

            }

            // 辺のリストから重複する辺を取り除く
            for(let edge of edges){
                // ある辺の始点と終点を取り出す
                const start = edge.start;
                const end = edge.end;

                let cnt = 0;

                // 取り出した辺と始点と終点が逆転した辺を探す
                for(let edge of edges) {

                    if(edge.start == end && edge.end == start){
                        // 見つけたらリストから削除する
                        edges.splice(cnt, 1);
                    }

                    cnt ++;

                }

            }

            return edges;

    }

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


    // 座標のリストと辺のリスト
        // 各頂点の座標
        const cordinateList = nodeCordinateList(graph, 20,250)
        // 各頂点間の辺
        const edges = serchEdges(graph);


    // グラフを描画する処理
    function drawGraph(){

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

    drawGraph();


// 
// 操作部
// 
// ドキュメント部のスイッチ等を操作した時に対応した処理を実行する

    // 最短経路を表示
    button.addEventListener("click", ()=>{

        // 辺を描画
        for(let i = 1; i <= path.length - 1; i ++) {
            const start = cordinateList[ path[i -1] ];
            const end = cordinateList[ path[i] ];
            drawLineBetweenPoints(start, end, "rgb(250, 0, 0)");
        }

        // 経路の頂点を赤で表示
        for(const node of path){
            drawNode(cordinateList[node].x, cordinateList[node].y, "rgb(250, 0, 0)");
            drawNumber(cordinateList[node].x - 3, cordinateList[node].y + 2, node, "rgb(250, 250, 250)");
        }

    });

    // 画面のリセット
    button1.addEventListener("click", ()=>{
        context0.clearRect(0, 0, 500, 500);
        drawGraph();
    } );





