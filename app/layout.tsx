"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());


  return (
    <html lang="es">
      <head>
        {/*  <title> */}
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <DashboardLayout>{children}</DashboardLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}