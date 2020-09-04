"use strict"

// 操作部

    // canvas0をクリックしたときにその座標を表示
    canvas0.addEventListener("click", (e)=>{

        // table要素に出力
        table.childNodes[ +recordSelect.value + 1].childNodes[1].innerText = e.clientX;
        table.childNodes[ +recordSelect.value + 1].childNodes[2].innerText = e.clientY;

    });


    // 表に列を追加
    addRecorde(num);
    tableAdd.addEventListener("click", ()=>{
        // idが`tr${num}`の列を追加
        addRecorde(num);
        num++;
        // 頂点番号を記入
        table.childNodes[num + 1].firstChild.innerText = num;
        // console.log("table.childNodes[num].firstChild", table.childNodes);
        // recordSelectの選択肢を更新
        // 子要素の作成
        for(let option = 0; option <= table.childNodes.length - 2; option++){
            recordOptions[option] = document.createElement("option");
            recordOptions[option].value = option;
            recordOptions[option].innerText = option;
        }
        // 初期化
        recordSelect.value = 0;
        // 子要素の追加
        addOption(recordOptions,recordSelect);

    } );

    // 表の列をリセット
    tableReset.addEventListener("click", ()=>{

        // 表のリセット
        // console.log("table.childNodes.length", table.childNodes.length);
        if(table.childNodes.length > 2){
            while(table.childNodes.length > 2){
                table.removeChild(table.childNodes[table.childNodes.length - 1]);
            }
            num = 0;         
        }

        // セレクトボックスのリセット
        while(recordSelect.childNodes.length > 1){
            recordSelect.removeChild(recordSelect.childNodes[recordSelect.childNodes.length - 1]);
        }

    });

    // input要素の内容を表の距離の項目に入力
    // ボタンを押すと入力
    inputDistance.addEventListener("click", ()=>{
        // console.log("distance!", setDistance.value);
        // 最新の表の列の距離の項目を入力
        // table.childNodes[table.childNodes.length - 1].childNodes[3].innerText = setDistance.value;
        // 列を選択して距離を入力
        table.childNodes[+recordSelect.value + 1].childNodes[3].innerText = setDistance.value;
    });

    // 表の内容から隣接行列を作る
    // 処理をまとめた関数
    function graphFromTable(table) {

        // 隣接行列
        const graph = [];

        // 座標リスト
        const cordinateList = [];

        // 表の内容を代入していく
        // 頂点番号
        for(let node = 1; node <= table.childNodes.length - 1; node++){
            console.log("node", table.childNodes[node]);
            // 座標
            const cordinateX = +table.childNodes[node].childNodes[1].innerText;
            const cordinateY = +table.childNodes[node].childNodes[2].innerText;
            cordinateList.push({x: cordinateX, y: cordinateY});
            // 距離
            let distance = table.childNodes[node].lastChild.innerText;
            console.log("distance", distance);
            distance = distance.split(',');
            distance = distance.map((value)=>{return +value} );
            console.log("distance", distance);
            graph.push(distance);
        }

        const nodeTree = addNodeTree(graph); 
        
        // graphに座標リストを添付
        nodeTree["cordinateList"] = cordinateList;

        // 
        nodeTree["graph"] = graph;

        console.log("graph", graph);
        console.log("nodeTree", nodeTree);
        return nodeTree;

    }

    // ボタンを押すと表の値を基に隣接行列を作成
    createGraph.addEventListener("click",()=> graphFromTable(table));