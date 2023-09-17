import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setAuth } from "../../redux/features/authSlice/authSlice";
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AuthForm, AuthFormContainer, HaveAccountButton } from "../../styles/FormStyles";

const CustomInput = styled(TextField)({
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    '.Mui-error': {
        border: '4px solid red'
    }
})

interface RegisterInput {
    email: string;
    login: string;
    password: string;
    passwordCheck?: string;
}

const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    login: yup.string().required(),
    password: yup.string().min(4).required(),
    passwordCheck: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(registerSchema),
    });
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRegister = (data: RegisterInput) => {
        if (data.login === "admin" && data.password === "test123") {
            dispatch(setAuth(true))
            navigate("/todos");
        }
        reset()
    };

    const handleHaveAccount = () => {
        navigate("/login");
    }
  return (
    <AuthFormContainer>
        <AuthForm onSubmit={handleSubmit(handleRegister)}>
            <label>Email</label>
            <input {...register("email")} />
            <p>{errors.email?.message}</p>
            <label>Login</label>
            <input {...register("login")} />
            <p>{errors.login?.message}</p>
            <label>Password</label>
            <input type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
            <label>Password Check</label>
            <input type="password" {...register("passwordCheck")} />
            <p>{errors.passwordCheck?.message}</p>
            <button type="submit">REGISTER</button>
        </AuthForm>
        <HaveAccountButton onClick={handleHaveAccount}>Already have an account?</HaveAccountButton>
    </AuthFormContainer>
  )
}

export default Register