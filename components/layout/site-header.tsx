"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button-link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { navigationItems } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="shell-container pt-4">
        <div className="glass-panel rounded-full px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Logo compact />

            <nav className="hidden items-center gap-1 lg:flex">
              {navigationItems.map((item) => {
                const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition",
                      active ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/6 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ButtonLink href={buildWhatsAppUrl()} target="_blank" variant="primary">
                Diagnóstico por WhatsApp
              </ButtonLink>
            </div>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10 lg:hidden"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="glass-panel mt-3 overflow-hidden rounded-[1.75rem] p-4 lg:hidden">
            <nav id="mobile-navigation" className="grid gap-2">
              {navigationItems.map((item) => {
                const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      active ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/8 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <ButtonLink
              href={buildWhatsAppUrl()}
              target="_blank"
              variant="primary"
              className="mt-4 w-full"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Pedir diagnóstico
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}
