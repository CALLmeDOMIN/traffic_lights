import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { type UploadFileData } from "@/lib/types";

const formSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size < 1000000, {
    message: "Your file must be less than 1MB.",
  }),
});

export default function UploadFileForm({
  setOpen,
  onFileUpload,
}: {
  setOpen: (open: boolean) => void;
  onFileUpload: (data: UploadFileData) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(
          event.target?.result as string,
        ) as UploadFileData;
        onFileUpload(data);
        setOpen(false);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        form.setError("file", {
          message: "Invalid JSON format",
        });
      }
    };
    reader.readAsText(values.file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Input file</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept=".json"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription>
                Please upload a JSON file with the following format:
              </FormDescription>
              <pre className="mt-0.5 rounded-md bg-slate-950 p-4 text-sm text-muted-foreground">
                {`{
  "roads": {
    north: {
      vehicles: [
        {
          vehicleId: "1",
          movement: {
            from: "north",
            to: "east",
          },
        },
      ]
    },
    east: {
      vehicles: []
    },
    south: {
      vehicles: []
    },
    west: {
      vehicles: []
    },
  }
}`}
              </pre>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" type="button">
            Close
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isValidating || !form.formState.isValid}
          >
            Add car
          </Button>
        </div>
      </form>
    </Form>
  );
}