type RoiPoweredLinkProps = {
  className?: string;
  prefix?: string;
};

export function RoiPoweredLink({ className, prefix = "Powered by" }: RoiPoweredLinkProps) {
  return (
    <p className={className}>
      {prefix}{" "}
      <a
        href="https://roigpt.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-ink/72 underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-accent/45"
      >
        roigpt.com
      </a>
      .
    </p>
  );
}
