import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VhsData } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCreateVhs } from "../hooks/reactQuery/useCreateVhs";
import { useUpdateVhs } from "../hooks/reactQuery/useUpdateVhs";
import VhsCreateForm from "../modules/VhsCreateForm";

const schema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(3, { message: "description is required" }),
  genre: z.string().min(3, { message: "genre is required" }),
  duration: z.number().min(5, "Duration must be at least 5 minutes"),
  releasedAt: z.number().min(0, "Duration must be at least 5 minutes"),
  rentalPrice: z.number().min(0, "Rental price must be positive"),
  rentalDuration: z.number().min(1, "Rental duration must be at least 1 day"),
  quantity: z.number().min(0, "Quantity must be 0 or positive"),
  thumbnail: z
    .union([
      z
        .string()
        .regex(/^public\/images\/.+$/, "Invalid image path")
        .optional(),

      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
          { message: "Only JPEG, JPG, and PNG files are allowed." }
        )
        .refine((file) => file.size <= 1000000, {
          message: "File must be less than or equal to 1 MB.",
        })
        .optional(),
    ])
    .optional(),
});

const CreateOrEditVhs = () => {
  const { id } = useParams();

  const createVhs = useCreateVhs();
  const updateVhs = useUpdateVhs(+id!);

  const getVhs = async (): Promise<VhsData> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/${id}`);
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-single-vhs", id],
    queryFn: getVhs,
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<VhsData>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: data?.id,
      title: data?.title,
      description: data?.description,
      genre: data?.genre,
      duration: data?.duration,
      quantity: data?.quantity,
      releasedAt: data?.releasedAt,
      rentalDuration: data?.rentalDuration,
      rentalPrice: data?.rentalPrice,
      thumbnail: data?.thumbnail,
    },
  });

  const onSubmit: SubmitHandler<VhsData> = (formData: VhsData) => {
    const formDataDemo = new FormData();
    formDataDemo.append("title", formData.title);
    formDataDemo.append("description", formData.description);
    formDataDemo.append("genre", formData.genre);
    formDataDemo.append("duration", formData.duration.toString());
    formDataDemo.append("releasedAt", formData.releasedAt.toString());
    formDataDemo.append("rentalPrice", formData.rentalPrice.toString());
    formDataDemo.append("rentalDuration", formData.rentalDuration.toString());
    formDataDemo.append("thumbnail", formData.thumbnail);

    if (id) {
      updateVhs.mutate(formDataDemo);
    } else {
      createVhs.mutate(formDataDemo);
    }
  };

  const onErrors = (errors: FieldErrors<FormData>) => {
    console.error("Form errors:", errors);
  };

  return (
    <VhsCreateForm
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      onSubmit={onSubmit}
      register={register}
      onErrors={onErrors}
    />
  );
};

export default CreateOrEditVhs;
