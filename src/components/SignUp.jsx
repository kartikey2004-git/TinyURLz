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
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";

const SignUp = () => {
  // state for storing errors related to input validations
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  // function to change all our inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      // spread the previous state
      ...prevState,
      // set the new state
      [name]: files ? files[0] : value,
    }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  // get Returns the first value associated to the given search parameter.
  const longLink = searchParams.get("createNew");

  // there can be a case where user have this createNew search param on the url and we have to route then to dashboard with that particular search param , because we want to create new url now after logging in

  const { data, error, loading, fn: fnSignUp } = useFetch(signup, formData);

  const { fetchUser } = UrlState();

  // fn is actual function we are calling if we want to login or whatever we have to make the api calls

  useEffect(() => {
    console.log(data);
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);

      fetchUser();
    }
  }, [error, loading]);

  // validating the input

  const handleSignUp = async () => {
    setErrors([]);
    // try catch where we have the API calls
    try {
      // schema for validating our inputs
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      // abortEarly : Return from validation methods on the first error rather than after all validations run. Default - true

      await schema.validate(formData, { abortEarly: false });

      // api call

      await fnSignUp();
    } catch (e) {
      const newErrors = {};

      // Yup validation library humein ek error object milega jisme inner ke andar error hongi unpar forEach loop laga hai

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card className="mt-8 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <CardHeader>
        <CardTitle className="text-base sm:text-xl lg:text-2xl break-words">Signup</CardTitle>
        <CardDescription className="text-xs sm:text-sm lg:text-base break-words">
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>

      <CardContent className="space-y-2 ">
        <div className="space-y-1 mb-5">
          <Input
            className="bg-transparent"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-1 mb-5">
          <Input
            className="bg-transparent"
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1">
          <Input
            className="bg-transparent"
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-1">
          <Input
            className=""
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="">
        <Button className="border-2" onClick={handleSignUp}>
          {loading ? (
            <BeatLoader size={10} color="#00eeff" />
          ) : (
            "Create account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;