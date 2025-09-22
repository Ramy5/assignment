import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { ServiceProvider } from "@/types";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  postcode: z.string().min(1, "Postcode is required"),
  vendorType: z.enum(["Independent", "Company"]),
  serviceOffering: z.enum(["Housekeeping", "Window Cleaning", "Car Valet"]),
  status: z.enum(["Onboarded", "Rejected", "-"]),
});

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: ServiceProvider | null;
  onUpdateUser: (updatedUser: ServiceProvider) => void;
}

export function EditDialog({
  isOpen,
  setIsOpen,
  user,
  onUpdateUser,
}: EditDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ServiceProvider>({
    resolver: zodResolver(userSchema) as unknown as Resolver<ServiceProvider>,
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = (formData: ServiceProvider) => {
    if (user) {
      onUpdateUser({ ...user, ...formData });
    }
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95%] sm:max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit User: {user.email}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Field Wrapper for Email */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-4 gap-y-2">
              <Label htmlFor="email" className="sm:text-right">
                Email
              </Label>
              <div className="sm:col-span-3">
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-4 gap-y-2">
              <Label htmlFor="phone" className="sm:text-right">
                Phone
              </Label>
              <div className="sm:col-span-3">
                <Input id="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-4 gap-y-2">
              <Label htmlFor="postcode" className="sm:text-right">
                Postcode
              </Label>
              <div className="sm:col-span-3">
                <Input id="postcode" {...register("postcode")} />
                {errors.postcode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postcode.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-x-4 gap-y-2">
              <Label htmlFor="status" className="sm:text-right">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="sm:col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Onboarded">Onboarded</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="-">-</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
