import { ClerkProvider } from "@clerk/nextjs";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return children;

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6aafa0",
          colorBackground: "#151613",
          colorForeground: "#ebe7dc",
          colorMutedForeground: "#aaa397",
          borderRadius: "0.25rem",
          fontFamily: "var(--font-geist-sans)",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
