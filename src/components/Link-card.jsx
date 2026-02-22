import { Link } from "react-router-dom";
import { Copy, Download, Trash, ExternalLink, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import useFetch from "@/hooks/Use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
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

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const shortUrl = `${locationOrigin}/${url?.custom_url || url?.short_url}`;

  return (
    <Card className="shadow-none border-border/50 bg-card/50 hover:bg-muted/5 transition-colors">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row gap-6 p-5">
          {/* QR Section */}
          <div className="flex-shrink-0">
            <Link to={`/link/${url?.id}`} className="block rounded-lg border border-border/50 bg-background p-2">
              <img
                src={url?.qr}
                className="h-24 w-24 object-contain"
                alt="QR code"
              />
            </Link>
          </div>

          {/* Content Section */}
          <div className="flex-grow min-w-0 space-y-2.5">
            <div className="space-y-1">
              <Link to={`/link/${url?.id}`} className="inline-block max-w-full">
                <h3 className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors truncate">
                  {url?.title || "Untitled Link"}
                </h3>
              </Link>
              <div 
                className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline cursor-pointer truncate"
                onClick={() => window.open(shortUrl, '_blank')}
              >
                {shortUrl}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
              <ExternalLink className="h-3 w-3 shrink-0" />
              <span className="truncate">{url?.original_url}</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              <Calendar className="h-3 w-3" />
              {new Date(url?.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex sm:flex-col items-center justify-end gap-2 sm:pl-6 sm:border-l border-border/50">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              title="Copy Link"
            >
              <Copy className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={downloadImage}
              title="Download QR"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
              onClick={() => fnDelete().then(() => fetchUrls())}
              disabled={loadingDelete}
              title="Delete Link"
            >
              {loadingDelete ? (
                <BeatLoader size={4} color="currentColor" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
