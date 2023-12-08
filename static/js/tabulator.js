// Define endpoint
const url = "";

// Fetch data
d3.json(url).then(function(data) {
    buildTable(data)
});

// Generate table
function buildTable(sector) {
    // Parse sector data
    d3.json(url).then((data) => {
        let rowMenu = [
            {
                label:"<i class='fas fa-user'></i> Change Name",
                action:function(e, row){
                    row.update({name:"Steve Bobberson"});
                }
            },
            {
                label:"<i class='fas fa-check-square'></i> Select Row",
                action:function(e, row){
                    row.select();
                }
            },
            {
                separator:true,
            },
            {
                label:"Admin Functions",
                menu:[
                    {
                        label:"<i class='fas fa-trash'></i> Delete Row",
                        action:function(e, row){
                            row.delete();
                        }
                    },
                    {
                        label:"<i class='fas fa-ban'></i> Disabled Option",
                        disabled:true,
                    },
                ]
            }
        ]

//define column header menu as column visibility toggle
        let headerMenu = function(){
            let menu = [];
            let columns = this.getColumns();

            for(let column of columns){

                //create checkbox element using font awesome icons
                let icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

                //build label
                let label = document.createElement("span");
                let title = document.createElement("span");

                title.textContent = " " + column.getDefinition().title;

                label.appendChild(icon);
                label.appendChild(title);

                //create menu item
                menu.push({
                    label:label,
                    action:function(e){
                        //prevent menu closing
                        e.stopPropagation();

                        //toggle current column visibility
                        column.toggle();

                        //change menu item icon
                        if(column.isVisible()){
                            icon.classList.remove("fa-square");
                            icon.classList.add("fa-check-square");
                        }else{
                            icon.classList.remove("fa-check-square");
                            icon.classList.add("fa-square");
                        }
                    }
                });
            }

            return menu;
        };

//initialize table
        let table = new Tabulator("#example-table", {
            height:"311px",
            layout:"fitColumns",
            rowContextMenu: rowMenu, //add context menu to rows
            columns:[
                {title:"id", field:data.id, headerMenu:headerMenu},
                {title:"revenue", field:data.revenue, hozAlign:"right", sorter:"number", headerMenu:headerMenu},
                {title:"sales", field:data.sales, headerMenu:headerMenu},
                {title:"customers", field:data.customers, hozAlign:"center", headerMenu:headerMenu},
                {title:"price", field:data.price, headerMenu:headerMenu},
            ],
        })


}