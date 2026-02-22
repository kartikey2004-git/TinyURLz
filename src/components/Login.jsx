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
import { Label } from "./ui/label";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/Use-fetch";
import { login } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";
import { Mail, Lock } from "lucide-react";

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
  }, [data, error, navigate, longLink, fetchUser]);

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
    <Card className="shadow-none border-border/50 bg-card">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-black font-semibold tracking-tight">Login</CardTitle>
        <CardDescription className="text-xs">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <Error message={error.message} />}
        
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</Label>
            <Button variant="link" className="px-0 h-auto text-[10px] font-bold text-muted-foreground hover:text-primary">
              Forgot?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          className="w-full h-10 font-bold shadow-sm"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <BeatLoader size={8} color="currentColor" /> : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
