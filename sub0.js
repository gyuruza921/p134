"use strict"

// 
// 処理部
// 
// 入力部のデータを基に計算等の処理を行う

    // 木にノードを追加する関数
    function addNodeTree(graph) {

        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // 木のノードを作りリストに加えていく
        for(let i = 0; i <= graph.length - 1; i ++) {
            const treeNode = new TreeNode( {id:i, distance: graph[i]} );
            nodeList.push(treeNode);
        }
        // console.log("nodeList", nodeList);

        // 登録する方位の候補リスト
        // treeNodeオブジェクトから方位のプロパティのみ抽出する
        const directions = Object.entries(nodeList[0]).map((key)=> key[0] ).filter((i)=> i.match(/[NEWS]/) != null);
        // console.log("directions", directions);

        // 木を作る
        const tree = new Tree();
        tree.root = nodeList[0];

        // 木に頂点リストを加える
        tree.nodeList = nodeList;

        // 
        // 計算
        // 

        // 作成したノードを繋げていく

        // graph内の頂点の数だけ繰り返す
        for(let node of nodeList){

            // 隣接する頂点のリストを作成
            const neighbourIndexList = nodeList.map((node)=>{ return node.id; }).filter( (i)=>{ return node.distance[i] > 0; } );
            // console.log("neighbourIndexList", neighbourIndexList);

            // 隣接する点のリストから方位を登録済みの頂点を探す
            const ownId = node.id;
            // リストのうちownidの値より小さいものを抜き出す
            const prev = neighbourIndexList.filter( function(i) { return i < ownId; });
            // console.log("prev", prev);

            // 分岐の先にある頂点のリスト
            const next = neighbourIndexList.filter( function(i) { return i > ownId; });
            // console.log("next", next);

            // neighbourIndexList内の頂点を現在選択中の頂点の各方位に登録する
            // 登録する包囲の選び方をprevとnextの大きさに応じて変更する
            // 場合分け
            // 始点　前の頂点が存在しない場合
            if(prev.length == 0) {
                // 次の頂点の候補リスト
                let directionsN;
                // next.lengthが1の場合
                if(next.length == 1) {
                    // 方位リストから東のみ抜き出す
                    directionsN = Array.from(directions).splice(2, 1);                    
                }
                // next.lengthが2の場合
                else if(next.length == 2) {
                    // 方位リストから北東と南東のみ取り出す
                    directionsN = Array.from(directions).splice(1, 3);
                }
                // next.lengthが3以上の場合
                else if(next.length >= 3) {
                    // 方位リストから北東と南東のみ取り出す
                    directionsN = Array.from(directions).splice(1, 5);
                }
                // next.lengthが偶数の時
                if(next.length % 2 == 0){
                    // 方位リストから東を除外する
                    directionsN.splice(1, 1);                    
                }
                // console.log("directionsN", directionsN);

                // 候補リストから空いている方位に登録する
                let i = 0;
                for(let direction of directionsN){

                    // console.log("direction", direction);
                    if(node[direction] == null){
                        node[direction] = nodeList[next[i]]
                    }
                    i ++;
                }
            
            }

            // 中間点　次の頂点が2つで前の頂点が1つの場合
            else if(next.length == 2 && prev.length == 1) {
                // console.log("current node", node);
                // 前の頂点と今の頂点との位置関係を確認
                const prevDirections = [];
                for(const index of prev){
                    // nodeList[index]の各方位を探索して現在の頂点を見つけたらその方位を登録
                    for(const direction of directions){
                        if(nodeList[index][direction] == node){
                            prevDirections.push(direction);
                        }
                    }

                }
                // console.log("prevDirections", prevDirections);
                // 第一の次の頂点を登録する
                // 今の頂点より若い番号なら北そうでないなら南に登録
                if(next[0] < node.id){
                    node.N = nodeList[next[0]];
                    nodeList[next[0]].S = node;
                }
                else{
                    node.S = nodeList[next[0]];
                    nodeList[next[0]].N = node;
                }

                // 第二の次の頂点を登録する
                let nextDirection2 = "E";
                let nextDirectionR2 = "W";
                // 次の頂点につながる辺の長さを比較する
                const distance = nodeList[next[1]].distance;
                // console.log("distance", distance);
                // console.log(`distance ${node.id} to ${next[1]}`, distance[node.id]);
                // console.log(`distance ${next[0]} to ${next[1]}`, distance[next[0]]);
                // 今の頂点と第二の次の頂点との距離が第一の次の頂点と第二の次の頂点との距離より大い場合
                if(distance[node.id] > distance[next[0]]){
                    // prevDirectionの方位に応じてnextdirectionの方位を曲げる
                    if(prevDirections[0].match(/[N]/) != null){
                        nextDirection2 = "SE";
                        nextDirectionR2 = "NW";
                    }
                    else if(prevDirections[0].match(/[S]/) != null){
                        nextDirection2 = "NE";
                        nextDirectionR2 = "SW";
                    }

                }
                // console.log("nextDirection2",nextDirection2);
                node[nextDirection2] = nodeList[next[1]];
                nodeList[next[1]][nextDirectionR2] = node;

            }

            // 中間点　次の頂点が1つで前の頂点が2つの場合
            else if(next.length == 1 && prev.length == 2) {

                // 前の頂点と今の頂点との位置関係を確認
                const prevDirections = [];
                for(const index of prev){
                    // nodeList[index]の各方位を探索して現在の頂点を見つけたらその方位を登録
                    for(const direction of directions){
                        if(nodeList[index][direction] == node){
                            prevDirections.push(direction);
                        }
                    }
                }
                // console.log("prevDirections", prevDirections);

                // 初期化
                nodeList[prev[1]][prevDirections[1]] = null;
                // 次の頂点を登録する方位
                let nextDirection = "E";
                // 番号の若い点を基準にもう片方を南北いずれかに登録
                if(prevDirections[0].match(/[N]/) != null){
                    // console.log("N");
                    // 登録
                    node.S = nodeList[prev[1]];
                    nodeList[prev[1]].N = node;
                    nextDirection = "SE";
                }
                else{
                    // console.log("S");
                    // 登録
                    node.N = nodeList[prev[1]];
                    nodeList[prev[1]].S = node;
                    nextDirection = "NE";
                }

                node[nextDirection] = nodeList[next[0]];

            }

            // 中間点　次の頂点と前の頂点が１以上の場合
            else if(next.length >= 1 && prev.length >= 1) {
                // console.log("node", node);
                // 次の頂点の方位を決める処理
                let directionsN;
                // 次の頂点が１つの時
                if(next.length == 1) {
                    directionsN = ["W"];
                }
                // 次の頂点が複数の時
                else if(next.length == 2) {
                    directionsN = Array.from(directions).splice(1, 3);
                    directionsN.splice(1, 1);
                }
                // 候補リストから空いている方位に登録する
                let i = 0;
                for(let direction of directionsN){

                    // console.log("direction", direction);
                    if(node[direction] == null){
                        node[direction] = nodeList[next[i]]
                    }
                    i ++;
                }

                // 次の頂点に終点が含まれる場合
                // nextから終点を探す
                const fp = next.some( (num)=>{return num == nodeList.length - 1} );
                // console.log("fp", fp);
                // 終点を見つけたら
                if(fp && next.length > 1){
                    // 終点以外の頂点をnextから抽出する
                    const others = Array.from(next).filter( (node)=>{return node != nodeList.length - 1} );
                    // console.log("others", others);
                    // その頂点が登録された方位の初期化と終点でない頂点の登録
                    for(let other of others){

                        // otherが登録されている方位を現在の頂点から探して初期化
                        for(let direction of directions){
                            if(node[direction] == nodeList[other]){
                                // console.log("previous direction", direction);
                                node[direction] = null;
                            }
                        }

                        // otherの現在の頂点の方位への登録
                        // otherの番号が現在の頂点の番号より大きい場合
                        if(other > node.value.id){
                            node.S = nodeList[other];
                        }
                        else{
                            node.N = nodeList[other];
                        }
                    }

                }

            }
            // 終点　次の頂点が存在しない場合
            else if(next.length == 0) {

                // 登録する方位の候補リスト
                let directionsP;
                // prev.lengthが1の場合
                if(prev.length == 1) {
                    // 方位リストから西のみ抜き出す
                    directionsP = ["W"];                    
                }
                // prev.lengthが2の場合
                else if(prev.length == 2) {
                    // 方位リストから北西から南西までを取り出す
                    // 順番を逆にする
                    directionsP = [];
                    for(let i = 7; i >= 5; i --){
                        directionsP.push(directions[i]);
                    }
                }
                // 偶数の時は西だけを除外する
                if(next.length % 2 == 0){ directionsP = directionsP.filter( (direction)=> direction != "W" ) }
                // console.log("directionsP", directionsP);

                // 候補リストから空いている方位に登録する
                let i = 0;
                for(let direction of directionsP){

                    // console.log("direction", direction);
                    if(node[direction] == null){
                        // 現在の頂点の指定の方位に前の頂点を登録
                        node[direction] = nodeList[prev[i]];
                        // directionの方位を逆方向に変換
                        let directionR = direction;
                        // 南北
                        if(direction.match(/[N]/) != null){ directionR = direction.replace(/[N]/, "S") }
                        else{ directionR = direction.replace(/[S]/, "N") }
                        // 東西
                        if(direction.match(/[E]/) != null){ directionR = directionR.replace(/[E]/, "W") }
                        else{ directionR = directionR.replace(/[W]/, "E") }                     
                        // // 前の頂点の指定の方位に現在の頂点を登録
                        // console.log("directionR", directionR);
                        // 初期化
                        nodeList[prev[i]].E = null;
                        // 登録
                        nodeList[prev[i]][directionR] = node;
                    }
                    i ++;
                }

            } 

            // 前の頂点の方位を更新する処理
            //  prevに登録された頂点から一つずつ調べる
            for(let prevNode of prev) {

                // console.log("prevNode", prevNode);
                // 前の頂点の1つから現在の頂点が登録されている方位を探す
                // 発見した方位を代入する変数
                let directionP;
                for(let direction of directions){

                    // console.log("direction", direction);
                    // 一致したらその方位を変数directionPに代入する
                    if(nodeList[prevNode][direction] == node) {
                        // console.log("find! direction", direction);
                        directionP = direction;
                    }

                }

                // 代入した方位を逆方向に変換する
                // console.log("directionP", directionP);
                let directionP2 = directionP;

                // 南北
                if(directionP.match(/[N]/) != null){
                    directionP2 = directionP.replace(/[N]/, "S");
                }
                else if(directionP.match(/[S]/) != null){
                    directionP2 = directionP.replace(/[S]/, "N");
                }
                // 東西
                if(directionP.match(/[E]/) != null){
                    directionP2 = directionP2.replace(/[E]/, "W");
                }
                else if(directionP.match(/[W]/) != null){
                    directionP2 = directionP2.replace(/[W]/, "E");
                }

                // console.log("after", directionP2);

                // 今の頂点の反転した方位に前の頂点を登録
                // もし未登録ならそのまま登録
                if(node[directionP2] == null && directionP2 != undefined){
                    node[directionP2] = nodeList[prevNode];
                }

            }

        }

        // 動作確認
        // console.log("tree", tree);
        
        return tree;

    }


    // 木から各頂点の座標のリストを作る
    function cordinateListFromTree(tree, x, y){
        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // リストに頂点番号を加えていく
        for(let i = 0; tree.serch(i); i ++) {
            nodeList.push(tree.serch(i));
        }

        // 基準の座標
        const standardPoint = {x:x, y:y};

        // 各点の座標のリスト
        const cordinateList = new Array(nodeList.length);
        // リストをnullで埋める
        cordinateList.fill(null);
        // 最初の頂点だけは事前に設定しておく
        cordinateList[0] = standardPoint;


        // 
        // 計算
        // 

        // 登録されている頂点の数だけ繰り返す
        for(let node of nodeList) {

            // nodeから頂点を登録済みの方位を抽出してリストを作る
            const neighbourDirectionList = Object.keys(node).filter( (d)=> node[d] != null && d.match(/[NEWS]/));
            // console.log("neighbourIndexList", neighbourDirectionList);

            // 現在の頂点の座標を基準として設定する
            const standardPointN = cordinateList[node.value.id];
            // console.log("standardPointN", standardPointN);

            // 方位のリストの長さ分繰り返す
            for(let direction of neighbourDirectionList){
                // 登録済みの頂点にその方位に応じて座標を割り当てる
                let x = standardPointN.x;
                let y = standardPointN.y;

                // 現在の頂点nodeと隣接する頂点との間の辺の距離を調べる
                // console.log("distance", node.value.distance);
                const cost = node.value.distance[node[direction].value.id];
                // console.log(`cost ${node.value.id} to ${node[direction].value.id} is ${cost}`);

                // 基準座標から増減させる値を決める
                const distanceEdge = cost * 30; 

                // 東ならx＋南ならy‐西はx－北はy＋
                    // 南北
                    if(direction.match(/[N]/)){ y -= distanceEdge }
                    else if(direction.match(/[S]/)){ y += distanceEdge }
                    // 東西
                    if(direction.match(/[E]/)){ x += distanceEdge }
                    else if(direction.match(/[W]/)){ x -= distanceEdge }

                    // console.log("x", x, "y", y);

                // 計算した座標を座標リストに登録
                // 空白ならそのまま登録
                if(cordinateList[node[direction].value.id] == null){
                    cordinateList[ node[direction].value.id ] = {x:x, y:y};  
                }
                           
            }

        }

        // console.log("cordinateList", cordinateList);
        return cordinateList;
    } 


    // 木から辺を探す処理
    function serchEdges(tree){

        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // リストに頂点番号を加えていく
        for(let i = 0;tree.serch(i); i ++) {
            nodeList.push(tree.serch(i));
        }


        // 座標のリスト
        const cordinateList = cordinateListFromTree(tree, 80, 250);

        // 各辺のリスト
        const edges = [];

        // 
        // 計算
        // 

            // 各頂点に隣接する頂点を探す
            for(let current of nodeList) {

                const node = current;

                const n1 = current.value.id;

                // 各頂点に隣接する頂点のリストを作成
                let neighbourIndexList = [];
                for(let i = 0; i <= node.length - 1; i++) {
                    if(node[i] > 0) {
                        neighbourIndexList.push(i);
                    }
                }

                const neighbourDirectionList = Object.keys(node).filter( (d)=> d.match(/[NEWS]/) && node[d] != null );


                // 隣接する頂点のリストを基に各頂点を分岐させ座標を登録していく
                for(let direction of neighbourDirectionList){
                
                    // 登録済みの接点との間に線を引く
                    if(cordinateList[node[direction].value.id] != null){
                        edges.push({start: n1, end: node[direction].value.id});
                    }

                }

            }


            // 辺のリストから重複する辺を取り除く
            for(let edge of edges){
                // ある辺の始点と終点を取り出す
                const start = edge.start;
                const end = edge.end;

                // 取り出した辺の添え字
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


    // 表の内容から隣接行列を作る
    function graphFromTable(table) {

        // 隣接行列
        const graph = [];

        // 座標リスト
        const cordinateList = [];

        // 表の内容を代入していく
        // 頂点番号
        for(let node = 1; node <= table.childNodes.length - 1; node++){
            // console.log("node", table.childNodes[node]);
            // 座標
            const cordinateX = +table.childNodes[node].childNodes[1].innerText;
            const cordinateY = +table.childNodes[node].childNodes[2].innerText;
            cordinateList.push({x: cordinateX, y: cordinateY});
            // 距離
            let distance = table.childNodes[node].childNodes[3].innerText;
            // console.log("distance", distance);
            distance = distance.split(',');
            distance = distance.map((value)=>{return +value} );
            // console.log("distance", distance);
            graph.push(distance);
        }

        const nodeTree = addNodeTree(graph); 
        
        // nodeTreeに座標リストプロパティを追加
        nodeTree["cordinateList"] = cordinateList;

        // nodeTreeに隣接行列graphのプロパティを追加
        nodeTree["graph"] = graph;

        // console.log("graph", graph);
        console.log("nodeTree", nodeTree);
        return nodeTree;

    }


    // 表の内容から木を作る
    function treeFromTable(table){

        // 
        // 前準備
        // 

        // 木のインスタンス作成
        const tree = new Tree;

        // 頂点のリスト
        const nodeList = [];

        // 隣接行列
        const graph = [];

        // 座標リスト
        const cordinateList = [];

        // 
        // 計算
        // 

        // 頂点のリストに内容を加える
        for(let i = 1; i <= table.childNodes.length - 1; i ++){
            // 距離表の作成
            const distance = new Array(table.childNodes.length - 1);
            distance.fill(-1);
            // 頂点のインスタンス作成
            nodeList[i - 1] = new TreeNode({id: i - 1, distance: distance});
        }

        // 
        // 計算
        // 

        // 表の列の数だけ繰り返す
        for(let i = 1; i <= table.childNodes.length - 1; i ++){

            // 列内部の子要素のデータ
            const tableData = Array.from(table.childNodes[i].childNodes);
            // 表の列内部の値を読み取る
            // console.log("tableData", tableData);
            
            // 隣接する頂点のリスト
            // const neighbourNodeList = tableData.filter( (node)=> {return node.className.match(/[NEWS]/) != null && node.innerText != "0" } );
            
            // 隣接する頂点のリスト
            const neighbourNodeList = tableData.filter( (node)=> {
                return node.className.match(/[NEWS]/) != null && node.childNodes[0].value != "";
             } );

            // 現在の頂点の距離プロパティを設定
            nodeList[i - 1].distance[i - 1] = 0;

            // 
            neighbourNodeList.forEach((value)=>{

                // 
                // console.log("value", value);
                // console.log("value", value.firstChild);
                // console.log("value", value.firstChild.value);

                // 頂点番号と距離
                const nodeAndCost = value.firstChild.value.split(",");
                // 方位
                const direction = value.className;

                // 現在の頂点の方位に隣接する頂点を登録する
                nodeList[i - 1][direction] = nodeList[+nodeAndCost[0]];
                // 現在の頂点と隣接する頂点の距離を設定
                if( !isNaN(+nodeAndCost[1]) ){
                    nodeList[i - 1].distance[+nodeAndCost[0]] = +nodeAndCost[1];
                }
                else if( +nodeAndCost[1] == i - 1 ){
                    nodeList[i - 1].distance[i - 1] = 0;
                }
                else{
                    nodeList[i - 1].distance[+nodeAndCost[0]] = -1;
                }
                
            });

            // graph
            graph.push(nodeList[i - 1].distance);

            // cordinateList
            cordinateList.push({x: +tableData[1].innerText, y: +tableData[2].innerText}); 


        }

        // tree.rootを設定
        tree.root = nodeList[0];

        // tree.nodeList
        tree["nodeList"] = nodeList;

        // tree.graph
        tree["graph"] = graph;

        // tree.cordinateList
        tree["cordinateList"] = cordinateList;

        console.log("tree", tree);

        return tree;

    }


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
