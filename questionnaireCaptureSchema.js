import * as Yup from "yup";

 const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please Provide Email"),
    firstName: Yup.string().min(2).max(50).required("Please Provide First Name"),
    lastName: Yup.string().min(2).max(50).required("Please Provide First Name"),
  });

  export default schema

