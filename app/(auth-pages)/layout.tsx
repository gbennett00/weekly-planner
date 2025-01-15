export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-grow gap-12 items-center justify-center">{children}</div>
  );
}
