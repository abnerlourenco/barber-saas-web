export function ensureAuthenticated<
  T extends { user?: { id?: string } } | null | undefined,
>(
  status: string | undefined,
  sessionData: T,
  onUnauthenticated?: () => void,
): T | null {
  if (status !== "authenticated" || !sessionData?.user?.id) {
    onUnauthenticated?.()
    return null
  }

  return sessionData
}
