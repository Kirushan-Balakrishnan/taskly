import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./login.scss";
import ShowLogo from "../../assets/images/show.svg?react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
} from "reactstrap";
import { useAuth } from "../../providers/AuthProvider";
import Logo from "../../assets/images/logo.png";
import { LoginFormValues } from "../../types/Forms";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup.string().required("Required"),
  })
  .required();

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    setError,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await login(data);
    } catch (error) {
      setError("email", { message: "Incorrect credentials" });
      setError("password", { message: "Incorrect credentials" });
    }
    setLoading(false);
  };
  return (
    <div className="login">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="logo">
          <img alt="todoli" style={{ height: "7vh" }} src={Logo}></img>
        </div>
        <FormGroup style={{ width: "100%" }}>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            invalid={!!(errors.email && errors.email.message)}
            onBlur={() => trigger("email")}
            onChange={(e) => setValue("email", e.target.value)}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>{" "}
        <FormGroup style={{ width: "100%" }}>
          <InputGroup size="">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setValue("password", e.target.value)}
              onBlur={() => trigger("password")}
              invalid={!!(errors.password && errors.password.message)}
            />

            <Button outline type="button">
              <ShowLogo onClick={() => setShowPassword(!showPassword)} />
            </Button>
          </InputGroup>
          <FormFeedback>
            {errors.password && errors.password.message}
          </FormFeedback>
        </FormGroup>{" "}
        <Button disabled={loading} style={{ width: 200, marginTop: "1rem" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
