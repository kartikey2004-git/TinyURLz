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
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";
import { User, Mail, Lock, Camera } from "lucide-react";

const SignUp = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnSignUp } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading, navigate, longLink, fetchUser, data]);

  const handleSignUp = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignUp();
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
        <CardTitle className="text-xl font-black font-semibold tracking-tight">Create account</CardTitle>
        <CardDescription className="text-xs">
          Start shortening your links in seconds.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <Error message={error.message} />}
        
        <div className="space-y-1.5">
          <Label htmlFor="signup-name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="signup-name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="signup-email"
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
          <Label htmlFor="signup-password" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="profile_pic" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Profile Image</Label>
          <div className="relative">
            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              id="profile_pic"
              name="profile_pic"
              type="file"
              accept="image/*"
              className="pl-9 h-10 bg-muted/20 border-border/50 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-bold file:bg-muted file:text-foreground hover:file:bg-muted/80 cursor-pointer pt-2"
              onChange={handleInputChange}
            />
          </div>
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6">
        <Button
          className="w-full h-10 font-bold shadow-sm"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <BeatLoader size={8} color="currentColor" /> : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
