
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

    // form要素の追加
    const form = document.createElement("form");
    form.id = "form";

    // optionを追加する関数
    function addOption(options, select) {

        for(let option of options) {
            select.appendChild(option);
        }

    }

    // スタート地点入力欄
        // ラベル作成
        const label0 = document.createElement("label");
        label0.innerText = "スタート地点を入力";
        label0.setAttribute("for", "selectStart");

        // セレクトボックス要素
        const selectStart = document.createElement("select");
        selectStart.id = "selectStart";

        // selectStartにoption要素を追加
        const startOptions = [];


    // ゴール地点入力欄の作成
        const selectGoal = document.createElement("select");
        selectGoal.id = "selectGoal";

        const label1 = document.createElement("label");
        label1.innerText = "ゴール地点を入力";
        label1.setAttribute("for", "selectGoal");

        // 選択肢を収める配列
        const goalOptions = [];
    

    // 最短経路表示ボタン
    const button = document.createElement("button");
    button.id = "button";
    button.setAttribute("type", "button");
    button.innerHTML = "click here";

    // リセットボタン
    const button1 = document.createElement("button");
    button1.id = "button1";
    button1.setAttribute("type", "button");
    button1.innerHTML = "reset";

    // 経路図再設定ボタン
    const button2= document.createElement("button");
    button2.id = "button2";
    button2.setAttribute("type", "button");
    button2.innerHTML = "graph setting";


    // formへの要素追加
    form.appendChild(button);
    form.appendChild(button1);
    form.appendChild(button2);
    form.appendChild(label0);
    form.appendChild(selectStart);
    form.appendChild(label1);
    form.appendChild(selectGoal);

    // 要素のドキュメントへの追加
    BODY.appendChild(canvas0);
    BODY.appendChild(form);

// 
// 入力部
// 

    // Treeクラスの用意
        // TreeNode
        class TreeNode {
            constructor(value){
                // そのノードの値
                this.value = value;
                // 他のノードとの位置関係
                this.N = null;
                this.NE= null;
                this.E= null;
                this.SE= null;
                this.S= null;
                this.SW= null;
                this.W= null;
                this.NW= null;

            }
        }
        // TreeNodeテスト
        class TreeNodeE {
            constructor(value){
                // id
                this.id = value.id;
                // 他のノードとの距離
                this.distance = value.distance;
                // 他のノードとの位置関係
                this.N = null;
                this.NE= null;
                this.E= null;
                this.SE= null;
                this.S= null;
                this.SW= null;
                this.W= null;
                this.NW= null;

            }
        }

        // Tree
        class Tree {
            constructor(){
                // 一番先頭の値
                this.root = null;
            }
            // 内部の頂点を探す
            serch(id) {

                // 
                let current = this.root;
                // 木のノードのプロパティから方位のみを取り出す
                const directions = Object.keys(this.root).filter( (key)=> key.match( /[NEWS]/ ) != null );
                // console.log(directions);
                // 一番先頭の値が探していた値ならそれを返す
                if(id == current.value.id){ return current }
                // 見つからなければ枝を辿っていく
                // loop
                let limit = 0;
                while(limit < 5){

                    let directions1 = Array.from(directions).filter( (i)=> current[i] != null );
                    console.log("directions1", directions1);

                    for(let direction of directions1){
                        // 探している頂点のidと一致したらcurrentの値を返す                        
                        if(current[direction].value.id == id){
                            return current[direction];
                        }
                        // 全ての方位を探索したらcurrentの値を更新する
                        else if(direction == directions1[directions1.length - 1]){
                        // else if(current[direction].value.id != id && direction == directions1[directions1.length - 1]){
                            console.log("all serched!");
                            current = current[direction];
                            console.log("current", current);
                            directions1 = Array.from(directions).filter( (i)=> current[i] != null && i.match(/[E]/) != null);
                            // console.log("directions1", directions1);
                            break;
                        }
                        // 一致しなければcurrent内の別の方位を探す
                        // else if(current[direction].value.id != id){
                        else{
                            console.log("continue!", direction);
                            continue;
                        }
                    
                    }
                    limit ++;
                    // return false;
                }
                
            }

        }

    // グラフのデータ
    const graph = [

        [0, 2, 3, -1, -1, -1], // 点0 点1,2と接する
        [2, 0, -1, 6, -1, -1], // 点1　点0,2,3と接する
        [3, -1, 0, 4, -1, -1], // 点2　点0,3と接する
        [-1, 6, 4, 0, 5, 3], // 点3　点1,2,4,5と接する
        [-1, -1, -1, 5, 0, 2], // 点4　点3,5と接する
        [-1, -1, -1, 3, 2, 0], // 点5　再右端　点3,4と接する

    ];

    // 隣接行列graphを使ったTreeNodeクラスの動作確認
        // 各頂点のインスタンス作成
        const node0 = new TreeNode(graph[0]);
        const node1 = new TreeNode(graph[1]);
        const node2 = new TreeNode(graph[2]);
        const node3 = new TreeNode(graph[3]);
        const node4 = new TreeNode(graph[4]);
        const node5 = new TreeNode(graph[5]);


    // 第二の隣接行列のデータ
    const graph1 = [

        [0, 2, 3, -1, -1, -1, -1], // 頂点0　再左端　頂点1,2と接する
        [2, 0, 4, 5, -1, -1, -1], // 頂点1　頂点0,2,3と接する
        [3, -1, 0, 2, -1, -1, -1], // 頂点2　頂点0,3と接する
        [-1, 5, 2, 0, 2, 4, -1], // 頂点3　頂点1,2,4,5と接する
        [-1, -1, -1, 2, 0, 7, 5], // 頂点4　頂点3,5,6と接する
        [-1, -1, -1, 4, 7, 0, 3], // 頂点5　頂点3,4,6と接する
        [-1, -1, -1, -1, 5, 3, 0], // 頂点6　再右端 頂点4,5と接する

    ];


    // セレクトボックスの選択肢を再設定
    function setSelects(graph) {

            // 始点
            for(let option = 0; option <= graph.length - 1; option++){
                startOptions[option] = document.createElement("option");
                startOptions[option].value = option;
                startOptions[option].innerText = option;
            }

            // 初期化
            selectStart.textContent = null;
            // 子要素の追加
            addOption(startOptions, selectStart);
            
            // 最終点
            for(let option = 0; option <= graph.length - 1; option++){
                goalOptions[option] = document.createElement("option");
                goalOptions[option].value = option;
                goalOptions[option].innerText = option;
            }

            // 初期化
            selectGoal.textContent = null;
            // 子要素の追加
            addOption(goalOptions, selectGoal);

        };

    setSelects(graph);

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
    // const path = dijkstra(graph1, 0, 5);


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
        // 最初の頂点だけは事前に設定しておく
        cordinateList[0] = standardPoint;


        // 
        // 計算
        // 

        // 各頂点に隣接する頂点を探す
        for(let i = 0; i <= nodeList.length - 1; i++) {

            const node = graph[i];


            // 隣接する頂点のリストを作成
            const neighbourIndexList = nodeList.map((node)=>{ return node; }).filter( (i)=>{ return node[i] > 0; } );

            // 座標リストに登録済みの頂点のリストアップ
            const prev = neighbourIndexList.filter( function(i) { return cordinateList[i] != null });
            // 分岐の先にある頂点のリスト
            const next = neighbourIndexList.filter( function(i) { return cordinateList[i] == null });

            // console.log("neighbourIndexList", neighbourIndexList);
            // console.log("prev", prev);
            // console.log("next", next);

            // 基準となる点の座標をリストに登録(ここではリストの最初の点とする)
            if(i == 0){
                cordinateList[0] = standardPoint; 
            }

            // 分岐の数
            const junctions = next.length;

            // 分岐元の頂点の座標
            const point1 = cordinateList[i];

            // 次の接点の分岐の上下間隔を決める
            // 分岐元の頂点のy座標を2倍してそれを次の分岐の数+1の数で割る
            const spaceN = Math.floor( (point1.y * 2) / (junctions + 1) );
            // console.log("spaceN", spaceN);

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
                    // console.log("height0", height0);
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

        // console.log("cordinateList", cordinateList);
        return cordinateList;
    }


    // 木にノードを追加する関数
    function addNodeTree(graph) {

        // 
        // 前準備
        // 

        // 頂点のリストを作る
        const nodeList = [];
        // リストに木のノードを作り加えていく
        for(let i = 0; i <= graph.length - 1; i ++) {
            const treeNode = new TreeNode( {id:i, distance: graph[i]} )
            nodeList.push(treeNode);
        }
        // console.log("nodeList", nodeList);

        // 登録する方位の候補リスト
        // 頂点リストから適当な要素を抜き出しその中から方位のプロパティのみ追加する
        const directions = Object.entries(nodeList[0]).map((key)=> key[0] ).filter((i)=> i != undefined && i != "value" );
        // console.log("directions", directions);

        // 木を作る
        const tree = new Tree();
        tree.root = nodeList[0];

        // 
        // 計算
        // 

        // 作成したノードを繋げていく

        // 各頂点と接する頂点のリストを作成する
        for(let node of nodeList){

            // console.log("own",node);
            // 隣接する頂点のリストを作成
            const neighbourIndexList = nodeList.map((node)=>{ return node.value.id; }).filter( (i)=>{ return node.value.distance[i] > 0; } );
            // console.log("neighbourIndexList trees", neighbourIndexList);

            // 隣接する点のリストから方位を登録済みの頂点を探す
            const ownId = node.value.id;
            // リストのうちownidの値より小さいものを抜き出す
            const prev = neighbourIndexList.filter( function(i) { return i < ownId; });
            console.log("prev", prev);

            // 分岐の先にある頂点のリスト
            const next = neighbourIndexList.filter( function(i) { return i > ownId; });
            console.log("next", next);


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
                    // 方位リストから東を除外する
                    directionsN.splice(1, 1);
                }
                console.log("directionsN", directionsN);

                // 候補リストから空いている方位に登録する
                let i = 0;
                for(let direction of directionsN){

                    console.log("direction", direction);
                    if(node[direction] == null){
                        node[direction] = nodeList[next[i]]
                    }
                    i ++;
                }
            
            }

            // 中間点　次の頂点と前の頂点が１以上の場合
            else if(next.length >= 1 && prev.length >= 1) {
                console.log("node", node);
                // 次の頂点の方位を決める処理
                    let directionsN;
                    // 次の頂点が１つの時
                    if(next.length == 1) {
                        directionsN = Array.from(directions).splice(2, 1);
                    }
                    // 次の頂点が複数の時
                    else if(next.length == 2) {
                        directionsN = Array.from(directions).splice(1, 3);
                        directionsN.splice(1, 1);
                    }
                    // 候補リストから空いている方位に登録する
                    let i = 0;
                    for(let direction of directionsN){

                        console.log("direction", direction);
                        if(node[direction] == null){
                            node[direction] = nodeList[next[i]]
                        }
                        i ++;
                    }
                // 前の頂点の方位を更新する処理
                    //  prevに登録された頂点から一つずつ調べる
                    for(let prevNode of prev) {

                    console.log("prevNode", prevNode)
                    // 前の頂点の1つから現在の頂点が登録されている方位を探す
                    // 発見した方位を代入する変数
                    let directionP;
                    for(let direction of directions){

                        // 一致したらその方位を変数directionPに代入する
                        if(nodeList[prevNode][direction] == node) {
                            console.log("find! direction", direction);
                            directionP = direction;
                        }
                    }

                    // 代入した方位を逆方向に変換する
                    console.log("before", directionP);
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

                    console.log("after", directionP2);

                    // 今の頂点の変換した方位に前の頂点を登録
                    // もし未登録ならそのまま登録
                    if(node[directionP2] == null){
                        node[directionP2] = nodeList[prevNode];
                    }
                    else{
                        node[directionP2] = nodeList[prevNode];
                    }

                }
                // 次の頂点に終点が含まれる場合
                    // nextから終点を探す
                    const fp = next.some( (num)=>{return num == nodeList.length - 1} );
                    console.log("fp", fp);
                    // 終点を見つけたら
                    if(fp && next.length > 1){
                        // 終点以外の頂点をnextから抽出する
                        const others = Array.from(next).filter( (value)=>{return value != nodeList.length - 1} );
                        console.log("others", others);
                        // 
                        for(let other of others){
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
                    directionsP = Array.from(directions).splice(6, 1);                    
                }
                // prev.lengthが2の場合
                else if(prev.length == 2) {
                    // 方位リストから北西から南西までを取り出す
                    directionsP = Array.from(directions).splice(5, 3);
                    // 方位リストから西を除外する
                    directionsP.splice(1, 1);
                }
                console.log("directionsP", directionsP);
                // 候補リストから空いている方位に登録する
                let i = 0;
                for(let direction of directionsP){

                    console.log("direction", direction);
                    if(node[direction] == null){
                        node[direction] = nodeList[prev[i]]
                    }
                    i ++;
                }

            } 

        }

        return tree;

    }


    // 木から各頂点の座標のリストを作る
    function cordinateListFromTree(tree, graph, x, y){
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
        // 最初の頂点だけは事前に設定しておく
        cordinateList[0] = standardPoint;


        // 
        // 計算
        // 

        // 各頂点に隣接する頂点を探す
        for(let i = 0; i <= nodeList.length - 1; i++) {

            const node = graph[i];


            // 隣接する頂点のリストを作成
            const neighbourIndexList = nodeList.map((node)=>{ return node; }).filter( (i)=>{ return node[i] > 0; } );

            // 座標リストに登録済みの頂点のリストアップ
            const prev = neighbourIndexList.filter( function(i) { return cordinateList[i] != null });
            // 分岐の先にある頂点のリスト
            const next = neighbourIndexList.filter( function(i) { return cordinateList[i] == null });

            // console.log("neighbourIndexList", neighbourIndexList);
            // console.log("prev", prev);
            // console.log("next", next);

            // 基準となる点の座標をリストに登録(ここではリストの最初の点とする)
            if(i == 0){
                cordinateList[0] = standardPoint; 
            }

            // 分岐の数
            const junctions = next.length;

            // 分岐元の頂点の座標
            const point1 = cordinateList[i];

            // 次の接点の分岐の上下間隔を決める
            // 分岐元の頂点のy座標を2倍してそれを次の分岐の数+1の数で割る
            const spaceN = Math.floor( (point1.y * 2) / (junctions + 1) );
            // console.log("spaceN", spaceN);

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
                    // console.log("height0", height0);
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

        // console.log("cordinateList", cordinateList);
        return cordinateList;
    }    

    // 動作確認
    const nodeTree = addNodeTree(graph);
    console.log("nodeTree", nodeTree);
    console.log("nodeTree", nodeTree.serch(0));
    console.log("nodeTree serch1", nodeTree.serch(1));
    console.log("nodeTree serch2", nodeTree.serch(2));
    console.log("nodeTree serch3", nodeTree.serch(3));
    console.log("nodeTree serch4", nodeTree.serch(4));
    // console.log("nodeTree serch5", nodeTree.serch(5));
    // console.log("nodeTree serch6", nodeTree.serch(6));


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

        // 座標のリスト
        const cordinateList = nodeCordinateList(graph, 80, 250);

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




    // グラフを描画する処理
    function drawGraph(graph) {

        // 
        // 前準備
        // 

        // 各頂点の座標
        const cordinateList = nodeCordinateList(graph, 20,250);
        // 各頂点間の辺
        const edges = serchEdges(graph);

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

    drawGraph(graph);


// 
// 操作部
// 
// ドキュメント部のスイッチ等を操作した時に対応した処理を実行する

    // 選択された値を表示
    selectStart.addEventListener("change", ()=>{
        // document.write(selectStart.value);
        context0.clearRect(0, 0, 60, 20);
        drawNumber(30, 10, selectStart.value, "rgb( 0, 0, 0)");
    });

    // 選択された値を表示
    selectGoal.addEventListener("change", ()=>{
        // document.write(selectStart.value);
        context0.clearRect(50, 0, 20, 20);
        drawNumber(60, 10, selectGoal.value, "rgb( 0, 0, 0)");
    });


    // 前準備
    let start = 0;
    let goal = 0;

    // 最短経路を表示
    button.addEventListener("click", ()=>{

        const cordinateList = nodeCordinateList(graph, 20, 250);

        // 最短経路を計算
        const path1 = dijkstra(graph1, selectStart.value, selectGoal.value);
        console.log("path1", path1);        

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

    });

    // 画面のリセット
    button1.addEventListener("click", ()=>{
        context0.clearRect(0, 0, 500, 500);
        drawGraph();
    } );

    // セレクトボックスの再設定
    button2.addEventListener("click", setSelects);

