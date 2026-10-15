import Link from "next/link";

const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: `${base} bg-foreground text-background hover:opacity-90 focus-visible:outline-foreground`,
  secondary: `${base} border border-foreground/20 bg-transparent hover:bg-foreground/5 focus-visible:outline-foreground`,
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variants[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
