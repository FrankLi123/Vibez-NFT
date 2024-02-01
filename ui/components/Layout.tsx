import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container flex flex-col items-center min-h-screen p-4 mx-auto max-w-7xl">
      <Navbar />
      {children}

    </div>
  )
}
