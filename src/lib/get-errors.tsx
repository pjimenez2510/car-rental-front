export const getErrors = (errors: string | string[] | undefined) => {
  if (!errors) return;
  const errorsArray = Array.isArray(errors) ? errors : [errors];
  return (
    <div>
      {errorsArray.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};
