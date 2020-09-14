
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
                td.innerHTML = "0";
                // 方位入力欄にクラス名を追加
                if(i >= 11 - 7){
                    td.className = directions[i - 4];
                    td.innerHTML = "<input></input>";
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
    button.innerHTML = "draw shortestpath";

    // リセットボタン
    const button1 = document.createElement("button");
    button1.id = "button1";
    button1.setAttribute("type", "button");
    button1.innerHTML = "reset";

    // 経路図再設定ボタン
    const button2= document.createElement("button");
    button2.id = "button2";
    button2.setAttribute("type", "button");
    button2.innerHTML = "selectbox setting";

    // 消去ボタン
    const button3 = document.createElement("button");
    button3.id = "button3";
    button3.setAttribute("type", "button");
    button3.innerHTML = "graph delete";

    // テストボタン
    const button4 = document.createElement("button");
    button4.id = "button4";
    button4.setAttribute("type", "button");
    button4.innerHTML = "test";

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

            // console.log("directionOptions3", directionOptions3);

            addOption(directionOptions3, selectDirection);

            // 頂点と距離を入力
            // ラベルを作成
            const label6 = document.createElement("label");
            label6.id = "label6";
            label6.innerText = "頂点と距離を入力";

            // input要素を作成
            const setNodeAndCost = document.createElement("input");
            setNodeAndCost.id = "setNodeAndCost";

            // input要素を作成
            const setCost = document.createElement("input");
            setCost.id = "setCost";

            // ボタン要素の追加
            const inputNodeAndCost = document.createElement("button");
            inputNodeAndCost.id = "inputNodeAndCost";
            inputNodeAndCost.innerText = "input";
            inputNodeAndCost.setAttribute("type", "button");

            // ラベルに子要素を追加
            label6.appendChild(setNodeAndCost);
            label6.appendChild(setCost);
            label6.appendChild(inputNodeAndCost);

            // ラベルに子要素を追加
            label5.appendChild(selectDirection);

        // tableの内容から隣接行列を作る
        const createGraph = document.createElement("button");
        createGraph.id = "createGraph";
        createGraph.setAttribute("type", "button");
        createGraph.innerText = "createGraph";

        // 方位の自動設定機能
        // フィールドセット作成
        const radio1 = document.createElement("fieldset");
        radio1.id = "radio1";
        radio1.innerHTML = "<legend>方位自動設定</legend><label>on</label><label>off</label>";

            // 子要素の作成(on)
            const radio1On = document.createElement("input");
            radio1On.id = "radio1On";
            radio1On.setAttribute("type", "radio");
            radio1On.name = "switchOnOff1";

            // 子要素の作成(off)
            const radio1Off = document.createElement("input");
            radio1Off.id = "radioOff";
            radio1Off.setAttribute("type", "radio");
            radio1Off.name = "switchOnOff1";
            radio1Off.checked = true;
        
        // 親要素radio1への追加
        radio1.childNodes[1].appendChild(radio1On);
        radio1.childNodes[2].appendChild(radio1Off);


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
        tableControl.appendChild(radio1);
        tableControl.appendChild(createGraph);


    // formへの要素追加
    form.appendChild(button);
    form.appendChild(button1);
    form.appendChild(button2);
    form.appendChild(button3);
    form.appendChild(button4);
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

// 入力された値を処理もしくは管理する

    // 入力された値を管理するデータ構造のクラス

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


    // 隣接行列
        const graph = [

            [0, 2, 3, -1, -1, -1], // 点0 点1,2と接する
            [2, 0, -1, 6, -1, -1], // 点1　点0,2,3と接する
            [3, -1, 0, 4, -1, -1], // 点2　点0,3と接する
            [-1, 6, 4, 0, 5, 3], // 点3　点1,2,4,5と接する
            [-1, -1, -1, 5, 0, 2], // 点4　点3,5と接する
            [-1, -1, -1, 3, 2, 0], // 点5　再右端　点3,4と接する

        ];

        // 第二の隣接行列
        const graph1 = [

            [0, 2, 3, -1, -1, -1, -1], // 頂点0　再左端　頂点1,2と接する
            [2, 0, 4, 5, -1, -1, -1], // 頂点1　頂点0,2,3と接する
            [3, 4, 0, 2, -1, -1, -1], // 頂点2　頂点0,1,3と接する
            [-1, 5, 2, 0, 2, 4, -1], // 頂点3　頂点1,2,4,5と接する
            [-1, -1, -1, 2, 0, 7, 5], // 頂点4　頂点3,5,6と接する
            [-1, -1, -1, 4, 7, 0, 3], // 頂点5　頂点3,4,6と接する
            [-1, -1, -1, -1, 5, 3, 0], // 頂点6　再右端 頂点4,5と接する

        ];

    // 可変式の隣接行列のデータ
    let graphV = graph1;


    // セレクトボックスの選択肢を再設定
    function setSelects(graph) {


            // 各選択肢の初期化
            startOptions.splice(0, startOptions.length - 1);
            viaOptions.splice(0, viaOptions.length - 1);
            goalOptions.splice(0, goalOptions.length - 1);

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


    // 方位自動設定
    function directionSet(e) {
        // 基準となる座標を基にクリックした座標との相対的な方位を計算

        const point1x = +table.childNodes[ +recordSelect.value + 1].childNodes[1].innerText;
        const point1y = +table.childNodes[ +recordSelect.value + 1].childNodes[2].innerText;
        // 基準となる座標を表示
        console.log("point1", point1x, point1y);
        // クリックした座標を表示
        console.log("point2", e.offsetX, e.offsetY);

        // 相対的な方位を計算
            // point1とpoint2の差を計算
            const difX = e.offsetX - point1x;
            const difY = e.offsetY - point1y;

            // 差を表示
            console.log("difX", difX);
            console.log("difY", difY);

            // 方位を設定
            let direction = "";
            const directionS = Math.atan2( difY, difX);
            // const directionS = Math.acosh(difY);
            console.log("directionTan", directionS);
            const deg = directionS / Math.PI * 180;
            // const deg = -directionTan / Math.PI * 180;
            console.log("deg", deg);

            // 方位を設定
            // 北 -90 -112~-90~-45
            if(deg >= -112 && deg <= -68){ direction = "N" }
            // 北東 -45 -68~-45~-22
            else if(deg >= -68 && deg <= -22){ direction = "NE" }
            // 東 0 -45~0~45
            else if(deg <= 22 && deg >= -22){ direction = "E" }
            // 南東 45 22~45~68
            else if(deg <= 68 && deg >= 22){ direction = "SE" }
            // 南 90 45~90~135
            else if(deg <= 135 && deg >= 45){ direction = "S" }
            // 南西　135 112~135~158
            else if(deg <= 158 && deg >= 112){ direction = "SW" }
            // 西 180 135~180
            else if(deg <= 180 && deg >= 112){ direction = "W" }
            // -180 -180~-158
            else if(deg <= -158 && deg >= -180){ direction = "W" }
            // 北西　-135 -112~-135~-158
            else if(deg >= -158 && deg <= -112){ direction = "NW" }

            // 方位を設定
            console.log("direction", direction);
            selectDirection.value = direction;

    }
