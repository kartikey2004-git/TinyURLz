/* eslint-disable react-hooks/exhaustive-deps */
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "../Context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  let [searchParams] = useSearchParams();

  const LongLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${LongLink ? `createNew=${LongLink}` : ""}`);
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="mt-20 flex flex-col items-center  ml-10 gap-10">
      <h1 className="text-3xl md:text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login first..."
          : "Login / Signup"}
        {/* searchParams.get() Returns the first value associated to the given search parameter. */}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 gap-2">
          <TabsTrigger
            className=" p-2 ml-6 border-gray-500 border-b-2 border-l-2 border-t-2 border-spacing-11 border-r-2 hover:bg-gray-800  transition ease-linear"
            value="login"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            className="p-2 mr-6 border-b-2 border-gray-500 border-r-2 border-t-2 border-l-2 border-spacing-11 hover:bg-gray-800"
            value="signup"
          >
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
