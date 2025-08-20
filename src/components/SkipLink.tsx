export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-accent-primary text-white px-4 py-2 rounded-md"
    >
      Skip to content
    </a>
  );
}

