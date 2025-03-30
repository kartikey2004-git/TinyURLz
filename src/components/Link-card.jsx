/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import useFetch from "@/hooks/Use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";


const LinkCard = ({ url, fetchUrls }) => {
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

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center mb-4 p-4 bg-gray-900 rounded-lg shadow-lg gap-4 md:gap-6">
      <img
        src={url?.qr}
        className="h-32 w-32 object-contain ring ring-blue-500"
        alt="Qr code"
      />

      <Link to={`/link/${url?.id}`} className="flex-1">
        <span className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 block hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-sm md:text-lg text-blue-500 mb-2 hover:underline cursor-pointer block">
        {`${baseUrl}${url?.custom_url || url?.short_url}`}
        </span>
        <span className="text-xs md:text-sm text-gray-400 break-all mb-2 block">
          {url?.original_url}
        </span>
        <span className="text-xs md:text-sm text-gray-500">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2 items-center mt-4 md:mt-0">
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

        <Button variant="ghost" onClick={() => fnDelete().then(() => fetchUrls())}>
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
