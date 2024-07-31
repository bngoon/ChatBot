import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './Header.css'; // Assuming you have some styles for the header

export default function Header() {
  return (
    <header className="app-header">
      <div className="auth-buttons">
        <SignedOut>
          <SignInButton className="sign-in-button" />
        </SignedOut>
        <SignedIn>
          <UserButton className="user-button" />
        </SignedIn>
      </div>
    </header>
  );
}
