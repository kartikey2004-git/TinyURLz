import { Button } from "@/components/ui/Button.jsx";
import { UrlState } from "../Context.jsx";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Download, LinkIcon, Trash, Copy, ExternalLink, Calendar, BarChart3, MapPin, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LocationStats from "@/components/Location-stats";
import Device from "@/components/Device-stats";

const Link = () => {
  const locationOrigin =
    typeof window !== "undefined" ? window.location.origin : "";

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
  const shortUrl = `${locationOrigin}/${link}`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {(loading || loadingStats) && (
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <BarLoader className="w-full" color="hsl(var(--primary))" height={2} />
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 mt-8">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black font-semibold tracking-tight break-words">
            {url?.title || "Loading..."}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Calendar className="h-4 w-4" />
            Created {url?.created_at ? new Date(url?.created_at).toLocaleDateString() : "..."}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/5"
            onClick={() => {
              fnDelete().then(() => navigate("/dashboard"));
            }}
            disabled={loadingDelete}
          >
            {loadingDelete ? <BeatLoader size={4} color="currentColor" /> : (
              <>
                <Trash className="h-4 w-4 mr-2" />
                Delete Link
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* URL Information Main Card */}
        <Card className="lg:col-span-2 shadow-none border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Link Details</CardTitle>
            <CardDescription className="text-xs">Direct access and redirection information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Short URL</label>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-bold text-primary truncate hover:underline"
                >
                  {shortUrl}
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Destination URL</label>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={url?.original_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground truncate hover:text-foreground transition-colors"
                >
                  {url?.original_url}
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => window.open(url?.original_url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* QR & Control Card */}
        <Card className="shadow-none border-border/50 flex flex-col items-center justify-center p-8 text-center gap-6">
          <div className="p-3 bg-background border border-border/50 rounded-xl overflow-hidden">
            <img
              src={url?.qr}
              alt="QR Code"
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="space-y-4 w-full">
            <Button
              variant="outline"
              className="w-full text-xs font-bold"
              onClick={downloadImage}
            >
              <Download className="h-3.5 w-3.5 mr-2" />
              Download QR
            </Button>
          </div>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Engagement Overviews</h2>

        {stats && stats.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1 shadow-none border-border/50 bg-muted/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-semibold">{stats.length}</div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-3 shadow-none border-border/50">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      Locations
                    </div>
                    <LocationStats stats={stats} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <Smartphone className="h-3.5 w-3.5" />
                      Devices
                    </div>
                    <Device stats={stats} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="p-16 text-center bg-muted/5 border-dashed border-border/50 shadow-none">
            <div className="flex flex-col items-center gap-3">
              <BarChart3 className="h-8 w-8 text-muted-foreground opacity-20" />
              <div className="space-y-1">
                <h3 className="font-bold text-base">No analytics yet</h3>
                <p className="text-xs text-muted-foreground">Start sharing your link to capture audience data.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Link;
