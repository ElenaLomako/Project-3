// Define endpoints
const Baseurl = "http://127.0.0.1:5007"
const residentialDir = "http://127.0.0.1:5007/api/v1.0/residential"
const commercialDir = "http://127.0.0.1:5007/api/v1.0/commercial"
const industrialDir = "http://127.0.0.1:5007/api/v1.0/industrial"
const transportationDir = "http://127.0.0.1:5007/api/v1.0/transportation"
const allSectorsDir = "http://127.0.0.1:5007/api/v1.0/all_sectors_combined"

// Fetch data
d3.json(allSectorsDir).then(function(data) {
    buildTable(data)
});

// Generate table
function buildTable(data) {
    // Parse sector data
    d3.json(allSectorsDir).then((data) => {
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
        let table = new Tabulator("#data-table", {
            layout:"fitColumns",
            pagination:"local",
            paginationSize: 5,
            movableColumns:true,
            paginationCounter:"rows",
            columns:[
                {title:"id", field:"id", width: 80, headerMenu:headerMenu},
                {title:"revenue (in USD)", field:"revenue", hozAlign:"right", sorter:"number", headerMenu:headerMenu},
                {title:"sales (in USD)", field:"sales", hozAlign:"right",  headerMenu:headerMenu},
                {title:"customer count", field:"customers", hozAlign:"right", headerMenu:headerMenu},
                {title:"price/kwh", field:"price", hozAlign:"right", headerMenu:headerMenu},
            ],
            data: data,
        })
    })
}

