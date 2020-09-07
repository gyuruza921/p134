
"use strict"

// 
// DOM構成部
//

    // body要素の取得
    const BODY = document.querySelector("body");

    // br要素の作成
    const br = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");

    // canvas要素の作成
    const canvas0 = document.createElement("canvas");
    canvas0.id = "canvas0";
    canvas0.height = 500;
    canvas0.width = 500;

    // form要素の作成
    const form = document.createElement("form");
    form.id = "form";

    // table要素の作成
    const table = document.createElement("table");
    table.id = "table";
    table.setAttribute("border","1");

    // tableの見出しの一列を作成
    const tr = document.createElement("tr");
    tr.id = "tr";

    const th = document.createElement("th");
    th.id = "th";
    th.innerText = "頂点番号";

    const th1 = document.createElement("th");
    th1.id = "th1";
    th1.innerText = "x座標";

    const th2 = document.createElement("th");
    th2.id = "th2";
    th2.innerText = "y座標";

    const th3 = document.createElement("th");
    th3.id = "th3";
    th3.innerText = "距離";

    // 各頂点の方位毎に登録された頂点と距離を登録
    const thN = document.createElement("th");
    thN.id = "thN";
    thN.className = "direction";
    thN.innerText = "N";

    const thNE = document.createElement("th");
    thNE.className = "direction";
    thNE.id = "thNE";
    thNE.innerText = "NE";

    const thE = document.createElement("th");
    thE.id = "thE";
    thE.className = "direction";
    thE.innerText = "E";

    const thSE = document.createElement("th");
    thSE.id = "thSE";
    thSE.className = "direction";
    thSE.innerText = "SE";

    const thS = document.createElement("th");
    thS.id = "thS";
    thS.className = "direction";
    thS.innerText = "S";

    const thSW= document.createElement("th");
    thSW.id = "thSW";
    thSW.className = "direction";
    thSW.innerText = "SW";

    const thW = document.createElement("th");
    thW.id = "thW";
    thW.className = "direction";
    thW.innerText = "W";

    const thNW = document.createElement("th");
    thNW.id = "thW";
    thNW.className = "direction";
    thNW.innerText = "NW";

    tr.appendChild(th);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(thN);
    tr.appendChild(thNE);
    tr.appendChild(thE);
    tr.appendChild(thSE);
    tr.appendChild(thS);
    tr.appendChild(thSW);
    tr.appendChild(thW);
    tr.appendChild(thNW);

    // tableに要素を追加
    table.appendChild(tr);

    // recordを追加する関数
    function addRecorde(id) {
        const record = document.createElement("tr");
        record.id = `tr${id}`;
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

        // console.log(td);
        for(let i = 0; i <= 11; i ++){
            const td = document.createElement("td");
            td.innerText = "0";
            // 方位入力欄にクラス名を追加
            if(i >= 11 - 7){
                td.className = directions[i - 4];
            }
            record.appendChild(td);
        }
        table.appendChild(record);
    }

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


    // 経由地点入力欄
        // ラベル作成
        const label1 = document.createElement("label");
        label1.innerText = "経由地点を入力";
        label1.setAttribute("for", "selectVia");

        // セレクトボックス要素
        const selectVia = document.createElement("select");
        selectVia.id = "selectVia";

        // selectStartにoption要素を追加
        const viaOptions = [];


    // ゴール地点入力欄の作成
        const selectGoal = document.createElement("select");
        selectGoal.id = "selectGoal";

        const label2 = document.createElement("label");
        label2.innerText = "ゴール地点を入力";
        label2.setAttribute("for", "selectGoal");

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

    // 消去ボタン
    const button3 = document.createElement("button");
    button3.id = "button3";
    button3.setAttribute("type", "button");
    button3.innerHTML = "graph delete";

    // ラジオボタン
    const radio = document.createElement("fieldset");
    radio.id = "radio";
    radio.innerHTML = "<legend>経由地選択</legend><label>on</label><label>off</label>";

        // 子要素の作成(on)
        const radioOn = document.createElement("input");
        radioOn.id = "radioOn";
        radioOn.setAttribute("type", "radio");
        radioOn.name = "switchOnOff";
        
        // 子要素の作成(off)
        const radioOff = document.createElement("input");
        radioOff.id = "radioOff";
        radioOff.setAttribute("type", "radio");
        radioOff.name = "switchOnOff";
        radioOff.checked = true;

        // 親要素radioへの追加
        radio.childNodes[1].appendChild(radioOn);
        radio.childNodes[2].appendChild(radioOff);


    // tableを制御するfieldset
    const tableControl = document.createElement("fieldset");
    tableControl.id = "tableControl";
    tableControl.innerHTML = "<legend>表の操作</legend>";

        // 表をリセット
        const tableReset = document.createElement("button");
        tableReset.id = "tableReset";
        tableReset.setAttribute("type", "button");
        tableReset.innerText = "reset";

        // 列を追加
        const tableAdd = document.createElement("button");
        tableAdd.id = "tableAdd";
        tableAdd.setAttribute("type", "button");
        tableAdd.innerText = "add";

        // 列を選択
        // ラベル作成
        const label3 = document.createElement("label");
        label3.innerText = "入力する対象を選択";
        label3.setAttribute("for", "recordSelect");

        // セレクトボックス要素
        const recordSelect = document.createElement("select");
        recordSelect.id = "recordSelect";

        // recordSelectにoption要素を追加
        const recordOptions = [];


        // ラベルを作成
        const label4 = document.createElement("label");
        label4.innerText = "距離を入力";
        label4.setAttribute("for", "setDistance");


        // 他の頂点との距離を設定
        const setDistance = document.createElement("input");
        setDistance.id = "setDistance";


        // 設定した距離の表への入力
        const inputDistance = document.createElement("button");
        inputDistance.id = "inputDistance";
        inputDistance.setAttribute("type", "button");
        inputDistance.innerText = "inputDistance";

        // 方位を選択して頂点と距離を入力
            // ラベルを作成
            const label5 = document.createElement("label");
            label5.innerText = "方位を選択して頂点と距離を入力";
            label5.setAttribute("for", "setDistance");

            // 方位を選択
            const selectDirection = document.createElement("select");
            selectDirection.id = "selectDirection";
            // 選択肢のリスト
            const directionOptions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

            const directionOptions3 = directionOptions.map( (value)=> {
                // console.log("value", value);
                const direction = document.createElement("option");
                direction.value = value;
                direction.innerText = value;
                // directionOptions.push(direction);
                return direction;
            } )

            console.log("directionOptions3", directionOptions3);

            addOption(directionOptions3, selectDirection);

            // 頂点と距離を入力
            // ラベルを作成
            const label6 = document.createElement("label");
            label6.innerText = "頂点と距離を入力";

            // input要素を作成
            const setNodeAndCost = document.createElement("input");

            // ボタン要素の追加
            const inputNodeAndCost = document.createElement("button");
            inputNodeAndCost.id = "inputNodeAndCost";
            inputNodeAndCost.innerText = "input";
            inputNodeAndCost.setAttribute("type", "button");

            // ラベルに子要素を追加
            label6.appendChild(setNodeAndCost);
            label6.appendChild(inputNodeAndCost);

            // ラベルに子要素を追加
            label5.appendChild(selectDirection);

        // tableの内容から隣接行列を作る
        const createGraph = document.createElement("button");
        createGraph.id = "createGraph";
        createGraph.setAttribute("type", "button");
        createGraph.innerText = "createGraph";


        // fieldsetに子要素を追加
        tableControl.appendChild(tableReset);
        tableControl.appendChild(tableAdd);
        tableControl.appendChild(label3);
        tableControl.appendChild(recordSelect);
        tableControl.appendChild(br);
        tableControl.appendChild(label4);
        tableControl.appendChild(setDistance);
        tableControl.appendChild(inputDistance);
        tableControl.appendChild(br2);
        tableControl.appendChild(label5);
        tableControl.appendChild(label6);
        tableControl.appendChild(createGraph);


    // formへの要素追加
    form.appendChild(button);
    form.appendChild(button1);
    form.appendChild(button2);
    form.appendChild(button3);
    form.appendChild(label0);
    form.appendChild(selectStart);
    form.appendChild(label1);
    form.appendChild(selectVia);
    form.appendChild(label2);
    form.appendChild(selectGoal);
    form.appendChild(radio);
    form.appendChild(br3);
    form.appendChild(tableControl);

    // BODYへ要素追加
    BODY.appendChild(canvas0);
    BODY.appendChild(form);
    BODY.appendChild(table);

// 
// 入力部
// 

    // Treeクラスの用意

        // TreeNode
        class TreeNode {
            constructor(value){
                // value
                this.value = value;
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
                // 一番先頭の値が探していた値ならそれを返す
                if(id == current.value.id){ return current }
                // 見つからなければ枝を辿っていく
                // 探索する回数の上限
                let limit = this.root.value.distance.length ** 2;
                while(limit > 0){

                    let directions1 = Array.from(directions).filter( (d)=> current[d] != null );

                    for(let direction of directions1){
                        // 探している頂点のidと一致したらcurrentの値を返す                        
                        if(current[direction].value.id == id){
                            return current[direction];
                        }
                        // 全ての方位を探索したらcurrentの値を更新する
                        else if(direction == directions1[directions1.length - 1]){
                            // console.log("all serched!");
                            current = current[directions1[0]];
                            // console.log("current", current);
                            break;
                        }
                        // 一致しなければcurrent内の別の方位を探す
                        else{
                            // console.log("continue!", direction);
                            continue;
                        }
                    
                    }
                    limit --;
                }

            return false;

            }

        }


    // 隣接行列のデータ
    const graph = [

        [0, 2, 3, -1, -1, -1], // 点0 点1,2と接する
        [2, 0, -1, 6, -1, -1], // 点1　点0,2,3と接する
        [3, -1, 0, 4, -1, -1], // 点2　点0,3と接する
        [-1, 6, 4, 0, 5, 3], // 点3　点1,2,4,5と接する
        [-1, -1, -1, 5, 0, 2], // 点4　点3,5と接する
        [-1, -1, -1, 3, 2, 0], // 点5　再右端　点3,4と接する

    ];

    // 第二の隣接行列のデータ
    const graph1 = [

        [0, 2, 3, -1, -1, -1, -1], // 頂点0　再左端　頂点1,2と接する
        [2, 0, 4, 5, -1, -1, -1], // 頂点1　頂点0,2,3と接する
        [3, 4, 0, 2, -1, -1, -1], // 頂点2　頂点0,1,3と接する
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

            // 中継点
            for(let option = 0; option <= graph.length - 1; option++){
                viaOptions[option] = document.createElement("option");
                viaOptions[option].value = option;
                viaOptions[option].innerText = option;
            }

            // 初期化
            selectVia.textContent = null;
            // 子要素の追加
            addOption(viaOptions, selectVia);
            
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

    // セレクトボックスの選択肢を設定
    setSelects(graph1);

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
                console.log("distance", distance);
                console.log(`distance ${node.id} to ${next[1]}`, distance[node.id]);
                console.log(`distance ${next[0]} to ${next[1]}`, distance[next[0]]);
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
                console.log("nextDirection2",nextDirection2);
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

    // 動作確認

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

    drawGraph(graph1);

