import * as Yup from 'yup';

export const createPostValidationRules = (values) => {

  if(values.featured){
    return Yup.object().shape({
      category: Yup.string()
        .required('Please select category'),
      privacy: Yup.string()
        .required('Please select privacy'),
      description: Yup.string().max(150, "Description must be under 150 characters"),
      duration: Yup.number()
      .required('Please select challenge duration'),
      featured_url: Yup.string().required("Please enter webiste URL")
      .matches(
          /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Enter correct url!'
        )
    });
  }else{
    return Yup.object().shape({
      category: Yup.string()
        .required('Please select category'),
      privacy: Yup.string()
        .required('Please select privacy'),
      description: Yup.string().max(150, "Description must be under 150 characters")
    });
  }

}  

export const editPostRules = Yup.object().shape({
  desc: Yup.string().max(150, "Description must be under 150 characters")
});