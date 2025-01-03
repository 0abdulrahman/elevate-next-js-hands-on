"use client";

import FeedbackMessage from "@/components/common/feedback-message";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { registerAction } from "@/lib/actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  const Schema = z
    .object({
      username: z
        .string({ required_error: t("username-required") })
        .min(1, t("username-required"))
        .min(2, t("username-min")),
      firstName: z
        .string({ required_error: t("firstname-required") })
        .min(1, t("firstname-required"))
        .min(2, t("firstname-min")),
      lastName: z
        .string({ required_error: t("lastname-required") })
        .min(1, t("lastname-required"))
        .min(2, t("lastname-min")),
      email: z
        .string({ required_error: t("email-required") })
        .min(1, t("email-required"))
        .email(t("email-invalid")),
      password: z
        .string({ required_error: t("password-required") })
        .min(1, t("password-required"))
        .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, t("password-invalid")),
      passwordConfirm: z.string({ required_error: t("password-confirm-required") }).min(1, t("password-confirm-required")),
    })
    .refine((values) => values.password === values.passwordConfirm, {
      message: t("password-confirm-mismatch"),
      path: ["passwordConfirm"],
    });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await registerAction(values);

    setLoading(false);

    if (response.status === "success") {
      router.push("/auth/login");
      toast({
        title: t("register-success-title"),
        description: t("register-success"),
      });
      return;
    }

    if (Array.isArray(response.message)) {
      response.message.forEach((error) => {
        form.setError(error.field as keyof Inputs, {
          message: error.errorMessage,
          type: "ivnalid",
        });
        return;
      });
    } else {
      setError(response.message);
    }
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

        {/* First & Last name */}
        <div className="flex gap-2">
          {/* First name */}
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <Label>{t("register-firstname")}</Label>

                {/* Input */}
                <Input {...field} placeholder={t("register-firstname-placeholder")} />

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last name */}
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <Label>{t("register-lastname")}</Label>

                {/* Input */}
                <Input {...field} placeholder={t("register-lastname-placeholder")} />

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label>{t("email")}</Label>

              {/* Input */}
              <Input {...field} placeholder={t("email-placeholder")} />

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

        {/* Password Confirm */}
        <FormField
          name="passwordConfirm"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <Label>{t("register-password-confirm")}</Label>

              {/* Input */}
              <Input type="password" {...field} placeholder={t("register-password-confirm-placeholder")} />

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit / Feedback */}
        <div className="flex flex-col gap-2 mt-10">
          {/* Feedback */}
          <FeedbackMessage>{error}</FeedbackMessage>

          {/* Submit */}
          <Button disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{t("register-submit")}</Button>
        </div>
      </form>
    </Form>
  );
}
