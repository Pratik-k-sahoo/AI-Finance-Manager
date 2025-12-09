import { useState, useEffect, useId } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { Input } from "@/components/ui/input";
import { account } from "@/lib/appWrite";
import { useDispatch } from "react-redux";
import { login, setSession } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function Auth() {
  const navigate = useNavigate();
  const { reason } = useParams();
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(reason === "login" ? false : true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (reason) {
      setSignup(reason === "login" ? false : true);
    }
  }, [user, navigate, reason]);

  const handleLogin = async (e) => {
    try {
      const session = await account.createEmailPasswordSession({
        email: e.email,
        password: e.password,
      });
      const userData = await account.get();
      dispatch(setSession(session));
      dispatch(login(userData));
      console.log(userData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    const userId = crypto.randomUUID();
    console.log(userId);
    try {
      const result = await account.create({
        userId,
        email: e.email,
        name: e.fName,
        password: e.password,
      });

      const userData = { ...result.targets[0], name: e.fName };
      console.log(userData);
      dispatch(login(userData));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
            {!signup && (
              <form
                id="login-form"
                onSubmit={form.handleSubmit(handleLogin)}
                className="flex flex-col gap-4 items-center"
              >
                <FieldGroup>
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
                    onClick={() => setSignup((prev) => !prev)}
                  >
                    Signup here
                  </Link>
                </p>
                <button
                  type="submit"
                  className="border px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  Signup
                </button>
              </form>
            )}

            {signup && (
              <form
                id="signup-form"
                onSubmit={form.handleSubmit(handleSignup)}
                className="flex flex-col gap-4 items-center"
              >
                <FieldGroup>
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
                  Old User?{" "}
                  <Link
                    className="text-primary font-medium hover:underline underline-offset-2"
                    to={""}
                    onClick={() => setSignup((prev) => !prev)}
                  >
                    Login here
                  </Link>
                </p>
                <button
                  type="submit"
                  className="border px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  Signup
                </button>
              </form>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Auth;
