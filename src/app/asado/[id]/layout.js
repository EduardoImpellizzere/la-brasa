import Image from "next/image";
import Link from "next/link";
import "./layout.module.css";
import styles from "./layout.module.css";

export default async function Layout({ children, params }) {
  const { id } = await params;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link className={styles.logoLink} href={`/asado/${id}`}>
          <header className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
                src="/logo.svg"
                alt="La Brasa logo"
                width={60}
                height={60}
              />
            </div>
            <div className={styles.logoText}>
              La<span>Brasa</span>
            </div>
          </header>
        </Link>

        <nav className={styles.nav}>
          <Link className={styles.navLink} href={`/`}>
            + Nuevo Asado
          </Link>
          <span className={styles.navLabel}>Este asado</span>
          <Link className={styles.navLink} href={`/asado/${id}`}>
            Resumen
          </Link>
          <Link className={styles.navLink} href={`/asado/${id}/items`}>
            Quién lleva qué
          </Link>
          <Link className={styles.navLink} href={`/asado/${id}/gastos`}>
            Gastos
          </Link>
          <Link className={styles.navLink} href={`/asado/${id}/transporte`}>
            Transporte
          </Link>

          <span className={styles.navLabel}>Herramientas</span>
          <Link className={styles.navLink} href={`/asado/${id}/calculadora`}>
            Calculadora
          </Link>
          <Link className={styles.navLink} href={`/asado/${id}/cortes`}>
            Guía de cortes
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
