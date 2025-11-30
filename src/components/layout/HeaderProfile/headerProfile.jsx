import { Button } from "@/components/ui/button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function HeaderProfile({ text }) {
  return (
    <header className="w-full h-fit border-b border-gray-300 lg:px-8 px-4 py-4 flex items-center gap-5 font-inter">
      <Button
        onClick={() => history.back()}
        className="rounded-full bg-neutral-100 text-neutral-400 lg:p-3 p-2 w-fit h-fit"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="xl" stroke="1" />
      </Button>
      <h3 className="text-2xl gradiasi-btn-merah text-transparent bg-clip-text font-semibold">
        {text}
      </h3>
    </header>
  );
}
