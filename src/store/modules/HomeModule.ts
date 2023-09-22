import apiUrl from '../../api/url'
import link from '../../api/Link'

const HomeModule:Object={
  state:{
    navBool:false,
    dialogFormVisible:false,
    upListData:{},
    listdata:[],
  },
  mutations:{
    SET_NAV_BOOL(state:any){
      state.navBool=!state.navBool
    },
    SET_DIALOG(state:any,paylog:any){
      state.dialogFormVisible=true;
      state.upListData=paylog;
    },
    CLOSE_DIALOG(state:any){
      state.dialogFormVisible=false;
    },
    LIST_DATA(state:any,paylog:any){
      state.listdata=paylog
    },

  },
  actions:{
    USERUPDATA_LIST(context:any){
      link(apiUrl.userlist).then((ok: any) => {
        context.commit("LIST_DATA",ok.data)
      })
    },

    DEL_DATA(context:any,payload:any){
      link(apiUrl.userlist+"/"+payload.id,"delete").then((ok: any) => {
        console.log(ok);
        window.location.reload()
      })
    }
  },
  getters:{

  }
}

export default HomeModule
