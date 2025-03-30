/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/Use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";

const Login = () => {
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await fnLogin();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card className="mt-8 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <CardHeader>
        <CardTitle className="text-base sm:text-xl lg:text-2xl break-words">
          Login
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm lg:text-base break-words">
          Login to your account if you already have one
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1 mb-5">
          <Input
            className="bg-transparent w-full"
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1">
          <Input
            className="bg-transparent w-full"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button className="border-2 w-full sm:w-auto truncate" onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#00eeff" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
