"use strict"

// 
// 操作部
// 

// ドキュメント部のスイッチ等の要素を操作した時に対応した処理を実行する
    // 実行する処理
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
    

    // イベント検知
    // ロードと同時に実行

        // tree1初期設定
        let tree1 = addNodeTree(graphV);
        tree1.graph = graph1;
        tree1.cordinateList = cordinateListFromTree(tree1, 20, 250);
        
        // 出発地点、経由地点、目的地のセレクトボックスを設定
        setSelects(tree1.graph);

        // 定数graph1を基に路線図を描画
        drawGraph(graphV);

        // セレクトボックスに最初の選択肢を追加
        let num = 0;
        recordSelect.value = 0;
        recordSelect.innerText = 0;
        recordOptions[0] = document.createElement("option");
        recordOptions[0].value = 0;
        recordOptions[0].innerText = 0;
        addOption(recordOptions,recordSelect);

        // 表に列を追加
        addRecorde(num);

    // HTML要素の状態が変化した時に実行

        // selectStartの値が変化したときに選択された値を表示
        selectStart.addEventListener("change", ()=>{
            context0.clearRect(0, 0, 60, 20);
            drawNumber(30, 10, selectStart.value, "rgb( 0, 0, 0)");
        });

        // selectGoalの値が変化したときに選択された値を表示
        selectGoal.addEventListener("change", ()=>{
            context0.clearRect(50, 0, 20, 20);
            drawNumber(60, 10, selectGoal.value, "rgb( 0, 0, 0)");
        });

        // selectDirectionの値が変化したときに実行
        selectDirection.addEventListener("change", ()=>{

            // 頂点及び距離の入力欄の値を選んだ項目の値に変更する
            // 表の列の中から選ばれた項目
            let selected;
            table.childNodes[+recordSelect.value + 1].childNodes.forEach( (node)=> {
                if(node.className == selectDirection.value){
                    selected = node;
                }
            } );
            
            console.log("selected td", selected);

            setNodeAndCost.value = selected.innerText ;

        })


    // HTML要素がクリックされた時に実行

        // 最短経路を算出
        button.addEventListener("click", ()=> drawShortestPath(tree1) );
    
        // 画面のリセット
        button1.addEventListener("click", ()=>{

            context0.clearRect(0, 0, 500, 500);
            drawGraphFromTree(tree1);

        } );

        // セレクトボックスの再設定
        button2.addEventListener("click", ()=>{
            console.log("tree1.graph", tree1.graph);
            setSelects(tree1.graph);
            }
        );

        // 画面の消去
        button3.addEventListener("click", ()=> context0.clearRect(0, 0, 500, 500));

        // テスト
        button4.addEventListener("click", ()=>{
            console.log("tree1", tree1);
            drawGraphFromTree(tree1);
        });

        // 表に列を追加
        tableAdd.addEventListener("click", ()=>{
            // idが`tr${num}`の列を追加
            addRecorde(num);
            num++;
            // 頂点番号を記入
            table.childNodes[num + 1].firstChild.innerText = num;
            // console.log("table.childNodes[num].firstChild", table.childNodes);
            // recordSelectの選択肢を更新
            // 初期化
            while(recordSelect.childNodes.length > 1){
                recordSelect.removeChild(recordSelect.childNodes[recordSelect.childNodes.length - 1]);
                // console.log("remove", recordSelect.childNodes[recordSelect.childNodes.length - 1]);
            }
            // 子要素の作成
            for(let option = 1; option <= table.childNodes.length - 2; option++){
                recordOptions[option] = document.createElement("option");
                recordOptions[option].value = option;
                recordOptions[option].innerText = option;
            }
            // 子要素の追加
            addOption(recordOptions,recordSelect);

            // セレクトボックスの値を更新
            recordSelect.value = num;

        } );

        // 表とセレクトボックスをリセット
        tableReset.addEventListener("click", ()=>{

            // 表のリセット
            // console.log("table.childNodes.length", table.childNodes.length);
            if(table.childNodes.length > 2){
                while(table.childNodes.length > 2){
                    table.removeChild(table.childNodes[table.childNodes.length - 1]);
                }
                num = 0;         
            }
            // 表の最後の列のリセット
            table.childNodes[1].childNodes.forEach( (node)=> node.childNodes[0].value = null )

            // セレクトボックスのリセット
            while(recordSelect.childNodes.length > 2){
                recordSelect.removeChild(recordSelect.childNodes[recordSelect.childNodes.length - 1]);
            }

        });

        // input要素の内容を表の距離の項目に入力
        // ボタンを押すと入力
        inputDistance.addEventListener("click", ()=>{
            // 列を選択して距離を入力
            table.childNodes[+recordSelect.value + 1].childNodes[3].innerText = setDistance.value;
        });

        // 各方位に頂点と距離を入力
        inputNodeAndCost.addEventListener("click", ()=>{

            // 表の列の中から選ばれた項目
            let selected;
            table.childNodes[+recordSelect.value + 1].childNodes.forEach( (node)=> {
                if(node.className == selectDirection.value){
                    selected = node;
                }
            } );
            
            console.log("selected td", selected);
            selected.firstChild.value = setNodeAndCost.value;

        } );

        // 表の値を基に隣接行列を作成
        createGraph.addEventListener("click",()=> tree1 = treeFromTable(table) );


    // 画面

        // canvas0をクリックしたときにその座標を設定
        canvas0.addEventListener("click", (e)=>{

            console.log(e);
            // 方位自動設定機能がoffの時のみ設定
            if(!radio1On.checked){
                // table要素に出力
                table.childNodes[ +recordSelect.value + 1].childNodes[1].innerText = e.offsetX;
                table.childNodes[ +recordSelect.value + 1].childNodes[2].innerText = e.offsetY;            
            }
            // 方位自動設定がonの時の処理
            else{ directionSet(e) }

        });

