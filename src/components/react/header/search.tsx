import { useEffect, useRef, useState } from "react";
import { Input } from "../../shadcn/ui/input";
import { useDebounce } from "@uidotdev/usehooks";

type SearchProps = {
  search?: string;
};

export const InputSearch = ({ search }: SearchProps) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [searchValue, setSearchValue] = useState(search || "");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    formRef.current?.requestSubmit();
  }, [debouncedSearchValue, searchValue]);

  return (
    <form
      ref={formRef}
      className="flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        anchorRef?.current?.click();
      }}
    >
      <a
        hidden
        ref={anchorRef}
        href={debouncedSearchValue ? `?search=${searchValue}` : "/"}
      />
      <Input
        value={searchValue}
        name="search"
        type="search"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for products..."
        className="rounded-2xl"
      />
    </form>
  );
};
