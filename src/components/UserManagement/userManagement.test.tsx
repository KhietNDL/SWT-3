// src/components/UserManagement/index.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserManagement from './index';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

// Mock the fetch API
window.fetch = vi.fn();

// Mock user data
const mockUsers = [
  {
    id: "1",
    userName: "testuser",
    fullname: "Test User",
    email: "test@example.com",
    phone: 1234567890,
    address: "123 Test St",
    roleName: "Student",
    imgUrl: ""
  },
  {
    id: "2",
    userName: "testuser2",
    fullname: "Test User2",
    email: "test2@example.com",
    phone: 2234567890,
    address: "1234 Test St",
    roleName: "StudentYes",
    imgUrl: ""
  }
];

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('UserManagement Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('fetches and displays users on component mount', async () => {
    // Mock the GET request to fetch users
    (window.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    // Verify the API call was made correctly
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('http://localhost:5199/Account');

    // Wait for the user data to be displayed in the table
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('1234567890')).toBeInTheDocument();
      expect(screen.getByText('123 Test St')).toBeInTheDocument();

      expect(screen.getByText('testuser2')).toBeInTheDocument();
      expect(screen.getByText('Test User2')).toBeInTheDocument();
    });
  });

  it('filters users when search term is entered', async () => {
    // Mock the GET request
    (window.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    // Find the search input and type in it
    const searchInput = screen.getByPlaceholderText('Search by username or full name...');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // The user should still be visible when searching for 'test'
    expect(screen.getByText('testuser')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'user2' } });
    expect(screen.getByText('testuser2')).toBeInTheDocument();

    // Now search for something that doesn't match
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    // User should no longer be visible
    expect(screen.queryByText('testuser')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'testuser2' } });
    expect(screen.queryByText('testuser')).not.toBeInTheDocument();
    expect(screen.queryByText('testuser2')).toBeInTheDocument();
  });

  it("navigates to register page when 'Add New User' is clicked", async () => {
    (window.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });
    
    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    const registerButton = screen.getByText("Add New User");
    fireEvent.click(registerButton);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

});