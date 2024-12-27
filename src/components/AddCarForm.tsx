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
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
            <FormItem className="space-y-3">
              <FormLabel>Starting direction</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {["north", "east", "south", "west"].map((direction) => (
                    <Label
                      key={direction}
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 hover:bg-accent ${
                        field.value === direction
                          ? "border-primary"
                          : "border-input"
                      }`}
                    >
                      <RadioGroupItem value={direction} className="sr-only" />
                      {direction.charAt(0).toUpperCase() + direction.slice(1)}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endRoad"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Ending direction</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {["north", "east", "south", "west"].map((direction) => (
                    <Label
                      key={direction}
                      className={`flex cursor-pointer items-center justify-center rounded-md border-2 p-4 hover:bg-accent ${
                        field.value === direction
                          ? "border-primary"
                          : "border-input"
                      }`}
                    >
                      <RadioGroupItem value={direction} className="sr-only" />
                      {direction.charAt(0).toUpperCase() + direction.slice(1)}
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onSave(false)}
          >
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
