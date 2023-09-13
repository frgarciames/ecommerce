import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/shadcn/ui/navigation-menu";
import { Menu, UserCircle2 } from "lucide-react";
import type { CollectionEntry } from "astro:content";
import { useEffect, useRef, useState } from "react";
import { InputSearch } from "./search";
import { Cart } from "./cart";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { User } from "./user";

type Item = CollectionEntry<"header">["data"];

type NavigationProps = {
  items: Item[];
  search?: string;
};
export const Header = ({ items, search }: NavigationProps) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const lastScrollTopRef = useRef(lastScrollTop);

  const handleScroll = () => {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    setVisible(currentScrollTop < lastScrollTopRef.current);
    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    lastScrollTopRef.current = lastScrollTop;
  }, [lastScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn("sticky top-0 z-10 transition-all duration-500", {
        "top-0": visible,
        "-top-1/4": !visible,
      })}
    >
      <div className="bg-white md:border-b-[1px] md:px-8 md:py-4 md:shadow">
        <div
          className="m-auto flex w-full max-w-6xl items-center justify-between space-x-4 p-4 md:p-0"
          id="main-header"
        >
          <ul className="flex items-start space-x-3 md:space-x-0">
            <li className="md:hidden">
              <MobileMenu items={items} />
            </li>
            <li>
              <a href="/">SHOP.CO</a>
            </li>
          </ul>
          <NavigationMenu>
            <NavigationMenuList className="hidden space-x-3 md:flex">
              {items.map((item) => {
                if (item.children) {
                  return (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {item.children.map((child) => (
                          <NavigationMenuLink
                            key={`${item.name}-${child.name}`}
                            href={child.link}
                            className="whitespace-nowrap"
                          >
                            {child.name}
                          </NavigationMenuLink>
                        ))}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
                return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      href={item.link}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-8 mr-4 hidden w-full flex-1 md:block">
            <ul className="block">
              <li>
                <InputSearch search={search} />
              </li>
            </ul>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex justify-end space-x-3">
              <li>
                <Cart />
              </li>
              <li>
                <User />
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-4 shadow md:hidden">
          <InputSearch search={search} />
        </div>
      </div>
    </header>
  );
};
