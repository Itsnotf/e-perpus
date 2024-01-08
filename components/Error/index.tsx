const GetErrorMessage = (type: any) => {
  switch (type) {
    case "minLength":
      return "jumlah karakter tidak memenuhi minimum";

    case "required":
    default:
      return "mohon mengisi form";
  }
};

const FormError = ({ error }: any) => {
  if (!error) {
    return <></>;
  }

  const { type } = error;
  const message = GetErrorMessage(type);

  return <div className="flex justify-start  text-danger ">{message}</div>;
};

export default FormError;
