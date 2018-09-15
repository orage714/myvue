Vue.component('to_do', {
    template:
     ` <div class="box">
    <div class="input">
        <input type="text" placeholder="请输入内容" v-model="text" @keyup.13="add()">
    </div>
    <div class="btns mar-t-5">
        <input type="button" :class="{bg:status=='all'}" value="全部" @click="changestatus('all')">
        <input type="button" value="未完成" :class="{bg:status=='0'}"  @click="changestatus('0')">
        <input type="button" value="已完成" :class="{bg:status=='1'}"  @click="changestatus('1')">
    </div>
    <ul class="list" v-for="item in datas">
        <li key={{item.id}} >
                <div v-if="item.edit==true">
                        <span @click="changeState(item)" :class="{bg:item.state=='1'}"></span >
                    <p v-cloak @dblclick="edit(item)">{{item.text}}</p>
                    <span @click="del(item.id)">删除</span>
                </div>
                <div v-else>
                    <input type="text" v-model="item.text" @blur="edit(item)" height="30px" style="border-radius:5px">
                </div>
      
            
        </li>
    </ul>
    <p v-if="arr.length==0">请添加数据</p>
</div> `,
    data: function () {
        return {
            //有内容就存在本地
            arr: localStorage.todo?JSON.parse( localStorage.todo):[],
            text: "",
            status: "all"
        }    
    },
    methods: {
        add: function () { 
            console.log(this.arr)
            var obj = {};
            obj.text = this.text.replace(/\s+/g, "");
            if (!obj.text) {
                alert("请添加有效信息");
                return;
            }
            obj.id = Math.random() + new Date().getTime();
            obj.state = '0';
            obj.edit = true;
             this.arr.push(obj);
            this.text = "";
            localStorage.todo = JSON.stringify(this.arr);
            console.log(this.arr)
        },
        changestatus: function (val) {
            this.status = val;  
            // localStorage.todo = JSON.stringify(this.arr);
        },
        changeState: function (obj) { 
            obj.state = obj.state == 0 ? 1 : 0;
            console.log(obj.state);
            localStorage.todo = JSON.stringify(this.arr);
        },
        del: function (id) {
           this.arr= this.arr.filter( (obj)=> {
               if (obj.id !== id) return obj;
            })
            localStorage.todo = JSON.stringify(this.arr);
        },
        edit: function (item) { 
            console.log(item.edit)
            item.edit = !item.edit;
            localStorage.todo = JSON.stringify(this.arr);
        }
    },
    computed: {
        datas: function () { 
          return   this.arr.filter((obj) => { 
                if (this.status == 'all') {
                    return obj;
                } else { 
                    if (this.status == obj.state) {
                        return obj;
                     }
                }
            })
        }
        
    }

})