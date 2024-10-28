import { mockSession, mockUseSession } from "./session-mock";
import { mockSignIn, mockSignOut } from "./auth-mock";

jest.mock("next-auth/react", () => ({
  useSession: mockUseSession,
  signIn: mockSignIn,
  signOut: mockSignOut,
}));

export { mockSession, mockUseSession, mockSignIn, mockSignOut };
