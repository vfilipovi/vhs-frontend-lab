import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";

import { UseFormRegister, FieldValues } from "react-hook-form";
import { VhsData } from "../types/types";
import { useState } from "react";

const genres = [
  { label: "Action", value: "action" },
  { label: "Comedy", value: "comedy" },
  { label: "Drama", value: "drama" },
  { label: "Crime", value: "crime" },
  { label: "Horror", value: "horror" },
];

interface VhsCreateFormProps {
  handleSubmit: UseFormHandleSubmit<VhsData>;
  errors: FieldErrors<VhsData>;
  onSubmit: (data: VhsData) => void;
  onErrors?: (errors: FieldErrors<FieldValues>) => void;
  isLoading: boolean;
  register: UseFormRegister<VhsData>;
  control: Control<VhsData>;
}

const VhsCreateForm = ({
  handleSubmit,
  errors,
  onSubmit,
  onErrors,
  isLoading,
  register,
  control,
}: VhsCreateFormProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        className="p-fluid *:p-5 w-[60%]"
      >
        <div className="p-field">
          <label htmlFor="title">Title</label>
          <InputText id="title" {...register("title")} />
          {errors.title && (
            <small className="p-error">{errors.title.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            {...register("description")}
            rows={5}
          />
          {errors.description && (
            <small className="p-error">{errors.description.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="genre">Genre</label>
          <Controller
            name="genre"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Dropdown
                id="genre"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                options={genres}
                placeholder="Select a genre"
                className={fieldState.invalid ? "p-invalid" : ""}
              />
            )}
          />

          {errors.genre && (
            <small className="p-error">{errors.genre.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="duration">Duration (minutes)</label>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="duration"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                mode="decimal"
                useGrouping={false}
              />
            )}
          />
          {errors.duration && (
            <small className="p-error">{errors.duration.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="releasedAt">Released At</label>
          <Controller
            name="releasedAt"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Calendar
                id="releasedAt"
                value={value ? new Date(value, 0) : null}
                onChange={(e) => {
                  if (e.value) {
                    const year = e.value.getFullYear();
                    onChange(year);
                  } else {
                    onChange(null);
                  }
                }}
                dateFormat="yy"
                view="year"
                yearNavigator
                yearRange="1900:2030"
              />
            )}
          />

          {errors.releasedAt && (
            <small className="p-error">{errors.releasedAt.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="rentalPrice">Rental Price</label>
          <Controller
            name="rentalPrice"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="rentalPrice"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                mode="currency"
                currency="EUR"
                locale="de-DE"
                useGrouping={false}
              />
            )}
          />
          {errors.rentalPrice && (
            <small className="p-error">{errors.rentalPrice.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="rentalDuration">Rental Duration (days)</label>
          <Controller
            name="rentalDuration"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="rentalDuration"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                mode="decimal"
                useGrouping={false}
              />
            )}
          />
          {errors.rentalDuration && (
            <small className="p-error">{errors.rentalDuration.message}</small>
          )}
        </div>

        <div className="p-field">
          <label htmlFor="quantity">Quantity</label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <InputNumber
                id="quantity"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                mode="decimal"
                useGrouping={false}
              />
            )}
          />
          {errors.quantity && (
            <small className="p-error">{errors.quantity.message}</small>
          )}
        </div>

        {/* Show existing image */}
        <Controller
          name="thumbnail"
          control={control}
          render={({ field }) =>
            imageError ? (
              <></>
            ) : (
              <div className="flex justify-center">
                <img
                  src={`${"http://localhost:3000/"}${field.value}`}
                  alt="Thumbnail"
                  className="rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
            )
          }
        />

        {/* Upload new image */}
        <div className="p-field">
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <FileUpload
                mode="basic"
                name="thumbnail"
                accept="image/jpeg,image/png"
                maxFileSize={1000000}
                onSelect={(e) => {
                  const file = e.files ? e.files[0] : null;
                  field.onChange(file);
                }}
                onError={() => {
                  console.log("upload error");
                }}
              />
            )}
          />
        </div>
        {errors.thumbnail && (
          <small className="p-error">{errors.thumbnail.message}</small>
        )}

        <Button
          type="submit"
          label="Submit"
          className="mt-2"
          loading={isLoading}
        />
      </form>
    </div>
  );
};

export default VhsCreateForm;
