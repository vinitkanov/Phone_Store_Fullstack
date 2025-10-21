import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUser } from "@/utils/api/users";
import { FormMessage } from "@/components/ui/form";

const addUserSchema = z.object({
  fullname: z
    .string()
    .min(8, { message: "Nama Lengkap harus minimal 8 karakter" }),
  username: z.string().min(5, { message: "Username harus minimal 5 karakter" }),
  password: z.string().min(5, { message: "Password harus minimal 5 karakter" }),
  email: z.email({ message: "Format email tidak valid" }),
  phone_number: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val)),
  age: z
    .string()
    .refine((val) => !isNaN(val), "Umur harus berupa angka")
    .transform((val) => Number(val))
    .refine((val) => val >= 18 && val <= 60, {
      message: "Umur harus antara 18 - 60 tahun",
    }),
  address: z.string().min(10, { message: "Alamat harus minimal 10 karakter" }),
  role: z.enum(["user", "admin"], { message: "Role tidak valid" }),
});

function AddUser() {
  const form = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      email: "",
      phone_number: 0,
      age: 0,
      address: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const message = await addUser(data);
      alert("User berhasil ditambahkan: " + message);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Gagal menambahkan user.");
    }
  };

  return (
    <div className="p-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Nama Lengkap */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">
                  Nama Lengkap
                </FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Nama Lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">
                  Username
                </FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nomor Telepon */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">
                  Nomor Telepon
                </FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Nomor Telepon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Umur */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">Umur</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Umur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alamat */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black! text-base">Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Alamat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default AddUser;
