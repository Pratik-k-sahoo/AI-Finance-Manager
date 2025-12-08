import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";

function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = null;
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    console.log(e);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    let error = Math.random() * (100 - 1) + 1;

    setTimeout(() => {
      if (error % 2 === 0)
        console.log(signupData.email, signupData.password, signupData.fullName);
      else error = "Error Occurred while signing in.";
    }, 5000);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created successfully!");
      navigate("/");
    }
    setLoading(false);
  };
  const form = useForm({
    defaultValues: {
      fName: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="min-h-screen bg-linear-to-br from-primary to-accent  flex items-center justify-center">
      <main className="container px-4 py-8 space-y-6 flex justify-center items-center">
        <Card className="w-3xl flex flex-col items-center justify-center gap-14 p-6">
          <span className="text-4xl font-medium tracking-wider bg-linear-to-r from-primary to-accent bg-clip-text text-transparent p-2">
            Login Page
          </span>
          <div className="w-3/4 tracking-wide">
            <form
              id="login-form"
              onSubmit={form.handleSubmit(handleLogin)}
              className="flex flex-col gap-4 items-center"
            >
              <FieldGroup>
                {signup && (
                  <Controller
                    name="fName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-lg" htmlFor="fName">
                          FullName:
                        </FieldLabel>
                        <Input
                          {...field}
                          className="w-full"
                          id="fName"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter Your FullName"
                        />
                      </Field>
                    )}
                  />
                )}

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-lg" htmlFor="email">
                        Email:
                      </FieldLabel>
                      <Input
                        {...field}
                        className="w-full"
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Email"
                      />
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-lg" htmlFor="password">
                        Password:
                      </FieldLabel>
                      <Input
                        {...field}
                        className="w-full"
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Password"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
              <p className="text-lg">
                New User?{" "}
                <Link
                  className="text-primary font-medium hover:underline underline-offset-2"
                  to={""}
                  onClick={() => setSignup(prev=>!prev)}
                >
                  Signup here
                </Link>
              </p>
              <button
                type="submit"
                className="border px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
              >
                Login
              </button>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Auth;
