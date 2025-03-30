import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 lg:px-12">
      <h2 className="my-8 sm:my-12 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-extrabold">
        The only URL shortener <br /> you&rsquo;ll ever need
      </h2>

      <form
        onSubmit={handleShorten}
        className="w-full sm:w-3/4 md:w-2/4 flex flex-col sm:flex-row gap-2 items-center"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your longggggggggggggg URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full sm:flex-1 py-3 sm:py-4 px-4 bg-transparent text-sm sm:text-base"
        />
        <Button
          className="mt-2 sm:mt-0 w-full sm:w-auto h-12 sm:h-full ml-0 sm:ml-4 bg-red-800"
          type="submit"
          variant="destructive"
        >
          Shorten!
        </Button>
      </form>

      <img src="/banner.jpeg" alt="banner" className="w-full my-8 md:my-11 md:px-6 lg:px-11" />

      {/* Adjust the accordion for mobile */}
      <Accordion
        type="multiple"
        collapsible
        className="w-full md:px-6 lg:px-11 text-sm sm:text-base"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How URL shortener works?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of it. This shortened URL will redirect to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is it free to use?</AccordionTrigger>
          <AccordionContent>
            Yes, it is completely free to use. You only need to sign up if you don’t have an account, or simply log in with your existing account.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Do I have to create an account to use?</AccordionTrigger>
          <AccordionContent>
            Yes, creating an account lets you manage your URLs, view analytics, and customize your shortened links.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;


// some changes in css for make it more responsive for all devices 