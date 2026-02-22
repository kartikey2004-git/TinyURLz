import { UrlState } from "../Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Error from "./Error";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import useFetch from "@/hooks/Use-fetch";
import { QRCode } from "react-qrcode-logo";
import { CreateUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { Plus, Link as LinkIcon, Edit3, Globe } from "lucide-react";

const CreateLink = () => {
  const locationOrigin =
    typeof window !== "undefined" ? window.location.hostname : "";

  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const LongLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: LongLink ? LongLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(CreateUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data, navigate]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={LongLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="px-5 font-semibold shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-border bg-card shadow-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black font-semibold tracking-tight">New short link</DialogTitle>
          <DialogDescription className="text-xs">
            Generate a tiny URL and a unique QR code.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-2 space-y-6">
          {formValues?.longUrl && (
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-background border border-border rounded-lg shadow-sm">
                <QRCode value={formValues?.longUrl} size={100} ref={ref} />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">QR Preview</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Link Title
              </Label>
              <div className="relative">
                <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="title"
                  value={formValues.title}
                  placeholder="e.g. Summer Campaign"
                  onChange={handleChange}
                  className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
                />
              </div>
              {errors.title && <Error message={errors.title} />}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="longUrl" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Destination
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input
                  id="longUrl"
                  value={formValues.longUrl}
                  placeholder="https://example.com/very-long-url"
                  onChange={handleChange}
                  className="pl-9 h-10 bg-muted/20 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
              {errors.longUrl && <Error message={errors.longUrl} />}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customUrl" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                Custom Backhalf
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex h-10 items-center px-3 rounded-md bg-muted text-[11px] font-bold text-muted-foreground border border-border/50 whitespace-nowrap">
                  <Globe className="h-3 w-3 mr-2" />
                  {locationOrigin}/
                </div>
                <Input
                  id="customUrl"
                  value={formValues.customUrl}
                  onChange={handleChange}
                  placeholder="custom-slug"
                  className="h-10 bg-muted/20 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>
            {error && <Error message={error.message} />}
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button
            className="w-full h-11 font-semibold shadow-sm"
            disabled={loading}
            onClick={createNewLink}
          >
            {loading ? <BeatLoader size={8} color="currentColor" /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
