import CreateLink from "@/components/Create-link";
import Error from "@/components/Error";
import LinkCard from "@/components/Link-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "../Context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Search, Link as LinkIcon, MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksforUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-24">
      {(loading || loadingClicks) && (
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <BarLoader className="w-full" color="hsl(var(--primary))" height={2} />
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage and track your shortened URLs effectively.</p>
        </div>
        <CreateLink />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="shadow-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Links Created
            </CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{urls?.length || 0}</div>
          </CardContent>
        </Card>

        <Card className="shadow-none border-border/50 bg-muted/20">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Clicks
            </CardTitle>
            <MousePointer2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{clicks?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold tracking-tight">Active Links</h2>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-sm border-border/50 focus:border-primary/50 focus-visible:ring-0"
            />
          </div>
        </div>

        {error && <Error message={error?.message} />}

        <div className="grid grid-cols-1 gap-3">
          {filteredUrls?.length === 0 ? (
            <Card className="p-16 text-center border-dashed bg-muted/5 shadow-none border-border/50">
              <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base">No links found</h3>
                  <p className="text-xs text-muted-foreground">Adjust your search or create your first short URL.</p>
                </div>
              </div>
            </Card>
          ) : (
            (filteredUrls || []).map((url) => (
              <LinkCard key={url.id} url={url} fetchUrls={fnUrls} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
