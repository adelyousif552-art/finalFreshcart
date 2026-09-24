import { useDispatch } from "react-redux"
import { setauth } from "../store/auth.slice"
import { deletetoken } from "../server/auth.server"
import { useRouter } from "next/navigation"

export default function useLogout(){
    const dispatch=useDispatch()
    const router=useRouter()

    const logout=async ()=>{
       await deletetoken()
        dispatch(setauth({isauthinticated:false,userinfo:null}))
        router.push('/login')
        router.refresh()



    }
    return {logout}

}