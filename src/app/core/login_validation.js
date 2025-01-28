import * as Yup from "yup";
const login_validation =  Yup.object({
    
    emailid:Yup.string().required("Email is required").email("Invalid email address"),
    password:Yup.string().required("Password is required")
})

export default login_validation