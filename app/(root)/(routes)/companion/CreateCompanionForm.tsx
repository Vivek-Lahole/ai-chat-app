"use client";

import axios from "axios";
import { category, Companion } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  MODEL_COMPANION_INSTRUCTION,
  MODEL_CHAT,
  BACK_STORY,
} from "../../../../public/data/CompanionSeed";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HashLoader } from "react-spinners";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed requires at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  backstory: z.string().min(200, {
    message: "Backstory requires at least 200 characters.",
  }),
});

const CreateCompanionForm = ({
  categories,
  initialData,
}: {
  categories: category[];
  initialData: Companion | null;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      backstory: "",
      categoryId: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setloading(true);
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
        toast({
          variant: "success",
          title: `${"Character Edited Succesfully!"}`,
          description: "Succesfully Edited Character!",
        });
      } else {
        await axios.post(`/api/companion`, values);

        toast({
          variant: "default",
          title: `${"Character Created Succesfully!"}`,
          description: "Hurraaay! your Character is created!",
        });
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went Wrong!",
        description: `${error}`,
      });
      console.log("ERROR", error);
    }
    setloading(false);
  }

  const isLoading = form.formState.isSubmitting;

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <HashLoader color="white" />
      </div>
    );
  }

  return (
    <div className="h-full p-4 m-5 space-y-2 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full col-span-2">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your Companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-1">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="max-w-xl">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Narendra Modi"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your AI Companion will be named.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Prime Minister of India"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short description for your AI Companion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category for your AI
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for character Behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions for your character</FormLabel>
                  <FormDescription>
                    Describe how your character should behave and give
                    appropiate instructions to him.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      rows={10}
                      className="bg-background resize-none"
                      placeholder={MODEL_COMPANION_INSTRUCTION}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="backstory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backstory of your character</FormLabel>
                  <FormDescription>
                    Write a small but detailed backstory for your custom
                    character
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      rows={10}
                      className="bg-background resize-none"
                      placeholder={BACK_STORY}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Conversation</FormLabel>
                  <FormDescription>
                    Write couple of examples of a you chatting with your custom
                    charater, write expected answers to train your character
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      rows={10}
                      className="bg-background resize-none"
                      placeholder={MODEL_CHAT}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              size="lg"
              disabled={isLoading}
              className="hover:scale-90 transition"
            >
              {initialData ? "Edit your companion" : "Create your companion"}
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCompanionForm;
