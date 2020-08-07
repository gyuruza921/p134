
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
        context0.fillStyle = "rgb(0, 0, 250)";
        // 塗りつぶしの円を描画
        context0.arc(x, y, 10, 0 / 180 * Math.PI, 2 * Math.PI);
        // 塗りつぶしの実行
        context0.fill();

    }

    // 数字を描画する関数
    function drawNumber(x, y, num){

        // サブパスのリセット
        context0.beginPath();
        // スタイル指定
        context0.fillStyle = "rgb(250, 250, 250)";
        // 塗りつぶしの数字を描画
        context0.fillText(num, x, y, 5);
        // 塗りつぶしの実行
        context0.fill();        

    }


    // 2点間に線を引く関数
    function drawLineBetweenPoints(point1, point2) {

        // サブパスのリセット
        context0.beginPath();
        // スタイル指定
        context0.strokeStyle = "rgb(0, 0, 250)";
        // 始点の設定
        context0.moveTo(point1.x, point1.y);
        // 次の点の設定
        context0.lineTo(point2.x, point2.y);
        // 線を引く
        context0.stroke();

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

        // 各辺のリスト
        const edges = [];


        // グラフ内の各点の接点を探す
        for(let i = 0 ; i <= nodeList.length -1; i ++){

            const node = graph[i];

            console.log(node);

            // 各点とつながっている点のリストを作成
            let neighberNodelist = [];
            for(let i = 0; i <= node.length - 1; i ++){
                if(node[i] > 0){
                    neighberNodelist.push(i)
                }

            }

            // 座標リストに登録済みの接点のリストアップ
            let prev = [];
            for(let i = 0; i <= neighberNodelist.length - 1; i ++){

                // 
                if(cordinateList[ neighberNodelist[i] ] != null){
                    prev.push(neighberNodelist[i]);
                }

            }

            // console.log("prev", prev);


            // 基準となる点の座標をリストに登録(ここではリストの最初の点とする)
            if(i == 0){
                cordinateList[0] = {x: point0.x, y: point0.y}; 
            }

            // console.log("neighberNodeList",i, neighberNodelist);

            // 分岐の数
            const junctions = neighberNodelist.length - prev.length;
            // console.log("junction", junctions);

            const point1 = cordinateList[i];

            const n1 = i;

            // 次の接点の分岐の上下間隔を決める
            const spaceN = Math.floor( point1.y / neighberNodelist.length );
            // console.log(spaceN);   

            // 隣接する点のリスト
            for(let i = 0; i <= neighberNodelist.length - 1; i ++){

                // 描画する点の座標を決める
                const pointN = {x:0, y:0};

                // 分岐が１つならまっすぐ進む
                if(junctions == 1){
                    pointN.x = point1.x + 80;
                    pointN.y = point1.y;
                }
                // 分岐が複数なら枝分かれさせる
                else if(junctions >= 2){
                    pointN.x = point1.x + 80;
                    pointN.y = spaceN / 2 + (i + 1) * spaceN;
                }
                // 分岐が0ならもう1つ進む
                else if(junctions == 0){
                    pointN.x = point1.x + 160;
                    pointN.y = point0;
                }

                // 
                // console.log(`point${neighberNodelist[i]}`, pointN);

                // まだ未登録なら座標リストに登録
                if(cordinateList[ neighberNodelist[i] ] == null ){
                    cordinateList[ neighberNodelist[i] ] = pointN; 
                }

                // 登録済みの接点との間に線を引く
                if(cordinateList[neighberNodelist[i]] != null){

                    // console.log(`drawLine${n1}to${neighberNodelist[i]}`);
                    edges.push({start: n1, end: neighberNodelist[i]});

                }

            }

        }

        // 辺のリストを表示する
        // console.log(edges);

        // 辺のリストから重複する辺を取り除く
        for(let edge of edges){
            // ある辺の始点と終点を取り出す
            const start = edge.start;
            const end = edge.end;
            // console.log("ref", edge);

            let cnt = 0;

            // 取り出した辺と始点と終点が逆転した辺を探す
            for(let edge of edges) {

                if(edge.start == end && edge.end == start){
                    // console.log("target", edge);
                    // console.log("target", cnt, edges[cnt]);
                    // 見つけたらリストから削除する
                    edges.splice(cnt, 1);
                }

                cnt ++;

            }

        }

        // console.log(edges);

        for(let edge of edges){

            console.log("edge", edge);
            // 辺の始点
            const start = cordinateList[edge.start];
            // 辺の終点
            const end = cordinateList[edge.end];
            // 辺を描く
            drawLineBetweenPoints(start, end);

            // console.log(graph[edge.start]);
            // console.log(graph[edge.end]);
            // 辺の距離を記入する
            drawNumber(start.x + ( (end.x - start.x) / 2 ), start.y -( (start.y - end.y) / 2 )  - 6, graph[edge.start][edge.end]);

        }

        console.log(cordinateList);
        // 各ノードの番号
        let nodeNum = 0;
        // 座標リストに基づいて接点を描画する
        for(let point of cordinateList){

            // console.log(point);
            // 接点を描画
            drawNode(point.x, point.y);
            // ノードの番号を描画
            drawNumber(point.x - 2, point.y + 3, nodeNum);
            nodeNum ++;

        }

    }

    // 動作確認
    drawStartAndEndNode(graph);


// 
// 最短距離を計算する
// 

    // ダイクストラ法で最短距離を算出する
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
          
                // console.log(`from ${from} to ${to}`, graph[from][to]);
          
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
                // console.log("nIndex", nIndex);
                let A;
                // スタート地点からnIndexまでの距離を入力する
                // A = graph[startIndex][nIndex];
                A = distance[nIndex];

                // console.log("A", A);

                // Bを求める
                let B;

                const B1 = distance[nodeIndex];
                const B2 = graph[nodeIndex][nIndex];
                B = B1 + B2;

                // console.log(`B1,${B1} , B2,${B2}`);
                // console.log("B", B);

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
    console.log(dijkstra(graph, 0, 5));
    console.log(dijkstra(graph, 0, 3));
    console.log(dijkstra(graph, 3, 5));


// 
// 操作部
// 
// ドキュメント部のスイッチ等を操作した時に対応した処理を実行する


