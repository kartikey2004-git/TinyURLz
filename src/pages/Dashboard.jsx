import CreateLink from "@/components/Create-link";
import Error from "@/components/Error";
import LinkCard from "@/components/Link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "../Context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Filter } from "lucide-react";
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
    <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7b7" />}

      {/* Display stats like total links created and total clicks */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl">{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-0">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative w-full">
        <Input
          className="bg-transparent mb-8 w-full pl-4 pr-12 py-2 sm:py-3 text-sm sm:text-base"
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Filter icon positioned correctly */}
        <Filter className="absolute top-1/3 right-4 transform -translate-y-1/2 text-gray-500" />
      </div>

      {error && <Error message={error?.message} />}
      
      <div className="grid grid-cols-1 gap-4">
        {(filteredUrls || []).map((url, id) => {
          return <LinkCard key={id} url={url} fetchUrls={fnUrls} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
