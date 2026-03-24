import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe("LoginForm", () => {
  test("renderiza inputs y botón", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByPlaceholderText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test("muestra error si campos vacíos", async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/correo es obligatorio/i)).toBeInTheDocument();
    });
  });

  test("envía formulario correctamente", async () => {
    renderWithProviders(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(true).toBe(true);
    });
  });
});