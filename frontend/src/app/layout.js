import Image from "next/image";
import Link from "next/link";

import logo from "../../public/hsg_icon.webp";

import "./globals.css";
import styles from "./layout.module.css";

export const metadata = {
  title: "Arrive SG: your move to St.Gallen, step by step",
  description:
    "A step-by-step checklist for students moving to St.Gallen to study at HSG, based on the official City, Canton and HSG pages.",
};

// viewportFit "cover" lets the page use the full screen on notched phones; globals.css pads for the safe areas.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <div className={`wrap ${styles.headerInner}`}>
            <Link href="/" className={styles.brand}>
              <Image src={logo} alt="" className={styles.logo} priority />
              Arrive SG
            </Link>
            <Link href="/profile/" className={`btn btn-outline ${styles.customise}`}>
              Customise profile
            </Link>
          </div>
        </header>

        <main className="wrap main">{children}</main>

        <footer className={styles.footer}>
          <div className="wrap">
            <p>
              Arrive SG is a student prototype. It is not an official service of HSG, the City of St.Gallen or the
              Canton of St.Gallen. Always check the linked official source before you act.
            </p>
            <p>Your answers and ticked-off steps are stored only in this browser.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
