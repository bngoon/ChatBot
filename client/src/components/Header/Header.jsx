import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="auth-buttons">
        <SignedOut>
          {/* Displays the sign-in button when the user is not signed in */}
          <SignInButton mode="modal" className="sign-in-button" />
        </SignedOut>
        <SignedIn>
          {/* Displays user account management options when the user is signed in */}
          <UserButton className="user-button" />
        </SignedIn>
      </div>
    </header>
  );
}
