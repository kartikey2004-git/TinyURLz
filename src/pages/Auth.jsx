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
  }, [isAuthenticated, loading, navigate, LongLink]);

  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-32 px-4 gap-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black tracking-tight font-semibold sm:text-4xl">
          {searchParams.get("createNew")
            ? "Hold up! Let's login first"
            : "Welcome back"}
        </h1>
        <p className="text-muted-foreground text-sm">
          Join thousands of users shortening links with ShortenX.
        </p>
      </div>

      <Tabs defaultValue="login" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2 h-11">
          <TabsTrigger value="login" className="font-semibold px-8">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="font-semibold px-8">
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
