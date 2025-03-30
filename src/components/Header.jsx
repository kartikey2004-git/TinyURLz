import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../Context";
import useFetch from "@/hooks/Use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { loading, fn: fnLogout } = useFetch(logout);

  const { user, fetchUser } = UrlState();

  return (
    <>
      <nav className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-12 sm:h-14 lg:h-16" alt="Trimmer Logo" />
        </Link>

        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              className="text-sm sm:text-base"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 sm:w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={user?.user_metadata?.profile_pic}
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-gray-950 text-sm sm:text-base">
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4 w-full" color="#00eeff" />}
    </>
  );
};

export default Header;

// some changes in css for make it more responsive for all devices