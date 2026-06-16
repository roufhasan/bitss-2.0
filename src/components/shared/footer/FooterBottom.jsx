import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";

const SOCIALS = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61589785586144",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/showcase/website-administration-database-protection-cybersecurity/?viewAsMember=true",
  },
  { icon: Youtube, href: "https://www.youtube.com/@BitssCyberSecurity" },
];

export default function FooterBottom() {
  const year = new Date().getFullYear();

  return (
    <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
      <p className="text-[12px] text-slate-400 text-center sm:text-left">
        © {year} BFIN Company. All rights reserved · 8 rue de Dublin, 34200,
        Sète, France.
      </p>
      <div className="flex items-center gap-5">
        {SOCIALS.map(({ icon: Icon, href }) => (
          <Link
            key={href + Icon.displayName}
            href={href}
            target="_blank"
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Icon size={18} />
          </Link>
        ))}
      </div>
    </div>
  );
}
