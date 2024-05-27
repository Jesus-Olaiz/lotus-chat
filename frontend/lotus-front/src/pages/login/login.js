import { Formik } from "formik";

const Login = (props) => {
  return (
    <div className='login-container'>
      <h1>Welcome!</h1>
      <h3>Please Login/Register</h3>
      <div className="form-container">
      <Formik
        initialValues={{ username: "", password: "", repeatPassword: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = "Required";
          } else if (values.username.length < 3) {
            errors.username =
              "Username must be equal to or longer than 3 characters";
          }

          if (
            !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )$/.test(
              values.password
            )
          ) {
            errors.password =
              "Password must contain atleast one digit, one uppercase letter, and one special character";
          }
          if (values.password !== values.repeatPassword) {
            errors.repeatPassword = "Passwords do not match";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        {({
          values,

          errors,

          touched,

          handleChange,

          handleBlur,

          handleSubmit,

          isSubmitting,

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type='username'
              name='username'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            {errors.email && touched.email && errors.email}

            <input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            {errors.password && touched.password && errors.password}

            <input
              type='password'
              name='repeatPassword'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatPassword}
            />

            {errors.repeatPassword &&
              touched.repeatPassword &&
              errors.repeatPassword}

            <button type='submit'>Login</button>
            <button type='submit'>Register</button>
          </form>
        )}
      </Formik>
      </div>
      <p>Made for fun: Jesus Olaiz</p>
    </div>
  );
};

export default Login;
