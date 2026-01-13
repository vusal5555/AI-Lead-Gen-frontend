"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createLead } from "@/lib/api";
import { Lead } from "@/types";
import { Plus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

type Props = {
  onLeadCreated: (lead: Lead) => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({ message: "Invalid email address." }).optional(),
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  company_website: z.string().optional(),
  linkedin_url: z.string().optional(),
});

export default function AddModal({ onLeadCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company_name: "",
      company_website: "",
      linkedin_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const newLead = await createLead({
        name: values.name,
        email: values.email || "",
        company_name: values.company_name,
        company_website: values.company_website || "",
        linkedin_url: values.linkedin_url || "",
      });

      onLeadCreated(newLead);
      setOpen(false);

      form.reset();
      toast.success("Lead created successfully");
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Add New Lead
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@company.com"
                      {...field}
                      className="focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc"
                      {...field}
                      className="focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company_website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://company.com"
                      {...field}
                      className="focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/..."
                      {...field}
                      className="focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Lead"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
