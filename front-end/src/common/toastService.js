import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const ToastService = {
   
    successmsg: function(messageval) {
        toast.success(messageval, {
            position: "top-center",
            closeButton:false,
            autoClose: 2500,
            hideProgressBar: true,
            // closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    },
 
    warningmsg: function(messageval) {
        toast.warn(messageval, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    },
    warningmsg1: function(messageval) {
        toast.warn(messageval, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    },
 
    errormsg: function(messageval) {
        toast.error(messageval, {
            position: "top-center",
            closeButton:false,
            autoClose: 2500,
            hideProgressBar: true,
            // closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}
export default ToastService;