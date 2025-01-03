"use client";

import FeedbackMessage from "@/components/common/feedback-message";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  const Schema = z.object({
    username: z.string({ required_error: t("username-required") }).min(1, t("username-required")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    setLoading(false);

    // If login was successful, redirect to the callback URL
    if (response?.ok) {
      router.replace(response.url || "/dashboard");
      return;
    }

    // Otherwise, display the error
    setError(response?.error || t("fallback-error-message"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4 flex flex-col gap-2.5">
        {/* Username */}
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label>{t("username")}</Label>

              {/* Input */}
              <Input {...field} placeholder={t("username-placeholder")} />

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label>{t("password")}</Label>

              {/* Input */}
              <Input type="password" {...field} placeholder={t("password-placeholder")} />

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit / Feedback */}
        <div className="mt-12 flex flex-col gap-2">
          {/* Feedback */}
          <FeedbackMessage>{error}</FeedbackMessage>

          {/* Submit */}
          <Button disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{t("login")}</Button>
        </div>
      </form>
    </Form>
  );
}
