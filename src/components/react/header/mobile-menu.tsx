import type { CollectionEntry } from "astro:content";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../shadcn/ui/sheet";

type Item = CollectionEntry<"header">["data"];

type MobileMenuProps = {
  items: Item[];
};

export const MobileMenu = ({ items }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-full !max-w-none p-0">
        <SheetHeader className="fixed top-0 z-10 flex w-full flex-row items-center space-x-3 space-y-0 p-4 text-left">
          <SheetClose>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <nav className="fixed top-0 flex h-full w-full flex-col items-center justify-center space-y-6">
          {items.map((item) => (
            <div key={item.name}>
              <a
                href={item.link}
                className="block px-4 py-2 text-4xl font-semibold text-gray-700 hover:bg-gray-100"
              >
                {item.name}
              </a>
              {item.children && (
                <div className="flex flex-col items-center">
                  {item.children.map((child) => (
                    <a
                      key={`${item.name}-${child.name}`}
                      href={child.link}
                      className="block px-4 py-2 text-2xl font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
