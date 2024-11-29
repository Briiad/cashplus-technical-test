'use client'; 

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/hooks/useCurrentUser";


export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}