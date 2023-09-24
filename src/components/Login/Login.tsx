import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAuth } from "../../redux/features/authSlice/authSlice";
import { AuthForm, AuthFormContainer } from "../../styles/FormStyles";
import { loginUser } from "../../redux/features/authSlice/authThunks";

interface UserInputs {
    login: string;
    password: string;
}

const userSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup.string().min(4).required(),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const authError = useAppSelector((state) => state.auth.authError);
  const handleAuth = async (data: UserInputs) => {
    await dispatch(loginUser(data));
    if (!authError) {
      navigate("/todos");
    }
  };

  return (
    <AuthFormContainer>
      <AuthForm onSubmit={handleSubmit(handleAuth)}>
        <label>Login</label>
        <input {...register("login")} />
        <p>{errors.login?.message}</p>
        <label>Password</label>
        <input type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
        <button type="submit">AUTH</button>
      </AuthForm>
    </AuthFormContainer>
  );
}

export default Login;
