type PagePlaceholderProps = {
  title: string;
};

// Temporary route content used until each product area receives real UI.
export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f8f3] px-5">
      <h1 className="text-3xl font-semibold text-stone-950 sm:text-4xl">{title}</h1>
    </main>
  );
}
