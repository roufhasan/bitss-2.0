import { footerProducts } from "@/data/footerProducts";
import { hostingServers } from "@/data/hostingServers";
import { pages } from "@/data/pages";
import Link from "next/link";

function LinkGroup({ title, links }) {
  return (
    <div>
      <h6 className="font-['Barlow_Condensed'] text-[13px] font-black text-white uppercase tracking-widest mb-5">
        {title}
      </h6>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.name}>
            <Link
              href={l.link}
              target={l?.target ? l?.target : "_blank"}
              className="text-[13px] text-slate-400 hover:text-red-400 transition-colors"
            >
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinks() {
  return (
    <>
      <div className="lg:col-span-2">
        <LinkGroup title="Hosting Products" links={hostingServers} />
      </div>
      <div className="lg:col-span-3">
        <LinkGroup title="Other Products" links={footerProducts} />
      </div>
      <div className="lg:col-span-3">
        <LinkGroup title="Quick Links to BITSS" links={pages} />
      </div>
    </>
  );
}
