import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FileUploader from "@/components/forms/file-uploader";

vi.stubGlobal("XMLHttpRequest", class { open(){} send(){} upload:any={onprogress:()=>{}} readyState=4 status=200 responseText='{}' onreadystatechange:any=()=>{} });

describe("FileUploader", () => {
  it("affiche la zone de dépôt", () => {
    render(<FileUploader onUploaded={() => {}} />);
    expect(screen.getByRole("group", { name: /zone de dépôt du cv/i })).toBeInTheDocument();
  });
});
