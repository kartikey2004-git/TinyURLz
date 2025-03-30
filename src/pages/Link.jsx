/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/Button.jsx";
import { UrlState } from "../Context.jsx";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/Location-stats";
import Device from "@/components/Device-stats";

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="p-4 lg:p-8">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="#36d7b7" />
      )}

      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-6 lg:w-2/5">
          <h1 className="text-3xl sm:text-5xl font-extrabold hover:underline cursor-pointer break-words">
            {url?.title}
          </h1>

          <a
            href={`${baseUrl}${link}`}
            target="_blank"
            className="text-lg sm:text-2xl md:text-xl text-blue-500 font-bold hover:underline break-all"
          >
            {`${baseUrl}${link}`}
          </a>

          <a
            className="flex items-center gap-1 text-blue-400 hover:underline cursor-pointer"
            href={url?.original_url}
            target="_blank"
          >
            <LinkIcon />
            {url?.original_url}
          </a>

          <span className="font-light text-sm text-gray-500">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          {/* Buttons */}
          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(`${baseUrl}${url?.short_url}`);
              }}
            >
              <Copy />
            </Button>

            <Button onClick={downloadImage}>
              <Download />
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>

          <img
            src={url?.qr}
            className="w-full lg:w-auto max-w-xs mt-6 ring ring-blue-500 p-1 rounded object-contain"
            alt="qr code"
          />
        </div>

        {/* Right Section (Stats) */}
        <Card className="lg:w-3/5 ">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-extrabold">
              Stats
            </CardTitle>
          </CardHeader>

          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold">{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />

              <CardTitle>Device Info</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics yet"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Link;
