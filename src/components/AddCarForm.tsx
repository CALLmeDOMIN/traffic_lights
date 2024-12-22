import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { type Direction } from "@/backend/types/traffic";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const formSchema = z.object({
  startRoad: z.string().nonempty(),
  endRoad: z.string().nonempty(),
});

export default function AddCarForm({
  onSave,
  onAddVehicle,
}: {
  onSave: (open: boolean) => void;
  onAddVehicle: (from: Direction, to: Direction) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startRoad: "",
      endRoad: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddVehicle(values.startRoad as Direction, values.endRoad as Direction);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startRoad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting direction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select starting road direction for the vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark">
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endRoad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ending direction</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ending road direction for the vehicle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark">
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={() => onSave(false)}>
            Close
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isValidating || !form.formState.isValid}
            onClick={() => onSave(false)}
          >
            Add car
          </Button>
        </div>
      </form>
    </Form>
  );
}
